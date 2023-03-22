// ------ 고민 : drawImage 사이즈 변경은 성능 이슈 됨

export function scrollCanvas() {
  const canvas = document.getElementById('hero-lightpass');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const images = [];
  const seed = {
    frame: 0,
  };

  const frameCount = 10;
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

    img.src = currentFrame(i);
    images.push(img);
  }

  gsap.to(seed, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '.canvas-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },

    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  });

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      images[seed.frame],
      0,
      0,
      window.innerWidth,
      (window.innerWidth / 16) * 2
    );
  }
}
