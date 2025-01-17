import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { width } from "../../Layout/Layout";
import { useAppSelector } from "../../Redux/hooks";
const CircleChart = () => {
  const expenseResults = useAppSelector((state) => state.budgedResult);
  console.log(expenseResults);

  const budgetData = [
    {
      name: "Budged",
      value: expenseResults.budget ? expenseResults.budget : 0.1,
    },
    {
      name: "Expenses",
      value: expenseResults.expenses ? expenseResults.expenses : 0.1,
    },
    {
      name: "Remaining",
      value: expenseResults.remaining ? expenseResults.remaining : 0.1,
    },
  ];

  //Changing color function depending on result positive or negative remaining
  const RemainingIsPositive = () => {
    let isPositive = "#54bd3a";
    if (expenseResults.negativeRemainings) {
      if (expenseResults.negativeRemainings < 0) {
        isPositive = "#BA324F";
      }
    }
    return isPositive;
  };
  const COLORS = ["#B084CC", "#27A58C", RemainingIsPositive()];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    payload,
  }: any) => {
    //Calculation for inner label the %
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    //

    //Calculation for the Outer Label
    const cos = Math.cos(-RADIAN * midAngle);
    const sin = Math.sin(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 25) * cos; // X direction far from the circle
    const my = cy + (outerRadius + 30) * sin; // Y direction far from circle
    const ex = mx + (cos >= 0 ? 1 : -1) * 55; // X direction far from the circle
    const ey = my;
    //

    return (
      <g>
        <text
          x={x}
          y={y}
          fontSize="12px"
          fill="white"
          style={{ textShadow: "3px 3px 3px #050505" }}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {payload.value < 1 && payload.value > 0 ? 0 : payload.value}€ (
          {`${(percent * 100).toFixed(0)}%`})
        </text>

        <text
          x={ex}
          y={ey}
          dy={1}
          textAnchor="middle"
          fill={"white"}
          style={{ textShadow: "3px 3px 3px #050505" }}
        >
          {payload.name} ({`${(percent * 100).toFixed(0)}%`})
        </text>
      </g>
    );
  };

  //Custom Tool Tip
  const CustomTooltip = ({ payload, label, active }: any) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: "rgba(7, 7, 7, 0.8)", padding: "25px" }}
        >
          <p className="label">{`${payload[0].name} : ${
            payload[0].value < 1 && payload[0].value > 0 ? 0 : payload[0].value
          }€`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: "100%", height: "500px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Budget Chart</h1>
      <ResponsiveContainer height="100%" width="100%">
        <PieChart width={350} height={300}>
          <Pie
            data={budgetData}
            cx="50%"
            cy="50%"
            isAnimationActive={true}
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={width > 1024 ? 170 : 100}
            innerRadius={width > 1024 ? 100 : 50}
            fill="#8884d8"
            dataKey="value"
          >
            {budgetData.map((entry, index) =>
              entry.value < 0 ? (
                ""
              ) : (
                <Cell
                  stroke={COLORS[index % COLORS.length]}
                  // display={entry.value < 0 ? "none" : "display"}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              )
            )}
          </Pie>
          <Tooltip content={<CustomTooltip />} cursor />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CircleChart;
