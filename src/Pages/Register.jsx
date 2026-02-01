import { Link } from "react-router-dom";
import './Register.css'
import React from "react";

const Register = () => {
  return (
    <>
      <div className="form-container">
        {/* Page Title */}
        <h1 className="from-title" REGISTER></h1>
        <form>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number Field */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
            />
          </div>

          {/* Submiit Button */}
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
        {/*Link to register Page*/}
        <p className="link-text">
          Don't have an account? <Link to="/Register">Register here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
