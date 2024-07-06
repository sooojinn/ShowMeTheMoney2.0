import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "./Button.style";

export default function Loading() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    let counter = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(counter);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Message>
        회원가입에 성공했습니다!
        <br />
        로그인 페이지로 이동합니다.
      </Message>
      <Circle>
        <Count>{count}</Count>
      </Circle>
      <Link to="/login" className="link">
        <Button>확인</Button>
      </Link>
    </div>
  );
}

export const Message = styled.p`
  margin: 150px auto 30px;
  text-align: center;
  font-size: 1.2rem;
  line-height: 150%;
`;

const rotate = keyframes`
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
`;

const count = keyframes`
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(-405deg);
  }
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin: 20px auto 50px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top: 2px solid #4a4a4a;
  animation: ${rotate} 1s linear infinite;
`;

export const Count = styled.div`
  font-size: 1.3rem;
  animation: ${count} 1s linear infinite;
`;
