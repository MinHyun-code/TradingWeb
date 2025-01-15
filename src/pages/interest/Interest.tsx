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
      <div className="flex justify-between ml-5 sm:mt-20">    
        <div className="w-3/12">
          <Market/>
        </div>
        <div className="w-9/12">
          <MarketDetail/>
        </div>
      </div>
    </>
  );
};

export default Interest;
