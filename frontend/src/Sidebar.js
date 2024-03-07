import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmailCount } from './store/UnreadEmailSlice';

function Sidebar() {
  const token = useSelector(state => state.auth.token);
  const count = useSelector(state => state.unreadEmails.count);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchEmailCount(token));
    }
  }, [token, dispatch]);

  return (
    <nav className="sidebar">
      <div className="sidebar-heading">Mail App</div>
      <Nav className="flex-column">
          <Nav.Item >
            <Nav.Link as={Link} to={'/compose'} className="sidebar-link">Compose</Nav.Link>
          </Nav.Item>
          <Nav.Item >
            <Nav.Link as={Link} to={'/inbox'} className="sidebar-link">Inbox ({count})</Nav.Link>
          </Nav.Item>          
      </Nav>
    </nav>
  );
}

export default Sidebar;
