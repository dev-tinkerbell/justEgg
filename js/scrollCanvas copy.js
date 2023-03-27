// ------ 고민 : drawImage 사이즈 변경은 성능 이슈 됨

export function scrollCanvas() {
  const canvas = document.getElementById('hero-lightpass');
  const context = canvas.getContext('2d');

  const images = [];
  const seed = {
    frame: 0,
  };

  const frameCount = 30;
  // const frameCount = 336;
  const currentFrame = (index) => {
    const domainURL = `https://assets.ju.st/static/frames/v5/Learn-04-Sprout/`;
    const desktopJpg = `desktop-jpg/`;
    const desktopHighresJpg = `desktop-highres-jpg/`;
    const Learn04Sprout = `Learn-04-Sprout`;
    const imageName = `${index.toString().padStart(3, '0')}.jpg`;

    const imageURL = `${domainURL}${desktopJpg}${Learn04Sprout}${imageName}`;
    const highresImageURL = `${domainURL}${desktopHighresJpg}${Learn04Sprout}${imageName}`;

    // if (highresImageURL) return highresImageURL;
    return imageURL;
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    const highresImg = new Image();

    img.src = currentFrame(i);
    images.push(img);
  }

  const imageType = {
    normalImage: 'normalImage',
    highresImage: 'highresImage',
  };

  const domainURL = `https://assets.ju.st/static/frames/v5/Learn-04-Sprout/`;
  const normalImageURL = `${domainURL}desktop-jpg/Learn-04-Sprout`;
  const highresImageURL = `${domainURL}desktop-highres-jpg/Learn-04-Sprout`;

  const getImageFrame = (type) => {
    const imageFrames = [];
    const imageURL =
      type === imageType.normalImage ? normalImageURL : highresImageURL;

    for (let index = 0; index < frameCount; index++) {
      const image = new Image();
      image.src = `${imageURL}${index.toString().padStart(3, '0')}.jpg`;
      imageFrames.push(image);
    }

    return imageFrames;
  };

  // const highresImage2 = getImageFrame(imageType.highresImage);
  // console.log(highresImage2);

  // gsap animation
  gsap.to(seed, {
    frame: frameCount,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '.canvas-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,

      onUpdate: () => render(),
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

  images[0].onload = render;

  function render(isEnd) {
    if (isEnd) {
      return highresRender([seed.frame]);
    }

    context.drawImage(images[seed.frame], 0, 0, 1920, 1080);
  }

  function highresRender(index) {
    const image = new Image();
    image.src = `${domainURL}desktop-highres-jpg/Learn-04-Sprout${index
      .toString()
      .padStart(3, '0')}.jpg`;

    image.addEventListener('load', function () {
      context.drawImage(image, 0, 0, 1920, 1080);
    });
  }

  const scollEndEvent = () => render(true);
}
