import React from "react";
import "./section.css";
import Arrow from "../../images/arrow-icon.svg";

const Section = ({ title }) => {
    return (
        <div className="section">
            <div className="contents">
                <h1>{title}</h1>
                <div className="icon">
                    <img src={Arrow} alt="arrow icon" className="arrowIcon" />
                </div>
                <div className="controlskey">
                    <h2>LilDeath Controls</h2>
                    <h3>Click on LilDeath to enable controls before using the keys.:</h3>
                    <ul>
                        <li>Move: <strong>Arrow Keys</strong> (↑ ↑ ↓ ← →)</li>
                         <li>Attack: <strong>A</strong></li>
                         </ul>
                         <audio controls preload="auto">
  <source src="/audio/phantom-pixels-375314.mp3" type="audio/mpeg" />
</audio>

                         </div>
            </div>
        </div>
    );
};

export default Section;