import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css'; // Import CSS file for sidebar styles

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-heading">Mail App</div>
      <Nav className="flex-column">

        <Nav.Item>
          <Nav.Link href="/compose" className="sidebar-link">Compose</Nav.Link>
        </Nav.Item>        
        <Nav.Item>
          <Nav.Link href="/inbox" className="sidebar-link">Inbox</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="sidebar-link">Sent</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="sidebar-link">Drafts</Nav.Link>
        </Nav.Item>
        {/* Add more sidebar links as needed */}
      </Nav>
    </div>
  );
}

export default Sidebar;
