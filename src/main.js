import Splide from '@splidejs/splide';


// Initialize Splide Slider
document.addEventListener('DOMContentLoaded', function () {
    const splideElement = document.querySelector('.splide.screenshot-slider');
    if (splideElement) {
        new Splide(splideElement, {
            type: 'loop',
            perPage: 2,
            perMove: 1,
            gap: '1rem', // Adjust gap as needed
            pagination: true, // Show pagination dots
            arrows: false, // Hide arrows, or style them if needed
            autoplay: true,
            interval: 8000,
            focus: 'center',
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
    const heroCharContainer = document.getElementById('hero-char-container');
    const heroChar = document.getElementById('flites-hero-char');

    if (heroCharContainer && heroChar) {
        const numGhosts = 5;
        const ghosts = [];
        const history = [];
        const historySize = 300;
        const ghostDelay = 140; // Keep the adjusted delay

        let lastMouseX = 0;
        let lastMouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let frameId = null;
        let isMouseOverContainer = false;

        let containerCenterX = 0;
        let containerCenterY = 0;

        // Pre-create ghost elements
        for (let i = 0; i < numGhosts; i++) {
            const ghost = document.createElement('img');
            ghost.src = heroChar.src;
            ghost.alt = "";
            ghost.classList.add('ghost-trail');
            ghost.style.opacity = '0';
            heroCharContainer.appendChild(ghost);
            ghosts.push(ghost);
        }

        const setInitialPosition = () => {
            if (!heroCharContainer.offsetWidth || !heroCharContainer.offsetHeight || !heroChar.offsetWidth || !heroChar.offsetHeight) {
                setTimeout(setInitialPosition, 50);
                return;
            }

            containerCenterX = heroCharContainer.offsetWidth / 2;
            containerCenterY = heroCharContainer.offsetHeight / 2;

            lastMouseX = containerCenterX;
            lastMouseY = containerCenterY;
            currentX = lastMouseX - heroChar.offsetWidth / 2;
            currentY = lastMouseY - heroChar.offsetHeight / 2;

            heroChar.style.transform = `translate(${currentX}px, ${currentY}px)`;
            heroChar.style.opacity = '1';

            ghosts.forEach(ghost => {
                ghost.style.width = `${heroChar.offsetWidth}px`;
                ghost.style.height = `${heroChar.offsetHeight}px`;
                ghost.style.transform = `translate(${currentX}px, ${currentY}px)`;
                ghost.style.opacity = '0';
            });
        };


        const updatePositions = () => {
            const targetX = lastMouseX - heroChar.offsetWidth / 2;
            const targetY = lastMouseY - heroChar.offsetHeight / 2;

            currentX += (targetX - currentX) * 0.10;
            currentY += (targetY - currentY) * 0.10;

            if (!heroChar.offsetWidth || !heroChar.offsetHeight) {
                frameId = requestAnimationFrame(updatePositions);
                return;
            }

            heroChar.style.transform = `translate(${currentX}px, ${currentY}px)`;

            const now = performance.now();
            if (isMouseOverContainer || lastMouseX !== containerCenterX || lastMouseY !== containerCenterY) {
                history.push({ x: currentX, y: currentY, timestamp: now });
                while (history.length > historySize) {
                    history.shift();
                }
            }


            ghosts.forEach((ghost, index) => {
                ghost.style.width = `${heroChar.offsetWidth}px`;
                ghost.style.height = `${heroChar.offsetHeight}px`;

                const targetTime = now - (index + 1) * ghostDelay;
                let historyPoint = null;
                if (history.length > 0) {
                    for (let i = history.length - 1; i >= 0; i--) {
                        if (history[i].timestamp <= targetTime) {
                            historyPoint = history[i];
                            break;
                        }
                    }
                    historyPoint = historyPoint || history[0];
                }


                if (historyPoint && ghost.offsetWidth) {
                    const ghostX = historyPoint.x;
                    const ghostY = historyPoint.y;
                    ghost.style.transform = `translate(${ghostX}px, ${ghostY}px)`;

                    const baseOpacity = 0.4;
                    const opacity = isMouseOverContainer ? Math.max(0, baseOpacity - index * (baseOpacity / numGhosts)) : 0;
                    ghost.style.opacity = `${opacity}`;
                } else {
                    ghost.style.opacity = '0';
                    ghost.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            });

            const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));
            if (!isMouseOverContainer && distance < 0.5) {
                if (frameId) {
                    cancelAnimationFrame(frameId);
                    frameId = null;
                }
            } else {
                frameId = requestAnimationFrame(updatePositions);
            }
        };

        heroCharContainer.addEventListener('mousemove', (e) => {
            let relativeX = e.offsetX;
            let relativeY = e.offsetY;

            lastMouseX = relativeX;
            lastMouseY = relativeY;

            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        heroCharContainer.addEventListener('mouseenter', (e) => {
            isMouseOverContainer = true;
            lastMouseX = e.offsetX;
            lastMouseY = e.offsetY;
            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        heroCharContainer.addEventListener('mouseleave', () => {
            isMouseOverContainer = false;
            lastMouseX = containerCenterX;
            lastMouseY = containerCenterY;
            if (!frameId) {
                frameId = requestAnimationFrame(updatePositions);
            }
        });

        const setupDimensions = () => {
            if (heroCharContainer.offsetWidth > 0 && heroCharContainer.offsetHeight > 0 && heroChar.offsetWidth > 0 && heroChar.offsetHeight > 0) {
                setInitialPosition();
            } else {
                setTimeout(setupDimensions, 100);
            }
        };

        if (heroChar.complete && heroChar.naturalWidth > 0) {
            setupDimensions();
        } else {
            heroChar.addEventListener('load', setupDimensions);
            heroChar.addEventListener('error', () => {
                console.error("Hero character image failed to load.");
            });
        }

    } else {
        console.warn("Hero character effect elements (#hero-char-container, #flites-hero-char) not found.");
    }

});
// --- End Hero Character Mouse Trail Effect ---