import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, TextField } from "@mui/material";
import { HogwardsHouseData } from "../../App";
import { useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  animal: "",
  ghost: "",
  commonRoom: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "2rem",
  p: 4,
};

type FormProps = {
  open: boolean;
  handleClose: () => void;
  addNewHouse: (newHouseData: HogwardsHouseData) => void;
};

export default function Form({ open, handleClose, addNewHouse }: FormProps) {
  const [formData, setFormData] =
    useState<HogwardsHouseData>(INITIAL_FORM_DATA);

  const handleChange = (name: string, value: string | null) => {
    setFormData({ ...formData, [name]: value ? value : "" });
  };

  const submitForm = () => {
    addNewHouse(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ textAlign: "center", marginBottom: "2.5rem" }}
          variant="h4"
        >
          {" "}
          Add a new Hogwarts house
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(4,min-content)",
            gap: "1.5rem",
          }}
        >
          <TextField
            id="outlined-basic"
            value={formData.name}
            required
            error={!!formData.name && formData.name.trim().length < 5}
            inputProps={{ maxLength: 20, minLength: 5 }}
            onChange={(event) => handleChange("name", event.target.value)}
            label="Name"
            variant="outlined"
            helperText={
              formData.name && formData.name.trim().length < 5
                ? "Name is required and needs to be between 5 - 20 characters!"
                : " "
            }
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={formData.animal}
            onChange={(event, value) => handleChange("animal", value)}
            options={["Giraffe", "Dolphin", "Armadillo", "Unicorn"]}
            renderInput={(params) => (
              <TextField required {...params} label="Animal" />
            )}
          />
          <TextField
            id="outlined-basic"
            required
            label="Ghost"
            onChange={(event) => handleChange("ghost", event.target.value)}
            error={formData.ghost.toLowerCase().includes("arnold")}
            value={formData.ghost}
            variant="outlined"
            helperText={
              formData.ghost.toLowerCase().includes("arnold")
                ? "Ghost must NOT contain `Arnold`!"
                : " "
            }
          />
          <TextField
            id="outlined-basic"
            label="Common Room"
            onChange={(event) => handleChange("commonRoom", event.target.value)}
            value={formData.commonRoom}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,max-content)",
            gap: "1rem",
            marginTop: "2rem",
            justifyContent: "center",
          }}
        >
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <Button
            disabled={
              formData.name.trim().length < 5 ||
              !formData.animal.trim() ||
              !formData.ghost ||
              formData.ghost.toLowerCase().includes("arnold")
            }
            onClick={() => submitForm()}
            variant="contained"
          >
            Add house
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
