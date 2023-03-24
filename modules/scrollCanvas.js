// ------ 고민 : drawImage 사이즈 변경은 성능 이슈 됨
export function scrollCanvas() {
  const canvas = document.getElementById('hero-lightpass');
  const context = canvas.getContext('2d');
  const seed = { frame: 0 };
  const domainURL = `https://assets.ju.st/static/frames/v5/Learn-04-Sprout/`;
  const frameCount = 30;
  const imageType = {
    normalImage: 'normalImage',
    highresImage: 'highresImage',
  };

  // 이미지 생성
  const createImage = (type, index) => {
    const image = new Image();
    const normalImageURL = `${domainURL}desktop-jpg/Learn-04-Sprout`;
    const highresImageURL = `${domainURL}desktop-highres-jpg/Learn-04-Sprout`;

    const imageURL =
      type === imageType.normalImage ? normalImageURL : highresImageURL;

    image.src = `${imageURL}${index.toString().padStart(3, '0')}.jpg`;
    return image;
  };

  // 이미지 프레임 배열 세팅
  const setImageFrames = () => {
    let imageFrames = [];
    for (let index = 0; index < frameCount; index++) {
      imageFrames = [...imageFrames, createImage(imageType.normalImage, index)];
    }

    return imageFrames;
  };

  // canvas에 이미지 그리기
  // !-----  Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or OffscreenCanvas or SVGImageElement or VideoFrame)'
  const imageFrames = setImageFrames();
  const renderCanvas = (isEnd) => {
    console.log('render');

    if (isEnd) {
      console.log('end');
      const image = createImage(imageType.highresImage, seed.frame);

      image.addEventListener('load', function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, 1920, 1080);
      });
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageFrames[seed.frame], 0, 0, 1920, 1080);
  };

  // 스크롤 애니메이션 생성
  const setSequenceAnimation = () => {
    const scollEndEvent = () => renderCanvas(true);
    // 스크롤이 끝났을 때
    const scrollTriggerAddEvnet = ScrollTrigger.addEventListener(
      'scrollEnd',
      scollEndEvent
    );
    const scrollTriggerRemoveEvnet = ScrollTrigger.removeEventListener(
      'scrollEnd',
      scollEndEvent
    );

    return gsap.to(seed, {
      frame: frameCount,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: '.canvas-wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,

        onUpdate: () => renderCanvas('gsap'),
        onLeave: () => {
          ScrollTrigger.removeEventListener('scrollEnd', scollEndEvent);
        },
        onEnter: () => {
          ScrollTrigger.addEventListener('scrollEnd', scollEndEvent);
        },
        onEnterBack: () => {
          ScrollTrigger.addEventListener('scrollEnd', scollEndEvent);
        },
      },
    });
  };

  // 초기 세팅
  imageFrames[0].addEventListener('load', () => {
    renderCanvas('init');
    setSequenceAnimation();
  });
}
