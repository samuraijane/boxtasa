import { MouseEventHandler } from "react";
import { Label } from "../../../../types/interface";
import "./for-label.scss";
import { UpdateToggles } from "../../../../types/enum";

interface UpdateByLabelProps {
  filteredLabels: Label[];
  selectedLabels: string[];
  handleClick: MouseEventHandler;
}

export const ForLabel = ({
  filteredLabels,
  selectedLabels,
  handleClick,
}: UpdateByLabelProps) => {

  const _labels = filteredLabels?.map(label => {
    const {id, name} = label;

    return (
      <li
        className={`${selectedLabels.find(x => parseInt(x) === id) ? "for-label__selected-label": ""}`}
        data-id={id}
        data-type={UpdateToggles.LABEL}
        data-value={name}
        key={id}
        onClick={handleClick}
      >
        <span>{name}</span>
      </li>
    );
  });

  return (
    <ul className="for-label">
      {_labels}
    </ul>
  );

};