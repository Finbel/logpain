import React, { useState } from "react";
import { Box, Grid, useMediaQuery, Button, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMedications from "../../utils/useMedications";

const date = new Date();
date.setHours(date.getHours() + 2);

const PainForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const [time, setTime] = useState(date.toISOString().slice(0, 16));

  const { addMedication } = useMedications();

  return (
    <Box p={4} width={"2/3"}>
      <Grid
        container
        spacing={isMobile ? 1 : 4}
        justifyContent={isMobile ? "center" : undefined}
      >
        <Grid item xs={12}>
          <TextField
            id="datetime-local"
            label="Log time"
            type="datetime-local"
            defaultValue={time}
            onChange={(event) => setTime(event.target.value)}
            width="200px"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box m={2}>
            <Button
              onClick={() => {
                addMedication({ time });
              }}
              variant="contained"
              color="primary"
            >
              Log medication
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PainForm;
