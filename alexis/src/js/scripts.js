"use strict"

const img = document.querySelector('.part-one__img');
const video = document.querySelector('.part-one__video');
const videoShow = (event) => {

  event.target.style.display = "none";
  video.style.display = "block";
  video.setAttribute('autoplay', 'autoplay');
  video.setAttribute('loop', 'loop');
}
img.addEventListener('click', videoShow);

const videoClose = (event) => {
  
  img.style.display = "block";
  event.target.style.display = "none";
  video.removeAttribute('autoplay');
  video.removeAttribute('loop');
}
video.addEventListener('click', videoClose);

const nav = document.querySelector('.team__nav');
const links = nav.querySelectorAll('.team__link--after');
const tab = document.querySelector('.team__content');
let panes = tab.querySelectorAll('.team__panel');

const showTabs = (event) => {
  let e = event.target;
  event.preventDefault();
  Array.from(links, elem => elem.classList.remove('team__link--active'));

  if (!e.classList.contains('team__link--after')) {
    return false;
  }
  e.classList.add('team__link--active');

  Array.from(panes, elem => elem.classList.add('team__panel--active'));
  panes = Array.from(document.querySelectorAll(".team__panel--active:not("+ e.getAttribute('href')+")"));
  panes.map((elem) => elem.classList.remove('team__panel--active'));
}
nav.addEventListener('click', showTabs);

const scroll = document.querySelector(".scroll");

const scrollBlock = () => {
  setInterval(() => {
    if (window.pageYOffset > 800) {
      scroll.style.display = "block";
    } else {
      scroll.style.display = "none";
    }
  }, 1000);
}; 
window.addEventListener('wheel', scrollBlock);


const scrollTopUp = () => {
  const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if(top > 0) {
    window.scrollBy(0, -30);
    setTimeout("scrollTopUp()", 1);
  } else {
      return false;
    }   
};
scroll.addEventListener('click', scrollTopUp);