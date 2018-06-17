"use strict";

var scroll = document.querySelector(".scroll");

var scrollBlock = function scrollBlock() {
  setInterval(function () {
    if (window.pageYOffset > 800) {
      scroll.style.display = "block";
    } else {
      scroll.style.display = "none";
    }
  }, 1000);
};
window.addEventListener('wheel', scrollBlock);

var scrollTopUp = function scrollTopUp() {
  var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -10);
    setTimeout("scrollTopUp()", 1);
  } else {
    return false;
  }
};
scroll.addEventListener('click', scrollTopUp);