export function scrollScaleImage() {
  gsap.defaults({ ease: 'none' });
  // 스크롤에 따른 퍼센트 숫자 변경
  const numberElement = document.querySelector('.num i');
  const onUpdateNumber = (number) => {
    numberElement.textContent = number;
  };

  gsap.to('.num', {
    scrollTrigger: {
      trigger: '.lessLand-wrap',
      start: 'top top',
      end: '90% bottom',
      scrub: 1,
      onUpdate: ({ progress }) => {
        const number = Math.floor(progress.toFixed(2) * 83);
        onUpdateNumber(number);
      },
    },
  });

  // image, box 스크롤 트리거 기본 값
  const createScrollTrigger = (animation, obj) => {
    let defaults = {
      animation,
      trigger: '.lessLand-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    };

    ScrollTrigger.create({ ...defaults, ...obj });
  };

  // img-outWrap 타임라인
  const ImgWrapTimeline = gsap.timeline();
  ImgWrapTimeline.to('.img-outWrap', {
    x: '50%',
    duration: 1,
  }).to('.img-outWrap', {
    duration: 8,
  });

  // img-outWrap 스크롤 트리거 생성
  createScrollTrigger(ImgWrapTimeline);

  // img-innerWrap 타임라인
  // ---- 같은 element를 한번에 선언 할 수 있는 방법이 없을까? (중복코드 제거)
  const imgTimeline = gsap.timeline();
  imgTimeline
    .to('.img-outWrap .img-innerWrap', {
      x: '-5%',
    })
    .to('.img-outWrap .img-innerWrap', {
      y: '10%',
      scale: 0.92,
    })
    .to('.img-outWrap .img-innerWrap', {
      y: '20%',
      scale: 0.84,
    })
    .to('.img-outWrap .img-innerWrap', {
      scale: 0.77,
    })
    .to('.img-outWrap .img-innerWrap', {
      y: '30%',
      scale: 0.7,
    })
    .to('.img-outWrap .img-innerWrap', {
      y: '40%',
      scale: 0.62,
    })
    .to('.img-outWrap .img-innerWrap', {
      x: '-1%',
      scale: 0.52,
    })
    .to('.img-outWrap .img-innerWrap', {
      scale: 0.47,
    })
    .to('.img-outWrap .img-innerWrap', {
      scale: 0.43,
    });

  // img-innerWrap 스크롤 트리거 생성
  createScrollTrigger(imgTimeline);

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
  createScrollTrigger(pictureTimeline);

  // box 타임라인
  const boxTimeline = gsap.timeline();
  boxTimeline
    .to('.one > .inner', {
      x: '0%',
    })
    .set('.img-outWrap', {
      zIndex: 0,
    })
    .to('.two > .inner', {
      y: '0%',
    })
    .to('.three > .inner', {
      x: '0%',
    })
    .to('.four > .inner', {
      y: '0%',
    })
    .to('.five > .inner', {
      x: '0%',
    })
    .to('.six > .inner', {
      y: '0%',
    })
    .to('.seven > .inner', {
      x: '0%',
    })
    .to('.eight > .inner', {
      y: '0%',
    })
    .to('.nine > .inner', {
      x: '0%',
    });

  createScrollTrigger(boxTimeline, { markers: true });
}
