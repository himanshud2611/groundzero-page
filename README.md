# Ground Zero

> Your friendly neighborhood creative space shaping the frontier of tech, with occasional conversations and notes.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 Live

**Production:** [groundzeroai.in](https://groundzeroai.in)

## ✨ Features

- **SIGNALS** - An open platform for researchers, builders, and founders to showcase their work
  - `/signals` - Main SIGNALS landing page with submission form
  - `/signals/founders` - Guidelines for founders and builders
  - `/signals/researchers` - Guidelines for researchers

- **Spotlights** - Curated collections of resources
  - `/spotlights` - Landing page with spotlight collections
  - `/spotlights/blogs-and-resources` - 37+ curated AI/ML blogs and resources

- **Community** - Connect with Ground Zero
  - YouTube channel with podcasts and educational content
  - Discord community
  - Twitter/X presence
  - Partner opportunities

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📦 Project Structure

```
groundzero-page/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── youtube/          # YouTube API integration
│   │   ├── signals/
│   │   │   ├── founders/         # Founders guidelines
│   │   │   ├── researchers/      # Researchers guidelines
│   │   │   └── page.tsx          # SIGNALS main page
│   │   ├── spotlights/
│   │   │   ├── blogs-and-resources/
│   │   │   └── page.tsx          # Spotlights landing
│   │   ├── partner/              # Partner page
│   │   ├── podcasts/             # Podcasts page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── not-found.tsx         # 404 page
│   └── components/
│       ├── AnimatedSignalsLogo.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── HeroBackground.tsx
├── public/                       # Static assets
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/himanshud2611/groundzero-page.git
   cd groundzero-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)

   Create a `.env.local` file in the root directory:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here  # Optional: for podcasts page
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

Ground Zero follows a minimalist, dark-themed design with:
- Glassmorphic UI elements
- Smooth animations using Framer Motion
- Responsive design for all screen sizes
- Accessibility-first approach
- High contrast text for readability

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Code of Conduct
- Development workflow
- Coding standards
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Deployed on [Vercel](https://vercel.com/)

## 📬 Contact

- Twitter: [@groundzero_twt](https://x.com/groundzero_twt)
- Personal: [@himanshustwts](https://x.com/himanshustwts)
- YouTube: [@Ground_ZeroYT](https://www.youtube.com/@Ground_ZeroYT)
- Discord: [Join our community](https://discord.gg/aChCV3cbyn)
- Email: ground0ai.lab@gmail.com

## 🔗 Links

- **Website:** [groundzeroai.in](https://groundzeroai.in)
- **SIGNALS:** [groundzeroai.in/signals](https://groundzeroai.in/signals)
- **Newsletter:** [groundzero1.substack.com](https://groundzero1.substack.com/)
- **YouTube:** [youtube.com/@Ground_ZeroYT](https://www.youtube.com/@Ground_ZeroYT)

---

Made with ❤️ by the Ground Zero community
