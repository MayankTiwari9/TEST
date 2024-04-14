import React from 'react';
import {Navbar,Container,Nav, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from "../../Store/auth";
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/auth");
  };
  
  return (
    <div>
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
           {token && <Link to="/" className='nav-link'>Home</Link>}
           {token && <Link to="/about" className='nav-link'>About</Link>}
           {token && <Link to="/contactUs" className='nav-link'>Contact Us</Link>}
           {token && <Link to="/trackExpense" className='nav-link'>Track</Link>}
           {!token && <Link to="/auth" className='nav-link'>Login</Link>}
           {token && <Button variant="outline-secondary" style={{marginLeft: '700px'}} onClick={logoutHandler}>Logout</Button>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
