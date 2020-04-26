import React, { useContext } from "react";
import NavBar from "./../navBar/Navbar";
import SideNavBar from "./../sideNavBar/SideNavBar";
import BackDrop from "./../backDrop/BackDrop";
import { ScriptsContext } from "./../../../contexts/ScriptsContext";

const Menus = (props) => {
  let { isSideBarOpen, toggleSidebar } = useContext(ScriptsContext);

  return (
    <div>
      <NavBar open={toggleSidebar} />
      {isSideBarOpen ? (
        <div>
          <BackDrop close={toggleSidebar} />
        </div>
      ) : null}
      <SideNavBar close={toggleSidebar} display={isSideBarOpen} />
    </div>
  );
};

export default Menus;
