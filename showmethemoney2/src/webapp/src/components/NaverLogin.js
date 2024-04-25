import naverIcon from "../images/icon_naver.png";
import { SocialLoginBtn } from "./Join.js";

export default function NaverLogin() {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const STATE = "test";

  const loginNaver = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
  };

  return (
    <SocialLoginBtn image={naverIcon} onClick={loginNaver}></SocialLoginBtn>
  );
}
