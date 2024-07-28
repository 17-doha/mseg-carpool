import React, { useState, ChangeEvent, FormEvent } from 'react';

import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '../ui/drawer.tsx';
import { Button } from '../ui/button';
import { Office } from './SelectOffice.tsx';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DatePicker } from './DatePicker.tsx';
// import { TimeSelect } from './TimeSelect.tsx';


interface InputWithLabelProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithLabel(props: InputWithLabelProps) {
    const { label, value, onChange } = props;

    return (
        <div className="grid w-full max-w-sm gap-1">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <Input className='h-4 mt-1' type="text" id={label.toLowerCase()} placeholder={label} value={value} onChange={onChange} />
        </div>
    )
}

interface FilterSidebarProps {
    onFilterChange: (filters: { formattedDate: string; selectedTime: string; origin: string; destination: string }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');

    const handleOriginChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setOrigin(event.target.value);
    };

    const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setDestination(event.target.value);
    };

    const handleDateChange = (date: string): void => {
        const formattedDate = new Date(date).toISOString().slice(0, 10);
        setFormattedDate(formattedDate); 
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onFilterChange({ formattedDate, selectedTime, origin, destination });
    };

    const handleClearFilters = (): void => {
        setFormattedDate('');
        setSelectedTime('');
        setOrigin('');
        setDestination('');
    };

    const timeOptions = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
        "10:00 PM",
    ];

    return (
        <div>
            <Drawer>
                <DrawerTrigger className="hover:bg-blue-100 text-gray-700 font-bold py-2 px-4 rounded">🔍 Filters</DrawerTrigger>
                <DrawerContent className="p-4 bg-slate-200">
                    <DrawerHeader className="mb-4">
                        <DrawerTitle className="text-md font-semibold">Filters</DrawerTitle>
                        {/* <DrawerDescription className="text-sm text-gray-500">Filter rides based on your preferences.</DrawerDescription> */}
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date:</label>
                            <DatePicker onDateChange={handleDateChange} formattedDate={formattedDate} />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <select value={selectedTime} onChange={handleTimeChange} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select a time</option>
                                {timeOptions.map((timeOption) => (
                                    <option key={timeOption} value={timeOption}>
                                        {timeOption}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        {/* <div>
                            {<TimeSelect onSelectTime={(selectedTime) => setSelectedTime(selectedTime)} />}
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Going to:</label>
                            <InputWithLabel label="" value={destination} onChange={handleDestinationChange} />
                            <Office onOfficeChange={(value) => setDestination(value)} />
                        </div>
                        <br></br>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Leaving from:</label>
                            <InputWithLabel label="" value={origin} onChange={handleOriginChange} />
                            <Office onOfficeChange={(value) => setOrigin(value)} />
                        </div>
                        <DrawerFooter className="">
                            <Button variant="default" type="submit">Submit</Button>
                            <Button variant="outline" onClick={handleClearFilters}>Clear</Button>
                            {/* <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose> */}
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default FilterSidebar;
