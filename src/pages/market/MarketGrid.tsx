import React from "react";
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

  return (
    <List
      height={500}
      itemCount={coinData.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default MarketGrid;