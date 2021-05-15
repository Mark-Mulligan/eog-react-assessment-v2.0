import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartProps = {
  data: any;
}

const chartColors = ["#E74C3C", "#566573", "#3498DB", "#58D68D", "#F4D03F", "#C39BD3"];

const Chart3 = ({ data }: ChartProps) => {
  return (
    <div className="chart-wrapper">
    <LineChart data={data} height={650} width={1000} margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 20,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {data.map((d : any, index: number) => (
          <Line isAnimationActive={false} dataKey="value" data={d.data} name={d.name} key={d.name} dot={false} stroke={chartColors[index]}/>
        ))}
      </LineChart>
    </div>
  );
}

export default Chart3;
