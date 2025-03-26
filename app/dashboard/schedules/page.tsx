import { Calendar as BigCalendar } from '@/components/Calender';
import { ScheduleForm } from '@/components/ScheduleForm';

export default function SchedulePage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800/40 p-6 rounded-xl shadow-xl border border-white/5 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Schedule Manager
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-purple-300/80 mb-4">Create New Schedule</h3>
            <ScheduleForm />
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-purple-300/80 mb-4">Calendar View</h3>
            <div className="h-[600px]">
              <BigCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
