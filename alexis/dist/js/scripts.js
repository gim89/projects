"use strict";

var img = document.querySelector('.part-one__img');
var video = document.querySelector('.part-one__video');
var videoShow = function videoShow(event) {

  event.target.style.display = "none";
  video.style.display = "block";
  video.setAttribute('autoplay', 'autoplay');
  video.setAttribute('loop', 'loop');
};
img.addEventListener('click', videoShow);

var videoClose = function videoClose(event) {

  img.style.display = "block";
  event.target.style.display = "none";
  video.removeAttribute('autoplay');
  video.removeAttribute('loop');
};
video.addEventListener('click', videoClose);

var nav = document.querySelector('.team__nav');
var links = nav.querySelectorAll('.team__link--after');
var tab = document.querySelector('.team__content');
var panes = tab.querySelectorAll('.team__panel');

var showTabs = function showTabs(event) {
  var e = event.target;
  event.preventDefault();
  Array.from(links, function (elem) {
    return elem.classList.remove('team__link--active');
  });

  if (!e.classList.contains('team__link--after')) {
    return false;
  }
  e.classList.add('team__link--active');

  Array.from(panes, function (elem) {
    return elem.classList.add('team__panel--active');
  });
  panes = Array.from(document.querySelectorAll(".team__panel--active:not(" + e.getAttribute('href') + ")"));
  panes.map(function (elem) {
    return elem.classList.remove('team__panel--active');
  });
};
nav.addEventListener('click', showTabs);

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
    window.scrollBy(0, -30);
    setTimeout("scrollTopUp()", 1);
  } else {
    return false;
  }
};
scroll.addEventListener('click', scrollTopUp);