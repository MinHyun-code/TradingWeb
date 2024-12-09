import { useNavigate } from "react-router-dom";
import Market from "../market/Market";
import MarketDetail from "../market/MarketDetail";

const Interest = () => {
  const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate("/market"); // '/market'으로 이동
  // };

  return (
    <>
      <div className="flex justify-between">
        <Market/>
        <MarketDetail/>
      </div>
    </>
  );
};

export default Interest;
