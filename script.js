/* =========================================================
   THE MOUNTAIN TABLE
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Open and close the mobile navigation menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu when a navigation link is clicked
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close the menu if the user clicks outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu =
                navMenu.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });

        // Close mobile menu when the screen becomes desktop-sized
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 900) {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }


    /* =====================================================
       2. SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId) {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       3. NAVBAR SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");

    const updateNavbar = () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* =====================================================
       4. REVEAL-ON-SCROLL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-image, " +
        ".about-content, " +
        ".dish-card, " +
        ".menu-category, " +
        ".gallery-item, " +
        ".review-card, " +
        ".hours-content, " +
        ".hours-image, " +
        ".contact-item, " +
        ".reservation-form-container"
    );

    // Only add animation classes when there are elements to animate
    if (revealElements.length > 0) {

        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });

        // Use IntersectionObserver when supported
        if ("IntersectionObserver" in window) {

            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add("revealed");

                            // Stop observing once the element has appeared
                            observer.unobserve(entry.target);
                        }

                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            revealElements.forEach((element) => {
                revealObserver.observe(element);
            });

        } else {
            // Fallback for older browsers
            revealElements.forEach((element) => {
                element.classList.add("revealed");
            });
        }
    }


    /* =====================================================
       5. RESERVATION FORM
       ===================================================== */

    const reservationForm = document.querySelector(".reservation-form");

    // =====================================================
    // TEMPORARY WHATSAPP RESERVATION NUMBER
    // Replace this number later with the restaurant's
    // WhatsApp number, including country code and without +.
    // Example: 919876543210
    // =====================================================

    const reservationWhatsAppNumber = "911234567891";

    if (reservationForm) {

        reservationForm.addEventListener("submit", (event) => {
            // Prevent the normal form submission
            event.preventDefault();

            // Check built-in HTML validation first
            if (!reservationForm.checkValidity()) {
                reservationForm.reportValidity();
                return;
            }

            // Collect reservation details
            const nameInput = document.querySelector("#guest-name");
            const phoneInput = document.querySelector("#guest-phone");
            const emailInput = document.querySelector("#guest-email");
            const dateInput = document.querySelector("#reservation-date");
            const timeInput = document.querySelector("#reservation-time");
            const guestsInput = document.querySelector("#guest-count");
            const messageInput = document.querySelector("#reservation-message");

            const guestName = nameInput
                ? nameInput.value.trim()
                : "";

            const guestPhone = phoneInput
                ? phoneInput.value.trim()
                : "";

            const guestEmail = emailInput
                ? emailInput.value.trim()
                : "";

            const reservationDate = dateInput
                ? dateInput.value
                : "";

            const reservationTime = timeInput
                ? timeInput.value
                : "";

            const numberOfGuests = guestsInput
                ? guestsInput.options[guestsInput.selectedIndex].text
                : "";

            const specialRequests = messageInput
                ? messageInput.value.trim()
                : "";


            // Create the professional WhatsApp message
            const whatsappMessage =
                `Hello The Mountain Table,\n\n` +
                `I would like to request a table reservation.\n\n` +
                `*Reservation Details*\n` +
                `Name: ${guestName}\n` +
                `Phone: ${guestPhone}\n` +
                `Email: ${guestEmail || "Not provided"}\n` +
                `Date: ${reservationDate}\n` +
                `Preferred Time: ${reservationTime}\n` +
                `Number of Guests: ${numberOfGuests}\n` +
                `Special Requests: ${specialRequests || "None"}\n\n` +
                `Please confirm the availability of the table.\n\n` +
                `Thank you.`;


            // URL-encode the complete WhatsApp message
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Create the WhatsApp URL
            const whatsappURL =
                `https://wa.me/${reservationWhatsAppNumber}?text=${encodedMessage}`;


            // Open WhatsApp in a new tab/window
            window.open(whatsappURL, "_blank");


            // Get the submit button
            const submitButton = reservationForm.querySelector(
                'button[type="submit"]'
            );


            // Show the existing confirmation message
            let confirmationMessage =
                reservationForm.querySelector(".form-confirmation");

            // Create the confirmation message if it doesn't exist
            if (!confirmationMessage) {
                confirmationMessage = document.createElement("p");
                confirmationMessage.className = "form-confirmation";

                confirmationMessage.setAttribute("role", "status");
                confirmationMessage.setAttribute("aria-live", "polite");

                reservationForm.appendChild(confirmationMessage);
            }

            confirmationMessage.textContent =
                `Thank you, ${guestName}! Your reservation request has been received. ` +
                `We'll be in touch shortly to confirm your table.`;

            // Make the confirmation message visible
            confirmationMessage.style.marginTop = "1rem";
            confirmationMessage.style.color = "#dfbf7b";
            confirmationMessage.style.fontSize = "0.9rem";
            confirmationMessage.style.lineHeight = "1.6";


            // Temporarily update the button
            if (submitButton) {
                const originalText = submitButton.textContent;

                submitButton.textContent = "Request Received";
                submitButton.disabled = true;

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }


            // Clear the form after the reservation request
            reservationForm.reset();
        });
    }


    /* =====================================================
       6. ESCAPE KEY SUPPORT
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (!navMenu || !menuToggle) {
            return;
        }

        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.focus();
        }
    });


    /* =====================================================
       7. CURRENT YEAR IN FOOTER
       ===================================================== */

    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {
        const currentYear = new Date().getFullYear();

        // Replace only the four-digit year if one exists
        footerYear.innerHTML = footerYear.innerHTML.replace(
            /\b20\d{2}\b/,
            currentYear
        );
    }


    /* =====================================================
       8. PREVENT PLACEHOLDER LINKS FROM JUMPING TO TOP
       ===================================================== */

    const placeholderLinks = document.querySelectorAll(
        'a[href="#"]'
    );

    placeholderLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });

});
