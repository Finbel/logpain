import React, { useState } from "react";
import {
  Box,
  Grid,
  useMediaQuery,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useLogs from "../../utils/useLogs";
import Slider from "../Slider";
import usePositions from "../../utils/usePositions";

const date = new Date();
date.setHours(date.getHours() + 2);

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
}));

const getDefaultLog = () => ({
  upperBack: 0,
  erectorSpinae: 0,
  lowerBack: 0,
  glutes: 0,
  mind: 0,
  position: "",
  time: date.toISOString().slice(0, 16),
});

const PainForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const classes = useStyles();

  const [log, setLog] = useState(getDefaultLog());

  const { addLog } = useLogs();
  const { positions, addPosition } = usePositions();

  return (
    <Box p={4} width={"2/3"}>
      <Grid
        container
        spacing={isMobile ? 1 : 4}
        justifyContent={isMobile ? "center" : undefined}
      >
        <Grid item xs={12}>
          <Slider
            label="Upper back"
            value={log.upperBack}
            setValue={(upperBack) => setLog({ ...log, upperBack })}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            label="Erector Spinae"
            value={log.erectorSpinae}
            setValue={(erectorSpinae) => setLog({ ...log, erectorSpinae })}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            label="Lower back"
            value={log.lowerBack}
            setValue={(lowerBack) => setLog({ ...log, lowerBack })}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            label="Glutes"
            value={log.glutes}
            setValue={(glutes) => setLog({ ...log, glutes })}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            label="Mind"
            value={log.mind}
            setValue={(mind) => setLog({ ...log, mind })}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Position</InputLabel>
            <Select
              native
              value={log.position}
              onChange={(event) => {
                console.log(event.target.value);
                setLog({ ...log, position: event.target.value });
              }}
              inputProps={{
                name: "position",
                id: "position-native-simple",
              }}
            >
              {!!positions &&
                positions.map(({ id, position }) => (
                  <option key={id} value={position}>
                    {position}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="datetime-local"
            label="Log time"
            type="datetime-local"
            defaultValue={log.time}
            onChange={(event) => setLog({ ...log, time: event.target.value })}
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
                addLog(log);
                setLog(getDefaultLog());
              }}
              variant="contained"
              color="primary"
            >
              Save log
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="position"
            label="Position"
            type="text"
            defaultValue={""}
            onChange={(event) => {
              console.log({ onChange: event.target.value });
              setLog({ ...log, position: event.target.value });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box m={1}>
            <Button
              onClick={() => {
                addPosition({ position: log.position });
              }}
              variant="contained"
              color="primary"
            >
              Add position
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PainForm;
