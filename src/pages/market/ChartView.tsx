import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import useWebSocket from "@/hooks/webSocket/WebSocketChart";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip
);

const MultiChart: React.FC = () => {
  const { data } = useWebSocket("wss://api.upbit.com/websocket/v1");

  // 수신된 데이터를 시세와 거래량에 맞게 각각 매핑
  const chartDataPrice = {
    labels: data.map((item: any) =>
      new Date(item.trade_timestamp).toLocaleTimeString()
    ), // timestamp를 시간 형식으로 변환
    datasets: [
      {
        type: "line", // 선 그래프 (시세)
        label: "Coin Price",
        data: data.map((item: any) => item.trade_price),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        yAxisID: "y-axis-price",
        tension: 0.1,
      },
    ],
  };

  const chartDataVolume = {
    labels: data.map((item: any) =>
      new Date(item.trade_timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        type: "bar", // 막대 그래프 (거래량)
        label: "Volume",
        data: data.map((item: any) => item.trade_volume),
        backgroundColor: "rgba(192,75,75,0.8)",
        yAxisID: "y-axis-volume",
      },
    ],
  };

  const optionsPrice = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      "y-axis-price": {
        type: "linear",
        position: "left", // 왼쪽 y축 (시세)
        title: {
          display: true,
          text: "Price (KRW)",
        },
      },
    },
  };

  const optionsVolume = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      "y-axis-volume": {
        type: "linear",
        position: "left", // 왼쪽 y축 (거래량)
        title: {
          display: true,
          text: "Volume",
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <div style={{ width: "800px", height: "500px" }}>
        <h3>Coin Price</h3>
        <Line data={chartDataPrice} options={optionsPrice} />
      </div>
      <div style={{ width: "800px", height: "500px" }}>
        <h3>Volume</h3>
        <Bar data={chartDataVolume} options={optionsVolume} />
      </div>
    </div>
  );
};

export default MultiChart;
