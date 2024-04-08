import { useLocation } from "react-router-dom";
import { postTransaction } from "../api";
import WriteForm from "./WriteForm";

export default function Write() {
  const location = useLocation();
  const { dateString } = location.state;
  const defaultValues = {
    division: "expense",
    money: "0",
    date: dateString,
    category: "",
    memo: "",
  };

  return <WriteForm request={postTransaction} defaultValues={defaultValues} />;
}
