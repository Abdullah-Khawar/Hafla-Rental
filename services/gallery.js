// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const seeMoreBtn = document.getElementById('see-more-btn');
    const galleryItems = document.querySelectorAll('.gallery-item.hidden');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    let allGalleryImages = [];

    // Initialize AOS (Animate on Scroll) library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false
        });
    }

    // Collect all gallery images for lightbox functionality
    document.querySelectorAll('.gallery-image-container img').forEach(img => {
        allGalleryImages.push({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        });
    });

    // See More button functionality
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            // Toggle visibility of hidden items with a staggered animation
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.animation = 'fadeIn 0.6s ease-out forwards';
                }, index * 100); // Stagger the animations
            });

            // Update button text and animate
            this.innerHTML = `
                <span>Show Less</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
            `;

            // Toggle button functionality
            this.removeEventListener('click', arguments.callee);
            this.addEventListener('click', function() {
                galleryItems.forEach(item => {
                    item.classList.add('hidden');
                });

                this.innerHTML = `
                    <span>See More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                `;

                // Scroll back to gallery top
                document.querySelector('.service-gallery-container').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });

                // Reset the button event
                this.removeEventListener('click', arguments.callee);
                document.addEventListener('DOMContentLoaded', arguments.callee);
            });
        });
    }

    // Lightbox functionality
    document.querySelectorAll('.gallery-image-container').forEach((container, index) => {
        container.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Function to open lightbox with specific image
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = allGalleryImages[index].src;
        lightboxImage.alt = allGalleryImages[index].alt;
        lightbox.classList.add('active');
        
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1)';
            lightboxImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 10);
    }

    // Close lightbox function
    function closeLightboxFunc() {
        // Add exit animation
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Close lightbox when clicking on close button
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunc);
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    // Navigate to previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
            
            // Add transition animation
            lightboxImage.style.opacity = '0';
            lightboxImage.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                lightboxImage.src = allGalleryImages[currentImageIndex].src;
                lightboxImage.alt = allGalleryImages[currentImageIndex].alt;
                
                lightboxImage.style.transform = 'translateX(0)';
                lightboxImage.style.opacity = '1';
            }, 200);
        });
    }

    // Navigate to next image
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
            
            // Add transition animation
            lightboxImage.style.opacity = '0';
            lightboxImage.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                lightboxImage.src = allGalleryImages[currentImageIndex].src;
                lightboxImage.alt = allGalleryImages[currentImageIndex].alt;
                
                lightboxImage.style.transform = 'translateX(0)';
                lightboxImage.style.opacity = '1';
            }, 200);
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeLightboxFunc();
        }
    });

    // Add hover effects to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        });
    });

    // Optional: Add lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});