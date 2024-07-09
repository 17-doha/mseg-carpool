import React from 'react';
import './Calendar.css'; // Import your CSS file for styling

interface CalendarProps {
    rides: Ride[];
}

interface Ride {
    id: number;
    departureTime: string; // Assuming departureTime is in ISO format (e.g., "2024-07-09T15:30:00.000Z")
}

const Calendar: React.FC<CalendarProps> = ({ rides }) => {
    // Function to get month name from date
    const getMonthName = (date: Date): string => {
        return date.toLocaleString('default', { month: 'long' });
    };

    // Function to get number of days in a month
    const getDaysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };



    // Generate array of days in the month
    const generateDaysArray = (daysInMonth: number): number[] => {
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    // Get today's date for comparison
    const today = new Date();

    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Array of month names
    const monthNames = Array.from({ length: 12 }, (_, i) => getMonthName(new Date(currentYear, i, 1)));

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>{monthNames[currentMonth]} {currentYear}</h2>
            </div>
            <div className="calendar-body">
                <div className="calendar-weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className="calendar-days">
                    {generateDaysArray(getDaysInMonth(currentMonth, currentYear)).map(day => {
                        const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
                        const isRideDay = rides.some(ride => new Date(ride.departureTime).getDate() === day && new Date(ride.departureTime).getMonth() === currentMonth && new Date(ride.departureTime).getFullYear() === currentYear);

                        let classNames = "calendar-day";
                        if (isToday) classNames += " today";
                        if (isRideDay) classNames += " ride-day";

                        return (
                            <div key={day} className={classNames}>
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
