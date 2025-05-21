'use client';

import { useRouter, usePathname } from 'next/navigation';

interface TabItem {
  label: string;
  url: string;
}

interface TabBarProps {
  tabs: TabItem[];
}

function Tab({ label, url }: TabItem) {
  const router = useRouter();
  const pathname = usePathname();
  
  const testUrl = url?.match(/^\/[^\/]+/)?.[0] ?? null;
  const isActive = pathname === testUrl || pathname.startsWith(testUrl + '/');

  return (
    <button
      onClick={() => router.push(url)}
      className={`${
        isActive
          ? 'border-shamrock-400 text-shamrock-400 cursor-pointer'
          : 'border-transparent text-gray-500 hover:text-gray-00 hover:border-gray-300 cursor-pointer'
      } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
    >
      {label}
    </button>
  );
}

export default function TabBar({ tabs }: TabBarProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <Tab key={tab.url} {...tab} />
          ))}
        </div>
      </nav>
    </div>
  );
} 