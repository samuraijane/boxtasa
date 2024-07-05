import { ChangeEventHandler, MouseEventHandler } from "react";
import { NotePatchOptions } from "../../../types/enum";
import "./noteInput.scss";

interface NoteInputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleInput: MouseEventHandler<HTMLDivElement>;
  value: string;
}

export const NoteInput = ({
  handleChange,
  handleInput,
  value
}: NoteInputProps) => {

  return (
    <div className="note-input">
      <input data-active onChange={handleChange} type="text" value={value} />
      <div className="note-input__buttons" onClick={handleInput}>
        <button className={`note-input__button note-input__button--${NotePatchOptions.CANCEL}`} data-type={NotePatchOptions.CANCEL}>&#10060;</button>
        <button className={`note-input__button note-input__button--${NotePatchOptions.SAVE}`} data-type={NotePatchOptions.SAVE}>&#9989;</button>
      </div>
    </div>
  );
};
