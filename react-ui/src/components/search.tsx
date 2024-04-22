import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByCode } from "../features/activeDataSlice";
import { AppDispatch } from "../app/store";

enum SearchTypes {
  CODE = "code",
  MEMO = "memo",
}

export const Search = (): JSX.Element => {
  const [codeInput, setCodeInput] = useState("");
  const [memoInput, setMemoInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const { value } = e.target;
    const { type } = e.target.dataset;

    switch(type) {
      case SearchTypes.CODE:
        setCodeInput(value);
        break;
      case SearchTypes.MEMO:
        setMemoInput(value);
        break;
      default:
        console.error("Unrecognized input type");
    }
  };

  const handleClick = () => {
    // TODO handle query by memo; ignore memo queries for now
    dispatch(getTransactionsByCode({code: codeInput}))
  };

  return (
    <div className="search">
      {!memoInput && (<input
        data-type={SearchTypes.CODE}
        onChange={handleChange}
        placeholder="Search code values"
        type="text"
        value={codeInput}
      />)}
      {!codeInput && (<input
        data-type={SearchTypes.MEMO}
        onChange={handleChange}
        placeholder="Search memo values"
        type="text"
        value={memoInput}
      />)}
      <button onClick={handleClick}>Search</button>
    </div>
  );
};
