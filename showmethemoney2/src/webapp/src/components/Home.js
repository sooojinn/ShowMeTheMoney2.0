import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>간단 가계부 서비스 Show me the Money</div>
      <Link to="/accountbook/calendar">내 가계부 바로가기</Link>
      <Link to="/join">회원가입</Link>
    </>
  );
}

export default Home;
