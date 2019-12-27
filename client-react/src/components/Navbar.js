import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export default function Navbar() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav>
    <div className="nav-wrapper light-blue darken-1" style={{padding: "0 2rem"}}>
      <span className="brand-logo">Link Shrinker</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/create">Create Link</NavLink></li>
        <li><NavLink to="/links">All Links</NavLink></li>
        <li><NavLink to="/" onClick={logoutHandler}>Log Out</NavLink></li>        
      </ul>
    </div>
  </nav>
  )
}
