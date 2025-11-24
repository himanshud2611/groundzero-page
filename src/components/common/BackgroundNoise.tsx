/**
 * BackgroundNoise Component
 *
 * Renders a noise texture background using SVG filters.
 * Used across multiple pages for consistent background styling.
 */

interface BackgroundNoiseProps {
    opacity?: number;
    className?: string;
}

export default function BackgroundNoise({
    opacity = 0.1,
    className = ""
}: BackgroundNoiseProps) {
    return (
        <div
            className={`absolute inset-0 ${className}`}
            style={{
                opacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.67' numOctaves='3' stitchTiles='stitch' seed='2400'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23454545'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "256px 256px",
            }}
        />
    );
}
