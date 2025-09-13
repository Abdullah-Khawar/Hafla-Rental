// Dynamic Service Page Handler
// This file handles loading different services dynamically based on URL parameters

document.addEventListener('DOMContentLoaded', function() {
    // Get service ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = parseInt(urlParams.get('id'));
    
    // Load the service data
    loadService(serviceId);
});

function loadService(serviceId) {
    // Check if service exists
    if (!SERVICES_DATA[serviceId]) {
        showError('Service not found');
        return;
    }
    
    const service = SERVICES_DATA[serviceId];
    
    // Update page title
    document.getElementById('page-title').textContent = `${service.title} - Hafla Rental`;
    
    // Update service title and description
    document.getElementById('service-title').textContent = service.title;
    document.getElementById('service-description').textContent = service.description;
    
    // Load images
    loadServiceImages(service);
    
    // Show/hide See More button based on image count
    const seeMoreContainer = document.getElementById('see-more-container');
    if (service.images.length > 8) {
        seeMoreContainer.style.display = 'block';
    } else {
        seeMoreContainer.style.display = 'none';
    }
}

function loadServiceImages(service) {
    const imageGrid = document.getElementById('image-grid');
    imageGrid.innerHTML = ''; // Clear existing images
    
    const images = service.images;
    const visibleCount = Math.min(8, images.length);
    
    // Create visible images
    for (let i = 0; i < visibleCount; i++) {
        const imageElement = createGalleryItem(images[i], i, service.id);
        imageGrid.appendChild(imageElement);
    }
    
    // Create hidden images (if more than 8)
    if (images.length > 8) {
        for (let i = 8; i < images.length; i++) {
            const imageElement = createGalleryItem(images[i], i, service.id, true);
            imageGrid.appendChild(imageElement);
        }
    }
}

function createGalleryItem(imagePath, index, serviceId, isHidden = false) {
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${isHidden ? 'hidden' : ''}`;
    galleryItem.setAttribute('data-aos', 'fade-up');
    galleryItem.setAttribute('data-aos-delay', `${(index + 1) * 100}`);
    
    galleryItem.innerHTML = `
        <div class="gallery-image-container">
            <img
                src="${imagePath}"
                alt="${SERVICES_DATA[serviceId].title} - Image ${index + 1}"
                loading="lazy"
            />
            <div class="image-overlay">
                <div class="overlay-content">
                    <span class="view-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return galleryItem;
}

function showError(message) {
    document.getElementById('service-title').textContent = 'Error';
    document.getElementById('service-description').textContent = message;
    document.getElementById('image-grid').innerHTML = '<p class="text-center text-gray-500">No images available</p>';
}

// FAQ Toggle Function
function toggleFAQ(faqId) {
    const content = document.getElementById(faqId + '-content');
    const icon = document.getElementById(faqId + '-icon');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Navigation Menu Toggle (from original service files)
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// MENU SHOW
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

// CONTACT US FORM HANDLING
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
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
    });

    sr.reveal('.home__header, .gallery-title', { delay: 500 });
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
    sr.reveal('.specs__img, .discount__img', { origin: 'right' });
    sr.reveal('.case__img', { origin: 'top' });
    sr.reveal('.case__data');
    sr.reveal('.animate', { origin: 'left', distance: '20px', interval: 200 });
}
