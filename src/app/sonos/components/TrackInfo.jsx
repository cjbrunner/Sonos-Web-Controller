import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

export const TrackInfo = ({ songInfo, isLoading }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CoverImage>
          <img src={isLoading ? "" : songInfo?.currentTrack.albumArtUri} />
        </CoverImage>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {isLoading ? "Loading..." : songInfo?.currentTrack.artist}
          </Typography>
          <Typography noWrap>
            <b>{isLoading ? "Loading..." : songInfo?.currentTrack.title}</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
            {isLoading ? "Loading..." : songInfo?.currentTrack.album}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
