import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { postTransactionInBulk } from "../../features/activeDataSlice";
import { postTransaction } from "../../features/activeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTransactions } from "../../features/filteredDataSlice";
import { AppDispatch } from "../../app/store";
import { prepBulkData } from "../../utils";
import { handleModal } from "../../features/isModalSlice";
import "./update-dialogue.scss";
import { Code, PostTransaction, Transaction, Vendor } from "../../types/interface";
import { TransactionDetail } from "../transaction-detail/transaction-detail";
import { ForCode } from "./subcomponents/for-code/for-code";
import { ForLabel } from "./subcomponents/for-label/for-label";
import { ForVendor } from "./subcomponents/for-vendor/for-vendor";
import { selectActiveTransaction } from "../../features/activeTransactionSlice";
import { selectCode } from "../../features/codesSlice";
import { selectLabels } from "../../features/labelsSlice";
import { selectVendor } from "../../features/vendorsSlice";
import { Label } from "../../types/interface";
import { UpdateToggles } from "../../types/enum";

export const TransactionUpdateDialogue = ({ activeTransaction }: {activeTransaction: Transaction}) => {
  const codes = useSelector(selectCode);
  const labels = useSelector(selectLabels);
  const activeLabelIds = useSelector(selectActiveTransaction).label_ids;
  const vendors = useSelector(selectVendor);

  const [inputValue, setInputValue] = useState("");
  const [isBulkSave, setIsBulkSave] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [filteredCodeData, setFilteredCodeData] = useState<Code[] | null>();
  const [filteredLabelData, setFilteredLabelData] = useState<Label[] | null>();
  const [filteredVendorData, setFilteredVendorData] = useState<Vendor[] | null>();
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const [selectedToggle, setSelectedToggle] = useState<UpdateToggles>(UpdateToggles.CODE);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedToggle === UpdateToggles.CODE) {
      setFilteredCodeData(codes);
    }
    if (selectedToggle === UpdateToggles.LABEL) {
      setFilteredLabelData(labels);
    }
    if (selectedToggle === UpdateToggles.VENDOR) {
      setFilteredVendorData(vendors);
    }
    setSelectedLabels(activeLabelIds);
  }, [selectedToggle]);

  const handleCancel = () => {
    dispatch(handleModal(false));
  }

  const resetInput = () => {
    setSelectedCode("");
    setSelectedVendor("");
    setInputValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    let _filteredData: Code[] | Label[] | Vendor[] = [];

    if (selectedToggle === UpdateToggles.CODE) {
      _filteredData = codes?.filter(x => x.code_name.toLowerCase().search(value) !== -1 || x.code_description.toLowerCase().search(value) !== -1);
      setFilteredCodeData(_filteredData);
    }

    if (selectedToggle === UpdateToggles.LABEL) {
      _filteredData = labels?.filter(x => x.name.toLowerCase().search(value) !== -1);
      setFilteredLabelData(_filteredData);
    }

    if (selectedToggle === UpdateToggles.VENDOR) {
      _filteredData = vendors?.filter(x => x.vendor_name.toLowerCase().search(value) !== -1);
      setFilteredVendorData(_filteredData);
    }
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked: isChecked } = e.target;
    setIsBulkSave(isChecked);
  };

  const handleSave = () => {
    if (isBulkSave) {
      const bulkData = prepBulkData({
        codeId: selectedCode,
        labelIds: selectedLabels,
        transactions: filteredTransactions,
        vendorId: selectedVendor
      });
      handleTransactionUpdate(bulkData);
      return false;
    }
    handleTransactionUpdate({
      transactionId: `${activeTransaction.transaction_id}`,
      codeId: selectedCode,
      labelIds: selectedLabels,
      vendorId: selectedVendor
    });
  };

  const handleTransactionUpdate = async (data: PostTransaction | PostTransaction[]) => {
    if ((data as PostTransaction[]).length) {
      await dispatch(postTransactionInBulk(data as PostTransaction[]));
      dispatch(handleModal(false));
    } else {
      const { codeId, labelIds, transactionId, vendorId } = data as PostTransaction; // TODO refactor, no need to destructure, replaced with spread syntax below
      await dispatch(postTransaction({ codeId, labelIds, transactionId, vendorId }));
      dispatch(handleModal(false));
    }
  };

  const handleUpdateTypeToggle = (e: MouseEvent<HTMLDivElement>) => {
    resetInput();
    if (!(e.target instanceof HTMLElement)) {
      // TODO handle error gracefully
      console.error("Hmmm....");
      return;
    }

    const type = e.target.dataset.type as UpdateToggles;
    if (!type) {
      // TODO handle error gracefully
      console.error("There is no type, amigo.");
      return;
    }

    setSelectedToggle(type);
  };

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!(e.currentTarget instanceof HTMLLIElement)) {
      // TODO handle error gracefully
      console.error("Nope");
      return;
    }

    const { id, type, value } = e.currentTarget.dataset;
    if (!id || !type || !value ) {
      // TODO handle error gracefully
      console.error("Some attribute values are missing, bruv.");
      return;
    }

    if (type === UpdateToggles.CODE) {
      setSelectedCode(id);
      setInputValue(value);
    }
    if (type === UpdateToggles.LABEL) {
      const _id = parseInt(id);
      if (selectedLabels.find(x => x === _id)) {
        setSelectedLabels(selectedLabels.filter(y => y !== _id));
      } else {
        setSelectedLabels([...selectedLabels, _id]);
      }
    }
    if (type == UpdateToggles.VENDOR) {
      setSelectedVendor(id);
      setInputValue(value);
    }
  }

  return (
    <div className="dialogue">
      <div className="dialogue__subheader">
        <div className="dialogue__cancel" onClick={handleCancel}>&#x2715;</div>
        <div className="dialogue__inputs-container">
          <div className="dialogue__toggles" onClick={handleUpdateTypeToggle}>
            <div
              className={`dialogue__toggle ${selectedToggle === UpdateToggles.CODE ? " dialogue__toggle--selected" : ""}`}
              data-type={UpdateToggles.CODE}
            >
              C
            </div>
            <div
              className={`dialogue__toggle ${selectedToggle === UpdateToggles.LABEL ? " dialogue__toggle--selected" : ""}`}
              data-type={UpdateToggles.LABEL}
            >
              L
            </div>
            <div
              className={`dialogue__toggle ${selectedToggle === UpdateToggles.VENDOR ? " dialogue__toggle--selected" : ""}`}
              data-type={UpdateToggles.VENDOR}
            >
              V
            </div>
          </div>
          <div className="dialogue__search">
            <div className="dialogue__live-search">
              <input
                {...(selectedToggle === UpdateToggles.LABEL ? { disabled: true, placeholder: "Select from the labels below."} : {})}
                onChange={handleChange}
                type="text"
                value={inputValue}
              />
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
          {selectedToggle === UpdateToggles.CODE && (
            <ForCode
              filteredCodes={filteredCodeData as Code[]}
              selectedCode={parseInt(selectedCode)}
              handleClick={handleClick}
            />
          )}
          {selectedToggle === UpdateToggles.VENDOR && (
            <ForVendor
              filteredVendors={filteredVendorData as Vendor[]}
              selectedVendor={parseInt(selectedVendor)}
              handleClick={handleClick}
            />
          )}
          {selectedToggle === UpdateToggles.LABEL && (
            <ForLabel
              filteredLabels={filteredLabelData as Label[]}
              selectedLabels={selectedLabels || []}
              handleClick={handleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};
