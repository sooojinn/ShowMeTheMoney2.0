import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postLogout } from "../api";
import useAsync from "../hooks/useAsync";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [isLoading, postLogoutAsync] = useAsync(postLogout);

  const handleLogout = async () => {
    const res = await postLogoutAsync();
    if (!res) return;
    navigate("/login");
  };

  return <LogoutBtn disabled={isLoading} onClick={handleLogout}></LogoutBtn>;
}

const LogoutBtn = styled.button`
  width: 30px;
  height: 30px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/992/992680.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;

  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  border: none;
  background-color: transparent;

  &:hover {
    background-color: #e6e6e6;
  }

  @media (max-width: 390px) {
    width: 25px;
    height: 25px;
    background-size: 15px 15px;
  }
`;
