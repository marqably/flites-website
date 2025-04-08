// Your JavaScript code goes here
// Import Splide
import Splide from '@splidejs/splide';

console.log('Tailwind CSS project is running!');

// Initialize Splide Slider
if (document.querySelector('.screenshot-slider')) {
    // Use new Splide('.selector', options)
    const splide = new Splide('.screenshot-slider', {
        type: 'loop', // Ensures infinite scrolling
        // Set perPage to 2 for 50% width on larger screens
        perPage: 2,
        perMove: 1,
        autoplay: true,
        interval: 8000, // Default interval for autoplay
        pauseOnHover: true,
        arrows: false, // Hide prev/next arrows (Splide default is true)
        pagination: true, // Show pagination dots (Splide default is true)
        // Increase the gap 2.5 times (1.5rem * 2.5 = 3.75rem)
        gap: '3.75rem',
        // Re-enable focus: 'center' to center the active slide
        // Note: With perPage: 2, the other slide will be partially visible/off-screen.
        // Consider perPage: 1 or perPage: 3 for a more traditional centered look if desired.
        focus: 'center',
        breakpoints: {
            // Adjust breakpoint if needed, maybe show 1 slide earlier
            // 1023: { // lg breakpoint (example)
            //     perPage: 2, // Keep 2 slides
            // },
            767: { // md breakpoint (example - adjust as needed)
                 perPage: 1, // Show 1 slide on medium screens and below
                 // Increase the gap 2.5 times (1rem * 2.5 = 2.5rem)
                 gap: '2.5rem',
                 // focus: 'center' will still apply here, centering the single slide
            },
            // Remove the 639 breakpoint if 767 covers it
            // 639: { // sm breakpoint
            //     perPage: 1,
            //     // gap: '0.5rem', // Optional: adjust gap for smaller screens
            // },
        }
    });

    splide.mount(); // Mount the slider
    console.log('Splide container found and mounted');
} else {
    console.log("Splide container not found");
} 