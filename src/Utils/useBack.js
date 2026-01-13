import { useNavigate } from "react-router-dom";

const useBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return goBack;
};

export default useBack;
