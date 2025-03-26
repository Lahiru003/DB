"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useSWR from 'swr';

const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Unauthorized');
        setLoading(false);
      } catch (error) {
        console.error('Auth verification failed:', error);
        router.replace('/login');
      }
    };

    verifyAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="animate-pulse text-purple-400/80">Authenticating...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        MusicDepo Dashboard
      </h1>
      
      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard 
          title="Schedule Manager"
          href="/dashboard/schedules"
          description="View and manage lessons, room assignments, and instructor availability"
        />
        <DashboardCard 
          title="Client Management"
          href="/dashboard/clients"
          description="Manage client records, family groups, and preferences"
        />
        <DashboardCard 
          title="Instructor Portal"
          href="/dashboard/instructors"
          description="View instructor schedules, certifications, and workload"
        />
        <DashboardCard 
          title="Payment Tracking"
          href="/dashboard/payments"
          description="Process payments, view invoices, and financial records"
        />
        <DashboardCard 
          title="Payroll System"
          href="/dashboard/payroll"
          description="Manage instructor payments and earnings reports"
        />
        <DashboardCard 
          title="Room Booking"
          href="/dashboard/rooms"
          description="Manage room allocations and instrument availability"
        />
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Upcoming Lessons" value="24" trend="+3 this week" />
        <StatCard title="Pending Payments" value="$2,450" trend="15 overdue" />
        <StatCard title="Instructor Capacity" value="82%" trend="3 available" />
      </div>

      <div className="bg-gray-800/40 p-6 rounded-2xl shadow-xl border border-white/5 backdrop-blur-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-300/90">Recent Activity</h2>
        <ul className="space-y-2">
          <ActivityItem time="2h ago" action="New lesson scheduled for Emily Barnes" />
          <ActivityItem time="4h ago" action="Payment received from John Smith" />
          <ActivityItem time="1d ago" action="Room 3 assigned for piano lesson" />
        </ul>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, href, description }: { 
  title: string; 
  href: string;
  description: string;
}) => (
  <Link href={href}>
    <div className="bg-gray-800/40 p-6 rounded-xl shadow-lg border border-white/5 hover:border-purple-500/30 transition-all duration-200 backdrop-blur-sm">
      <h3 className="text-2xl font-semibold text-purple-300/80">{title}</h3>
      <p className="text-sm text-gray-300/80 mt-2">{description}</p>
    </div>
  </Link>
);

const StatCard = ({ title, value, trend }: { 
  title: string; 
  value: string;
  trend: string;
}) => (
  <div className="bg-gray-800/40 p-5 rounded-xl shadow-lg border border-white/5 hover:border-purple-500/30 transition-all duration-200 backdrop-blur-sm">
    <h4 className="text-sm text-purple-300/80 mb-2 font-light">{title}</h4>
    <p className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
      {value}
    </p>
    <span className="text-sm mt-2 inline-flex items-center gap-1 text-green-400/90">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" ></path>
      </svg>
      {trend}
    </span>
  </div>
);

const ActivityItem = ({ time, action }: { 
  time: string; 
  action: string;
}) => (
  <li className="flex items-center justify-between px-4 py-3 hover:bg-purple-900/20 rounded-xl transition-colors duration-150 border-b border-white/5 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" ></div>
      <span className="text-gray-300/90">{action}</span>
    </div>
    <span className="text-sm text-purple-300/60">{time}</span>
  </li>
);
