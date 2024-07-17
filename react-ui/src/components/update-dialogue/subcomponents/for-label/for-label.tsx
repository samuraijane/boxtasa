import { MouseEvent } from "react";
import { Label } from "../../../../types/interface";
import "./for-label.scss";

interface UpdateByLabelProps {
  filteredLabels: Label[];
  selectedLabel: number;
  setInputValue: Function;
  setSelectedLabel: Function;
}

export const ForLabel = ({
  filteredLabels,
  selectedLabel,
  setInputValue,
  setSelectedLabel
}: UpdateByLabelProps) => {

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const { id, value } = e.currentTarget.dataset;
    if (!id || !value) {
      console.error("A value is missing.") // TODO handle error gracefully
      return;
    }
    setSelectedLabel(id);
    setInputValue(value);
  };

  const _labels = filteredLabels?.map(label => {
    const {id, name} = label;

    return (
      <li
        className={`${selectedLabel === id ? "for-label__selected-label": ""}`}
        data-id={id}
        data-value={name}
        key={id}
        onClick={handleClick}
      >
        <span>{name}</span>
      </li>
    );
  });

  return (
    <div className="for-label">
      {_labels}
    </div>
  );

};