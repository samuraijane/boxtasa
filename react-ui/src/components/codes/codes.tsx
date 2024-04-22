import { useSelector } from "react-redux";
import { selectCode } from "../../features/codesSlice";
import "./codes.scss";

export const Codes = () => {
  const codes = useSelector(selectCode);
  const _codes = codes.map(code => (
    <li key={code.code_id}>
      <div>{code.code_name}</div>
      <p>{code.code_description}</p>
    </li>
  ));

  return (
    <ul className="codes">
      {_codes}
    </ul>
  )
}
