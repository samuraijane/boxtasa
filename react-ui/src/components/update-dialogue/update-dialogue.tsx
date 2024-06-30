import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { postTransactionInBulk } from "../../features/activeDataSlice";
import { postTransaction } from "../../features/activeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTransactions } from "../../features/filteredDataSlice";
import { selectCode } from "../../features/codesSlice";
import { AppDispatch } from "../../app/store";
import { prepBulkData } from "../../utils";
import { handleModal } from "../../features/isModalSlice";
import "./update-dialogue.scss";
import { Code, PostTransaction, Transaction, Vendor } from "../../types/interface";
import { TransactionDetail } from "../transaction-detail/transaction-detail";
import { ForCode } from "./subcomponents/for-code/for-code";
import { ForVendor } from "./subcomponents/for-vendor/for-vendor";
import { selectVendor } from "../../features/vendorsSlice";

enum UpdateToggle {
  CODE = "code",
  VENDOR = "vendor"
}

export const TransactionUpdateDialogue = ({ activeTransaction }: {activeTransaction: Transaction}) => {
  const codes = useSelector(selectCode);
  const vendors = useSelector(selectVendor);

  const [inputValue, setInputValue] = useState("");
  const [isBulkSave, setIsBulkSave] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [filteredData, setFilteredData] = useState<Code[] | Vendor[] | null>();
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedToggle, setSelectedToggle] = useState<UpdateToggle>(UpdateToggle.CODE);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedToggle === UpdateToggle.CODE) {
      setFilteredData(codes);
    }
    if (selectedToggle === UpdateToggle.VENDOR) {
      setFilteredData(vendors);
    }
  }, [selectedToggle]);

  const handleCancel = () => {
    dispatch(handleModal(false));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    let _filteredData: Code[] | Vendor[] = [];

    if (selectedToggle === UpdateToggle.CODE) {
      _filteredData = codes?.filter(x => x.code_name.toLowerCase().search(value) !== -1 || x.code_description.toLowerCase().search(value) !== -1);
    }

    if (selectedToggle === UpdateToggle.VENDOR) {
      _filteredData = vendors?.filter(x => x.vendor_name.toLowerCase().search(value) !== -1);
    }
    setFilteredData(_filteredData);
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked: isChecked } = e.target;
    setIsBulkSave(isChecked);
  };

  const handleSave = () => {
    if (isBulkSave) {
      const bulkData = prepBulkData({
        codeId: selectedCode,
        transactions: filteredTransactions,
        vendorId: selectedVendor
      });
      handleTransactionUpdate(bulkData);
      return false;
    }
    handleTransactionUpdate({
      transactionId: `${activeTransaction.transaction_id}`,
      codeId: selectedCode,
      vendorId: selectedVendor
    });
  };

  const handleTransactionUpdate = async (data: PostTransaction | PostTransaction[]) => {
    if ((data as PostTransaction[]).length) {
      await dispatch(postTransactionInBulk(data as PostTransaction[]));
      dispatch(handleModal(false));
    } else {
      const { codeId, transactionId, vendorId } = data as PostTransaction; // TODO refactor, no need to destructure, replaced with spread syntax below
      await dispatch(postTransaction({ codeId, transactionId, vendorId }));
      dispatch(handleModal(false));
    }
  };

  const handleUpdateTypeToggle = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      // TODO handle error gracefully
      console.error("Hmmm....");
      return;
    }

    const type = e.target.dataset.type as UpdateToggle;
    if (!type) {
      // TODO handle error gracefully
      console.error("There is no type, amigo.");
      return;
    }

    setSelectedToggle(type);

    // reset if we toggle to a different type
    setInputValue("");
    setSelectedCode("");
  };

  return (
    <div className="dialogue">
      <div className="dialogue__subheader">
        <div className="dialogue__cancel" onClick={handleCancel}>&#x2715;</div>
        <div className="dialogue__inputs-container">
          <div className="dialogue__toggles" onClick={handleUpdateTypeToggle}>
            <div
              className={`dialogue__toggle ${selectedToggle === UpdateToggle.CODE ? " dialogue__toggle--selected" : ""}`}
              data-type={UpdateToggle.CODE}
            >
              Code
            </div>
            <div
              className={`dialogue__toggle ${selectedToggle === UpdateToggle.VENDOR ? " dialogue__toggle--selected" : ""}`}
              data-type={UpdateToggle.VENDOR}
            >
              Vendor
            </div>
          </div>
          <div className="dialogue__search">
            <div className="dialogue__live-search">
              <input onChange={handleChange} type="text" value={inputValue} />
            </div>
            <div className="dialogue__btn-container">
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
          <div className="dialogue__bulk">
            <label>Bulk update</label>
            <input onChange={handleCheckbox} type="checkbox" />
          </div>
        </div>
      </div>
      <div className="dialogue__body">
        <div className="dialogue__column dialogue__column--left">
          <TransactionDetail />
        </div>
        <div className="dialogue__column dialogue__column--right">
          {selectedToggle === UpdateToggle.CODE && (
            <ForCode
              filteredCodes={filteredData as Code[]}
              selectedCode={parseInt(selectedCode)}
              setInputValue={setInputValue}
              setSelectedCode={setSelectedCode}
            />
          )}
          {selectedToggle === UpdateToggle.VENDOR && (
            <ForVendor
              filteredVendors={filteredData as Vendor[]}
              selectedVendor={parseInt(selectedVendor)}
              setInputValue={setInputValue}
              setSelectedVendor={setSelectedVendor}
            />
          )}
        </div>
      </div>
    </div>
  );
};
