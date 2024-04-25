import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../api";
import { putTransaction } from "../api";
import { deleteTransaction } from "../api";
import { useEffect, useState } from "react";
import WriteForm from "./WriteForm";
import SpinnerImg from "../Spinner_button.gif";
import styled from "styled-components";

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
      } else {
        throw new Error("오류가 발생했습니다.");
      }
    } catch (error) {
      alert(error.message);
      window.location.reload();
      return;
    }
  };

  return isLoading ? (
    <Loading>
      <p>잠시만 기다려주세요...</p>
      <Spinner src={SpinnerImg} alt="로딩중..." />
    </Loading>
  ) : (
    <>
      <DeleteBtn onClick={handleDeleteClick}></DeleteBtn>
      <WriteForm request={putTransaction} defaultValues={defaultValues} />
    </>
  );
}

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-contnet: center;
  align-items: center;
  margin: 100px auto;
  font-size: 23px;
`;

const Spinner = styled.img`
  width: 25px;
  height: 25px;
`;

const DeleteBtn = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/3334/3334328.png");
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;
