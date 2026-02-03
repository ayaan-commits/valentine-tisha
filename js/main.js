// ============================================
// CONFIGURATION - Ayaan & Tisha's Story
// ============================================

// Track active intervals for cleanup
const activeIntervals = {
    hearts: null,
    loveCounter: null,
    valentineCountdown: null,
    rotatingQuotes: null,
    carouselAutoPlay: null
};

// Rate limiting for confetti
let lastConfettiTime = 0;
const CONFETTI_COOLDOWN = 500; // ms

const CONFIG = {
    // Password for vault (DDMMYYYY format) - The day we first saw each other
    password: "29052025",

    // Your partner's name (shown in hero)
    partnerName: "Tisha",

    // Start date of relationship (for love counter) - When we officially started dating
    relationshipStart: new Date("2025-11-22"),

    // Valentine's Day date (for countdown)
    valentineDate: new Date("2026-02-14"),

    // Reasons why you love them
    loveReasons: [
        "The way you came to my standup show and changed my life forever",
        "How you make every trip feel like an adventure",
        "Your energy during Navratri - dancing, eating, just being with you",
        "That Diwali night when we cooked, danced, and clicked photos together",
        "The late night calls and all-day texts that never get boring",
        "How naturally we went from strangers to staying together",
        "You make me feel like the luckiest guy at every standup show",
        "The way you walked into my life that day near the football ground",
        "How you looked in white that day - I still remember",
        "Simply because you're YOU - and that's more than enough"
    ],

    // Open When letter messages
    openWhenMessages: {
        miss: "Hey Tisha... Remember that day near the football ground? That's when everything started. Close your eyes and think about our Navratri nights, our Diwali cooking session, our trips together. I'm always with you, even when we're apart. Miss you too. - Ayaan",
        sad: "Hey Tisha... Whatever is making you sad right now, it will pass. You're stronger than you know, braver than you believe, and more loved than you can imagine. I'm here for you, always. - Ayaan",
        happy: "Tisha! Your happiness is my happiness! Seeing you smile makes my heart do backflips. You deserve all the joy in the world. - Ayaan",
        sleep: "Hey... Can't sleep? Just close your eyes and imagine us together. Count our memories instead of sheep. Sweet dreams. - Ayaan"
    },

    // Main love letter
    loveLetter: `Hey Tisha...

Remember 29th May 2025? I was on stage, you were in the audience - in white, laughing at my jokes. That moment changed everything.

Then came 3rd June - the football ground. That "coincidence" turned into conversations, then calls, then texts all day long.

From your birthday trip to Navratri week to Diwali night - every moment with you has been magical.

On 22nd November 2025, we made it official. And since then? We've never looked back.

You walked into my standup show as a stranger and became my everything.

Thank you for choosing me. Thank you for being you.

Forever yours,
Ayaan`
};

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('hearts-bg');
    if (!container) return;

    // Clear existing interval if any
    if (activeIntervals.hearts) {
        clearInterval(activeIntervals.hearts);
    }

    // Mix of pink hearts + grey and blue hearts for their colors
    const hearts = ['💕', '💖', '💗', '💓', '💙', '🩶', '💜', '🤍', '💘', '🩵'];
    const MAX_HEARTS = 15; // Limit concurrent hearts to prevent memory issues

    activeIntervals.hearts = setInterval(() => {
        // Don't create new hearts if we've hit the limit
        if (container.children.length >= MAX_HEARTS) return;

        const heart = document.createElement('span');
        heart.className = 'floating-heart-bg';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (8 + Math.random() * 8) + 's';
        heart.style.fontSize = (16 + Math.random() * 20) + 'px';
        container.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 16000);
    }, 1000); // Reduced frequency from 600ms to 1000ms
}

// ============================================
// CONFETTI (with rate limiting)
// ============================================
function fireConfetti() {
    if (typeof confetti === 'undefined') {
        console.warn('Confetti library not loaded');
        return;
    }

    // Rate limiting to prevent spam
    const now = Date.now();
    if (now - lastConfettiTime < CONFETTI_COOLDOWN) return;
    lastConfettiTime = now;

    try {
        const duration = 3000;
        const end = Date.now() + duration;
        // Mix of grey (her), blue (his), and pink (love)
        const colors = ['#6b7280', '#9ca3af', '#3b82f6', '#60a5fa', '#ff6b9d', '#ffc2d1'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    } catch (error) {
        console.error('Confetti animation failed:', error);
    }
}

function fireHeartConfetti() {
    if (typeof confetti === 'undefined') return;

    try {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            shapes: ['circle'],
            colors: ['#6b7280', '#3b82f6', '#ff6b9d', '#60a5fa', '#9ca3af']
        });
    } catch (error) {
        console.error('Heart confetti failed:', error);
    }
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function typeWriter(element, text, speed = 30, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// ============================================
// VAULT / PASSWORD SYSTEM
// ============================================
function initVault() {
    const keyButtons = document.querySelectorAll('.key-btn');
    const pinDots = document.querySelectorAll('.pin-dot');
    const unlockBtn = document.getElementById('unlock-btn');
    const vaultSection = document.getElementById('vault-section');
    const mainContent = document.getElementById('main-content');

    let enteredPin = '';

    keyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;

            if (key === 'delete') {
                enteredPin = enteredPin.slice(0, -1);
            } else if (enteredPin.length < 8) {
                enteredPin += key;
            }

            // Update dots
            pinDots.forEach((dot, index) => {
                dot.classList.toggle('filled', index < enteredPin.length);
            });

            // Enable/disable unlock button
            unlockBtn.disabled = enteredPin.length !== 8;
        });
    });

    unlockBtn.addEventListener('click', () => {
        if (enteredPin === CONFIG.password) {
            // Success - unlock
            fireConfetti();
            vaultSection.style.display = 'none';
            mainContent.style.display = 'block';
            initMainContent();
        } else {
            // Wrong password - shake
            const container = document.querySelector('.vault-container');
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 400);

            // Reset
            enteredPin = '';
            pinDots.forEach(dot => dot.classList.remove('filled'));
            unlockBtn.disabled = true;
        }
    });
}

// ============================================
// LOVE COUNTER (Time together)
// ============================================
function updateLoveCounter() {
    const counter = document.getElementById('love-counter');
    if (!counter) return;

    try {
        const now = new Date();
        const diff = now - CONFIG.relationshipStart;

        // Handle future date edge case
        if (diff < 0) {
            counter.textContent = 'Starting soon...';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        counter.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    } catch (error) {
        console.error('Love counter update failed:', error);
    }
}

// ============================================
// VALENTINE COUNTDOWN (with animation)
// ============================================
let prevCountdownValues = { days: null, hours: null, mins: null, secs: null };

function updateValentineCountdown() {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');

    if (!daysEl) return;

    try {
        const now = new Date();
        let valentine = new Date(CONFIG.valentineDate);

        // If Valentine's has passed, count to next year
        if (now > valentine) {
            valentine.setFullYear(valentine.getFullYear() + 1);
        }

        const diff = valentine - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            // Update with pulse animation when value changes
            updateCountdownValue(daysEl, days, 'days');
            updateCountdownValue(hoursEl, hours, 'hours');
            updateCountdownValue(minsEl, mins, 'mins');
            updateCountdownValue(secsEl, secs, 'secs');
        } else {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
        }
    } catch (error) {
        console.error('Countdown update failed:', error);
    }
}

function updateCountdownValue(element, value, key) {
    const formattedValue = String(value).padStart(2, '0');
    if (prevCountdownValues[key] !== value) {
        element.textContent = formattedValue;
        element.classList.add('pulse');
        setTimeout(() => element.classList.remove('pulse'), 300);
        prevCountdownValues[key] = value;
    }
}

// ============================================
// ROTATING HERO QUOTES
// ============================================
function initRotatingQuotes() {
    const quoteEl = document.getElementById('rotating-quote');
    if (!quoteEl) return;

    // Clear existing interval
    if (activeIntervals.rotatingQuotes) {
        clearInterval(activeIntervals.rotatingQuotes);
    }

    const quotes = [
        '"From the audience to my heart - you\'re my best act."',
        '"You walked in as a stranger, now you\'re my everything."',
        '"Every moment with you feels like magic."',
        '"My favorite notification is a text from you."',
        '"You make ordinary days feel extraordinary."',
        '"In a room full of people, my eyes search for you."'
    ];

    let currentIndex = 0;

    function showQuote() {
        quoteEl.style.opacity = '0';

        setTimeout(() => {
            quoteEl.textContent = quotes[currentIndex];
            quoteEl.style.opacity = '1';
            currentIndex = (currentIndex + 1) % quotes.length;
        }, 500);
    }

    // Show first quote immediately
    quoteEl.textContent = quotes[0];
    currentIndex = 1;

    // Rotate quotes every 4 seconds
    activeIntervals.rotatingQuotes = setInterval(showQuote, 4000);
}

// ============================================
// SHOWER WITH LOVE (Heart burst)
// ============================================
function initShowerBtn() {
    const showerBtn = document.getElementById('shower-btn');
    if (!showerBtn) return;

    showerBtn.addEventListener('click', () => {
        fireHeartConfetti();
        setTimeout(fireHeartConfetti, 200);
        setTimeout(fireHeartConfetti, 400);
        setTimeout(fireConfetti, 600);
    });
}

// ============================================
// ENVELOPE / LOVE LETTER
// ============================================
function initEnvelope() {
    const envelope = document.getElementById('envelope-wrapper');
    const modal = document.getElementById('letter-modal');
    const closeBtn = document.getElementById('close-letter');
    const letterBody = document.getElementById('letter-body');

    if (!envelope) return;

    envelope.addEventListener('click', () => {
        modal.classList.add('active');
        letterBody.textContent = '';
        typeWriter(letterBody, CONFIG.loveLetter, 20);
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ============================================
// WHY I LOVE YOU - CLASSY CAROUSEL
// ============================================
function initLoveReasons() {
    const carousel = document.getElementById('love-carousel');
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!carousel || !track || !dotsContainer) return;

    let currentIndex = 0;
    let cardWidth = 345; // card width + gap
    let visibleCards = 3;

    // Clear existing auto-play interval
    if (activeIntervals.carouselAutoPlay) {
        clearInterval(activeIntervals.carouselAutoPlay);
    }

    // Use DocumentFragment for batch DOM operations (better performance)
    const cardsFragment = document.createDocumentFragment();
    const dotsFragment = document.createDocumentFragment();

    // Create reason cards
    CONFIG.loveReasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.setAttribute('role', 'listitem');
        card.innerHTML = `
            <span class="reason-quote-icon">❝</span>
            <div class="reason-index">${String(index + 1).padStart(2, '0')}</div>
            <p class="reason-text">${reason}</p>
            <span class="reason-heart">💙</span>
        `;
        cardsFragment.appendChild(card);
    });
    track.appendChild(cardsFragment); // Single reflow instead of multiple

    // Create dots
    CONFIG.loveReasons.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to reason ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsFragment.appendChild(dot);
    });
    dotsContainer.appendChild(dotsFragment); // Single reflow

    // Calculate dimensions based on screen size
    function updateDimensions() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 600) {
            visibleCards = 1;
            cardWidth = 285;
        } else if (screenWidth <= 900) {
            visibleCards = 2;
            cardWidth = 305;
        } else {
            visibleCards = 3;
            cardWidth = 345;
        }
    }

    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = CONFIG.loveReasons.length - visibleCards;
        currentIndex = Math.max(0, Math.min(index, maxIndex));

        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Next/Prev functions
    function nextSlide() {
        const maxIndex = CONFIG.loveReasons.length - visibleCards;
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(CONFIG.loveReasons.length - visibleCards); // Loop to end
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoPlay();
        }
    }

    // Auto-play using tracked interval
    function startAutoPlay() {
        activeIntervals.carouselAutoPlay = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        if (activeIntervals.carouselAutoPlay) {
            clearInterval(activeIntervals.carouselAutoPlay);
        }
        startAutoPlay();
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        if (activeIntervals.carouselAutoPlay) {
            clearInterval(activeIntervals.carouselAutoPlay);
        }
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Handle resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateDimensions();
            goToSlide(currentIndex);
        }, 150);
    });

    // Initialize
    updateDimensions();
    goToSlide(0);
    startAutoPlay();
}

// ============================================
// OPEN WHEN LETTERS
// ============================================
function initOpenWhenLetters() {
    const letterCards = document.querySelectorAll('.letter-card');
    const modal = document.getElementById('open-when-modal');
    const closeBtn = document.getElementById('close-open-when');
    const titleEl = document.getElementById('open-when-title');
    const messageEl = document.getElementById('open-when-message');

    letterCards.forEach(card => {
        card.addEventListener('click', () => {
            const letterType = card.dataset.letter;
            const titles = {
                miss: "When You Miss Me...",
                sad: "When You're Sad...",
                happy: "When You're Happy...",
                sleep: "When You Can't Sleep..."
            };

            titleEl.textContent = titles[letterType];
            messageEl.textContent = CONFIG.openWhenMessages[letterType];
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ============================================
// BE MY VALENTINE - RUNAWAY BUTTON
// ============================================
function initQuestion() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const counter = document.getElementById('no-counter');
    const questionSection = document.getElementById('question-section');

    if (!yesBtn || !noBtn) return;

    let escapeCount = 0;
    const maxEscapes = 10;

    const noTexts = [
        "No 😢",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Please?",
        "Pretty please?",
        "Don't do this...",
        "I'm begging!",
        "Last chance!",
        "Fine... 😢"
    ];

    const yesTexts = [
        "Yes! ❤️",
        "YES! ❤️",
        "YESSS! ❤️",
        "SAY YES!",
        "CLICK ME!",
        "PLEASE!",
        "YESYESYES!"
    ];

    function moveNoButton() {
        escapeCount++;

        noBtn.textContent = noTexts[Math.min(escapeCount, noTexts.length - 1)];
        yesBtn.textContent = yesTexts[Math.min(escapeCount, yesTexts.length - 1)];

        const scale = 1 + (escapeCount * 0.12);
        yesBtn.style.transform = `scale(${Math.min(scale, 2)})`;

        const rect = questionSection.getBoundingClientRect();
        const padding = 80;
        const maxX = rect.width - noBtn.offsetWidth - padding;
        const maxY = rect.height - noBtn.offsetHeight - padding;

        const randomX = padding + Math.random() * (maxX - padding);
        const randomY = padding + Math.random() * (maxY - padding);

        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '100';

        counter.textContent = `No button escaped ${escapeCount} times! 🤣`;

        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 400);

        if (escapeCount >= maxEscapes) {
            noBtn.style.transform = 'scale(0.3)';
            noBtn.style.opacity = '0.4';
            noBtn.textContent = '😢';
            noBtn.style.pointerEvents = 'none';
            counter.textContent = `The No button gave up! 😂`;
        }
    }

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    noBtn.addEventListener('mouseenter', () => {
        if (escapeCount < maxEscapes) {
            moveNoButton();
        }
    });

    yesBtn.addEventListener('click', () => {
        fireConfetti();
        fireHeartConfetti();
        setTimeout(fireConfetti, 500);
        setTimeout(fireHeartConfetti, 1000);

        // Scroll to surprise section
        document.getElementById('surprise-section').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// GIFT BOX SURPRISE
// ============================================
function initGiftBox() {
    const giftBox = document.getElementById('gift-box');
    const surpriseContent = document.getElementById('surprise-content');
    const finalYes = document.getElementById('final-yes');
    const finalSection = document.getElementById('final-section');
    const finalMessage = document.getElementById('final-message');

    if (!giftBox) return;

    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');

        setTimeout(() => {
            giftBox.style.display = 'none';
            surpriseContent.style.display = 'block';
            fireConfetti();
            fireHeartConfetti();
        }, 500);
    });

    if (finalYes) {
        finalYes.addEventListener('click', () => {
            fireConfetti();
            fireHeartConfetti();

            // Hide surprise section content
            document.getElementById('surprise-section').style.display = 'none';

            // Show final section
            finalSection.style.display = 'flex';
            finalSection.scrollIntoView({ behavior: 'smooth' });

            // Type the final message
            typeWriter(finalMessage, CONFIG.loveLetter, 25, () => {
                fireHeartConfetti();
            });
        });
    }
}

// ============================================
// MUSIC PLAYER
// ============================================
function initMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    const audio = document.getElementById('bg-music');
    const playIcon = playBtn?.querySelector('.play-icon');

    if (!playBtn || !audio || !playIcon) return;

    let isPlaying = false;

    // Handle audio load error
    audio.addEventListener('error', () => {
        console.warn('Music file not found or failed to load');
        playBtn.style.opacity = '0.5';
        playBtn.style.cursor = 'not-allowed';
        playBtn.disabled = true;
    });

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.innerHTML = '&#9654;'; // Play icon
            isPlaying = false;
        } else {
            audio.play()
                .then(() => {
                    playIcon.innerHTML = '&#10074;&#10074;'; // Pause icon
                    isPlaying = true;
                })
                .catch(e => {
                    console.log('Audio autoplay blocked. User must interact first.');
                    playIcon.innerHTML = '&#9654;'; // Reset to play icon
                    isPlaying = false;
                });
        }
    });
}

// ============================================
// UPDATE PARTNER NAME
// ============================================
function updatePartnerName() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.textContent = CONFIG.partnerName;
    }
}

// ============================================
// SCROLL ANIMATIONS (Timeline + General)
// ============================================
function initScrollAnimations() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item-modern');
    const progressFill = document.getElementById('timeline-progress');
    const storySection = document.getElementById('story-section');

    // Generic scroll observer for fade-in elements
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to save resources
                    observer.unobserve(entry.target);
                }, index * 80);
            }
        });
    }, observerOptions);

    // Observe timeline items
    timelineItems.forEach(item => {
        fadeInObserver.observe(item);
    });

    // Timeline progress bar
    if (progressFill && storySection) {
        function updateProgress() {
            const sectionRect = storySection.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Only update if section is in viewport (optimization)
            if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
                return;
            }

            const scrolledPast = windowHeight - sectionTop;
            const totalScrollable = sectionHeight + windowHeight;
            let progress = (scrolledPast / totalScrollable) * 100;

            progress = Math.max(0, Math.min(100, progress));
            progressFill.style.height = progress + '%';
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true }); // Passive listener for better scroll performance

        updateProgress();
    }

    // Initial visibility check for elements already in view
    setTimeout(() => {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add('visible');
            }
        });
    }, 300);
}

// ============================================
// PHOTO GALLERY LIGHTBOX
// ============================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDate = document.getElementById('lightbox-date');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!galleryItems.length || !lightbox) return;

    let currentIndex = 0;
    const images = [];

    // Collect all images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.dataset.caption || '';
        const date = item.dataset.date || '';

        images.push({
            src: img ? img.src : '',
            caption: caption,
            date: date,
            hasImage: img && img.src && !item.classList.contains('no-image')
        });

        // Click to open lightbox
        item.addEventListener('click', () => {
            if (images[index].hasImage) {
                openLightbox(index);
            }
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const current = images[currentIndex];
        if (current.hasImage) {
            lightboxImage.src = current.src;
            lightboxTitle.textContent = current.caption;
            lightboxDate.textContent = current.date;
        }
    }

    function nextImage() {
        // Find next image that exists
        let nextIndex = (currentIndex + 1) % images.length;
        let attempts = 0;
        while (!images[nextIndex].hasImage && attempts < images.length) {
            nextIndex = (nextIndex + 1) % images.length;
            attempts++;
        }
        if (images[nextIndex].hasImage) {
            currentIndex = nextIndex;
            updateLightboxContent();
        }
    }

    function prevImage() {
        // Find previous image that exists
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        let attempts = 0;
        while (!images[prevIndex].hasImage && attempts < images.length) {
            prevIndex = (prevIndex - 1 + images.length) % images.length;
            attempts++;
        }
        if (images[prevIndex].hasImage) {
            currentIndex = prevIndex;
            updateLightboxContent();
        }
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

// ============================================
// MAIN CONTENT INITIALIZATION
// ============================================
function initMainContent() {
    updatePartnerName();
    initRotatingQuotes();
    initShowerBtn();
    initEnvelope();
    initScrollAnimations();
    initGalleryLightbox();
    initLoveReasons();
    initOpenWhenLetters();
    initQuestion();
    initGiftBox();
    initMusicPlayer();
    initImageErrorHandlers();

    // Clear any existing counter intervals
    if (activeIntervals.loveCounter) clearInterval(activeIntervals.loveCounter);
    if (activeIntervals.valentineCountdown) clearInterval(activeIntervals.valentineCountdown);

    // Start counters with tracked intervals
    updateLoveCounter();
    updateValentineCountdown();
    activeIntervals.loveCounter = setInterval(updateLoveCounter, 1000);
    activeIntervals.valentineCountdown = setInterval(updateValentineCountdown, 1000);
}

// ============================================
// IMAGE ERROR HANDLERS (moved from inline HTML)
// ============================================
function initImageErrorHandlers() {
    // Handle hero images
    document.querySelectorAll('.hero-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('photo-placeholder-hero')) {
                placeholder.classList.remove('hidden');
            }
        });
    });

    // Handle gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = '';
            this.parentElement.classList.add('no-image');
        });
    });
}

// ============================================
// CLEANUP ON PAGE UNLOAD
// ============================================
function cleanup() {
    // Clear all active intervals to prevent memory leaks
    Object.keys(activeIntervals).forEach(key => {
        if (activeIntervals[key]) {
            clearInterval(activeIntervals[key]);
            activeIntervals[key] = null;
        }
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    initVault();
});

// Cleanup when leaving page
window.addEventListener('beforeunload', cleanup);
window.addEventListener('pagehide', cleanup);
