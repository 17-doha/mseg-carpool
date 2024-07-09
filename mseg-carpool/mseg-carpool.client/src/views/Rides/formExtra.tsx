import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formExtra.css'; // Ensure you import the CSS file

interface DriverFormData {
    driverCar: string;
    driverCarPlate: string;
    driverCarColor: string;
    mobileNumber: string;
}

interface DriverFormProps {
    onSubmit: (data: DriverFormData) => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<DriverFormData>({
        driverCar: '',
        driverCarPlate: '',
        driverCarColor: '',
        mobileNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        navigate('/rides'); // Navigate to the Rides page upon form submission
    };

    return (
        <div className="container">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="driverCar">Driver Car:</label>
                        <input
                            type="text"
                            id="driverCar"
                            name="driverCar"
                            value={formData.driverCar}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="driverCarPlate">Driver Car Plate:</label>
                        <input
                            type="text"
                            id="driverCarPlate"
                            name="driverCarPlate"
                            value={formData.driverCarPlate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="driverCarColor">Driver Car Color:</label>
                        <input
                            type="text"
                            id="driverCarColor"
                            name="driverCarColor"
                            value={formData.driverCarColor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="create-button">Submit</button>
                </form>
            </div>
          
        </div>
    );
};

export default DriverForm;
