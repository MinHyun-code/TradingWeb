import React from "react";

// 상대적 시간 계산 함수
const timeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}년 전`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}개월 전`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}일 전`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}시간 전`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}분 전`;

  return "방금 전";
};

const DateDisplay: React.FC<{ isoString: string }> = ({ isoString }) => {
  // API로부터 받은 ISO 날짜 문자열을 Date 객체로 변환
  const date = new Date(isoString);

  // KST로 변환 (UTC+9)
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return <div>{timeAgo(kstDate)}</div>;
};

export default DateDisplay;
