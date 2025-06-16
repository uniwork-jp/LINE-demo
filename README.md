# LINE Demo Monorepo

This is a monorepo for the LINE Demo application, built with Turborepo.

## What's inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps/frontend`: a [Next.js](https://nextjs.org) app
- `apps/backend`: Firebase Functions + Swagger API (coming soon)
- `packages/shared`: shared utilities, contexts, and hooks
- `packages/config`: shared configuration (ESLint, Prettier, etc.)

### Utilities

This monorepo has some additional tools already set up for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Turborepo](https://turbo.build/repo) for build system and task running

## Setup

This repository is used as a monorepo and is managed by [pnpm](https://pnpm.io).

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

## Development

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your monorepo:

```bash
pnpm dlx turbo link
```

## Useful Commands

- `pnpm build` - Build all apps and packages
- `pnpm dev` - Develop all apps and packages
- `pnpm lint` - Lint all apps and packages
- `pnpm clean` - Clean up all apps and packages
- `pnpm format` - Format all apps and packages

## License

MIT
