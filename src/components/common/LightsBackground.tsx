import Image from "next/image";

/**
 * LightsBackground Component
 *
 * Renders the decorative lights SVG background.
 * Used across multiple pages for consistent lighting effects.
 */

interface LightsBackgroundProps {
    src?: string;
    className?: string;
}

export default function LightsBackground({
    src = "/signals-page-lights.svg",
    className = ""
}: LightsBackgroundProps) {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            <Image
                src={src}
                alt=""
                width={1440}
                height={872}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-auto max-w-none"
                priority
            />
        </div>
    );
}
