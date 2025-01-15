import React, { useEffect, useState } from "react";

const MarketDetail: React.FC = () => {
  
  const [windowHeight, setWindowHeight] = useState(window.innerHeight - 220); // 화면 높이 상태

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight - 220);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <div className="border rounded-lg ml-5" style={{ height: `${windowHeight}px` }}>
            차트 영역
        </div>
    </>
  );
};

export default MarketDetail;
