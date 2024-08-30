import React, { useEffect, useState } from "react";
import { useUpbitChart, ChartParam } from "@/hooks/upbit/UpbitApi";
import { Box, Flex } from "@chakra-ui/react";
import Chart from "@/components/chart/Chart";
import "@/App.css";

type SeriesType = {
  x: Date;
  y: number[];
};

type SeriesLinearType = {
  x: Date;
  y: number;
};

const ApexChart: React.FC = () => {
  const { upbitChartApi, dataList } = useUpbitChart();
  const [param, setParam] = useState<ChartParam>();
  const [seriesData, setSeriesData] = useState<SeriesType[]>([]);
  const [seriesDataLinear, setSeriesDataLinear] = useState<SeriesLinearType[]>(
    []
  );

  useEffect(() => {
    setParam({
      convertingPriceUnit: "KRW",
      count: 60,
      market: "KRW-BTC",
      to: null,
      type: "minutes",
      unit: 1,
    });
    if (param != undefined) {
      upbitChartApi(param);
    }
  }, []);

  useEffect(() => {
    console.log("ChartList updated:", dataList); // dataList가 업데이트될 때마다 로그에 찍음
    // 초기화
    setSeriesData([]);
    setSeriesDataLinear([]);
    if (dataList != undefined) {
      for (const item of dataList) {
        setSeriesData((prevData) => [
          {
            x: item.candle_date_time_kst,
            y: [
              item.opening_price,
              item.high_price,
              item.low_price,
              item.trade_price,
            ],
          },
          ...prevData,
        ]);
        setSeriesDataLinear((prevData) => [
          {
            x: item.candle_date_time_kst,
            y: item.candle_acc_trade_volume,
          },
          ...prevData,
        ]);
      }
    }
  }, [dataList]);

  return (
    <Flex>
      <Chart></Chart>
    </Flex>
  );
};

export default ApexChart;
