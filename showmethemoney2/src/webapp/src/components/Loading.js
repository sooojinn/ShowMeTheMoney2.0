import { Link, useNavigate } from "react-router-dom";
import "./Loading.css";
import { useEffect, useState } from "react";

export default function Loading() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    let counter = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      console.log("count");
    }, 1000);

    return () => {
      clearInterval(counter);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <p className="success-message">
        회원가입에 성공했습니다!
        <br />
        로그인 페이지로 이동합니다.
      </p>
      <div className="circle">
        <div className="count">{count}</div>
      </div>
      <Link to="/login" className="link">
        <button>확인</button>
      </Link>
    </div>
  );
}
