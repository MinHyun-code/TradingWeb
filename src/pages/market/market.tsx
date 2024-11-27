import React from "react";
import CoinGrid from "./MyAgGrid";

const Market: React.FC = () => {

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h3>Real-Time Coin Data</h3>
      <CoinGrid/>
    </div>
  );
};

export default Market;
