import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import MetricCard from "./MetricCard";
import Chart from "../Chart/Chart";

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected
  };
};

const getChartData = (state: IState) => {
  const { oilChartData } = state.chartData;
  return {
    oilChartData
  }
}

const MetricCardContainer = () => {
  const [currentTime, setCurrentTime] = useState(0);

  const { metricsSelected } = useSelector(getMetricsSelected);
  const { oilChartData } = useSelector(getChartData);

  console.log('oilChartData', oilChartData);

  useEffect(() => {
    console.log(metricsSelected);
    let now = Date.now();
    setCurrentTime(now)
  }, [metricsSelected]);

  return (
    <div className="container mt-5 mb-5">
      {metricsSelected.length > 0 && metricsSelected.map(metric => {
        return <MetricCard key={metric} title={metric} timeStamp={currentTime} metricReading="250 F" />
      })}

      
      {oilChartData.length > 0 && <Chart data={oilChartData}/>}
    
    </div>
  );
};

export default MetricCardContainer;