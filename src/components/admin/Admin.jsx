import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5 text-center">
      <h2>Welcome to the Admin Panel</h2>
      <hr />
      <div className="row justify-content-center mt-4">
        <div className="col-6 col-md-3 mb-3">
          <Link to="/existing-rooms" className="btn btn-outline btn-hotel btn-block rounded-pill">
            Manage Rooms
          </Link>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <Link to="/existing-bookings" className="btn btn-outline btn-hotel btn-block rounded-pill">
            Manage Bookings
          </Link>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <Link to="/existing-users" className="btn btn-outline btn-hotel btn-block rounded-pill">
            Manage Users
          </Link>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <Link to="/booking-statistics" className="btn btn-outline btn-hotel btn-block rounded-pill">
            Booking Statistics
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
