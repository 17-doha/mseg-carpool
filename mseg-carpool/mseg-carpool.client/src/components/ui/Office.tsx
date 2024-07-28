
import { useState } from "react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "./toggle-group"

export function Office() {
  const [Office, setOffice] = useState('')

  return (
    <div>
    <ToggleGroup type="single" onValueChange={setOffice}>
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
    {Office}
    </div>
  )
}

export default Office