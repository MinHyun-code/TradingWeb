import React, { useEffect, useState } from "react";
import { useUpbitMarket, ItemData } from "@/hooks/upbit/UpbitApi";
import { Input } from "@/components/ui/input";

const Market = () => {
  const { upbitMarketApi, dataList } = useUpbitMarket();

  const [rowData, setRowData] = useState<ItemData[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setRowData(dataList?.KRW ?? []);
  }, [dataList]);

  useEffect(() => {
    upbitMarketApi();
  }, []);

  return (
    <div className="flex w-full flex-col justify-center space-y-6 pt-8 pb-3">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Market;
