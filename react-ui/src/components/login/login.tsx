import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/authSlice";
import "./login.scss";

export const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    password: "",
    username: ""
  });

  const handleFetch = async (password: string, username: string) => {
    const data = await fetch("/api/auth/login", {
      body: JSON.stringify({ password, username }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const response = await data.json();

    const { isError } = response;

    if (isError) {
      console.error(response.error);
      return;
    }
    
    dispatch(setAuth(true));
    navigate("/transactions");
  };

  const handleLocalAuth = (e: SyntheticEvent<HTMLFormElement>, payload: boolean) => {
    e.preventDefault();
    dispatch(setAuth(payload));
    navigate("/transactions");
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFetch(creds.password, creds.username);
    navigate("/transactions");
    console.log('You are logged in.');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {type} = e.target.dataset;
    const {value} = e.target;
    
    if (type) {
      setCreds({
        ...creds,
        [type]: value
      });
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__fields">
        <div className="login__field">
          <input data-type="username" onChange={handleChange} type="text" value={creds.username} />
        </div>
        <div className="login__field">
          <input data-type="password" onChange={handleChange} type="password" value={creds.password} />
        </div>
        <button>Submit</button>
      </div>
    </form>
  );
};
