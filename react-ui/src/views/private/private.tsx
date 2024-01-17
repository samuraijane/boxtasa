import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAuth } from "../../features/authSlice";

export const PrivateView = ( {children}: {children: JSX.Element} ): JSX.Element => {
  const isAuth = useSelector(selectAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
