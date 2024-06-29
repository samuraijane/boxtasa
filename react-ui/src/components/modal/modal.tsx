import { useDispatch } from "react-redux";
import { handleModal } from "../../features/isModalSlice";
import "./modal.scss";
import { AppDispatch } from "../../app/store";

export const Modal = ({ children }: {children: any}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(handleModal(false));
  }

  return (
    <div className="modal">
      <div className="modal__close" onClick={handleClick}></div>
      {children}
    </div>
  );
};
