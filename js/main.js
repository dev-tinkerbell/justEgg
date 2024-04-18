const UTILS = (function () {
  return {
    isIosDevice: (function () {
      var isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
      isIos ? document.documentElement.classList.add("isIosDevice") : document.documentElement.classList.add("isNotIosDevice");
      return isIos;
    })(),
    isTouchDevice: (function () {
      var checkDevice = "ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch);
      checkDevice ? document.documentElement.classList.add("isTouchDevice") : document.documentElement.classList.add("isNotTouchDevice");
      return checkDevice;
    })(),
  };
})();
