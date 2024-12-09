// MarketGridRow.js
import React, { useState } from "react";

const MarketGridRow = React.memo(({ index, style, initialCoinData }) => {
    const [coinData, setCoinData] = useState(initialCoinData);
    
    const coin = coinData[index];

    const handleImageError = (index) => {
        // 로고가 로드 실패한 경우 logo 값을 undefined로 설정
        setCoinData((prevData) => {
            const newData = [...prevData];
            newData[index].logo = "/images/no-image.png";
            return newData;
        });
    };

    const getClassName = (tradePercent:number) => {
        if (tradePercent < 0) return "text-blue-500"; // 양수는 파란색
        if (tradePercent > 0) return "text-red-500"; // 음수는 빨간색
        return "text-gray-500"; // 0일 경우 회색
      };

    return (
        <div style={style} className="flex items-center">
            <div className="w-1/12">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                    className="aspect-square h-full w-full"
                    alt="Image"
                    src={coin.logo}
                    loading="lazy"
                    onError={() => handleImageError(index)}
                />
                </span>
            </div>
            <div className="w-4/12">{coin.coin}</div>
            <div className="flex flex-col items-end w-3/12">
                <div className={`font-semibold ${getClassName(coin.trade_percent)}`}>{coin.trade_price}</div>
                <div className={`font-semibold ${getClassName(coin.trade_percent)}`}>{coin.trade_percent}</div>
            </div>
            <div className="w-4/12">{coin.acc_trade_price_24h}</div>
        </div>
    );
});

export default MarketGridRow;
