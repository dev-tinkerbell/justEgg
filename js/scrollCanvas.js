// ------ 고민 : drawImage 사이즈 변경은 성능 이슈 됨
const canvas = document.getElementById('hero-lightpass');
const context = canvas.getContext('2d');
const seed = { frame: 0 };
const domainURL = `https://assets.ju.st/static/frames/v5/Learn-04-Sprout/`;
// const frameCount = 36;
const frameCount = 336;
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
const imageFrames = setImageFrames();
const renderCanvas = (isEnd = false) => {
  if (isEnd) {
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
  // 스크롤이 끝났을 때
  const scollEndEvent = () => renderCanvas(true);
  const scrollTriggerAddEvnet = () =>
    ScrollTrigger.addEventListener('scrollEnd', scollEndEvent);
  const scrollTriggerRemoveEvnet = () =>
    ScrollTrigger.removeEventListener('scrollEnd', scollEndEvent);

  return gsap.to(seed, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '.canvas-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,

      onUpdate: () => renderCanvas(),
      onEnter: () => scrollTriggerAddEvnet(),
      onEnterBack: () => scrollTriggerAddEvnet(),
      onLeave: () => {
        scollEndEvent();
        scrollTriggerRemoveEvnet();
      },
    },
  });
};

// 초기 세팅
const init = () => {
  renderCanvas();
  setSequenceAnimation();

  const loading = document.querySelector('.loading');
  loading.classList.add('active');

  setTimeout(() => {
    loading.style.display = 'none';
  }, 1000);
};

window.addEventListener('load', init);
