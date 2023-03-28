# justEgg

### 원본 사이트

https://www.ju.st/learn

### 복제한 영역

- `class="BlokSection pinned1"` canvas영역

- less land 영역

### 복제 사이트

https://dev-tinkerbell.github.io/justEgg/

### 목표

- 스크롤에 따른 비디오 재생 부드럽게

- 반응형 최적화

- 스크롤 위치에 따른 canvas frame 이미지 변경

### 배운점

- canvas를 이용한 시퀀스 애니메이션

- 시퀀스 애니메이션 이미지 최적화

  - gsap scrollEnd 이벤트

- gsap matchMedia 사용으로 반응형 모션 제어

- `ScrollTrigger.creat()` 함수로 scrollScaleImage영역 스크롤 생성 함수 재사용

- `gsap.defaults()`로 기본 프로퍼티 등록 가능

### 아쉬운 점

- ScrollTrigger는 기능별로 생성 가능 여부 (캡슐화 가능 여부)

  이유: 각각 ScrollTrigger가 생성된다면 kill, 이벤트 추가 등 해당 ScrollTrigger만 제어하고 싶음

  현재: ScrollTrigger는 `[ScrollTrigger, ScrollTrigger,ScrollTrigger, ScrollTrigger]`으로 ScrollTrigger 배열 전체가 나옴

- 세팅한 timeline 보는 방법 찾지 못함

  이유: for문으로 생성한 timeline이 의도대로 설정되었는지 확인하고 싶음
