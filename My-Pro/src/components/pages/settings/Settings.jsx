import React, { useEffect } from "react";
import "./settings.css";

export default function Settings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="settings-container">
      <div className="settings-container-header">Settings</div>
      <div className="settings">
        <div className="individual-setting-div">
          <div className="settings-heading">Full Name</div>
          <div className="settings-edit">
            <input type="text" value="Manoj Kumar" readOnly />
          </div>
        </div>
        <div className="individual-setting-div">
          <div className="settings-heading">Username</div>
          <div className="settings-edit">
            <input type="text" value="manoz" readOnly />
          </div>
        </div>
        <div className="individual-setting-div">
          <div className="settings-heading">Gender</div>
          <div className="settings-edit">
            <select className="settings-edit">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Only Other</option>
            </select>
          </div>
        </div>
        <div className="individual-setting-div">
          <button className="request-friendshp-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
