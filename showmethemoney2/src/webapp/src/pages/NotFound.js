import styled from "styled-components";

export default function NotFound() {
  return <Message>존재하지 않는 페이지입니다.</Message>;
}

const Message = styled.div`
  margin: 0 auto;
  margin-top: 50px;
`;
