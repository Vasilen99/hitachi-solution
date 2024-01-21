import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/table";
import { activeButtonStyle, inactiveButtonStyle } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import Form from "./components/form";
import { Link } from "react-router-dom";
import Loading from "./components/loading";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterAnimalName, setFilterAnimalName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getHogwartsHousesData = async () => {
    const response = await axios.get(
      `https://wizard-world-api.herokuapp.com/Houses`
    );
    const data: HogwardsHouseData[] = response.data;
    const sortedData = data.sort((a, b) => (a.name > b.name ? 1 : -1));
    setHousesData(sortedData);
    setIsLoading(false)
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

  if(isLoading) return <Loading />

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "1880px",
        margin: "auto",
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
            gap: { xs: "1rem", md: "2rem" },
            gridTemplateColumns: {
              xs: "repeat(2,max-content)",
              md: "repeat(4,max-content)",
            },
          }}
        >
          {Array.from(new Set(housesData.map((item) => item.animal))).map((animal) => (
            <Button
              key={animal}
              sx={
                filterAnimalName === animal
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }
              aria-label={`Filter Table By ${animal}`}
              onClick={() => animalButtonClick(animal)}
              variant="contained"
            >
              {animal}
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
      <Box
        sx={{
          marginTop: "2rem",
        }}
      >
        <Link to={"/contact"}>Contact Page</Link>
      </Box>
    </Box>
  );
}

export default App;
