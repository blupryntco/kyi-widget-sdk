# Contributing to Bluprynt KYI Widget SDK

Thank you for your interest in contributing to the KYI Widget SDK! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/your-username/kyi-widget-sdk.git
cd kyi-widget-sdk
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build
```

## Development

### Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start development server             |
| `pnpm build`      | Build the package for production     |
| `pnpm lint`       | Run Biome to check code quality      |
| `pnpm lint:fix`   | Fix auto-fixable linting issues      |
| `pnpm format`     | Format code with Biome               |

### Code Style

- We use Biome for linting
- We use TypeScript for type safety
- Follow the existing code patterns in the repository

## Submitting Changes

### Pull Request Process

1. Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them with clear, descriptive messages:

```bash
git commit -m "feat: add new feature"
```

3. Push your branch and open a pull request against the `main` branch.

4. Ensure all checks pass (linting, type checking, build).

5. Request a review from maintainers.

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests

## Version Management

All new version merged to `main` are automatically published to npm.

The management of package versions is handled by [changesets](https://github.com/changesets/changesets). Therefore, if you want to publish a new version, you need to generate a new changeset and release a new version.

### Creating a Changeset

When your PR includes changes that should be released, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes and select the appropriate version bump (patch, minor, or major).

### Issuing a New Version

To bump the version based on accumulated changesets:

```bash
pnpm version
```

## Reporting Issues

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node.js version, browser, OS)

## Questions?

If you have questions, feel free to open an issue for discussion.
