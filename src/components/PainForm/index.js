import React, { useState } from "react";
import { Box, Grid, useMediaQuery, Button, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useLogs from "../../utils/useLogs";
import Slider from "../Slider";

const date = new Date();
date.setHours(date.getHours() + 2);

const getDefaultLog = () => ({
  upperBack: 0,
  erectorSpinae: 0,
  lowerBack: 0,
  glutes: 0,
  mind: 0,
  time: date.toISOString().slice(0, 16),
});

const PainForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const [log, setLog] = useState(getDefaultLog());

  const { addLog } = useLogs();

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
      </Grid>
    </Box>
  );
};

export default PainForm;
