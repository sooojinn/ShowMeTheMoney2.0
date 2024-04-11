import { useState, useEffect } from "react";
import { getTransactions } from "../api";
import "./Accountbook.css";
import { NavLink, Outlet } from "react-router-dom";
import Spinner from "../Spinner2.gif";

function Accountbook() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const nextDatas = await getTransactions(year, month + 1);
        setDatas(nextDatas);
      } catch {
        alert("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [month]);

  const handlePrevBtn = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else setMonth(month - 1);
  };

  const handleNextBtn = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else setMonth(month + 1);
  };

  const pageBtnStyle = ({ isActive }) => {
    return "page-btn " + (isActive ? "current-page" : "");
  };

  const style = {
    width: "80px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  console.log("Accountbook이 렌더링되었습니다.");

  return (
    <div>
      <div className="page-btns">
        <NavLink to="calendar" className={pageBtnStyle}>
          달력
        </NavLink>
        <NavLink to="statics" className={pageBtnStyle}>
          통계
        </NavLink>
        <NavLink to="list" className={pageBtnStyle}>
          리스트
        </NavLink>
      </div>
      <div className="calendar-header">
        <div className="btn" onClick={handlePrevBtn}>
          ◀
        </div>
        <h2>
          {year}년 {month + 1}월
        </h2>
        <div className="btn" onClick={handleNextBtn}>
          ▶
        </div>
      </div>
      <Outlet context={{ year: year, month: month, datas: datas }} />
      {isLoading && (
        <div className="overlay">
          <img src={Spinner} style={style} alt="로딩중..." />
        </div>
      )}
    </div>
  );
}

export default Accountbook;
