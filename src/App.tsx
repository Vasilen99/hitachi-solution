import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/table";
import { activeButtonStyle, inactiveButtonStyle } from "./styles";
import AddIcon from "@mui/icons-material/Add";

export type HogwardsHouseData = {
  id: string;
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
  heads: [
    {
      id: string;
      firstName: string;
      lastName: string;
    }
  ];
  traits: [
    {
      id: string;
      name: string;
    }
  ];
};

function App() {
  const [housesData, setHousesData] = useState<HogwardsHouseData[]>([]);
  const [filterAnimalName, setFilterAnimalName] = useState<string>("");

  const getHogwartsHousesData = async () => {
    const { data } = await axios.get(
      `https://wizard-world-api.herokuapp.com/Houses`
    );
    setHousesData(data);
  };

  useEffect(() => {
    getHogwartsHousesData();
  }, []);

  const animalButtonClick = (animalName: string) => {
    if (animalName === filterAnimalName) {
      return setFilterAnimalName("");
    }
    return setFilterAnimalName(animalName);
  };

  const returnFilteredData = () => {
    if (filterAnimalName) {
      return housesData.filter((data) => data.animal === filterAnimalName);
    }
    return housesData;
  };

  return (
    <Box
      sx={{
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Typography
          sx={{
            marginRight: "1rem",
          }}
        >
          Filter By Animal:
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(4,max-content)",
          }}
        >
          {housesData.sort().map((house) => (
            <Button
              key={house.id}
              sx={
                filterAnimalName === house.animal
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }
              aria-label={`Filter Table By ${house.animal}`}
              onClick={() => animalButtonClick(house.animal)}
              variant="contained"
            >
              {house.animal}
            </Button>
          ))}
        </Box>
      </Box>
      <TableComponent data={returnFilteredData()} />
      <Box>
        <Button variant="outlined" startIcon={<AddIcon />}>Add new House</Button>
      </Box>
    </Box>
  );
}

export default App;
