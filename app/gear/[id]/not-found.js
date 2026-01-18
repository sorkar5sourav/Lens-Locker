import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#F8FAFC] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#94A3B8] mb-4">
          Gear Not Found
        </h2>
        <p className="text-[#94A3B8] mb-8">
          The camera gear you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/gear"
            className="px-6 py-3 bg-[#3B82F6] text-[#F8FAFC] rounded-lg hover:bg-[#2563EB] transition-colors font-medium"
          >
            Browse All Gear
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-[#334155] text-[#F8FAFC] rounded-lg hover:bg-[#475569] transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

