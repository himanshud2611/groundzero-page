# Contributing to Ground Zero

First off, thank you for considering contributing to Ground Zero! It's people like you that make Ground Zero such a great platform for the AI/ML community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to ground0ai.lab@gmail.com or [@himanshustwts](https://x.com/himanshustwts).

### Our Standards

- **Be respectful** and inclusive of differing viewpoints and experiences
- **Be collaborative** and open to constructive criticism
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most Ground Zero users
- **List some examples** of how this enhancement would be used

### Your First Code Contribution

Unsure where to begin? You can start by looking through `good-first-issue` and `help-wanted` issues:

- **Good first issues** - issues which should only require a few lines of code
- **Help wanted issues** - issues which should be a bit more involved than beginner issues

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the coding style** described below
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write meaningful commit messages**
6. **Create a pull request**

## Development Workflow

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/groundzero-page.git
cd groundzero-page

# Add upstream remote
git remote add upstream https://github.com/himanshud2611/groundzero-page.git

# Install dependencies
npm install

# Create a new branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

### Branch Naming Convention

- **feature/*** - for new features (e.g., `feature/add-search-functionality`)
- **fix/*** - for bug fixes (e.g., `fix/header-alignment`)
- **docs/*** - for documentation changes (e.g., `docs/update-readme`)
- **refactor/*** - for code refactoring (e.g., `refactor/simplify-api-calls`)
- **style/*** - for styling changes (e.g., `style/update-button-colors`)

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that don't affect code meaning (white-space, formatting, etc)
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **perf:** Code change that improves performance
- **test:** Adding missing tests or correcting existing tests
- **chore:** Changes to the build process or auxiliary tools

**Examples:**
```
feat(signals): add search functionality to SIGNALS page

fix(header): correct mobile menu alignment issue

docs(readme): update installation instructions

style(spotlights): improve card hover animations
```

## Coding Standards

### TypeScript/React Guidelines

- **Use TypeScript** for all new code
- **Use functional components** with hooks
- **Follow React best practices**:
  - Keep components small and focused
  - Use proper prop typing
  - Avoid inline functions in JSX when possible
  - Use React.memo() for expensive components

### Code Style

We use ESLint for code linting. Run `npm run lint` before committing.

**Key conventions:**
- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** at the end of statements
- **Trailing commas** in objects and arrays
- **Arrow functions** for anonymous functions
- **Destructuring** when it improves readability

### Component Structure

```tsx
'use client'; // If needed

import { useState } from 'react';
import type { ComponentProps } from './types';

// Types/Interfaces
interface MyComponentProps {
  title: string;
  description?: string;
}

// Component
export default function MyComponent({ title, description }: MyComponentProps) {
  // Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Event handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Render
  return (
    <div className="container">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### File Naming

- **Components:** PascalCase (e.g., `HeroBackground.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Pages:** lowercase with kebab-case for routes (e.g., `blogs-and-resources/page.tsx`)

### CSS/Styling

- **Use Tailwind CSS** utility classes
- **Follow mobile-first** responsive design
- **Use consistent spacing** scale (4px, 8px, 12px, 16px, etc.)
- **Prefer composition** over customization

## Testing

Before submitting a PR:

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test the production build
npm run start
```

## Documentation

- **Update README.md** if you add new features or change functionality
- **Add JSDoc comments** for complex functions
- **Document props** for components
- **Update this CONTRIBUTING.md** if you change the development workflow

## Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Ensure all tests pass** and the build succeeds
3. **Update documentation** as needed
4. **Request review** from maintainers
5. **Address review comments** promptly
6. **Squash commits** if requested
7. **Wait for approval** from at least one maintainer

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe how you tested your changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on mobile and desktop
```

## Community

- **Discord:** [Join our community](https://discord.gg/aChCV3cbyn)
- **Twitter:** [@groundzero_twt](https://x.com/groundzero_twt)
- **YouTube:** [@Ground_ZeroYT](https://www.youtube.com/@Ground_ZeroYT)

## Questions?

Feel free to reach out:
- Open an issue with the `question` label
- DM [@himanshustwts](https://x.com/himanshustwts) on Twitter
- Email ground0ai.lab@gmail.com

---

Thank you for contributing to Ground Zero! 🚀
