interface FooterProps {
    fixed?: boolean;
    color?: string;
}

export default function Footer({ fixed = false, color = 'text-white/30' }: FooterProps) {
    return (
        <footer className={`${fixed ? 'fixed bottom-0' : 'relative'} z-50 w-full py-6 px-4 flex justify-center items-center bg-transparent`}>
            <p className={`font-mono text-[10px] md:text-xs ${color}`}>
                © {new Date().getFullYear()} Ground Zero. All rights reserved.
            </p>
        </footer>
    );
}
