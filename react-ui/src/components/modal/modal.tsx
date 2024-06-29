import "./modal.scss";

export const Modal = ({ children }: {children: any}): JSX.Element => (
  <div className="modal">
    {children}
  </div>
);
