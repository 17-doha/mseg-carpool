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

  return (
    <div>
      <ToggleGroup type="single" onValueChange={handleOfficeChange}>
        <ToggleGroupItem value="Zamalek" aria-label="Toggle bold" className="bg-[#5da549] bg-[length:20px_10px]">
          Zamalek
        </ToggleGroupItem>
        <ToggleGroupItem value="Smart Village" aria-label="Toggle italic" className="bg-[#d6af2d] bg-[length:20px_100px]">
          Smart Village
        </ToggleGroupItem>
        <ToggleGroupItem value="5th Settlement" aria-label="Toggle underline" className="bg-[#b0594d] bg-[length:20px_10px]">
          5th Settlement
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default Office;