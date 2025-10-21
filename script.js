document.addEventListener("DOMContentLoaded", function() {

    // --- Preloader Logic ---
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.classList.add("preloader-hidden");
    });
    // --- END PRELOADER ---

    // --- ALL CUSTOM CURSOR LOGIC REMOVED ---

    // --- Typing Animation Logic ---
    if (document.getElementById("typed-subtitle")) {
        new Typed("#typed-subtitle", {
            strings: ["Budding Engineer", "Front-end Web Developer"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000,
            showCursor: true,
            cursorChar: "|",
        });
    }
    // --- END TYPING ---

    // --- Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- Active Nav Link on Scroll (Simplified) ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function onScroll() {
        let scrollY = window.pageYOffset;
        let currentSection = "";

        // --- HEADER SCROLL LOGIC REMOVED ---
        
        // Active link logic
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        if (scrollY < sections[0].offsetTop - 80) {
            currentSection = "home";
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // Run on page load

    // --- NEW: Heavy Scroll-Reveal Animation Logic ---
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Animate when 10% of the item is visible
    };

    const revealCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay for card items
                const delay = (entry.target.classList.contains('skill-card') || entry.target.classList.contains('project-card')) 
                              ? index * 100 // Stagger by 100ms
                              : 0; // No delay for sections

                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    // --- END NEW ---

});
