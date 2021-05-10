import React, { useState } from 'react';
import {Nav, Navbar, NavItem, NavbarBrand, NavLink, NavbarToggler, Collapse} from 'reactstrap';
import "./Navigation"


const Navigation = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => (setCollapsed(!collapsed))
   

    return (
      <div id='main-nav'>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Expense Tracker</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/expenses">Expenses</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );

      
}
 
export default Navigation;


        // return (
        //   <div>
        //     <Navbar id="main-nav" color="dark" dark  expand="md">
        //       <NavbarBrand className="mr-auto" href="/">Expense Tracker App</NavbarBrand>
        //         {/* <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
        //         <Collapse isOpen={!collapsed} navbar></Collapse>
        //         <Nav navbar>
        //           <NavItem>
        //             <NavLink href="/">Home</NavLink>
        //           </NavItem>
        //           <NavItem>
        //             <NavLink href="/categories">Categories</NavLink>
        //           </NavItem>
        //           <NavItem>
        //             <NavLink href="/expenses">Expenses</NavLink>
        //           </NavItem>
        //         </Nav>
        //     </Navbar>
        //   </div>
        // );