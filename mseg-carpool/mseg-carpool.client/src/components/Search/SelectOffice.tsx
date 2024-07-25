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
        <ToggleGroupItem value="Zamalek" aria-label="Toggle bold">
          Zamalek
        </ToggleGroupItem>
        <ToggleGroupItem value="Smart Village" aria-label="Toggle italic">
          Smart Village
        </ToggleGroupItem>
        <ToggleGroupItem value="5th Settlement" aria-label="Toggle underline">
          5th Settlement
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default Office;