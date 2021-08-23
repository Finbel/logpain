import React from "react";
import {
  ResponsiveContainer,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useLogs from "../../utils/useLogs";

const ONE_DAY = 24 * 60 * 60 * 1000;

const getStartTime = (logs) => {
  const startTime = logs[0].time;
  const startDate = new Date(startTime);
  startDate.setHours(2, 0, 0, 0);
  return startDate.getTime();
};

const getEndTime = (logs) => {
  const endTime = logs[logs.length - 1].time;
  const endDate = new Date(endTime + ONE_DAY);
  endDate.setHours(2, 0, 0, 0);
  return endDate.getTime();
};

const Chart = () => {
  const { logs } = useLogs();
  logs.sort((a, b) => {
    if (a < b) return -1;
    if (b > a) return 1;
    return 0;
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const legendFormatter = (value, entry, index) => {
    switch (value) {
      case "erectorSpinae":
        return <span>Erector Spinae</span>;
      case "lowerBack":
        return <span>Lower Back</span>;
      case "upperBack":
        return <span>Upper Back</span>;
      case "glutes":
        return <span>Glutes</span>;
      case "mind":
        return <span>Mind</span>;
      default:
        return;
    }
  };

  const tooltipFormatter = (value, entry, index) => {
    switch (entry) {
      case "erectorSpinae":
        return [value, "Erector Spinae"];
      case "lowerBack":
        return [value, "Lower Back"];
      case "upperBack":
        return [value, "Upper Back"];
      case "glutes":
        return [value, "Glutes"];
      case "mind":
        return [value, "Mind"];
      default:
        return;
    }
  };

  return (
    <Box p={4} width={isMobile ? "3/4" : "2/3"}>
      <ResponsiveContainer
        width={isMobile ? "100%" : "80%"}
        height={isMobile ? 200 : 300}
      >
        <LineChart
          data={logs}
          margin={{
            top: 5,
            right: isMobile ? 0 : 30,
            left: isMobile ? 0 : 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            domain={[getStartTime(logs), getEndTime(logs)]}
            name="Time"
            angle={isMobile ? -45 : 0}
            tickFormatter={(unixTime) => {
              const timeString = new Date(unixTime).toISOString();
              if (isMobile) {
                return timeString.slice(5, 10);
              }
              return timeString.slice(2, 10);
            }}
            type="number"
          />
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={(unixTime) =>
              `${new Date(unixTime).toLocaleDateString()} - ${new Date(
                unixTime
              ).toLocaleTimeString()}`
            }
          />
          <YAxis domain={[0, 5]} />
          <Legend formatter={legendFormatter} />
          <Line type="monotone" dataKey="erectorSpinae" stroke="#FFB5E8" />
          <Line type="monotone" dataKey="lowerBack" stroke="#FF964F" />
          <Line type="monotone" dataKey="upperBack" stroke="#42E695" />
          <Line type="monotone" dataKey="glutes" stroke="#FF7676" />
          <Line type="monotone" dataKey="mind" stroke="#97A2FF" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
