import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
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
  let lastDateString = getDateString(data1[0].time);
  data1.forEach((log) => {
    const dateString = getDateString(log.time);
    const day = dateString.slice(8, 10);
    const dayGap = Math.abs(Number(day) - Number(lastDay) - 1);
    console.log({ day, lastDay, dayGap });
    if (dayGap > 0) {
      let date = new Date(dateString);
      date.setDate(date.getDate() - 1);
      let missingDate = new Date(date.getTime());
      const lastDate = new Date(lastDateString);
      while (lastDate.getTime() - missingDate.getTime() < 0) {
        date.setDate(date.getDate() - 1);
        dates[getDateString(date.getTime())] = [];
        missingDate = new Date(date.getTime());
      }
    }
    if (dates[dateString]) {
      dates[dateString] = [...dates[dateString], log];
    } else {
      dates[dateString] = [log];
    }
    lastDay = day;
    lastDateString = dateString;
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
    const frequency = value.length;
    const average =
      value.reduce((sum, log) => sum + log.average, 0) / value.length || 0;
    return { time, average, max, min, frequency };
  });
};

const Chart = () => {
  const { logs } = useLogs();
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
  return (
    <div>
      <LineChart
        width={isMobile ? 350 : 1200}
        height={isMobile ? 200 : 500}
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
          domain={["dataMin", "dataMax"]}
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
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          labelFormatter={(unixTime) =>
            `${new Date(unixTime).toLocaleDateString()} - ${new Date(
              unixTime
            ).toLocaleTimeString()}`
          }
        />
        <Legend height={36} />
        <Line
          dot={false}
          yAxisId="left"
          type="monotone"
          dataKey="max"
          stroke="#FF7676"
        />
        <Line
          dot={false}
          yAxisId="left"
          type="monotone"
          dataKey="min"
          stroke="#42E695"
        />
        <Line
          dot={false}
          yAxisId="right"
          type="monotone"
          dataKey="frequency"
          stroke="#6236FF"
        />
        <Line
          dot={false}
          yAxisId="left"
          type="monotone"
          dataKey="average"
          stroke="#FFB5E8"
        />
      </LineChart>
    </div>
  );
};

export default Chart;
