document.addEventListener("DOMContentLoaded", function() {

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

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function onScroll() {
        let scrollY = window.pageYOffset;
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // 70px nav height + 10px buffer
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        // Special case for home (top of page)
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

    // --- Fade-in Section on Scroll ---
    // Selector now looks for our new classes
    const fadeElements = document.querySelectorAll(".fade-in-left, .fade-in-right");

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: "0px",
        threshold: 0.1 // 10% of the element must be visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Contact Form (Simple Validation Example) ---
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            alert("Thank you for your message, " + name + "!");
            // In a real app, you'd send this data to a server.
            contactForm.reset();
        } else {
            alert("Please fill out all fields.");
        }
    });
});