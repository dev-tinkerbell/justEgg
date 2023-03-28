gsap.defaults({ ease: 'none' });

// gsap 반응형
const matchMedia = (vars) => {
  let gsapMatchMedia = gsap.matchMedia();
  let breakPoint = 820;

  return gsapMatchMedia.add(
    {
      isDesktop: `(min-width: ${
        breakPoint + 1
      }px) and (prefers-reduced-motion: no-preference)`,
      isMobile: `(max-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
    },
    (context) => {
      let { isDesktop } = context.conditions;
      const result = vars(isDesktop);

      createScrollTrigger(result);
    }
  );
};

// 스크롤 트리거 animation 생성 함수
const createScrollTrigger = (vars) => {
  const properties = {
    trigger: '.lessLand-wrap',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    ...vars,
  };

  ScrollTrigger.create(properties);
};

// 스크롤에 따른 퍼센트 숫자 변경
const numberElement = document.querySelector('.num i');
const onUpdateNumber = (number) => {
  numberElement.textContent = number;
};

// num 스크롤 트리거 생성
createScrollTrigger({
  onUpdate: ({ progress }) => {
    const number = Math.floor(progress.toFixed(2) * 83);
    onUpdateNumber(number);
  },
});

// sub-detail 스크롤 트리거 생성
matchMedia((isDesktop) => {
  return {
    // sub detail 타임라인
    animation: gsap.timeline().fromTo(
      '.sub-detail',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
      }
    ),
    start: `${isDesktop ? '9% top' : '53% top'}`,
    end: `${isDesktop ? '11% top' : '56% top'}`,
    scrub: 1,
  };
});

// img-outWrap 스크롤 트리거 생성
matchMedia((isDesktop) => {
  return {
    // img-outWrap 타임라인
    animation: gsap
      .timeline()
      .to('.img-outWrap', {
        x: '50%',
        duration: 1,
      })
      .to('.img-outWrap', {
        duration: `${isDesktop ? 8 : 5}`,
      }),
  };
});

// img-innerWrap 스크롤 트리거 생성
matchMedia((isDesktop) => {
  // img-innerWrap 타임라인
  const setImgTimeline = (isDesktop) => {
    const imgTimeline = gsap.timeline();
    const motions = {
      desktop: [
        { x: '-3%' },
        { y: '10%', scale: 0.95 },
        { y: '20%', scale: 0.9 },
        { y: '25%', scale: 0.84 },
        { y: '30%', scale: 0.77 },
        { y: '35%', scale: 0.7 },
        { y: '40%', scale: 0.62 },
        { scale: 0.52 },
        { scale: 0.47 },
        { x: '-1%', scale: 0.43 },
      ],
      mobile: [
        { x: '-10%' },
        { y: '10%', scale: 0.95 },
        { y: '20%', scale: 0.8 },
        { y: '25%', scale: 0.7 },
        { y: '30%', scale: 0.6 },
        { y: '40%', scale: 0.55 },
      ],
    };
    const currentView = isDesktop ? motions.desktop : motions.mobile;

    for (let index = 0; index < currentView.length; index++) {
      imgTimeline.to('.img-outWrap .img-innerWrap', currentView[index]);
    }

    return imgTimeline;
  };

  return {
    animation: setImgTimeline(isDesktop),
  };
});

// picture 스크롤 트리거 생성
matchMedia((isDesktop) => {
  return {
    // picture 타임라인
    animation: gsap
      .timeline()
      .to('.img-outWrap picture', {
        x: '-33.5%',
        duration: 1,
      })
      .to('.img-outWrap picture', {
        duration: `${isDesktop ? 8 : 5}`,
      }),
  };
});

// boxes inner elements 배열 생성
const getBoxes = (isDesktop) => {
  let currentBox = document.querySelector('.box.one');
  let boxes = [];

  while (currentBox?.children.length) {
    if (!isDesktop && currentBox.classList.value.includes('seven')) break;

    boxes = [...boxes, currentBox.children[0]];
    currentBox = currentBox.children[1];
  }

  return boxes;
};

// boxes 타임라인
const createBoxTimeline = (isDesktop) => {
  const boxTimeline = gsap.timeline();
  const motions = [{ x: '0%' }, { y: '0%' }];
  const boxes = getBoxes(isDesktop);

  boxes.forEach((box, index) => {
    if (index === 0) {
      boxTimeline.to(box, motions[0]).set('.img-outWrap', { zIndex: 0 });
      return;
    }

    boxTimeline.to(box, index % 2 ? motions[1] : motions[0]);
  });

  return boxTimeline;
};

// boxes 스크롤 트리거 생성
matchMedia((isDesktop) => {
  return { animation: createBoxTimeline(isDesktop) };
});
