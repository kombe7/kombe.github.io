document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typingElement = document.querySelector('.typing');
    const words = ['a Designer', 'a Videographer', 'a Photographer', 'a Creator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingElement.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Sample portfolio data (replace with your actual projects)
    const portfolioData = [
        {
            id: 1,
            title: 'Brand Identity Design',
            category: 'graphic',
            image: 'https://source.unsplash.com/random/600x400/?branding',
            description: 'Complete brand identity design for a tech startup including logo, color palette, and typography.'
        },
        {
            id: 2,
            title: 'Product Video',
            category: 'video',
            image: 'https://source.unsplash.com/random/600x400/?commercial',
            description: '30-second promotional video showcasing the features of a new product.'
        },
        {
            id: 3,
            title: 'Portrait Photography',
            category: 'photo',
            image: 'https://source.unsplash.com/random/600x400/?portrait',
            description: 'Professional portrait photography session for a corporate client.'
        },
        {
            id: 4,
            title: '3D Character Design',
            category: '3d',
            image: 'https://source.unsplash.com/random/600x400/?3d',
            description: 'Original 3D character design and modeling for a video game project.'
        },
        {
            id: 5,
            title: 'Social Media Graphics',
            category: 'graphic',
            image: 'https://source.unsplash.com/random/600x400/?social',
            description: 'Series of social media graphics for a marketing campaign.'
        },
        {
            id: 6,
            title: 'Documentary Film',
            category: 'video',
            image: 'https://source.unsplash.com/random/600x400/?documentary',
            description: 'Short documentary film about urban sustainability initiatives.'
        },
        {
            id: 7,
            title: 'Landscape Photography',
            category: 'photo',
            image: 'https://source.unsplash.com/random/600x400/?landscape',
            description: 'Collection of landscape photographs from national parks.'
        },
        {
            id: 8,
            title: 'Architectural Visualization',
            category: '3d',
            image: 'https://source.unsplash.com/random/600x400/?architecture',
            description: '3D architectural visualization for a residential building project.'
        }
    ];

    // Generate portfolio items
    function generatePortfolioItems() {
        portfolioGrid.innerHTML = '';
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.dataset.id = item.id;
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <button class="view-btn">View Project</button>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });

        // Add click event to view buttons
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.portfolio-item').dataset.id;
                openModal(parseInt(itemId));
            });
        });
    }

    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            if (filter === 'all') {
                document.querySelectorAll('.portfolio-item').forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                document.querySelectorAll('.portfolio-item').forEach(item => {
                    if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });

    // Modal functionality
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');

    function openModal(itemId) {
        const item = portfolioData.find(i => i.id === itemId);
        if (item) {
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <h2>${item.title}</h2>
                <p class="category">${item.category.toUpperCase()}</p>
                <img src="${item.image}" alt="${item.title}" class="modal-img">
                <p>${item.description}</p>
                <div class="modal-buttons">
                    <a href="#" class="btn">Visit Project</a>
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Animate skills on scroll
    function animateSkills() {
        const skills = document.querySelectorAll('.progress');
        skills.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            setTimeout(() => {
                skill.style.width = width;
            }, 100);
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Initialize portfolio
    generatePortfolioItems();
});