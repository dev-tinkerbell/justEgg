export function scrollScaleImage() {
  console.log('scrollScaleImage');

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
      markers: true,
      onUpdate: ({ progress }) => {
        const number = Math.floor(progress.toFixed(2) * 83);
        onUpdateNumber(number);
      },
    },
  });
}
