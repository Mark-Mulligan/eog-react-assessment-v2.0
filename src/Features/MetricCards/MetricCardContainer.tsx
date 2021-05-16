import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import MetricCard from './MetricCard';
import Chart3 from '../Chart/Chart3';

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected,
  };
};

const getChartData = (state: IState) => {
  const { oilTemp, waterTemp, flareTemp, injValveOpen, tubingPressure, casingPressure } = state.chartData;
  return {
    oilTemp,
    waterTemp,
    flareTemp,
    injValveOpen,
    tubingPressure,
    casingPressure,
  };
};

const MetricCardContainer = () => {
  const { metricsSelected } = useSelector(getMetricsSelected);
  const rawData = useSelector(getChartData);

  const formattedData: any = [];

  metricsSelected.forEach(metric => {
    formattedData.push({
      name: metric,
      data: rawData[metric],
    });
  });

  return (
    <div className="container-fluid mb-4">
      <div className="row">
        {metricsSelected.length > 0 &&
          metricsSelected.map(metric => {
            return <MetricCard key={metric} title={metric} />;
          })}
      </div>

      {metricsSelected.length > 0 && <Chart3 data={formattedData} />}
    </div>
  );
};

export default MetricCardContainer;
