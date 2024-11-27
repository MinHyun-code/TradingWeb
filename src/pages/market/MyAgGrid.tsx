import React, { useState, useEffect, useRef } from "react";
import { useTable } from "react-table";
import useWebSocket from "@/hooks/webSocket/WebSocketGrid";
import {
  ItemData,
  useUpbitMarket,
  useUpbitPrice,
} from "@/hooks/upbit/UpbitApi";
import { throttle } from "lodash"; // lodash throttle import

// 코인 데이터 타입 정의
type CoinData = {
  coin: string;
  trade_price: number;
  trade_volume: number;
  acc_trade_price_24h?: number;
};

const CoinGrid: React.FC = () => {
  const { upbitMarketApi, dataList } = useUpbitMarket();
  const { upbitPriceApi, priceList } = useUpbitPrice();
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  // upbitMarketApi를 한 번만 호출
  useEffect(() => {
    upbitMarketApi();
  }, []);

  useEffect(() => {
    if (dataList && dataList.KRW && dataList.KRW.length > 0) {
      const codes:ItemData[] = dataList.KRW.map((item) => ({
        market: item.market,
        english_name: item.english_name,
        korean_name: item.korean_name,
      }));
      upbitPriceApi(codes);
    }
  }, [dataList]);
  useEffect(() => {
    if (priceList) {
      priceList.map((item) =>
        setCoinData((prevData) => {
          return [
            ...prevData,
            {
              coin: item.market,
              logo: (
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Image"
                    src={`/images/coin/${item.english_name.replace(" ", "-").toLowerCase()}.png`} // JSX에서 템플릿 문자열을 사용
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/no-image.png"; // 에러 발생 시 대체 이미지
                    }}
                  />
                </span>
              ),
              trade_price: item.acc_trade_price,
              trade_volume: item.acc_trade_volume,
              acc_trade_price_24h: item.acc_trade_price_24h,
            },
          ];
        })
      );
    }
    console.log(coinData);
  }, [priceList]);
  
  // WebSocket 데이터 수신
  const { data } = useWebSocket(
    "wss://api.upbit.com/websocket/v1",
    dataList?.KRW
  );

  // 수신된 데이터 처리 함수 (throttle 적용)
  const processData = useRef(
    throttle((newData: any) => {
      try {
        const parsedData =
          typeof newData === "string" ? JSON.parse(newData) : newData;

        if (
          parsedData.code &&
          parsedData.trade_price &&
          parsedData.trade_volume
        ) {
          const updatedData: CoinData = {
            coin: parsedData.code,
            trade_price: parsedData.trade_price,
            trade_volume: parsedData.trade_volume,
          };

          setCoinData((prevData) => {
            const existingCoin = prevData.find(
              (coin) => coin.coin === updatedData.coin
            );

            if (existingCoin) {
              return prevData.map((coin) =>
                coin.coin === updatedData.coin
                  ? {
                      ...coin,
                      trade_price: updatedData.trade_price,
                      trade_volume: updatedData.trade_volume,
                    }
                  : coin
              );
            } else {
              return [...prevData, updatedData];
            }
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket data", error);
      }
    }, 30) // 20ms로 throttle 설정
  ).current;

  // 데이터 수신 시 처리
  useEffect(() => {
    if (data) {
      processData(data); // throttled 함수로 데이터 처리
    }
  }, [data, processData]);

  // 테이블 컬럼 정의
  const columns = React.useMemo(
    () => [
      {
        Header: "Logo",
        accessor: "logo",
      },
      {
        Header: "Coin",
        accessor: "coin",
      },
      {
        Header: "Coin Price",
        accessor: "trade_price",
      },
      {
        Header: "Volume",
        accessor: "trade_volume",
      },
      {
        Header: "24h",
        accessor: "acc_trade_price_24h",
      },
    ],
    []
  );

  // 테이블 설정
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: coinData,
    });

  return (
    <div>
      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinGrid;
