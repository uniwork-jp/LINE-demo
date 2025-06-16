# Create directory structure
New-Item -ItemType Directory -Force -Path "apps/frontend"
New-Item -ItemType Directory -Force -Path "apps/backend"
New-Item -ItemType Directory -Force -Path "packages/shared"
New-Item -ItemType Directory -Force -Path "packages/config"
New-Item -ItemType Directory -Force -Path "infra/terraform"
New-Item -ItemType Directory -Force -Path "infra/scripts"
New-Item -ItemType Directory -Force -Path ".github/workflows"

# Move frontend app
Move-Item -Path "src" -Destination "apps/frontend/"
Move-Item -Path "public" -Destination "apps/frontend/"
Move-Item -Path "styles" -Destination "apps/frontend/"
Move-Item -Path "next.config.ts" -Destination "apps/frontend/"
Move-Item -Path "next-env.d.ts" -Destination "apps/frontend/"
Move-Item -Path "postcss.config.mjs" -Destination "apps/frontend/"
Move-Item -Path "eslint.config.mjs" -Destination "apps/frontend/"

# Create package.json for frontend
$frontendPackageJson = @"
{
  "name": "@line-demo/frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next"
  },
  "dependencies": {
    "@line-demo/shared": "workspace:*",
    "@line/liff": "2.26.1",
    "next": "15.3.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
"@
Set-Content -Path "apps/frontend/package.json" -Value $frontendPackageJson

# Create package.json for shared package
$sharedPackageJson = @"
{
  "name": "@line-demo/shared",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "tsup": "^8.0.2",
    "typescript": "^5"
  }
}
"@
Set-Content -Path "packages/shared/package.json" -Value $sharedPackageJson

# Move shared code to shared package
Move-Item -Path "apps/frontend/src/contexts" -Destination "packages/shared/src/"
Move-Item -Path "apps/frontend/src/hooks" -Destination "packages/shared/src/"

# Create tsconfig for shared package
$sharedTsConfig = @"
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
"@
Set-Content -Path "packages/shared/tsconfig.json" -Value $sharedTsConfig

# Create tsconfig for frontend
$frontendTsConfig = @"
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@line-demo/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@
Set-Content -Path "apps/frontend/tsconfig.json" -Value $frontendTsConfig

Write-Host "Monorepo structure has been set up successfully!"
Write-Host "Next steps:"
Write-Host "1. Run 'pnpm install' to install dependencies"
Write-Host "2. Run 'pnpm build' to build all packages"
Write-Host "3. Run 'pnpm dev' to start development"

node --version
npm --version 