// ========================================
// ACTIVAMENTE - Professional JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // MOBILE MENU
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle hash on page load (for cross-page navigation)
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // BLOG CATEGORY FILTER
    // ========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const categoryLinks = document.querySelectorAll('.category-link');
    const articleCards = document.querySelectorAll('.article-card');
    const featuredArticle = document.querySelector('.featured-article');

    function filterArticles(category) {
        // Update active tab
        filterTabs.forEach(tab => {
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Filter article cards
        articleCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.add('active');
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });

        // Filter featured article
        if (featuredArticle) {
            const featuredCategory = featuredArticle.dataset.category;
            if (category === 'all' || featuredCategory === category) {
                featuredArticle.style.display = 'grid';
            } else {
                featuredArticle.style.display = 'none';
            }
        }

        // Show "no results" message if no articles match
        const visibleCards = document.querySelectorAll('.article-card[style*="display: block"], .article-card:not([style*="display"])');
        const articlesGrid = document.getElementById('articlesGrid');

        if (articlesGrid) {
            let noResultsMsg = articlesGrid.querySelector('.no-results');

            if (visibleCards.length === 0 && featuredArticle && featuredArticle.style.display === 'none') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.innerHTML = '<p>No hay artÃ­culos en esta categorÃ­a todavÃ­a.</p>';
                    articlesGrid.appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    }

    // Add click handlers for filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.dataset.category;
            filterArticles(category);
        });
    });

    // Add click handlers for sidebar category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterArticles(category);

            // Scroll to articles grid
            const filterSection = document.querySelector('.category-filter');
            if (filterSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: filterSection.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // NEWSLETTER FORM
    // ========================================
    // NEWSLETTER - Handled by Netlify Forms (no JavaScript interception needed)

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // STICKY MOBILE CTA BUTTON
    // ========================================
    const stickyCta = document.getElementById('stickyCta');
    const ctaSection = document.getElementById('cta');

    if (stickyCta && ctaSection) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.scrollY;
            const ctaSectionTop = ctaSection.offsetTop;
            const ctaSectionBottom = ctaSectionTop + ctaSection.offsetHeight;

            // Show sticky button after scrolling 300px, but hide when CTA section is visible
            if (scrollPosition > 300 && (scrollPosition < ctaSectionTop - 100 || scrollPosition > ctaSectionBottom)) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }

    // ========================================
    // LEAD FORM SUBMISSION
    // ========================================
    // LEAD FORM - Handled by Netlify Forms (no JavaScript interception needed)

});
