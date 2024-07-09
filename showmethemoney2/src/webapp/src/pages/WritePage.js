import { useLocation } from "react-router-dom";
import { postTransaction } from "../api";
import WriteForm from "../components/WriteForm";

export default function WritePage() {
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
