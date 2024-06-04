"use client"

import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  PlayArrowRounded,
  PauseRounded,
  FastForwardRounded,
  FastRewindRounded,
} from "@mui/icons-material/";
import { useTheme } from "@mui/system";

export const TrackControls = ({ isLoading, songInfo, handleInput }) => {
  useEffect(() => {
    if (!isLoading) {
      setPaused(songInfo?.playbackState !== "PLAYING");
    }
  }, [isLoading, songInfo]);

  const [paused, setPaused] = useState();
  const theme = useTheme();
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: -1,
      }}
    >
      <IconButton
        aria-label="previous song"
        onClick={(e) => {
          handleInput({ zone: "office", operation: "previous", param: "" }, e);
        }}
      >
        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
      </IconButton>
      <IconButton
        aria-label={paused ? "play" : "pause"}
        onClick={(e) => {
          handleInput({ zone: "office", operation: "playpause", param: "" }, e);
          setPaused((prevPause) => !prevPause);
        }}
      >
        {paused ? (
          <PlayArrowRounded
            sx={{ fontSize: "4rem" }}
            htmlColor={mainIconColor}
          />
        ) : (
          <PauseRounded sx={{ fontSize: "4rem" }} htmlColor={mainIconColor} />
        )}
      </IconButton>
      <IconButton
        aria-label="next song"
        onClick={(e) =>
          handleInput({ zone: "office", operation: "next", param: "" }, e)
        }
      >
        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
      </IconButton>
    </Box>
  );
};
