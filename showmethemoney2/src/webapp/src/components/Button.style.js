import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: var(--maincolor);
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    color: black;
  }
`;
