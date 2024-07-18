import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../api";
import { putTransaction } from "../api";
import { deleteTransaction } from "../api";
import { useEffect, useRef, useState } from "react";
import WriteForm from "../components/WriteForm";
import SpinnerImg from "../images/Spinner_button.gif";
import styled, { keyframes } from "styled-components";
import useAsync from "../hooks/useAsync";

export default function ModifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteRef = useRef();
  const { id } = location.state;
  const [defaultValues, setDefaultValues] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [, getTransactionAsync] = useAsync(getTransaction);
  const [isSubmitting, deleteTransactionAsync] = useAsync(deleteTransaction);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getTransactionAsync(id);
      if (!fetchedData) {
        navigate(-1);
        return;
      }

      setIsLoading(false);
      setDefaultValues(fetchedData);
    };
    fetchData();
  }, []);

  const handleBinClick = () => {
    if (deleteRef.current) {
      deleteRef.current.style.setProperty("display", "block");
    }
  };

  const handleCancleClick = () => {
    if (deleteRef.current) {
      deleteRef.current.style.setProperty("display", "none");
    }
  };

  const handleDeleteClick = async () => {
    const res = await deleteTransactionAsync(id);

    if (!res) {
      window.location.reload();
      return;
    }
    navigate(-1);
  };

  return isLoading ? (
    <Loading>
      <p>잠시만 기다려주세요...</p>
      <Spinner src={SpinnerImg} alt="로딩중..." />
    </Loading>
  ) : (
    <>
      <DeleteBtn onClick={handleBinClick}></DeleteBtn>
      <DeleteMessage ref={deleteRef}>
        삭제하시겠습니까?
        <button onClick={handleDeleteClick} disabled={isSubmitting}>
          확인
        </button>
        <button onClick={handleCancleClick}>취소</button>
      </DeleteMessage>
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
  font-size: 1.2rem;
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

const slide = keyframes`
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(0%);

  }
`;

const DeleteMessage = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -100px;
  margin-top: -60px;
  width: 200px;
  height: 120px;
  padding: 30px 30px 0;
  text-align: center;
  background-color: #fafaf9;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  animation: ${slide} 0.3s ease-out;

  & button {
    display: inline-block;
    width: 40px;
    height: 27px;
    margin: 25px 5px 0;
    background-color: var(--maincolor);
    border: none;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;
