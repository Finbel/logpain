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
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useLogs from "../../utils/useLogs";

const getValue = (log, key) => {
  return Number(log?.[key]) || 0;
};

const getDateString = (time) => {
  const date = new Date(time);
  return date.toISOString().slice(0, 10);
};

const parseLogs = (logs) => {
  const data1 = logs.map((log) => ({
    average:
      (getValue(log, "erectorSpinae") +
        getValue(log, "lowerBack") +
        getValue(log, "upperBack") +
        getValue(log, "glutes")) /
      4,
    ...log,
  }));
  const dates = {};
  let lastDay = getDateString(data1[0].time).slice(8, 10);
  data1.forEach((log) => {
    const dateString = getDateString(log.time);
    const day = dateString.slice(8, 10);
    const dayGap = Number(day) - Number(lastDay) - 1;
    if (dayGap > 0) {
      for (let index = 0; index < dayGap; index++) {
        const missingDateString = `${dateString.slice(0, 8)}${
          day - (index + 1)
        }`;
        dates[missingDateString] = [];
      }
    }
    if (dates[dateString]) {
      dates[dateString] = [...dates[dateString], log];
    } else {
      dates[dateString] = [log];
    }
    lastDay = day;
  });
  return Object.entries(dates).map(([key, value]) => {
    const time = new Date(key).getTime();
    let max = Math.max(...value.map((log) => log.average));
    let min = Math.min(...value.map((log) => log.average));
    if (max < 0) {
      max = 0;
    }
    if (min > 10) {
      min = 0;
    }
    const average =
      value.reduce((sum, log) => sum + log.average, 0) / value.length || 0;
    return { time, average, max, min };
  });
};

const Chart = () => {
  const { logs } = useLogs();
  // const { medications } = useMedications();
  const data = parseLogs(logs);
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
    <div>
      <ResponsiveContainer>
        <LineChart
          data={data}
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
          <Line type="monotone" dataKey="average" stroke="#FFB5E8" />
          {/* <Line type="monotone" dataKey="lowerBack" stroke="#FF964F" />
          
          <Line type="monotone" dataKey="glutes" stroke="#FF7676" />*/}
          <Line type="monotone" dataKey="max" stroke="#FF7676" />
          <Line type="monotone" dataKey="min" stroke="#42E695" />
          {/* {medications &&
            medications.map(({ time }) => (
              <ReferenceLine x={time} stroke="#72bcd4" strokeWidth={2} />
            ))} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
