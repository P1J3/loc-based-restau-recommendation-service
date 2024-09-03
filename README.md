# Breadcrumbsloc-based-restau-recommendation-service

> 원티드 프리온보딩 백엔드 인턴십에서 기술 과제로 요구사항을 받고 팀으로 진행한 프로젝트입니다. 이 문서는 “위치 기반 맛집 추천 및 주문 웹 서비스(가칭 이며 팀에서 변경가능)” 구현을 위한 요구사항을 기록한 문서 입니다.

## 목차

#### [1. 개요](#개요)

##### [&nbsp;&nbsp;1-1. 실행 환경](#실행-환경)

##### [&nbsp;&nbsp;1-2. 기술 스택](#기술-스택)

##### [&nbsp;&nbsp;1-3. 프로젝트 관리](#프로젝트-관리)

#### 2. ERD 및 디렉토리 구조

##### [&nbsp;&nbsp;2-1. ERD](#2-erd-및-디렉토리-구조)

##### [&nbsp;&nbsp;2-2. 디렉토리 구조](#2-erd-및-디렉토리-구조)

#### [3. 기능구현](#기능구현)

#### [4. 데이터 파이프라인 설정](#데이터-파이프라인-설정)

##### [&nbsp;&nbsp;4-1. 크론 작업 설정](#크론-작업-설정)

##### [&nbsp;&nbsp;4-2. 전처리 과정](#전처리-과정)

</br>

## 개요

- 본 서비스는 공공데이터를 활용하여, 지역 음식점 목록을 자동으로 업데이트 하고 이를 활용한다. 사용자 위치에맞게 맛집 및 메뉴를 추천하여 더 나은 다양한 음식 경험을 제공하고, 음식을 좋아하는 사람들 간의 소통과 공유를 촉진하려 합니다.
- **(내 위치 또는 지정한 위치 기반으로 식당 및 해당 맛집의 메뉴 를 추천한다)**

### 실행 환경

- .env 환경변수 파일 생성</br>
  해당 프로젝트는 로컬 환경 실행이며, 아래 항목들이 환경변수 파일에 전부 존재해야 합니다.

```
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_DATABASE=

JWT_SECRET_KEY=
```

- 로컬 실행시

```
npm run start
```

- 개발 실행시

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

- 이메일 이메일 형식 유효성 체크
- 패스워드 Bcrypt 암호화 처리

### 로그인

- 이메일, 패스워드 일치 여부 유효성 체크
- 로그인 시 JWT(Json Web Token) 발급 -> 모든 API 요청시 JWT 인가

### 사용자 프로필

- 토큰을 해석하여 해당 사용자의 프로필 열람

### 사용자 프로필 수정

- 토큰을 해석하여 해당 사용자의 프로필을 수정

### 데이터 파이프라인

- [서울시 일반음식점](https://data.seoul.go.kr/dataList/OA-16094/S/1/datasetView.do)에서 제공되는 대략 50만건의 데이터를 매일 자정4시에 저장

### 맛집 조회 및 상세 보기

- 거리, 위도, 경도에 따라 맛집 목록이 달라지게 구현

### 맛집 평가

- 사용자가 맛집에 평가를 남기면 맛집에 평점이 달라지게 구현

</br>

## API 명세

| No  | Title                               | Method  | Path                 | Authorization |
| --- | ----------------------------------- | :-----: | -------------------- | :-----------: |
| 1   | 회원가입                            | `POST`  | `/auth/sign-up`      |       X       |
| 2   | 로그인                              | `POST`  | `/auth/log-in`       |       X       |
| 3   | 사용자 프로필 확인                  |  `GET`  | `/users/profile`     |       O       |
| 4   | 사용자 프로필 수정(점심 추천 여/부) | `PATCH` | `/users/isRecommend` |       O       |
| 5   | 사용자 프로필 수정                  |  `PUT`  | `/users/profile`     |       O       |
| 6   | 맛집 목록                           |  `GET`  | `/places`            |       O       |
| 7   | 맛집 상세 보기                      |  `GET`  | `/places/:id`        |       O       |
| 8   | 시군구 목록                         |  `GET`  | `/place/location`    |       X       |
| 9   | 맛집 평가                           | `POST`  | `/review`            |       O       |

</br>

## 4. 데이터 파이프라인 설정

데이터 파이프라인 설정 관련 내용입니다.
비동기 방식으로 성능을 향상시켰으며 [테스트 관련 레포](https://github.com/raminicano/datapipeline-test)이며 [전처리 및 테스트 관련 문서](https://velog.io/@raminicano/%EB%A7%A4%EC%9D%BC-50%EB%A7%8C%ED%96%89-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EC%A0%80%EC%9E%A5%ED%95%98%EB%8A%94-%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-%EC%83%9D%EC%84%B1%EA%B8%B0)입니다.

### 4-1. 크론 작업 설정

<details>
<summary>Google Trend</summary>
  <img src="https://github.com/user-attachments/assets/d62b29db-4fb1-4b3f-9afc-823ab6c4b97c">

  크론 작업은 매일 자정 4시에 실행되며, 대한민국의 음식점에 대한 키워드를 구글 트렌드에서 분석한 결과, 규칙적으로 오전 4시에 트래픽이 가장 낮았습니다. 따라서 검색량이 가장 적은 새벽 시간대에 크론 작업을 걸어 안정적인 데이터 수집을 보장하도록 설정하였습니다.
</details>

### 4-2. 전처리 과정

<details>
<summary>데이터 분석 수행</summary>  
  전체 데이터를 가져와 데이터 분석을 수행했습니다: <br>
  - <b>기본키 선정</b>: `MGTNO`는 서울시에서 제공하는 문서에 따르면 중복 및 결측치가 없는 기본키로 사용되었습니다. <br>
  - <b>결측치 처리</b>: 도로명 주소는 약 25만 행의 결측치가 존재하고, 지번 주소는 228행 정도로 적습니다. 따라서 주소 정보는 지번 주소를 사용하기로 결정했습니다. <br>
  - <b>좌표 정보</b>: 결측치가 발생하는 경우 데이터를 가져오지 않도록 설정하였습니다. 네이버 또는 카카오 지도 API를 이용해 지번 주소를 통해 결측치를 보완할 수 있으나, 실제 서비스가 아니기에 좌표 결측치 데이터는 제외했습니다. 표준 좌표계로 변환 시 500m ~ 1km 정도 차이가 존재해 EPSG:5174 (보정된 중부원점 좌표계)를 적용해 변환하였습니다. <br>
  - <b>데이터 필터링</b>: 폐업일이 존재하거나, 경도·위도 좌표가 없거나, 상호명이 없거나, 최종 수정일자가 없는 경우 데이터를 가져오지 않도록 하였습니다. <br>
  - <b>업데이트 로직</b>: 기존 레스토랑 엔티티에 ID로 조회하여 최종 수정일자의 데이터가 다를 경우에만 전처리 수행 및 업데이트를 진행하며, 레코드가 존재하지 않으면 새로 생성하여 저장합니다. <br>
</details>
