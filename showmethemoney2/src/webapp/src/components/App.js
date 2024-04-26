import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    --maincolor: #f3cdcc;
  }

  @font-face {
    font-family: "omyu_pretty";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 500;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &.income {
      color: #5fbb82;
    }
    &.expense {
      color: #e16f63;
    }
  }

  body {
    font-family: "omyu_pretty";
    font-size: 19px;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: 926px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fafaf9;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  position: relative;
`;
