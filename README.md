## 💰 프로젝트 소개

지출과 수입 내역 관리를 도와주는 가계부 서비스 Show me the Money입니다.

## 👥 팀원 소개

- 박수진[FE] <https://github.com/sooojinn>
- 이채화[BE] <https://github.com/chaehwa82>

## 🛠️ 개발 환경

- Front-end: React, Javascript, HTML5, CSS3
- Back-end : Spring Boot, Spring Security, MySQL

## 💡 주요 기능

### 1. 회원가입, 로그인 페이지

![sign_login](https://github.com/sooojinn/ShowMeTheMoney2.0/assets/155421665/50c3d03f-af63-4621-80d9-5b3c0b99b8f6)

- react-hook-form을 이용하여 회원가입시 아이디, 비밀번호 조건에 맞도록 제어
- 네이버, 구글 소셜 로그인 구현

### 2. 달력 페이지

![calendar_edit_](https://github.com/sooojinn/ShowMeTheMoney2.0/assets/155421665/749b3ca2-9fdc-4503-83f5-7d1fd32da626)


- 지출/수입 내역 CRUD 기능
- 작성한 내역은 달력에 일별 합계 금액으로 표시/달력 상단에 월별 합계 금액으로 표시
- 달력의 날짜를 클릭하면 해당 날짜의 거래 내역 조회 가능
- 선택한 날짜를 세션에 저장하여 사용자 경험 개선

### 3. 통계 페이지

![statics](https://github.com/sooojinn/ShowMeTheMoney2.0/assets/155421665/49060eca-3b4f-4ac6-9cfe-4b12d750da33)

- 거래 내역의 카테고리별 합계 금액을 도넛 차트로 보여주는 기능
- 합계 금액이 높은 순서대로 정렬

### 4. 리스트 페이지

![list (1)](https://github.com/sooojinn/ShowMeTheMoney2.0/assets/155421665/d930b8c7-81a6-4e83-ba80-7727585af190)

- 월별 거래 내역을 리스트 형태로 조회
- 날짜별로 분류
- 거래 내역을 클릭하면 수정/삭제 페이지로 이동

### 5. 예산 페이지

![budget](https://github.com/sooojinn/ShowMeTheMoney2.0/assets/155421665/a8d27a38-53d9-48a5-9cfc-85ce9bf4e21a)

- 총 예산을 설정할 수 있음
- 설정한 예산에 맞게 남은 금액 표시

## ✅ 협업

### API 설계

[Notion](https://checker-grease-ccf.notion.site/REST-API-6a3023013bbe41f6a514a4a9e13c3dc4?pvs=4)

### 커밋 메시지 규칙

- [FE] / [BE] 말머리로 적기
- 이모티콘으로 커밋 유형 나타내기
  - ✨: 기능 구현
  - ✏️: 코드 수정
  - 🐞: 버그 수정
  - ❌: 코드 삭제
  - 📁: 파일 위치 이동

## 📝 후기

### 박수진

바닐라 자바스크립트만으로 만든 프로젝트를 리액트로 마이그레이션하며 React의 효율성을 경험할 수 있었습니다. 캘린더 페이지에서 다른 페이지로 이동했다가 되돌아오면 이전에 선택한 날짜와 거래 내역을 보여주지만 다른 월로 이동하면 선택한 날짜를 초기화하는 기능을 만드는 데 어려움을 느꼈습니다. 하지만 함수형 컴포넌트의 생명주기에 대해 자세히 공부한 후 기능 구현에 성공했습니다.
불필요한 리렌더링을 최소화하는 것도 큰 문제였습니다. 특히, 회원가입 유효성 검사 기능에서 사용자가 입력할 때마다 불필요한 리렌더링이 발생했지만 react-hook-form 라이브러리를 사용하여 성능을 향상시켰습니다.

백엔드와의 통신에서 가장 어려웠던 부분은 CORS 문제였습니다. [CORS 에러를 해결](https://soojin-dev.vercel.app/posts/web/about_cors.mdx)하며 보안 강화를 위해 인증 정보를 포함한 요청을 보내는 법을 알게 되었습니다. 또한, PUT 및 DELETE 요청에서 발생한 에러는 Spring Security의 CSRF 보호 기능 때문이라는 것을 알게 되었고, CSRF 토큰을 전송하여 문제를 해결했습니다. 이로써 클라이언트와 서버에 문제가 없어도 보안을 위한 프레임워크 설정과 브라우저 정책으로 인한 에러가 발생할 수 있다는 것을 알게 되었습니다.

### 이채화
