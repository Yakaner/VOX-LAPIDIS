# VOX LAPIDIS

석재 브랜드 VOX LAPIDIS 홈페이지 (React + Vite).

## 실행

```bash
npm install
npm run dev      # 개발 서버 http://localhost:5173
npm run build    # dist/ 에 배포용 빌드
```

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 메인 |
| `/luxury` · `/ceramic` · `/quartz` · `/marble` | 명품석 · 세라믹 · 인조석 · 대리석 컬렉션 (계열 필터, 검색, 상세 모달) |
| `/projects` | 시공사례 |
| `/finishing` | 표면마감 및 가공 |
| `/contact` | 상담 문의 |

## 수정 방법

- 석재 목록·문구: `src/data/categories.js` (시공사례 `projects.js`, 마감/가공 `finishing.js`)
- 석재 썸네일은 `colors`(바탕색, 주 결 색, 보조 결 색) 값으로 SVG 대리석 텍스처를 자동 생성합니다.
- 히어로 사진: `public/images/hero-marble.jpg` 처럼 `hero-<카테고리>.jpg` 파일을 넣으면
  코드로 그린 쇼룸 장면 대신 사진이 표시됩니다.
- 상담 문의 폼은 아직 전송 기능이 없습니다 (`src/pages/ContactPage.jsx`의 `handleSubmit`에 연결).
