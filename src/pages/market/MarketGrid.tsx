import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import MarketGridRow from "./MarketGridRow";
import { CoinData } from "@/hooks/upbit/UpbitApi";

// props의 타입을 정의합니다.
interface ParentComponentProps {
  coinData: CoinData[];
}

interface rowProps {
    index: number;
    style: React.CSSProperties;
}

const MarketGrid = ({ coinData }:ParentComponentProps) => {
  const Row = React.useMemo(
    () =>
      ({ index, style }:rowProps) => (
        <MarketGridRow index={index} style={style} initialCoinData={coinData} />
      ),
    [coinData] // coinData에 의존
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight - 220); // 화면 높이 상태

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight - 220);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <List
      width="100%"
      height={windowHeight} // window.innerHeight 값 적용
      itemCount={coinData.length}
      itemSize={60}
      className="w-full border rounded-lg"
    >
      {Row}
    </List>
  );
};

export default MarketGrid;
