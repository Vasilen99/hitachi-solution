import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CONTENT = [
  "Cornelius Oswald Fudge,",
  "Ministry of Magic Headquarters,",
  "Underground of Whitehall and the HM Treasury building",
  "London",
  "Great Britain",
];
const Contact = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        "& img": {
          width: { xs: "80%", sm: "60%", lg: "30%" },
          height:{xs:"200px",sm: "auto"},
          margin: "auto",
          display: "flex",
        },
      }}
    >
      <Box
        sx={{
          marginBottom: "2rem",
        }}
      >
        <Link to="/">Back</Link>
      </Box>
      <img src="/contact-us-image.webp" alt="Cornelius Oswald Fudge" />
      {CONTENT.map((line, index) => (
        <Typography
          key={index}
          sx={{ fontStyle: "italic", textAlign: "center" }}
        >
          {line}
        </Typography>
      ))}
    </Box>
  );
};

export default Contact;
