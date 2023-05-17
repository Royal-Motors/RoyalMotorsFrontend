import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

import ReactFrappeChart from "react-frappe-charts";

export default function CarMonthlyChart(props) {
  return (
    <ReactFrappeChart
      type="bar"
      colors={["#fff"]}
      axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
      height={250}
      data={{
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
      }}
    />
  );
    }
