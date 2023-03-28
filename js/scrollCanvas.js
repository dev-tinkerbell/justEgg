const canvas = document.getElementById('hero-lightpass');
const context = canvas.getContext('2d');
const imageType = {
  normalImage: 'normalImage',
  highresImage: 'highresImage',
};
const frameCount = 336;
const seed = { frame: 0 };
gsap.defaults({ ease: 'none' });

// 이미지 생성
const createImage = (type, index) => {
  const domainURL = `https://assets.ju.st/static/frames/v5/Learn-04-Sprout/`;
  const normalImageURL = `${domainURL}desktop-jpg/Learn-04-Sprout`;
  const highresImageURL = `${domainURL}desktop-highres-jpg/Learn-04-Sprout`;
  const imageURL =
    type === imageType.normalImage ? normalImageURL : highresImageURL;

  const image = new Image();
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
const imageFrames = setImageFrames();
const renderCanvas = (isEnd = false) => {
  const drawImage = (image) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, 1920, 1080);
  };

  if (isEnd) {
    const image = createImage(imageType.highresImage, seed.frame);

    image.addEventListener('load', () => {
      drawImage(image);
    });

    return;
  }

  drawImage(imageFrames[seed.frame], 0, 0, 1920, 1080);
};

// 시퀀스 애니메이션 생성
const createSequenceAnimation = () => {
  // 스크롤이 끝났을 때
  const scrollEndEvent = () => renderCanvas(true);
  const scrollTriggerAddEvnet = () =>
    ScrollTrigger.addEventListener('scrollEnd', scrollEndEvent);
  const scrollTriggerRemoveEvnet = () =>
    ScrollTrigger.removeEventListener('scrollEnd', scrollEndEvent);

  // 스크롤 트리거 animation 생성
  return gsap.to(seed, {
    frame: frameCount - 1,
    snap: 'frame',
    scrollTrigger: {
      trigger: '.canvas-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,

      onUpdate: () => renderCanvas(),
      onEnter: () => scrollTriggerAddEvnet(),
      onEnterBack: () => scrollTriggerAddEvnet(),
      onLeave: () => {
        scrollEndEvent();
        scrollTriggerRemoveEvnet();
      },
    },
  });
};

// scrollCanvas 초기 세팅
const init = () => {
  renderCanvas(true);
  createSequenceAnimation();

  const loading = document.querySelector('.loading');
  loading.classList.add('active');

  setTimeout(() => {
    loading.style.display = 'none';
  }, 1000);
};

window.addEventListener('load', init);
