import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
  return (
    <>
      <Copy>
        간단 가계부 서비스
        <br />
        Show me the Money
      </Copy>
      <LinkStyle to="/accountbook/calendar">내 가계부 바로가기</LinkStyle>
      <LinkStyle to="/join">회원가입</LinkStyle>
    </>
  );
}

const Copy = styled.div`
  margin: 100px auto 20px;
  text-align: center;
  font-size: 1.3rem;
`;

const LinkStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
  width: 180px;
  height: 45px;
  background-color: var(--maincolor);
  border-radius: 20px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;
