import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSonosInfo } from '../../lib/SonosClient';

export const ZoneSelector = (initZone, setZone) => {
  const {isLoading, sonosInfo: zones, getInfo} = useSonosInfo('zones');

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      {isLoading ? "Loading..." : "Select a zone"}
      {isLoading && zones.map((zone) => (
        <Button
          key={zone}
          variant="contained"
          onClick={(e) => {
            setZone(zone);
          }}
        >
          {zone}
          Hi
        </Button>
      ))}
    </Box>
  );
}