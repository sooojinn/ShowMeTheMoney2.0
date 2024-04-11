import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../api";
import { putTransaction } from "../api";
import { deleteTransaction } from "../api";
import { useEffect, useState } from "react";
import WriteForm from "./WriteForm";
import "./Modify.css";
import Spinner from "../Spinner.gif";

export default function Modify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [defaultValues, setDefaultValues] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getTransaction(id);
        setDefaultValues({
          ...fetchedData,
        });
        setIsLoading(false);
      } catch (error) {
        alert("데이터를 불러오는 중 에러가 발생했습니다.");
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteClick = async () => {
    try {
      const status = await deleteTransaction(id);
      if (status === 200) {
        alert("삭제되었습니다.");
        navigate(-1);
      }
    } catch (error) {
      alert("에러가 발생했습니다.");
      window.location.reload();
      return;
    }
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContnet: "center",
    alignItems: "center",
    margin: "100px auto",
    fontSize: "23px",
  };

  console.log(defaultValues);
  console.log(isLoading);

  return isLoading ? (
    <div style={style}>
      <p>잠시만 기다려주세요...</p>
      <img
        src={Spinner}
        style={{ width: "25px", height: "25px" }}
        alt="로딩중..."
      />
    </div>
  ) : (
    <>
      <div className="delete-btn" onClick={handleDeleteClick}></div>
      <WriteForm request={putTransaction} defaultValues={defaultValues} />
    </>
  );
}
