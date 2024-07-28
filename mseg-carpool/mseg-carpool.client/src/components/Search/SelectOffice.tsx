import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface OfficeProps {
  onOfficeChange: (office: string) => void;
}

export function Office({ onOfficeChange }: OfficeProps) {
  const [office, setOffice] = useState("");

  const handleOfficeChange = (value: string) => {
    setOffice(value);
    onOfficeChange(value);
  };

  //    const bkColor = (ride.destination === 'Zamalek' || ride.origin === 'Zamalek') ? 'bg-amber-400' : (ride.destination === 'Smart Village' || ride.origin === 'Smart Village') ? 'bg-lime-500' : 'bg-red-500';
  return (
    <div>
      <ToggleGroup type="single" onValueChange={handleOfficeChange}>
        <ToggleGroupItem value="Zamalek" aria-label="Toggle bold" className="bg-amber-400">
          Zamalek
        </ToggleGroupItem>
        <ToggleGroupItem value="Smart Village" aria-label="Toggle italic" className="bg-lime-500">
          Smart Village
        </ToggleGroupItem>
        <ToggleGroupItem value="5th Settlement" aria-label="Toggle underline" className="bg-red-500">
          5th Settlement
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default Office;