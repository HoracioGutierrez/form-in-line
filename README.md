# Next.js Full-Stack Boilerplate

A modern, feature-rich boilerplate for personal projects built with Next.js and various modern web technologies.

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHoracioGutierrez%2Fnextjs-boilerplate%2Ftree%2Fmain&env=NEXT_PUBLIC_DATABASE_URL,NEXT_PUBLIC_DIRECT_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_GOOGLE_REDIRECT_URL"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

## Features

- **Next.js 15** - Latest version with App Router and React Server Components
- **TypeScript** - Type safety across the entire project
- **Internationalization** - Support for multiple languages using next-international
- **Authentication** - Built-in authentication with Supabase
- **Database Integration** - Prisma ORM with PostgreSQL database support
- **UI Components** - Custom UI components with Tailwind CSS and Radix UI
- **Dark/Light Mode** - Theme switching capability with next-themes
- **Form Validation** - Client and server-side validation with Yup

## Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-international](https://github.com/QuiiBz/next-international)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Radix UI](https://www.radix-ui.com/)

### Backend
- [Supabase](https://supabase.com/) - Authentication and backend services
- [Prisma](https://www.prisma.io/) - Type-safe ORM
- [PostgreSQL](https://www.postgresql.org/) - Database

### Development Tools
- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager

## Project Structure

```
├── actions/               # Server actions for auth and data operations
├── app/                   # Next.js app directory with routes
│   └── [locale]/          # Internationalized routes
├── components/            # React components
│   ├── main-layout/       # Layout components (header, footer, etc.)
│   ├── signin/            # Sign-in related components
│   ├── signout/           # Sign-out related components
│   ├── signup/            # Sign-up related components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and shared code
├── locales/               # Internationalization files
├── prisma/                # Prisma schema and configurations
│   ├── generated/         # Generated Prisma client
│   └── migrations/        # Database migrations
├── public/                # Static files
└── supabase/              # Supabase configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/) (v1.0 or later)
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1. Clone this repository
   ```bash
   git clone <your-repo-url>
   cd boilerplate
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration details.

4. Run database migrations
   ```bash
   bunx prisma migrate dev
   ```

5. Start the development server
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to see your application

## Scripts

- `bun dev` - Start the development server with Turbopack
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint to check code quality

## Deployment

This project can be deployed to any platform that supports Next.js applications, such as Vercel.

```bash
bun build
```

## License

This project is available for personal use.