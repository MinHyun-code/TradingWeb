import React, { useEffect, useState } from "react";
import { useTheme } from "@/ThemeProvider";

interface ProfileImageProps {
  src?: string; // 이미지 URL
  alt?: string; // 대체 텍스트
  size?: number; // 이미지 크기
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = "Profile Image",
  size = 40,
}) => {
  const { darkMode } = useTheme();
  const [imgSrc, setImgSrc] = useState<string>();

  const defaultBlackImage = "/images/icons8-user-black.png";
  const defaultWhiteImage = "/images/icons8-user-white.png";

  useEffect(() => {
    if (src != null) {
      setImgSrc(src);
      return;
    }
    if (darkMode === true) {
      setImgSrc(defaultWhiteImage);
    } else {
      setImgSrc(defaultBlackImage);
    }
  }, [darkMode, src]);

  return (
    <img
      src={imgSrc} // src가 없을 경우 기본 이미지 사용
      alt={alt}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%", // 동그라미 형태로 만들기
        objectFit: "cover", // 이미지 비율 유지
      }}
      className="border dark:border-0 dark:bg-white"
    />
  );
};

export default ProfileImage;
