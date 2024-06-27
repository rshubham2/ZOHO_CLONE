import React from 'react';
import './Sidebar.css';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineDollar, AiOutlineSearch, AiOutlineBell, AiOutlineUser } from 'react-icons/ai';
import { BsBox, BsFileText } from 'react-icons/bs';
import { RiBillLine } from 'react-icons/ri';
import { VscGraph } from 'react-icons/vsc';
import { IoReloadOutline } from 'react-icons/io5';
import { FaRegCommentDots } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">Books</div>
        <nav>
          <ul>
            <li className="active"><AiOutlineHome /> Home</li>
            <li><BsBox /> Items</li>
            <li><AiOutlineShoppingCart /> Sales</li>
            <li><AiOutlineDollar /> Purchases</li>
            <li><RiBillLine /> e-Way Bills</li>
            <li><VscGraph /> Reports</li>
            <li><BsFileText /> Documents <span className="badge">1521</span></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <div className="search-bar">
            {/* <IoReloadOutline className="reload-icon" /> */}
            <AiOutlineSearch className="search-icon" />
            <input type="text" placeholder="Search in Customers" />
          </div>
          <div className="header-right">
            <span className="company-name">VC TECHNOSOLUTIONS PRIVATE LIMITED ▼</span>
            <AiOutlineBell className="icon" />
            <AiOutlineUser className="icon" />
            <img src="path-to-user-avatar.jpg" alt="User" className="user-avatar" />
          </div>
        </header>
        <div className="content">
          <h1>Hello, Deepak</h1>
          {/* Add your dashboard content here */}
        </div>
        <footer>
          <div className="footer-left">
            <span>Here is your Smart Chat (Ctrl+Space)</span>
          </div>
          <div className="footer-right">
            <span>Mon to Fri 9:00AM - 7:00PM</span>
            <button className="chat-button">
              <FaRegCommentDots /> Chat with our experts
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;