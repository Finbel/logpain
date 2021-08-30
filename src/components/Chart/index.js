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
  ReferenceLine,
} from "recharts";
import { Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useLogs from "../../utils/useLogs";
import useMedications from "../../utils/useMedications";

const Chart = () => {
  const { logs } = useLogs();
  const { medications } = useMedications();
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
    <div style={{ position: "relative", left: -350, top: 50 }}>
      <ResponsiveContainer width={1800} height={900}>
        <LineChart
          data={logs}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
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
          <YAxis domain={["auto", "auto"]} />
          <Legend formatter={legendFormatter} height={36} />
          <Line type="monotone" dataKey="erectorSpinae" stroke="#FFB5E8" />
          <Line type="monotone" dataKey="lowerBack" stroke="#FF964F" />
          <Line type="monotone" dataKey="upperBack" stroke="#42E695" />
          <Line type="monotone" dataKey="glutes" stroke="#FF7676" />
          <Line type="monotone" dataKey="mind" stroke="#97A2FF" />
          {medications &&
            medications.map(({ time }) => (
              <ReferenceLine x={time} stroke="#72bcd4" strokeWidth={2} />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
