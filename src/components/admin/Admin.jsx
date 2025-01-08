import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Welcome to the Admin Panel</h2>
			<hr />
			<Link to={"/existing-rooms"} className='hotel-color'>Manage Rooms</Link> <br />
			<Link to={"/existing-bookings"} className='hotel-color'>Manage Bookings</Link> <br />
			<Link to={"/booking-statistics"} className='hotel-color'>Booking Statistics</Link>
		</section>
	)
}

export default Admin