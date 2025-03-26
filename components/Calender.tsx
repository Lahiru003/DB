"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Calendar() {
  const { data: events, error } = useSWR('/api/schedules', fetcher);
  const [view, setView] = useState('timeGridWeek');

  if (error) {
    return <div>Error loading events</div>;
  }

  return (
    <div className="bg-gray-800/40 p-6 rounded-2xl shadow-xl border border-white/5 backdrop-blur-lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={view}
        events={events?.map((event: any) => ({
          title: `${event.clientFirstName} - ${event.lessonName}`,  // Adjusted title format
          start: event.startDateTime,
          end: event.endDateTime,
          extendedProps: { ...event },
        }))}
        eventContent={(arg) => (
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-md shadow-lg hover:shadow-lg transition-all">
            <div className="text-sm font-semibold">{arg.event.title}</div>
            <div className="text-xs opacity-80">{arg.timeText}</div>
          </div>
        )}
        themeSystem="standard"
        views={{
          timeGridWeek: {
            dayHeaderFormat: { weekday: 'short', day: 'numeric' },
          },
        }}
        dayHeaderClassNames="bg-gray-700/40 text-purple-300 font-medium"
        dayCellClassNames="hover:bg-gray-700/20 transition-colors"
        eventClassNames="cursor-pointer border-none"
        nowIndicator={true}  // Optional: Add a "now" indicator
        eventClick={(info) => console.log('Event clicked:', info.event)}
        datesSet={(arg) => console.log('View changed:', arg.view)}
        height="600px"
      />
    </div>
  );
}

// Add this CSS (with JSX styling)
<style jsx global>{`
  .luxury-calendar {
    --fc-border-color: rgba(255,255,255,0.1);
    --fc-page-bg-color: rgba(17, 24, 39, 0.4);
    --fc-today-bg-color: rgba(79, 70, 229, 0.15);
    --fc-neutral-bg-color: rgba(31, 41, 55, 0.6);
    --fc-list-event-hover-bg-color: rgba(79, 70, 229, 0.2);
  }

  .fc-toolbar-title {
    @apply text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent;
  }

  .fc-button-primary {
    @apply bg-gray-700/40 border border-purple-500/30 text-purple-300 hover:bg-purple-600/50 hover:text-white transition-all shadow-sm !important;
  }

  .fc-button-active {
    @apply bg-purple-600/70 text-white !important;
  }

  .fc-timegrid-axis {
    @apply bg-gray-700/40;
  }

  .fc-col-header-cell {
    @apply bg-gray-700/40 py-3 border-b border-purple-500/20;
  }

  .fc-daygrid-day-frame {
    @apply hover:bg-gray-700/20 transition-colors;
  }

  .now-indicator {
    background-color: #818cf8;
    height: 2px;
    opacity: 0.8;
  }
`}</style>
