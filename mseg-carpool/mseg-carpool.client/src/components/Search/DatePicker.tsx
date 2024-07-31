import React from 'react';
import { format } from 'date-fns';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover.tsx';
import { Button } from '../ui/button.tsx';
import { Calendar } from '../ui/calendar.tsx';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../../src/lib/utils.ts';

export function DatePicker({ onDateChange, formattedDate, resetDate }: { onDateChange: (date: string) => void; formattedDate: string; resetDate: boolean }) {
    const [date, setDate] = React.useState<Date>();

    const handleDateChange = (selectedDate: Date | undefined): void => {
        if (selectedDate) {
            onDateChange(format(selectedDate, "yyyy-MM-dd"));
            setDate(selectedDate);
        } else {
            onDateChange('');
            setDate(undefined);
        }
    };

    React.useEffect(() => {
        if (resetDate) {
            setDate(undefined);
        }
    }, [resetDate]);

    return (
        <div className="relative">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal border-slate-100",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate: Date | undefined) => handleDateChange(newDate)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}