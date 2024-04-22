import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Style.css';

function Options() {
    return (
        <div>
            <div className="navbar">
                <img src="/img/logo.png" alt="Logo" />
            </div>
            <div className="options-container">
                <div className="options-lounge">
                    <Link to="/lounge">
                        <img src="/img/lounge.png" alt="Icono de sala" />
                    </Link>
                </div>
                <div className="options-kitchen">
                    <Link to="/kitchen">
                        <img src="/img/kitchen.png" alt="Icono de cocina" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Options;
