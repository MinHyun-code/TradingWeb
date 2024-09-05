// import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsMore from "highcharts/highcharts-more";
// import HighchartsStock from "highcharts/modules/stock";
// import Annotations from "highcharts/modules/annotations";
// import { useColorMode } from "@chakra-ui/react";

// // 모듈 초기화
// HighchartsMore(Highcharts);
// HighchartsStock(Highcharts);
// Annotations(Highcharts);

// // 데이터 및 옵션 정의
// import { data } from "./api/mocks";
// import { getOhlc, getVolume } from "./converters";
// import { useEffect, useState } from "react";

const Chart = () => {
  // const [ohlc, setOhlc] = useState();
  // const [volumn, setVolumn] = useState();
  // const { colorMode } = useColorMode();

  // // 색상 설정
  // const tooltipTextColor = colorMode === "dark" ? "#ffffff" : "#000000";
  // const tooltipBackgroundColor = colorMode === "dark" ? "#2D3748" : "#ffffff"; // Dark: #2D3748, Light: #ffffff

  // useEffect(() => {
  //   setOhlc(getOhlc(data));
  //   setVolumn(getVolume(data));
  // }, []);

  // const groupingUnits = [
  //   [
  //     "week", // unit name
  //     [1], // allowed multiples
  //   ],
  //   ["month", [1, 2, 3, 4, 6]],
  // ];

  // const getOptions = () => ({
  //   chart: {
  //     type: "candlestick",
  //     backgroundColor: colorMode === "dark" ? "#1a202c" : "#ffffff",
  //     borderColor: colorMode === "dark" ? "#ffffff" : "#1a202c",
  //   },

  //   scrollbar: {
  //     enabled: false, // 스크롤바 비활성화
  //   },
  //   navigator: {
  //     enabled: false, // 네비게이터 비활성화
  //   },

  //   rangeSelector: {
  //     selected: 1,
  //   },

  //   title: {
  //     text: "AAPL Historical",
  //     style: {
  //       color: colorMode === "dark" ? "#ffffff" : "#1a202c",
  //     },
  //   },

  //   yAxis: [
  //     {
  //       labels: {
  //         align: "right",
  //         x: -3,
  //       },
  //       title: {
  //         text: "OHLC",
  //       },
  //       height: "85%",
  //       lineWidth: 2,
  //       gridLineWidth: 1,
  //       gridLineColor: colorMode === "dark" ? "#ffffff" : "#1a202c",
  //       resize: {
  //         enabled: true,
  //       },
  //     },
  //     {
  //       labels: {
  //         align: "right",
  //         x: -3,
  //       },
  //       title: {
  //         text: "Volume",
  //       },
  //       top: "85%",
  //       height: "15%",
  //       offset: 0,
  //       lineWidth: 2,
  //       gridLineWidth: 1,
  //       gridLineColor: colorMode === "dark" ? "#ffffff" : "#1a202c",
  //     },
  //   ],

  //   tooltip: {
  //     useHTML: true,
  //     split: true,
  //     formatter: function () {
  //       return `
  //         <div style="font-size: 14px; color: ${tooltipTextColor}; background-color: ${tooltipBackgroundColor}; border-radius: 8px; padding: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  //           <div style="font-weight: bold; margin-bottom: 10px;">
  //             ${Highcharts.dateFormat("%Y-%m-%d", this.x)}
  //           </div>
  //           <table style="width: 100%; border-collapse: collapse;">
  //             <tr style="border-bottom: 1px solid ${tooltipTextColor};">
  //               <td style="padding: 5px; color: ${tooltipTextColor};">시작:</td>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">${
  //         this.points[0].point.open
  //       }</td>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">최고:</td>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">${
  //         this.points[0].point.high
  //       }</td>
  //             </tr>
  //             <tr>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">마지막:</td>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">${
  //         this.points[0].point.close
  //       }</td>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">최저:</td>
  //               <td style="padding: 5px; color: ${tooltipTextColor};">${
  //         this.points[0].point.low
  //       }</td>
  //             </tr>
  //           </table>
  //         </div>
  //       `;
  //     },
  //   },

  //   plotOptions: {
  //     candlestick: {
  //       color: "#df3e3e", // 하락 캔들의 색상
  //       upColor: "#4375DB", // 상승 캔들의 색상
  //       whiskerLength: 10, // whisker의 길이
  //       lineWidth: 0.5, // 위와 아래의 whisker 선의 두께
  //       groupPadding: 0.1, // 그룹 내 막대 간의 여백
  //       pointPadding: 0.02, // 막대의 padding (막대 사이 간격)
  //       lineColor: "#df3e3e",
  //       upLineColor: "#4375DB",
  //       states: {
  //         hover: {
  //           marker: {
  //             enabled: true,
  //             radius: 5, // 동그라미의 반지름
  //             fillColor: "red", // 동그라미의 색상
  //             lineWidth: 1,
  //             lineColor: "red", // 동그라미의 테두리 색상
  //           },
  //         },
  //       },
  //     },
  //     column: {
  //       color: "#BDBDBD", // 볼륨 컬럼의 색상
  //     },
  //   },
  //   series: [
  //     {
  //       type: "candlestick",
  //       name: "AAPL",
  //       data: ohlc,
  //       dataGrouping: {
  //         units: groupingUnits,
  //       },
  //       lineWidth: 1.3,
  //     },
  //     {
  //       type: "column",
  //       name: "Volume",
  //       data: volumn,
  //       yAxis: 1,
  //       dataGrouping: {
  //         units: groupingUnits,
  //       },
  //     },
  //   ],
  // });

  return (
    <div>
      {/* <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={getOptions()}
      /> */}
    </div>
  );
};

export default Chart;
