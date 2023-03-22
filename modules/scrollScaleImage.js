export function scrollScaleImage() {
  gsap.defaults({ ease: 'none' });

  // content 스크롤 애니메이션
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

  createScrollTrigger({
    onUpdate: ({ progress }) => {
      const number = Math.floor(progress.toFixed(2) * 83);
      onUpdateNumber(number);
    },
  });

  // sub detaile 타임라인
  const subDetailTimeline = gsap.timeline();
  subDetailTimeline.fromTo(
    '.sub-detail',
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
    }
  );

  // sub detaile 스크롤 트리거 생성
  createScrollTrigger({
    animation: subDetailTimeline,
    start: '9% top',
    end: '11% top',
    scrub: 1,
  });

  // img-outWrap 타임라인
  const ImgWrapTimeline = gsap.timeline();
  ImgWrapTimeline.to('.img-outWrap', {
    x: '50%',
    duration: 1,
  }).to('.img-outWrap', {
    duration: 8,
  });

  // img-outWrap 스크롤 트리거 생성
  createScrollTrigger({ animation: ImgWrapTimeline });

  // img-innerWrap 타임라인
  const createImgTimeline = () => {
    const imgTimeline = gsap.timeline();
    const motions = [
      { x: '-5%' },
      { y: '10%', scale: 0.92 },
      { y: '20%', scale: 0.84 },
      { y: '20%', scale: 0.84 },
      { scale: 0.77 },
      { y: '30%', scale: 0.7 },
      { y: '40%', scale: 0.62 },
      { x: '-1%', scale: 0.52 },
      { scale: 0.47 },
      { scale: 0.43 },
    ];

    for (let index = 0; index < motions.length; index++) {
      imgTimeline.to('.img-outWrap .img-innerWrap', motions[index]);
    }

    return imgTimeline;
  };

  // img-innerWrap 스크롤 트리거 생성
  createScrollTrigger({ animation: createImgTimeline() });

  // picture 타임라인
  const pictureTimeline = gsap.timeline();
  pictureTimeline
    .to('.img-outWrap picture', {
      x: '-33.5%',
      duration: 1,
    })
    .to('.img-outWrap picture', {
      duration: 8,
    });

  // picture 스크롤 트리거 생성
  createScrollTrigger({ animation: pictureTimeline });

  const getBoxes = () => {
    let currentBox = document.querySelector('.box.one');
    let boxes = [];

    while (currentBox?.children.length) {
      boxes = [...boxes, currentBox.children[0]];
      currentBox = currentBox.children[1];
    }
    return boxes;
  };

  const createBoxTimeline = () => {
    const boxTimeline = gsap.timeline();
    const motions = [{ x: '0%' }, { y: '0%' }];
    const boxes = getBoxes();

    boxes.forEach((box, index) => {
      if (index === 0) {
        boxTimeline.to(box, motions[0]).set('.img-outWrap', { zIndex: 0 });
        return;
      }

      boxTimeline.to(box, index % 2 ? motions[1] : motions[0]);
    });

    return boxTimeline;
  };

  createScrollTrigger({ animation: createBoxTimeline() });
}
