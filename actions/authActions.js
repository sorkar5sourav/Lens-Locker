'use server';

import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  console.log('🔄 Registering user:', payload.email);
  
  try {
    // Get database connection
    const db = await getDB();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const isExist = await usersCollection.findOne({ email: payload.email });
    if (isExist) {
      console.log('⚠️ User already exists:', payload.email);
      return {
        success: false,
        message: "User already exists with this email",
      };
    }

    // Hash password
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const newUser = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: hashPassword,
      image: payload.image || null,
      role: payload.role || "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    console.log('📝 Creating user:', newUser.email);

    // Insert user to database
    const result = await usersCollection.insertOne(newUser);
    
    if (result.acknowledged) {
      console.log('✅ User registered successfully:', result.insertedId.toString());
      return {
        success: true,
        message: `User registered successfully! ID: ${result.insertedId.toString()}`,
        userId: result.insertedId.toString(),
      };
    } else {
      console.log('❌ Failed to insert user');
      return {
        success: false,
        message: "Failed to register user. Please try again.",
      };
    }
  } catch (error) {
    console.error('❌ Registration error:', error);
    return {
      success: false,
      message: error.message || "An error occurred during registration",
    };
  }
};