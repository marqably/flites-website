import Splide from '@splidejs/splide';


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
                 perPage: 1.5, // Show 1 slide on medium screens and below
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

// Initialize Splide Slider
document.addEventListener('DOMContentLoaded', function () {
    const splideElement = document.querySelector('.splide.screenshot-slider');
    if (splideElement) {
        new Splide(splideElement, {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '1rem', // Adjust gap as needed
            pagination: true, // Show pagination dots
            arrows: false, // Hide arrows, or style them if needed
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            breakpoints: {
                1024: { // lg
                    perPage: 3,
                },
                768: { // md
                    perPage: 2,
                },
                640: { // sm
                    perPage: 1,
                    gap: '0.5rem',
                },
            },
        }).mount();
    }

    // --- Hero Character Mouse Trail Effect ---
    const heroSection = document.getElementById('hero-section');
    const heroCharContainer = document.getElementById('hero-char-container');
    const heroChar = document.getElementById('flites-hero-char');

    if (heroSection && heroCharContainer && heroChar) {
        const numGhosts = 5;
        const ghosts = [];
        const history = []; // Stores { x, y, timestamp }
        const historySize = 300; // Store more points for the longer delay
        const ghostDelay = 140; // Milliseconds delay between ghost steps (approx 0.8 seconds)

        let lastMouseX = 0; // Initialize
        let lastMouseY = 0; // Initialize
        let currentX = 0;   // Initialize
        let currentY = 0;   // Initialize
        let frameId = null;
        let isMouseOverSection = false; // Renamed for clarity

        // << Store center coordinates >>
        let containerCenterX = 0;
        let containerCenterY = 0;

        // Pre-create ghost elements
        for (let i = 0; i < numGhosts; i++) {
            const ghost = document.createElement('img');
            ghost.src = heroChar.src;
            ghost.alt = ""; // Decorative
            ghost.classList.add('ghost-trail');
            ghost.style.opacity = '0'; // Start hidden
            heroCharContainer.appendChild(ghost);
            ghosts.push(ghost);
        }

        const setInitialPosition = () => {
            if (!heroCharContainer.offsetWidth || !heroCharContainer.offsetHeight || !heroChar.offsetWidth || !heroChar.offsetHeight) {
                setTimeout(setInitialPosition, 50);
                return;
            }

            // << Calculate and store center >>
            containerCenterX = heroCharContainer.offsetWidth / 2;
            containerCenterY = heroCharContainer.offsetHeight / 2;

            // Set initial target and current position to center
            lastMouseX = containerCenterX;
            lastMouseY = containerCenterY;
            currentX = lastMouseX - heroChar.offsetWidth / 2;
            currentY = lastMouseY - heroChar.offsetHeight / 2;

            heroChar.style.transform = `translate(${currentX}px, ${currentY}px)`;
            heroChar.style.opacity = '1'; // Start fully opaque now

            ghosts.forEach(ghost => {
                ghost.style.width = `${heroChar.offsetWidth}px`;
                ghost.style.height = `${heroChar.offsetHeight}px`;
                ghost.style.transform = `translate(${currentX}px, ${currentY}px)`;
                ghost.style.opacity = '0';
            });
        };


        const updatePositions = () => {
            // Target position is last valid mouse position (clamped) or center if mouse left container
            const targetX = lastMouseX - heroChar.offsetWidth / 2;
            const targetY = lastMouseY - heroChar.offsetHeight / 2;

            // Lerp towards target
            currentX += (targetX - currentX) * 0.10; // Slightly slower lerp for smoother return
            currentY += (targetY - currentY) * 0.10;

            // Prevent update if dimensions aren't ready
            if (!heroChar.offsetWidth || !heroChar.offsetHeight) {
                frameId = requestAnimationFrame(updatePositions);
                return;
            }

            heroChar.style.transform = `translate(${currentX}px, ${currentY}px)`;

            const now = performance.now();
            history.push({ x: currentX, y: currentY, timestamp: now });
            while (history.length > historySize) {
                history.shift();
            }

            ghosts.forEach((ghost, index) => {
                ghost.style.width = `${heroChar.offsetWidth}px`;
                ghost.style.height = `${heroChar.offsetHeight}px`;

                const targetTime = now - (index + 1) * ghostDelay;
                let historyPoint = null;
                for (let i = history.length - 1; i >= 0; i--) {
                    if (history[i].timestamp <= targetTime) {
                        historyPoint = history[i];
                        break;
                    }
                }
                historyPoint = historyPoint || history[0];

                if (historyPoint && ghost.offsetWidth) {
                    const ghostX = historyPoint.x;
                    const ghostY = historyPoint.y;
                    ghost.style.transform = `translate(${ghostX}px, ${ghostY}px)`;

                    const baseOpacity = 0.4;
                    // << Ghost visibility still tied to hovering the SECTION >>
                    const opacity = isMouseOverSection ? Math.max(0, baseOpacity - index * (baseOpacity / numGhosts)) : 0;
                    ghost.style.opacity = `${opacity}`;
                } else {
                    // Fallback: If no history point or dimensions, hide the ghost
                    ghost.style.opacity = '0';
                    // Optionally, move it to the main character's current position while hidden
                    ghost.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            });

            // Stop animation loop if character is very close to target and mouse is not over section
            // This prevents unnecessary rendering when idle and centered.
            const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));
            if (!isMouseOverSection && distance < 0.5 && frameId) {
                cancelAnimationFrame(frameId);
                frameId = null;
            } else if (!frameId && (isMouseOverSection || distance >= 0.5)) { // Restart if needed
                // Ensure loop restarts if needed (e.g., mouse re-enters or char is moving)
                frameId = requestAnimationFrame(updatePositions);
            } else if (frameId) { // Continue if running
                frameId = requestAnimationFrame(updatePositions);
            }
        };

        // Listener for mouse movement over the whole section
        heroSection.addEventListener('mousemove', (e) => {
            const containerRect = heroCharContainer.getBoundingClientRect();
            let relativeX = e.clientX - containerRect.left;
            let relativeY = e.clientY - containerRect.top;

            // Update target position, clamped to container bounds
            lastMouseX = Math.max(0, Math.min(relativeX, heroCharContainer.offsetWidth));
            lastMouseY = Math.max(0, Math.min(relativeY, heroCharContainer.offsetHeight));

            // Ensure animation is running when mouse moves
            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        // Listener for mouse entering the section (controls ghost visibility)
        heroSection.addEventListener('mouseenter', () => {
            isMouseOverSection = true;
            // Ensure animation is running
            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        // Listener for mouse leaving the section (controls ghost visibility)
        heroSection.addEventListener('mouseleave', () => {
            isMouseOverSection = false;
            // Character return is handled by container mouseleave,
            // but we keep this to turn off ghosts.
            // The animation loop will stop itself when idle (see updatePositions).
        });

        // Listener for mouse leaving the CHARACTER CONTAINER
        heroCharContainer.addEventListener('mouseleave', () => {
            // Set the target back to the center of the container
            lastMouseX = containerCenterX;
            lastMouseY = containerCenterY;
            // Ensure animation is running to handle the return movement
            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        // Listener for mouse entering the CHARACTER CONTAINER
        heroCharContainer.addEventListener('mouseenter', (e) => {
            const containerRect = heroCharContainer.getBoundingClientRect();
            let relativeX = e.clientX - containerRect.left;
            let relativeY = e.clientY - containerRect.top;
            lastMouseX = Math.max(0, Math.min(relativeX, heroCharContainer.offsetWidth));
            lastMouseY = Math.max(0, Math.min(relativeY, heroCharContainer.offsetHeight));

            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        // Setup dimensions and initial position
        const setupDimensions = () => {
            if (heroCharContainer.offsetWidth > 0 && heroCharContainer.offsetHeight > 0 && heroChar.offsetWidth > 0 && heroChar.offsetHeight > 0) {
                setInitialPosition();
            } else {
                setTimeout(setupDimensions, 100);
            }
        };

        // Wait for the main image to load or use complete status
        if (heroChar.complete && heroChar.naturalWidth > 0) {
            setupDimensions();
        } else {
            heroChar.addEventListener('load', setupDimensions);
            heroChar.addEventListener('error', () => {
                console.error("Hero character image failed to load.");
            });
        }

    } else { // End of main if block (checking elements exist)
        console.warn("Hero character effect elements (#hero-section, #hero-char-container, #flites-hero-char) not found.");
    } // << End of if (heroSection && ...)

}); // << End of DOMContentLoaded listener
// --- End Hero Character Mouse Trail Effect ---