import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postLogout } from "../api";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await postLogout();
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return <LogoutBtn onClick={handleLogout}></LogoutBtn>;
}

const LogoutBtn = styled.div`
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

  &:hover {
    background-color: #e6e6e6;
  }

  @media (max-width: 390px) {
    width: 25px;
    height: 25px;
    background-size: 15px 15px;
  }
`;
