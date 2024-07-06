import { useState } from 'react';
import BasicPie from './RidePieChart'; // Assuming BasicPie is correctly imported
import './SideBarChart.css'; // Import your CSS for styling

const SidebarChart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar-chart ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-tab" onClick={toggleSidebar}>
                Chart Tab
            </div>
            <div className="chart-container">
                {isOpen && <BasicPie />} {/* Render BasicPie component when isOpen is true */}
            </div>
        </div>
    );
};

export default SidebarChart;
