import React from 'react';

import './Styles/Settings.css';

const Settings = () => {
    return (
        <div className="settings-container">
            <div className="settings-box">
                <div className="menu-wrapper">
                    <h2>General</h2>
                    <h2>Account</h2>
                </div>
                <div className="settings-wrapper">
                    <div className="general-settings">
                        <h1 className="general-settings-title">General settings </h1> 
                        <div className="setting-box">
                            <div className="toggle-title">
                                <span className="settings-label">Appearance</span> 
                            </div>
                            <div className="toggle-switch">
                                <label class="switch">
                                    <input type="checkbox"/>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div className="setting-box">
                            <div className="toggle-title">
                                <div className="settings-label">Language</div>
                            </div>
                            <div className="toggle-switch">
                                <select className="select-language">
                                    <option value="en">English</option>
                                    <option value="fr">Francais</option>
                                    <option value="pl">Polski</option>
                                    <option value="sp">Espanol</option>
                                </select>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="account-settings">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings
