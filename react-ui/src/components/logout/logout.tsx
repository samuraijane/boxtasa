import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/authSlice";
import "./logout.scss";

interface Logout {
  href: string;
  text: string;
}

export const Logout = ({ href, text }: Logout): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setAuth(false));
    navigate(href);
  };

  return (
    <div className="logout">
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};
