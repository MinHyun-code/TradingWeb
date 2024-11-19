import React, { useEffect, useState } from "react";
import { useUpbitMarket, ItemData } from "@/hooks/upbit/UpbitApi";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

// props의 타입을 정의합니다.
interface ParentComponentProps {
  onSearchSelect: (market: string) => void; // onSearchSelect 문자열을 인수로 받도록 타입 정의
  onAddSelect: (market: string) => void; // onAddSelect 문자열을 인수로 받도록 타입 정의
  type: string;
}

const CodeList = ({
  onSearchSelect,
  onAddSelect,
  type,
}: ParentComponentProps) => {
  const { upbitMarketApi, dataList } = useUpbitMarket();
  const [codeType, setCodeType] = useState("");
  const [rowData, setRowData] = useState<ItemData[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setRowData(dataList?.KRW ?? []);
  }, [dataList]);

  useEffect(() => {
    upbitMarketApi();
  }, []);

  useEffect(() => {
    if (codeType === "KRW") {
      setRowData(dataList?.KRW ?? []);
    } else if (codeType === "BTC") {
      setRowData(dataList?.BTC ?? []);
    } else if (codeType === "USDT") {
      setRowData(dataList?.USDT ?? []);
    }
  }, [codeType]);

  return (
    <div className="flex w-full flex-col justify-center space-y-6 pt-8 pb-3">
      <div className="flex w-full justify-around">
        <Button className="w-3/12" onClick={() => setCodeType("KRW")}>
          KRW
        </Button>
        <Button className="w-3/12" onClick={() => setCodeType("BTC")}>
          BTC
        </Button>
        <Button className="w-3/12" onClick={() => setCodeType("USDT")}>
          USDT
        </Button>
      </div>
      <div className="mx-10">
        <Input
          placeholder="검색"
          className="mb-5"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="h-96 overflow-auto p-3">
        <div className="grid gap-3">
          {rowData.map((item, index) => {
            if (
              search != "" &&
              !item.english_name.toLowerCase().includes(search.toLowerCase()) &&
              !item.market.toLowerCase().includes(search.toLowerCase())
            ) {
              return null;
            }

            return (
              <div
                key={index}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img
                      className="aspect-square h-full w-full"
                      alt="Image"
                      src={`/images/coin/${item.english_name
                        .replace(" ", "-")
                        .toLowerCase()}.png`}
                      onError={(e) => {
                        // e.target을 HTMLImageElement로 타입 단언
                        (e.target as HTMLImageElement).src =
                          "/images/no-image.png";
                      }}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-none text-left">
                      {item.english_name}
                    </p>
                    <p className="text-xs text-muted-foreground text-left">
                      {item.market}
                    </p>
                  </div>
                </div>
                {type === "search" ? (
                  <button
                    type="button"
                    onClick={() => onSearchSelect(item.market.split("-")[1])}
                    className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 ml-auto"
                  >
                    선택
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAddSelect(item.market.split("-")[1])}
                    className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 ml-auto"
                  >
                    선택
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CodeList;
