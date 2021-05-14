import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


type ChartProps = {
  data: any;
}

const Chart3 = ({ data }: ChartProps) => {
  return (
    <div>
      <LineChart width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {data.map((d : any) => (
          <Line dataKey="value" data={d.data} name={d.name} key={d.name} />
        ))}
      </LineChart>
    </div>
  );
}

export default Chart3;
