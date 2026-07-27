// Custom JavaScript - Anindita Travel Company Profile

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggler
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavLink = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // adjust offset for navbar height
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);

    // 3. Custom Video Player Controls
    const promoVideo = document.getElementById('promoVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const playBtn = document.getElementById('playBtn');
    const videoWrapper = document.querySelector('.video-wrapper');

    if (promoVideo && videoOverlay && playBtn && videoWrapper) {
        
        const playVideo = () => {
            promoVideo.play();
            videoWrapper.classList.add('playing');
        };

        const pauseVideo = () => {
            videoWrapper.classList.remove('playing');
        };

        playBtn.addEventListener('click', playVideo);
        videoOverlay.addEventListener('click', playVideo);

        // Listen for standard HTML5 control changes
        promoVideo.addEventListener('play', () => {
            videoWrapper.classList.add('playing');
        });

        promoVideo.addEventListener('pause', pauseVideo);
        promoVideo.addEventListener('ended', pauseVideo);
    }

    // 4. Booking Form WhatsApp Redirect
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('bookingName').value.trim();
            const service = document.getElementById('bookingService').value;
            const dateVal = document.getElementById('bookingDate').value;
            const origin = document.getElementById('bookingOrigin').value.trim();
            const destination = document.getElementById('bookingDest').value.trim();
            const notes = document.getElementById('bookingNotes').value.trim();
            
            // Format date to local Indonesian style (DD/MM/YYYY)
            let formattedDate = dateVal;
            if (dateVal) {
                const dateParts = dateVal.split('-');
                if (dateParts.length === 3) {
                    formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                }
            }

            // WhatsApp formatting template
            const waNumber = '6282333055574';
            const baseText = `Halo Anindita Travel,\n\nSaya ingin melakukan pemesanan jasa transportasi dengan detail berikut:\n\n` +
                             `👤 *Nama Lengkap:* ${name}\n` +
                             `💼 *Jenis Layanan:* ${service}\n` +
                             `📅 *Tanggal Keberangkatan:* ${formattedDate}\n` +
                             `📍 *Alamat Jemput/Asal:* ${origin}\n` +
                             `🏁 *Alamat Tujuan:* ${destination}\n` +
                             (notes ? `📝 *Catatan Tambahan:* ${notes}\n` : '') +
                             `\nMohon informasi ketersediaan unit dan rincian harganya. Terima kasih!`;
            
            // Encode text for URL compatibility
            const encodedText = encodeURIComponent(baseText);
            const waURL = `https://wa.me/${waNumber}?text=${encodedText}`;
            
            // Open in a new tab
            window.open(waURL, '_blank');
        });
    }

    // 5. Scroll Reveal Animation setup
    // Adding class scroll-reveal programmatically to elements for cleaner HTML
    const revealElements = [
        '.highlight-card',
        '.about-grid',
        '.section-header',
        '.service-card',
        '.fleet-card',
        '.video-grid',
        '.testimonial-card',
        '.contact-grid'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-reveal');
        });
    });

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Animates only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before coming into view
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
