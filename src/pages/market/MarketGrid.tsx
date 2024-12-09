import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import MarketGridRow from "./MarketGridRow";

const MarketGrid = ({ coinData }) => {
  const Row = React.useMemo(
    () =>
      ({ index, style }) => (
        <MarketGridRow index={index} style={style} initialCoinData={coinData} />
      ),
    [coinData] // coinData가 변경될 때만 재생성
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight - 105); // 화면 높이 상태

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight - 105);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <List
    height={windowHeight} // window.innerHeight 값 적용
      itemCount={coinData.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default MarketGrid;