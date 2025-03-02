// Smooth scrolling for anchor links (excluding dropdown links)
document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Allow default behavior for non-hash links (e.g., about-us.html, our-team.html)
    });
});

// Close dropdown menu after clicking a link
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.dropdown-menu').classList.remove('show');
    });
});

// Hamburger Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close the menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();

        // Highlight the "About" link if the current page is "about-us.html" or "our-team.html"
        if (currentPage === 'about-us.html' || currentPage === 'our-team.html') {
            if (link.classList.contains('dropdown-toggle')) {
                link.classList.add('active'); // Highlight the "About" dropdown link
            }
        }

        // Highlight the exact matching link
        if (linkPage === currentPage) {
            link.classList.add('active'); // Add active class to the current page link
        }
    });
});

// Sticky Header with Scroll-Up Behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            // Scrolling down: hide the header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up: show the header
            header.style.transform = 'translateY(0)';
        }
        header.classList.add('sticky');
    } else {
        // At the top: reset the header
        header.style.transform = 'translateY(0)';
        header.classList.remove('sticky');
    }

    lastScroll = currentScroll;
});

// Form Validation
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    if (this.checkValidity()) {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    } else {
        alert('Please fill out all fields correctly.');
    }
});

// Back-to-Top Button Logic
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    // Hide back-to-top button on thankyou.html
    if (window.location.pathname.includes('thankyou.html')) {
        backToTopBtn.style.display = 'none';
    } else {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible'); // Show the button
            } else {
                backToTopBtn.classList.remove('visible'); // Hide the button
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to top
            });
        });
    }
}

// Scroll Animations for Fading Sections
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

fadeElements.forEach(element => {
    observer.observe(element);
});

// Get all review elements
const reviews = document.querySelectorAll('.review');

// Check if reviews exist
if (reviews.length > 0) {
    const carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';

    reviews.forEach((review, index) => {
        const indicator = document.createElement('span');
        indicator.addEventListener('click', () => {
            // Add logic to show the selected review
            showReview(index);
        });
        carouselIndicators.appendChild(indicator);
    });

    // Append indicators to the reviews section
    document.querySelector('.reviews').appendChild(carouselIndicators);
}

// Appointment Form Validation
document.querySelector('form')?.addEventListener('submit', function (e) {
    const phone = document.querySelector('input[name="phone"]').value;
    const phonePattern = /^\d{10}$/; // Example: 10-digit phone number

    if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        e.preventDefault(); // Prevent form submission
    }
});

// Get the date input field
const dateInput = document.getElementById('appointment-date');

// Set the minimum date to today
if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    // Set the min attribute to today's date in ISO format (YYYY-MM-DD)
    dateInput.min = `${year}-${month}-${day}`;

    // Add validation to prevent past dates
    dateInput.addEventListener('input', function () {
        validateDate(this);
    });

    // Add form submission validation
    document.querySelector('form').addEventListener('submit', function (e) {
        const selectedDate = new Date(dateInput.value);
        const todayDate = new Date();

        // Reset time part to compare only dates
        todayDate.setHours(0, 0, 0, 0);

        if (selectedDate < todayDate) {
            e.preventDefault(); // Prevent form submission
            alert('Please select a date from today onwards.');
        }
    });
}

// Function to validate the date
function validateDate(input) {
    const selectedDate = new Date(input.value);
    const todayDate = new Date();

    // Reset time part to compare only dates
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
        input.setCustomValidity('Please select a date from today onwards.');
    } else {
        input.setCustomValidity(''); // Reset validation message
    }
}

// Toggle dropdown on click
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        dropdownMenu.classList.toggle('show');
    });
}

// Handle "Know More" button click
document.querySelector('.know-more-btn')?.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    window.location.href = 'service.html'; // Redirect to service.html
});

document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Thank you! Your message has been sent.');
            form.reset(); // Clear the form fields
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again.');
    }
});

// Appointment Form Submission
document.getElementById('appointmentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Redirect to thankyou.html after successful submission
            window.location.href = 'thankyou.html';
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again.');
    }
});

// Ensure sections are not hidden by JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['services', 'appointment', 'reviews', 'contact'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block'; // Ensure section is visible
            section.style.visibility = 'visible'; // Ensure visibility
        }
    });
});