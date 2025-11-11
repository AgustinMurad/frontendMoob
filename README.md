# Frontend MOOB - React + Vite + TypeScript + TailwindCSS

Aplicacion frontend para MOOB challenge desarrollada en React, Vite, TypeScript y estilos con TailwindCSS.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with JWT interceptors

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Features

### Authentication

- JWT almacenados en localStorage
- Inyeccion de token automatizado en API request via axios
- Auto-redirect a login ante respuesta con status 400

### Routing

- **Rutas publicas**: `/login`, `/register`
- **Rutas protegidas**: `/dashboard`, `/messages/send`, `/messages/sent`
- Redireccion default a `/dashboard`

### Styling

- TailwindCSS
- Diseño responsive

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
