import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import useLogs from "./utils/useLogs";
import PainForm from "./components/PainForm";
import Chart from "./components/Chart";

function App() {
  const { loading } = useLogs();
  const [value, setValue] = useState(0);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <Box p={4}>
        <Typography variant="h3" gutterBottom>
          Log pain
        </Typography>
      </Box>
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Form" />
        <Tab label="Chart" />
      </Tabs>
      {value === 0 && <PainForm />}
      {value === 1 && <Chart />}
    </Container>
  );
}

export default App;
