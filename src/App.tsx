import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/table";
import { activeButtonStyle, inactiveButtonStyle } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import Form from "./components/form";

export type HogwardsHouseData = {
  id?: string;
  name: string;
  houseColours?: string;
  founder?: string;
  animal: string;
  element?: string;
  ghost: string;
  commonRoom?: string;
  heads?: [
    {
      id: string;
      firstName: string;
      lastName: string;
    }
  ];
  traits?: [
    {
      id: string;
      name: string;
    }
  ];
};

function App() {
  const [housesData, setHousesData] = useState<HogwardsHouseData[]>([]);
  const [filterAnimalName, setFilterAnimalName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const adNewHouse = (newHouseData: HogwardsHouseData) => {
    setHousesData([...housesData, newHouseData]);
    setIsModalOpen(false);
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add new House
        </Button>
      </Box>
      <Form
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        addNewHouse={(newHouseData) => adNewHouse(newHouseData)}
      />
    </Box>
  );
}

export default App;
