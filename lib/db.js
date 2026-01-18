import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

function getMongoUri() {
  const MONGODB_URI = process.env.MONGODB_URI?.trim();

  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI');
  }

  // Validate connection string format
  if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
    throw new Error('Invalid MONGODB_URI format.');
  }

  return MONGODB_URI;
}

let cachedMongoose = global.mongooseConn;
let cachedMongo = global.mongoClient;

if (!cachedMongoose) {
  cachedMongoose = global.mongooseConn = { conn: null, promise: null };
}

if (!cachedMongo) {
  cachedMongo = global.mongoClient = { client: null, promise: null };
}

// Mongoose connection for Mongoose operations
async function connectDB() {
  const MONGODB_URI = getMongoUri();
  
  if (cachedMongoose.conn) {
    return cachedMongoose.conn;
  }

  if (!cachedMongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedMongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Mongoose connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cachedMongoose.conn = await cachedMongoose.promise;
  } catch (e) {
    cachedMongoose.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  return cachedMongoose.conn;
}

// Raw MongoDB client for direct collection operations
async function getMongoClient() {
  const MONGODB_URI = getMongoUri();
  
  if (cachedMongo.client) {
    return cachedMongo.client;
  }

  if (!cachedMongo.promise) {
    cachedMongo.promise = MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 10,
    }).then((client) => {
      console.log('✅ MongoDB client connected');
      return client;
    });
  }

  try {
    cachedMongo.client = await cachedMongo.promise;
  } catch (e) {
    cachedMongo.promise = null;
    console.error('❌ MongoDB client error:', e);
    throw e;
  }

  return cachedMongo.client;
}

// Helper to get database
async function getDB() {
  const MONGODB_URI = getMongoUri();
  const client = await getMongoClient();
  const dbName = new URL(MONGODB_URI).pathname.slice(1) || 'lenslocker';
  return client.db(dbName);
}

export default connectDB;
export { getMongoClient, getDB };

