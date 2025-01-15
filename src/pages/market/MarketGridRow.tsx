// MarketGridRow.js
import { CoinData } from "@/hooks/upbit/UpbitApi";
import Decimal from "decimal.js";
import React, { useState } from "react";

// props의 타입을 정의합니다.
interface ParentComponentProps {
    index: number;
    initialCoinData: CoinData[];
    style: React.CSSProperties;
}

const MarketGridRow = React.memo(({ index, style, initialCoinData }:ParentComponentProps) => {
    const [coinData, setCoinData] = useState(initialCoinData || []);
    
    const coin = coinData[index];

    const handleImageError = (index:number) => {
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

    const formatTradePrice = (number:number) => {
        if (isNaN(number)) return number; // 숫자가 아닌 경우 그대로 반환
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  ;
    };

    const formatToMillion = (number:number | undefined) => {
        if (typeof number !== "number" || isNaN(number)) {
            return ""; // 유효하지 않은 입력 처리
        }
        if (number >= 1_000_000) {
            const value = new Decimal(new Decimal(number).div(new Decimal(1000000))).toFixed(0); // 소수점 0자리로 고정
            return `${Number(value).toLocaleString('ko-KR')}M`;
        }
        return number.toLocaleString('ko-KR'); // 1백만 미만은 일반 스타일로 표시
    };
    

    return (
        <div style={style} className="flex items-center text-sm">
            <div className="w-3/12">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ml-3">
                <img
                    className="aspect-square h-full w-full"
                    alt="Image"
                    src={coin.logo}
                    loading="lazy"
                    onError={() => handleImageError(index)}
                />
                </span>
            </div>
            <div className="w-3/12 dark:text-white flex flex-col items-start">
                <div className="">{coin.market}</div>
                <div className="text-xs text-slate-400 truncate">{coin.english_name}</div>
            </div>
            <div className="flex flex-col items-end w-3/12">
                <div className={`font-semibold ${getClassName(coin.trade_percent)}`}>{formatTradePrice(coin.trade_price)}</div>
                <div className={`font-semibold ${getClassName(coin.trade_percent)}`}>{coin.trade_percent}%</div>
            </div>
            <div className="w-3/12 dark:text-white flex justify-end mr-3">{formatToMillion(coin.acc_trade_price_24h)}</div>
        </div>
    );
});

export default MarketGridRow;
