import React, { useEffect } from "react";
import { useUpbitMarket } from "@/hooks/upbit/UpbitApi";
import { Button } from "@/components/ui/button";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Market = () => {
  const { upbitMarketApi, dataList } = useUpbitMarket();

  const columns = [
    { key: "market", name: "market" },
    { key: "korean_name", name: "korean_name" },
    { key: "english_name", name: "english_name" },
  ];

  useEffect(() => {
    upbitMarketApi();
  }, []);

  useEffect(() => {
    console.log("DataList updated:", dataList); // dataList가 업데이트될 때마다 로그에 찍음
  }, [dataList]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Chart"); // '/market'으로 이동
  };

  // 데이터가 없거나 로딩 중일 때의 처리
  if (
    !dataList ||
    (!dataList.KRW.length && !dataList.BTC.length && !dataList.USDT.length)
  ) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }

  return (
    <>
      <Button onClick={handleButtonClick}>차트 이동(USDT-BTC)</Button>
      <div className="flex">
        <div>
          <h1>KRW</h1>
          <DataGrid columns={columns} rows={dataList.KRW} />
        </div>
        <div>
          <h1>BTC</h1>
          <DataGrid columns={columns} rows={dataList.BTC} />
        </div>
        <div>
          <h1>USDT</h1>
          <DataGrid columns={columns} rows={dataList.USDT} />
        </div>
      </div>
    </>
  );
};

export default Market;
