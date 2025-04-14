document.addEventListener("DOMContentLoaded", function () {
  const imageGrid = document.getElementById("image-grid");
  const loadMoreButton = document.getElementById("load-more");
  
  // Array of image sources
  const images = [
   
    'service7_images/1.jpg',
    'service7_images/2.jpg',
    'service7_images/3.jpg',
    'service7_images/4.jpg',
    'service7_images/5.jpg',
    'service7_images/6.jpg',
    'service7_images/7.jpg',
    'service7_images/8.jpg',
    'service7_images/9.jpg',
    'service7_images/10.jpg',
    'service7_images/11.jpg',
    'service7_images/12.jpg',
    'service7_images/13.jpg',
    'service7_images/14.jpg',
    'service7_images/15.jpg',
    'service7_images/16.jpg',
    'service7_images/17.jpg',
    'service7_images/18.jpg',
    'service7_images/19.jpg',
    'service7_images/20.jpg',
    'service7_images/21.jpg',
    'service7_images/22.jpg',
    'service7_images/23.jpg',
    'service7_images/24.jpg',
    'service7_images/25.jpg',
    'service7_images/26.jpg',
    'service7_images/27.jpg',
    'service7_images/28.jpg',
    'service7_images/29.jpg',
    'service7_images/30.jpg',
    'service7_images/31.jpg',
    'service7_images/32.jpg',
    'service7_images/33.jpg',
    'service7_images/34.jpg',
    'service7_images/35.jpg',
    'service7_images/36.jpg',
    'service7_images/37.jpg',
    'service7_images/38.jpg',
    'service7_images/39.jpg',
    'service7_images/40.jpg',
    'service7_images/41.jpg',
    'service7_images/42.jpg',
  ];

  let currentImageCount = 42;  // Initial images are already loaded
  const imagesToShowInitially = 12;
  const imagesToLoadMore = 12;

  // Function to load images
  function loadImages(count) {
    for (let i = currentImageCount; i < currentImageCount + count && i < images.length; i++) {
      const imgElement = document.createElement("img");
      imgElement.src = images[i];
      imgElement.alt = `Bouncy Castle ${i + 1}`;
      imageGrid.appendChild(imgElement);
    }
    currentImageCount += count;

    // Hide Load More button if all images are loaded
    if (currentImageCount >= images.length) {
      loadMoreButton.style.display = "none";
    }
  }

  // Load initial set of images
  loadMoreButton.addEventListener("click", function () {
    loadImages(imagesToLoadMore);
  });
});


// SHOW MENU
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// MENU SHOW --> VALIDATION
if (navToggle) {
  navToggle.addEventListener('click', function () {
    navMenu.classList.add('show-menu');
    navClose.style.top = '1.5rem';
  });
}

// MENU HIDE
if (navClose) {
  navClose.addEventListener('click', function () {
    navMenu.classList.remove('show-menu');
    navClose.style.top = '-100rem';
  });
}

// REMOVE MENU FROM MOBILE
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

// CHANGE HEADER BG-COLOR ON SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', function () {
  if (this.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
});

// SCROLLUP --> SHOW ON SCROLL
window.addEventListener('scroll', function () {
  const scrollUp = document.getElementById('scroll-up');

  if (this.scrollY >= 200) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
});


// CONTACT US

const inputs = document.querySelectorAll(".contact__container .input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});



// SCROLL REVEAL
const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  delay: 400,
});

sr.reveal('.home__header, section__title', { delay: 500 });
sr.reveal('.home__footer', { delay: 600 });
sr.reveal('.home__img', { delay: 800, origin: 'top' });
sr.reveal(
  '.sponser__img, .products__card, .footer__logo, .footer__content, .footer__copy',
  { interval: 100, origin: 'top' }
);
sr.reveal('.specs__data, .discount__animate', {
  interval: 100,
  origin: 'left',
});
sr.reveal('.specs__img,  .discount__img', { origin: 'right' });
sr.reveal('.case__img', { origin: 'top' });
sr.reveal('.case__data');
sr.reveal('.animate', { origin: 'left', distance: '20px', interval: 200 });

