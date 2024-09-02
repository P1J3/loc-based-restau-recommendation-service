# Breadcrumbsloc-based-restau-recommendation-service
> 원티드 프리온보딩 백엔드 인턴십에서 기술 과제로 요구사항을 받고 팀으로 진행한 프로젝트입니다. 이 문서는 “위치 기반 맛집 추천 및 주문 웹 서비스(가칭 이며 팀에서 변경가능)” 구현을 위한 요구사항을 기록한 문서 입니다.

## 목차
#### [1. 개요](#개요)
##### [&nbsp;&nbsp;1-1. 실행 환경](#실행-환경)
##### [&nbsp;&nbsp;1-2. 기술 스택](#기술-스택)
##### [&nbsp;&nbsp;1-3. 프로젝트 관리](#프로젝트-관리)
#### 2. ERD 및 디렉토리 구조
##### &nbsp;&nbsp;2-1. ERD
##### &nbsp;&nbsp;2-2. 디렉토리 구조
#### [3. 기능구현](#기능구현)
</br>

## 개요
- 본 서비스는 공공데이터를 활용하여, 지역 음식점 목록을 자동으로 업데이트 하고 이를 활용한다. 사용자 위치에맞게 맛집 및 메뉴를 추천하여 더 나은 다양한 음식 경험을 제공하고, 음식을 좋아하는 사람들 간의 소통과 공유를 촉진하려 합니다.
- **(내 위치 또는 지정한 위치 기반으로 식당 및 해당 맛집의 메뉴 를 추천한다)**

### 실행 환경
* .env 환경변수 파일 생성</br>
해당 프로젝트는 로컬 환경 실행이며, 아래 항목들이 환경변수 파일에 전부 존재해야 합니다.
```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_DATABASE=

JWT_SECRET_KEY=
```
* 로컬 실행시
```
npm run start
```
* 개발 실행시
```
npm run start:dev
```

### 기술 스택
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6">&nbsp;
<img src="https://img.shields.io/badge/Nest.js-version 10-E0234E">&nbsp;
<img src="https://img.shields.io/badge/TypeORM-version 0.3-fcad03">&nbsp;
<img src="https://img.shields.io/badge/MySQL-version 8-00758F">&nbsp;

### 프로젝트 관리
프로젝트 시작 전 만들어야 할 API를 노션 보드에 티켓으로 작성하고</br> 
각각의 티켓 안에 요구사항들을 정리했으며, 티켓마다 이슈 생성하여 PR 생성하여 머지 진행
<details>
<summary>API 관리</summary>
<div markdown="1">
<img src="https://github.com/user-attachments/assets/3e2452e8-1005-4d2f-bc40-532e7cedd1be">
</div>
</details>

<details>
<summary>이슈 관리</summary>
<div markdown="1">
<img src="https://github.com/user-attachments/assets/2868089d-677b-4d12-ab9e-b1a479750933">
</div>
</details>

<details>
<summary>PR 관리</summary>
<div markdown="1">
<img src="https://github.com/user-attachments/assets/748848ab-6d57-4c1a-b51c-9cc790c19327">
</div>
</details>

</br>

## ERD 및 디렉토리 구조

<details>
<summary><strong>ERD</strong></summary>
<div markdown="1">
 
<img src="https://github.com/user-attachments/assets/e8133321-c353-4746-99d8-ec1ea0358ffd">
</div>
</details>

<details>
<summary><strong>디렉토리 구조</strong></summary>
<div markdown="1">
 
```bash
.
├── README.md
├── docs
│   ├── pull_request_template.md
│   └── sgg_lat_lon.xlsx
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── config
│   │   └── database.config.ts
│   ├── helper
│   │   └── exclude.ts
│   ├── main.ts
│   └── modules
│       ├── auth
│       │   ├── auth.controller.ts
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts
│       │   ├── jwt-auth.guard.ts
│       │   └── jwt.strategy.ts
│       ├── location
│       │   ├── location.controller.ts
│       │   ├── location.entity.ts
│       │   ├── location.module.ts
│       │   └── location.service.ts
│       ├── place
│       │   ├── dto
│       │   │   └── place.dto.ts
│       │   ├── place.controller.ts
│       │   ├── place.entity.ts
│       │   ├── place.module.ts
│       │   └── place.service.ts
│       ├── review
│       │   ├── review.controller.ts
│       │   ├── review.module.ts
│       │   └── review.service.ts
│       └── user
│           ├── dto
│           │   └── user.dto.ts
│           ├── user.controller.ts
│           ├── user.entity.ts
│           ├── user.module.ts
│           └── user.service.ts
├── struct.txt
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
</div>
</details>

</br>

## 기능구현
### 회원가입
* 이메일 이메일 형식 유효성 체크
* 패스워드 Bcrypt 암호화 처리

### 로그인
* 이메일, 패스워드 일치 여부 유효성 체크
* 로그인 시 JWT(Json Web Token) 발급 -> 모든 API 요청시 JWT 인가

### 사용자 프로필
* 토큰을 해석하여 해당 사용자의 프로필 열람

### 사용자 프로필 수정
* 토큰을 해석하여 해당 사용자의 프로필을 수정

### 맛집 조회 및 상세 보기
* 거리, 위도, 경도에 따라 맛집 목록이 달라지게 구현

### 맛집 평가
* 사용자가 맛집에 평가를 남기면 맛집에 평점이 달라지게 구현

</br>

## API 명세
|No| Title           | Method  | Path                       | Authorization |
|---|-----------------|:-------:|----------------------------|:-------------:|
|1|회원가입|`POST`|`/auth/sign-up`|X|
|2|로그인|`POST`|`/auth/log-in`|X|
|3|사용자 프로필 확인|`GET`|`/users/profile`|O|
|4|사용자 프로필 수정(점심 추천 여/부)|`PATCH`|`/users/isRecommend`|O|
|5|사용자 프로필 수정|`PUT`|`/users/profile`|O|
|6|맛집 목록|`GET`|`/places`|O|
|7|맛집 상세 보기|`GET`|`/places/:id`|O|
|8|시군구 목록|`GET`|`/place/location`|X|
|9|맛집 평가|`POST`|`/review`|O|
