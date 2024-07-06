import "./tab-button.scss";

interface TabButtonProps {
  isActive?: boolean;
  text: string;
}

export const TabButton = ({ isActive, text }: TabButtonProps) => (
  <button
    className={`btn${isActive ? " btn--active" : ""}`}
    data-type={text}
  >
    {text}
  </button>
);
