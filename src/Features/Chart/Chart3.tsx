import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';

type ChartProps = {
  data: any;
};

const getSelectedMetrics = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected,
  };
};

const convertToDate = (milliseconds: number) => {
  const date = new Date(milliseconds);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <div className="custom-tooltip border">
        <h6>{convertToDate(payload[0].payload.at)}</h6>
        <div className="tooltip-readings">
          {payload.map((item: any) => {
            {
              console.log(item);
            }
            return (
              <div key={item.name}>
                <p>
                  {item.name}: {item.payload.value} {item.payload.unit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

const chartColors = ['#E74C3C', '#566573', '#3498DB', '#58D68D', '#F4D03F', '#C39BD3'];

const Chart3 = ({ data }: ChartProps) => {
  const { metricsSelected } = useSelector(getSelectedMetrics);
  const metrics: any = metricsSelected;

  return (
    <div className="chart-wrapper">
      <LineChart
        data={data}
        height={650}
        width={1000}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />

        {metrics.includes('injValveOpen') ? <YAxis yAxisId="percent" label="%" dataKey="value" /> : null}
        {metrics.includes('tubingPressure') || metrics.includes('casingPressure') ? (
          <YAxis yAxisId="psi" label="PSI" dataKey="value" />
        ) : null}
        {metrics.includes('oilTemp') || metrics.includes('waterTemp') || metrics.includes('flareTemp') ? (
          <YAxis yAxisId="F" label="F" dataKey="value" />
        ) : null}

        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {data.map((d: any, index: number) => {
          if (d.name === 'oilTemp' || d.name === 'waterTemp' || d.name === 'flareTemp') {
            return (
              <Line
                isAnimationActive={false}
                yAxisId="F"
                dataKey="value"
                data={d.data}
                name={d.name}
                key={d.name}
                dot={false}
                stroke={chartColors[index]}
              />
            );
          }
          if (d.name === 'tubingPressure' || d.name === 'casingPressure') {
            return (
              <Line
                isAnimationActive={false}
                yAxisId="psi"
                dataKey="value"
                data={d.data}
                name={d.name}
                key={d.name}
                dot={false}
                stroke={chartColors[index]}
              />
            );
          }

          if (d.name === 'injValveOpen') {
            return (
              <Line
                isAnimationActive={false}
                yAxisId="percent"
                dataKey="value"
                data={d.data}
                name={d.name}
                key={d.name}
                dot={false}
                stroke={chartColors[index]}
              />
            );
          }
        })}
      </LineChart>
    </div>
  );
};

export default Chart3;
