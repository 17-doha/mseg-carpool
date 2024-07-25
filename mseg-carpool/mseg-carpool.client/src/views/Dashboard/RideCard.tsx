import React, { useState } from "react";
import { Card, CardSection } from "@fluentui/react-cards";
import { Text, IconButton, PrimaryButton, DefaultButton, FontIcon } from "@fluentui/react";
import { SketchPicker } from "react-color";

const RideCard = ({ ride, onEdit, onDelete, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [licensePlate, setLicensePlate] = useState(ride.licensePlate);
    const [carBrand, setCarBrand] = useState(ride.carBrand);
    const [carModel, setCarModel] = useState(ride.carModel);
    const [carColor, setCarColor] = useState(ride.carColor);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const handleSave = () => {
        const updatedRide = { ...ride, licensePlate, carBrand, carModel, carColor };
        onSave(updatedRide);
        setIsEditing(false);
        setIsColorPickerOpen(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleColorChange = (color) => {
        setCarColor(color.hex);
    };

    return (
        <Card style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
            <CardSection>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FontIcon iconName="NumberSymbol" style={{ marginRight: '8px' }} />
                        <Text variant="large">License Plate:</Text>
                    </div>
                    <div>
                        {isEditing ? (
                            <>
                                <PrimaryButton text="Save" onClick={handleSave} />
                                <DefaultButton text="Cancel" onClick={() => { setIsEditing(false); setIsColorPickerOpen(false); }} style={{ marginLeft: '10px' }} />
                            </>
                        ) : (
                            <>
                                <IconButton iconProps={{ iconName: 'Edit' }} title="Edit" ariaLabel="Edit" onClick={handleEditClick} />
                                <IconButton iconProps={{ iconName: 'Delete' }} title="Delete" ariaLabel="Delete" onClick={() => onDelete(ride.id)} />
                            </>
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
                ) : (
                    <Text>{ride.licensePlate}</Text>
                )}

                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <FontIcon iconName="Car" style={{ marginRight: '8px' }} />
                    <Text variant="large">Car Brand:</Text>
                </div>
                {isEditing ? (
                    <input type="text" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
                ) : (
                    <Text>{ride.carBrand}</Text>
                )}

                <div style={{ marginTop: '10px' }}>
                    <Text variant="large">Car Model:</Text>
                </div>
                {isEditing ? (
                    <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
                ) : (
                    <Text>{ride.carModel}</Text>
                )}

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <Text variant="large" style={{ marginRight: '10px' }}>Car Color:</Text>
                </div>
                {isEditing ? (
                    <div>
                        <div style={{ width: '20px', height: '20px', backgroundColor: carColor, border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} />
                        {isColorPickerOpen && (
                            <SketchPicker color={carColor} onChangeComplete={handleColorChange} />
                        )}
                    </div>
                ) : (
                    <div style={{ width: '20px', height: '20px', backgroundColor: ride.carColor, border: '1px solid #ddd' }} />
                )}
            </CardSection>
        </Card>
    );
};

export default RideCard;
