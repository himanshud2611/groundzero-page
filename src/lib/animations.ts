/**
 * Animation Presets
 *
 * Reusable animation configurations for Framer Motion
 */

export const easings = {
    smooth: [0.16, 1, 0.3, 1] as const,
    easeInOut: 'easeInOut' as const,
    easeIn: 'easeIn' as const,
};

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: easings.smooth },
};

export const fadeInUpDelayed = (delay: number = 0.2) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.8,
        delay,
        ease: easings.smooth,
    },
});

export const glowAnimation = {
    animate: {
        boxShadow: [
            '0 0 10px rgba(255, 255, 255, 0.3)',
            '0 0 20px rgba(255, 255, 255, 0.6)',
            '0 0 10px rgba(255, 255, 255, 0.3)',
        ],
    },
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.easeInOut,
    },
};

export const fadeInUpWithGlow = (delay: number = 0.4) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        boxShadow: [
            '0 0 10px rgba(255, 255, 255, 0.3)',
            '0 0 20px rgba(255, 255, 255, 0.6)',
            '0 0 10px rgba(255, 255, 255, 0.3)',
        ],
    },
    transition: {
        opacity: { duration: 0.8, delay, ease: easings.smooth },
        y: { duration: 0.8, delay, ease: easings.smooth },
        boxShadow: {
            duration: 1,
            repeat: Infinity,
            ease: easings.easeInOut,
        },
    },
});

export const pulseAnimation = {
    animate: {
        opacity: [1, 0.6, 1],
        scale: [1, 1.1, 1],
    },
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.easeInOut,
    },
};

export const textGlowAnimation = {
    animate: {
        textShadow: [
            '0 0 5px rgba(255, 255, 255, 0.3)',
            '0 0 10px rgba(255, 255, 255, 0.6)',
            '0 0 5px rgba(255, 255, 255, 0.3)',
        ],
    },
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.easeInOut,
    },
};

export const staggerChildren = (stagger: number = 0.1) => ({
    animate: { transition: { staggerChildren: stagger } },
});
