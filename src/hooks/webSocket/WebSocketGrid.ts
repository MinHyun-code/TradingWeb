import { useState, useEffect, useRef } from "react";
import { ItemData } from "../upbit/UpbitApi";

export type CoinData = {
  market: string;
  type: string;
  code: string;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  trade_price: number;
  trade_volume: number;
  ask_bid: string;
};

const useWebSocketGrid = (url: string, dataList: ItemData[]) => {
  const [data, setData] = useState<CoinData[]>([]);
  const wsRef = useRef<WebSocket | null>(null); // WebSocket 인스턴스를 저장하여 재연결 방지
  const previousDataListRef = useRef<ItemData[]>([]); // 이전 dataList를 저장하여 불필요한 재연결 방지
  const previousDataRef = useRef<CoinData[]>([]); // 이전 데이터 값을 추적하여 중복 업데이트 방지

  // dataList가 변경되었을 때만 WebSocket 연결
  useEffect(() => {
    console.log(dataList);
    // dataList가 비어있으면 WebSocket 연결을 만들지 않음
    if (!dataList || dataList.length === 0) return;

    // 이전 dataList와 현재 dataList를 비교하여 변경된 경우에만 WebSocket 연결 생성
    if (JSON.stringify(previousDataListRef.current) !== JSON.stringify(dataList)) {
      if (wsRef.current) {
        wsRef.current.close(); // 기존 WebSocket 연결이 있으면 종료
      }

      const ws = new WebSocket(url);
      wsRef.current = ws; // 웹소켓 인스턴스 저장

      ws.onopen = () => {
        console.log("WebSocket connected");

        // dataList를 기반으로 WebSocket 메시지 전송
        const codes = dataList.map((item) => item.market);
        const message = JSON.stringify([
          { ticket: "test" },
          { type: "trade", codes },
        ]);
        ws.send(message);
      };

      ws.onmessage = (event) => {
        try {
          // WebSocket에서 받은 데이터가 Blob 형식일 경우 텍스트로 변환 후 파싱
          let messageData = event.data;

          if (messageData instanceof Blob) {
            messageData = messageData.text(); // Blob을 텍스트로 변환
          }

          messageData.then((textData:string) => {
            const parsedData = JSON.parse(textData); // 텍스트 데이터를 JSON으로 파싱

            // 이전 데이터와 비교하여 변경된 경우에만 setData 호출
            if (JSON.stringify(parsedData) !== JSON.stringify(previousDataRef.current)) {
              setData(parsedData); // 데이터가 변경된 경우에만 상태 업데이트
              previousDataRef.current = parsedData; // 이전 데이터를 현재 데이터로 갱신
            }
          });
        } catch (error) {
          console.error("Error parsing WebSocket data", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      // 현재 dataList 값을 이전 상태로 저장
      previousDataListRef.current = dataList;

      // 웹소켓 연결 해제 시 종료
      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [url, dataList]); // dataList가 변경될 때만 useEffect 실행

  return { data };
};

export default useWebSocketGrid;
