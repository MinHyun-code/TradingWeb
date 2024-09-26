import React from "react";

interface EllipsisTextProps {
  text: string; // 표시할 텍스트
  maxLines?: number; // 최대 줄 수
}

const EllipsisText: React.FC<EllipsisTextProps> = ({ text, maxLines = 1 }) => {
  return (
    <div
      className={`overflow-hidden text-ellipsis whitespace-pre-line 
                  ${
                    maxLines === 1
                      ? "whitespace-nowrap"
                      : `line-clamp-${maxLines}`
                  }`}
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
      }}
    >
      {text}
    </div>
  );
};

export default EllipsisText;
