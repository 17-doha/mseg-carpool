import React, { useState, useEffect } from "react";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { SketchPicker } from "react-color";

const AddRideForm = ({ onClose, addRide, ride }) => {
    const [licensePlate, setLicensePlate] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carColor, setCarColor] = useState("#ffffff");

    useEffect(() => {
        if (ride) {
            setLicensePlate(ride.licensePlate);
            setCarBrand(ride.carBrand);
            setCarModel(ride.carModel);
            setCarColor(ride.carColor);
        }
    }, [ride]);

    const handleColorChange = (color) => {
        setCarColor(color.hex);
    };

    const handleSave = () => {
        const newRide = {
            id: ride ? ride.id : Date.now(),
            licensePlate,
            carBrand,
            carModel,
            carColor,
        };

        addRide(newRide);

        alert("Ride saved successfully");
        onClose();
    };

    return (
        <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h2>{ride ? "Edit Ride" : "Add New Ride"}</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>License Plate</label>
                <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Car Brand</label>
                <input type="text" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Car Model</label>
                <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>Car Color</label>
                <SketchPicker color={carColor} onChangeComplete={handleColorChange} />
            </div>
            <PrimaryButton text="Save" onClick={handleSave} />
            <DefaultButton text="Cancel" onClick={onClose} style={{ marginLeft: '10px' }} />
        </div>
    );
};

export default AddRideForm;
