import React, { useEffect, useState } from 'react';
import { getUser, getBookingsByUserSub } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const UserDetails = () => {
    const { id: userId } = useParams();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userData = await getUser(userId);
            const userBookings = await getBookingsByUserSub(userId);
            setUser(userData);
            setBookings(userBookings);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options); // This will format the date in a more readable form
    };

    return (
        <>
            {user && (
                <div className="container mt-5">
                    <h2>User Details</h2>
                    <p>ID: {user.id}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <h3>Bookings</h3>
                    {bookings.length === 0 ? (
                        <p>This user has no bookings.</p>
                    ) : (
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking.id}>
                                    Room ID: {booking.roomId}, Dates: {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <div className="d-flex justify-content-center mt-4">
                <Link to={"/existing-users"} className="btn btn-outline-info">
                    Back
                </Link>
            </div>
        </>
    );
};

export default UserDetails;
