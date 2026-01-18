import { Suspense } from 'react';
import GearList from '@/components/GearList';

export const metadata = {
  title: 'Browse Gear - LensLocker',
  description: 'Find and rent professional camera equipment',
};

export default function GearPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="text-center">
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    }>
      <GearList />
    </Suspense>
  );
}
