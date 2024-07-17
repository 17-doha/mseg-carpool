import React from 'react';
import './PointsDisplay.css'; // You can style this component as per your requirements

interface PointsDisplayProps {
    points: number;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
    return (
        <div className="points-display">
            <span className="points-badge">
                🌟 {points} Points 🌟
            </span>
        </div>
    );
};

export default PointsDisplay;
