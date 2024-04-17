const UTILS = (function () {
  return {
    isTouchDevice: (function () {
      var checkDevice = "ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch);
      checkDevice ? document.documentElement.classList.add("isTouchDevice") : document.documentElement.classList.add("isNotTouchDevice");
      return checkDevice;
    })(),
  };
})();
