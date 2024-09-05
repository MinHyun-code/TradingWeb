import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Interest = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/market"); // '/market'으로 이동
  };

  return (
    <>
      <Button onClick={handleButtonClick}>마켓 이동</Button>
    </>
  );
};

export default Interest;
