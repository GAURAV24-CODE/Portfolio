
/* =========================================
   GAURAV KUMBHAR - PORTFOLIO JAVASCRIPT
   Multi-page Portfolio
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. ELEMENT REFERENCES
    // =====================================

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");

    const navigationLinks = document.querySelectorAll(".nav-link");
    const yearElements = document.querySelectorAll(".current-year");

    // =====================================
    // 2. MOBILE SIDEBAR
    // =====================================

    function closeSidebar() {

        if (!sidebar || !menuToggle) return;

        sidebar.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";

    }

    function toggleSidebar() {

        if (!sidebar || !menuToggle) return;

        const isOpen = sidebar.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.innerHTML = isOpen ? "✕" : "☰";

    }

    if (sidebar && menuToggle) {

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();
            toggleSidebar();

        });

        // Close sidebar when clicking outside

        document.addEventListener("click", function (event) {

            const clickedInsideSidebar =
                sidebar.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                sidebar.classList.contains("open") &&
                !clickedInsideSidebar &&
                !clickedMenuButton
            ) {

                closeSidebar();

            }

        });

        // Close sidebar after selecting a navigation link

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                closeSidebar();

            });

        });

        // Close sidebar with Escape key

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                sidebar.classList.contains("open")
            ) {

                closeSidebar();
                menuToggle.focus();

            }

        });

    }

    // =====================================
    // 3. ACTIVE PAGE NAVIGATION
    // =====================================

    let currentPage = window.location.pathname
        .split("/")
        .filter(Boolean)
        .pop();

    if (!currentPage || !currentPage.includes(".")) {

        currentPage = "index.html";

    }

    navigationLinks.forEach(function (link) {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .filter(Boolean)
            .pop();

        const isActive = linkPage === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {

            link.setAttribute("aria-current", "page");

        } else {

            link.removeAttribute("aria-current");

        }

    });

    // =====================================
    // 4. AUTOMATIC FOOTER YEAR
    // =====================================

    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });

    // =====================================
    // 5. RESPONSIVE SIDEBAR
    // =====================================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {

            closeSidebar();

        }

    });

    // =====================================
    // 6. CONTACT FORM MAILTO SUPPORT
    // =====================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm && !contactForm.dataset.mailtoHandled) {

        contactForm.dataset.mailtoHandled = "true";

        contactForm.addEventListener("submit", function (event) {

            // Do not interfere with an existing form handler.
            if (contactForm.dataset.customHandler === "true") {
                return;
            }

            event.preventDefault();

            const name = contactForm.querySelector(
                '[name="name"]'
            )?.value.trim();

            const email = contactForm.querySelector(
                '[name="email"]'
            )?.value.trim();

            const subject = contactForm.querySelector(
                '[name="subject"]'
            )?.value.trim();

            const message = contactForm.querySelector(
                '[name="message"]'
            )?.value.trim();

            if (!name || !email || !message) {

                alert("Please complete your name, email and message.");

                return;

            }

            const recipient = "kumbhargaurav24@gmail.com";

            const mailSubject = encodeURIComponent(
                subject || "Portfolio Contact Message"
            );

            const mailBody = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            const mailtoURL =
                "mailto:" + recipient +
                "?subject=" + mailSubject +
                "&body=" + mailBody;

            window.location.href = mailtoURL;

        });

    }

    // =====================================
    // 7. EXTERNAL LINKS
    // =====================================

    document.querySelectorAll('a[target="_blank"]').forEach(
        function (link) {

            link.setAttribute("rel", "noopener noreferrer");

        }
    );

    // =====================================
    // 8. CONSOLE MESSAGE
    // =====================================

    console.log(
        "Gaurav Kumbhar Portfolio Loaded Successfully!"
    );

});
