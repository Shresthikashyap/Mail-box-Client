import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmailCount } from './store/UnreadEmailSlice';
import { logout } from './store/AuthSlice';

function Sidebar() {
  const token = useSelector(state => state.auth.token);
  const count = useSelector(state => state.unreadEmails.count);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchEmailCount(token));
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/');
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-heading">Mail App</div>
      <Nav className="flex-column">
          <Nav.Item >
            <Nav.Link as={Link} to={'/compose'} className="sidebar-link" style={{backgroundColor:'lightblue'}}> Compose</Nav.Link>
          </Nav.Item>
          <Nav.Item >
            <Nav.Link as={Link} to={'/inbox'} className="sidebar-link">Inbox ({count})</Nav.Link>
          </Nav.Item>   
          <Nav.Item >
            <Nav.Link as={Link} to={'/sent'} className="sidebar-link">Sent</Nav.Link>
          </Nav.Item>  
          <Nav.Item>
          <Nav.Link className="sidebar-link" onClick={handleLogout}>Logout</Nav.Link>
        </Nav.Item>               
      </Nav>
    </nav>
  );
}

export default Sidebar;

