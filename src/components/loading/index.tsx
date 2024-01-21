import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "25%",
        left: "50%",
      }}
    >
      <CircularProgress sx={{
        marginRight:"0.5rem"
      }} />
      ...Loading
    </Box>
  );
};

export default Loading;
