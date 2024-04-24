import { useEffect } from "react";
import naverIcon from "../icon_naver.png";
import { SocialLoginBtn } from "./Join.js";

export default function NaverLogin() {
  // const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  // const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  // const STATE = "test";

  // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  // const loginNaver = () => {
  //   window.location.href = NAVER_AUTH_URL;
  // };

  const naver = window.naver;
  const Naver_Client_Id = process.env.REACT_APP_NAVER_CLIENT_ID;
  const Naver_Callback_Url = process.env.REACT_APP_NAVER_REDIRECT_URI;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: Naver_Client_Id,
      callbackUrl: Naver_Callback_Url,
      isPopup: false,
      loginButton: {
        color: "green",
        type: 1,
        height: "40",
      },
      callbackHandle: true,
    });
    naverLogin.init();
  };
  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleNaverClick = () => {
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
  };

  return (
    <SocialLoginBtn onClick={handleNaverClick} image={naverIcon}>
      <div
        id="naverIdLogin"
        style={{ display: "none" }}
        // onClick={loginNaver}
      ></div>
    </SocialLoginBtn>
  );
}
