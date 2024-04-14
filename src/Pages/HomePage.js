import React from 'react';
import { Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Nav className="justify-content-between">
        <h3 style={{ padding: "10px" }}>Welcome to Expense Tracker!!!</h3>
        <p className="ml-auto" style={{ padding: "10px" }}>
          Your Profile is not Complete <Link to="/profile">Complete Now</Link>
        </p>
      </Nav>
    </>
  )
}

export default HomePage