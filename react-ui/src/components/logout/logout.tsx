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

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const data = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    });

    const response = await data.json();

    const { isError } = response;

    if (isError) {
      console.error(response.error);
      return;
    }

    dispatch(setAuth(false));
    navigate(href);

  };

  return (
    <div className="logout">
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};
