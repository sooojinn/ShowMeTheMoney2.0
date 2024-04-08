import { useLocation } from "react-router-dom";
import { getTransaction } from "../api";
import { putTransaction } from "../api";
import { useEffect, useState } from "react";
import WriteForm from "./WriteForm";

export default function Modify() {
  const location = useLocation();
  const { id } = location.state;
  const [defaultValues, setDefaultValues] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getTransaction(id);
        setDefaultValues({
          ...fetchedData,
        });
      } catch (error) {
        alert("데이터를 불러오는 중 에러가 발생했습니다.");
      }
    };
    fetchData();
  }, [id]);

  console.log(defaultValues);

  return defaultValues ? (
    <WriteForm request={putTransaction} defaultValues={defaultValues} />
  ) : null;
}
