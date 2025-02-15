import { useSelector } from "react-redux";
import { selectCode } from "../../../../features/codesSlice";
import { SelectorProps } from "../../../../types/interface";
import "./code-selector.scss";

export const CodeSelector = ({ action, selected }: SelectorProps): JSX.Element => {
  const codes = useSelector(selectCode);

  let codesWith2Digits: JSX.Element[] = [];
  let codesWith4Digits: JSX.Element[] = [];

  const buildCodeItem = (code_id: number, code_name: string) => (
    <li
      className={`selector-container${selected === code_id ? " selector-container--selected" : ""}`}
      data-id={code_id}
      data-type="codeId"
      key={code_id}
      onClick={action}
    >
      {code_name}
    </li>
  );

  codes.forEach((code) => {
    const { code_id, code_name } = code;

    if (code_name.length !== 2 && code_name.length !== 4) {
      throw new Error("There is a problem with the codes.");
    }

    const codeItem = buildCodeItem(code_id, code_name);

    if (code_name.length === 2) {
      codesWith2Digits.push(codeItem);
    }

    if (code_name.length === 4) {
      codesWith4Digits.push(codeItem);
    }

    return (
      <li
        className={`selector-container${selected === code_id ? " selector-container--selected" : ""}`}
        data-id={code_id}
        data-type="codeId"
        key={code.code_id}
        onClick={action}
      >
        {code_name}
      </li>
    )
  });

  return (
    <div className="code-selector">
      <ul className="code-selector__codes code-selector__codes--2digits">{codesWith2Digits}</ul>
      <ul className="code-selector__codes code-selector__codes--4digits">{codesWith4Digits}</ul>
    </div>
  );
};
