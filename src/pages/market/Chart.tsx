import React, { useEffect, useState } from "react";
import { useUpbitChart, ChartParam } from "@/hooks/upbit/UpbitApi";
import { Box, Flex } from "@chakra-ui/react";
import Layout from "@/components/chart/ChartLayout";
import "@/App.css";
import { dispose, init } from "klinecharts";

type SeriesType = {
  close: number;
  high: number;
  low: number;
  open: number;
  timestamp: number;
  volume: number;
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
    const chart = init("update-k-line");
    console.log("ChartList updated:", dataList); // dataList가 업데이트될 때마다 로그에 찍음
    // 초기화
    setSeriesData([]);
    setSeriesDataLinear([]);
    if (dataList != undefined) {
      for (const item of dataList) {
        setSeriesData((prevData) => [
          {
            close: item.trade_price,
            high: item.high_price,
            low: item.low_price,
            open: item.opening_price,
            timestamp: item.timestamp,
            volume: item.candle_acc_trade_volume,
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
      chart?.applyNewData(seriesData);
      dispose("update-k-line");
    }
  }, [dataList]);

  return (
    <Flex>
      <Flex flexDirection={"column"} w="50vw">
        <Layout title="实时更新">
          <div id="update-k-line" className="k-line-chart" />
        </Layout>
      </Flex>
    </Flex>
  );
};

export default ApexChart;
