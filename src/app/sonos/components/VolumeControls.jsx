"use client"

import { useState } from "react";
import { Stack, Slider } from "@mui/material";
import { VolumeDownRounded, VolumeUpRounded } from "@mui/icons-material/";
import { useTheme } from "@mui/system";
import { handleInput } from "../../lib/SonosClient";


export const VolumeControls = () => {
  const theme = useTheme();
  const [volume, setVolume] = useState(10);
  const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const handleSetVolume = (event, newValue) => {
    setVolume(newValue)
  }
  const handleCallVolume = (event, newValue) => {
    handleInput({zone: 'office', operation: 'volume', param: newValue})
  }

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1, px: 1 }}
      alignItems="center"
    >
      <VolumeDownRounded htmlColor={lightIconColor} />
      <Slider
        aria-label="Volume"
        defaultValue={1}
        value={volume}
        onChange={handleSetVolume}
        onChangeCommitted={handleCallVolume}
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-thumb": {
            width: 24,
            height: 24,
            backgroundColor: "#fff",
            "&::before": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              boxShadow: "none",
            },
          },
        }}
      />
      <VolumeUpRounded htmlColor={lightIconColor} />
    </Stack>
  );
}
