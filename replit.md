# Overview

TennisVerse is a fantasy ATP tennis application that allows users to build virtual teams using real ATP players and compete in fantasy leagues. The application provides a comprehensive fantasy sports experience with player management, scoring systems, leaderboards, and tournament tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system including gradient themes, animations, and dark mode support
- **State Management**: React hooks with local state management (no external state library currently implemented)
- **Data Fetching**: TanStack Query for server state management and caching

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix routing
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) designed for easy migration to persistent storage
- **Development Mode**: Integrated Vite development server with HMR and middleware support

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe schema definitions using Drizzle with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Current Tables**: Users table with username/password authentication (basic implementation)

## Project Structure
- **Monorepo Layout**: Client, server, and shared code in separate directories
- **Shared Types**: Common TypeScript interfaces and schemas in `/shared` directory
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)

## Authentication & Security
- **Current State**: Basic user schema implemented but no authentication middleware
- **Planned**: Session-based authentication with PostgreSQL session storage (connect-pg-simple dependency present)

## Development Workflow
- **Build Process**: Vite for client bundling, esbuild for server bundling
- **Type Safety**: Strict TypeScript configuration across client/server/shared code
- **Hot Reload**: Integrated development experience with Vite middleware

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL via `@neondatabase/serverless`
- **Connection**: Environment variable `DATABASE_URL` required for database connectivity

## UI Components
- **Radix UI**: Complete set of accessible UI primitives for React
- **Shadcn/ui**: Pre-built component library with customizable styling
- **Icons**: Lucide React for consistent iconography

## Development Tools
- **Vite**: Build tool with React plugin and development server
- **TypeScript**: Strict type checking and modern JS features
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Validation & Forms
- **Zod**: Schema validation for runtime type checking
- **React Hook Form**: Form state management with `@hookform/resolvers`
- **Drizzle Zod**: Integration between Drizzle ORM and Zod validation

## Utility Libraries
- **Date-fns**: Date manipulation and formatting
- **Class Variance Authority**: Type-safe className composition
- **Clsx**: Conditional className utility
- **Nanoid**: Unique ID generation

## Replit Integration
- **Cartographer**: Replit-specific Vite plugin for enhanced development experience
- **Runtime Error Overlay**: Development error handling plugin