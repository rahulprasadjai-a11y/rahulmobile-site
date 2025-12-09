/* ========================================
   MOBILE MENU FUNCTIONALITY
   Add this JavaScript to your index.html before </body>
   ======================================== */

// Mobile Menu Toggle Function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    const body = document.body;
    
    // Toggle active classes
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Toggle icon between bars and times
    if (navLinks.classList.contains('active')) {
        menuBtn.classList.remove('fa-bars');
        menuBtn.classList.add('fa-times');
    } else {
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    }
}

// Close mobile menu when clicking on a navigation link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navLinksContainer = document.querySelector('.nav-links');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const menuBtn = document.querySelector('.mobile-menu-btn i');
            const body = document.body;
            
            // Only close if menu is open (mobile view)
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                menuBtn.classList.remove('fa-times');
                menuBtn.classList.add('fa-bars');
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navLinksContainer = document.querySelector('.nav-links');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const menuBtn = document.querySelector('.mobile-menu-btn i');
            const body = document.body;
            
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                menuBtn.classList.remove('fa-times');
                menuBtn.classList.add('fa-bars');
            }
        }
    });
});

// Prevent scroll on body when menu is open
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const body = document.body;
                if (body.classList.contains('menu-open')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true
    });
});
