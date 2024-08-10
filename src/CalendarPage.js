import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  // Вставьте здесь код для календаря, аналогичный примеру выше

  return (
    <div className="container mt-4">
      <h2>Календарь</h2>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          // events={events}
          // onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
