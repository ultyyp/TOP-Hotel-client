import React, { useState, useEffect } from 'react';
import { getAllBookings } from '../utils/ApiFunctions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart } from '@mui/x-charts';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import Header from "../common/Header";

const BookingStatistics = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current month
  const [chartData, setChartData] = useState({ xAxis: [], series: [] });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookingInfo(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookingInfo.length > 0) {
      const daysInMonth = eachDayOfInterval({
        start: startOfMonth(selectedDate),
        end: endOfMonth(selectedDate),
      });

      const normalizeDate = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const dailyCounts = daysInMonth.map((date) => {
        const normalizedDate = normalizeDate(date);
        return bookingInfo.filter((booking) => {
          const checkIn = normalizeDate(new Date(booking.checkInDate));
          const checkOut = normalizeDate(new Date(booking.checkOutDate));
          return normalizedDate >= checkIn && normalizedDate <= checkOut;
        }).length;
      });

      setChartData({
        xAxis: [{ data: daysInMonth.map((date) => format(date, 'd')) }],
        series: [
          {
            data: dailyCounts,
            area: true, // Enable the area chart
          },
        ],
      });
    }
  }, [bookingInfo, selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <section style={{ backgroundColor: 'whitesmoke', padding: '20px' }}>
      <Header title="Booking Statistics" />
      {error && <div className="text-danger">{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings...</div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label>Select Month:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              className="date-picker"
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <LineChart
              xAxis={chartData.xAxis}
              series={chartData.series}
              width={1500}
              height={300}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default BookingStatistics;
