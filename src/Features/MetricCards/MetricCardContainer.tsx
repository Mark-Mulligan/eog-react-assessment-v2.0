import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import MetricCard from "./MetricCard";
//import Chart from "../Chart/Chart";
import Chart3 from "../Chart/Chart3";

const getMetricsSelected = (state: IState) => {
  const { metricsSelected } = state.metrics;
  return {
    metricsSelected
  };
};

const getChartData = (state: IState) => {
  const { oilTemp, waterTemp, flareTemp, injValveOpen } = state.chartData;
  return {
    oilTemp,
    waterTemp,
    flareTemp,
    injValveOpen
  }
}

const MetricCardContainer = () => {
  const [currentTime, setCurrentTime] = useState(0);

  const { metricsSelected } = useSelector(getMetricsSelected);
  const rawData = useSelector(getChartData);


 const formattedData: any = [];

 //console.log('raw data', rawData);

 metricsSelected.forEach(metric => {
   formattedData.push({
     name: metric,
     data: rawData[metric]
   })
 })

  console.log(formattedData);

  useEffect(() => {
    //console.log(metricsSelected);
    let now = Date.now();
    setCurrentTime(now)
  }, [metricsSelected]);

  return (
    <div className="container mt-5 mb-5">
      {metricsSelected.length > 0 && metricsSelected.map(metric => {
        return <MetricCard key={metric} title={metric} timeStamp={currentTime} metricReading="250 F" />
      })}

      
      {metricsSelected.length > 0 && <Chart3 data={formattedData} />}
    
    </div>
  );
};

export default MetricCardContainer;