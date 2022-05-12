import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <div className="sidenav">
      <NavLink
        to={`/create/${props.index}`}
        className={(navData) =>
          navData.isActive ? " nav_link flex active" : "nav_link flex"
        }
      >
        <BsPlusLg className='icon'/>
        Create Product
      </NavLink>
      <NavLink
        to="/"
        className={(navData) =>
          navData.isActive ? " nav_link flex active" : "nav_link flex"
        }
      >
        <FaThList  className='icon' />
        List Product
      </NavLink>
    </div>
  );
};

export default Sidebar;
