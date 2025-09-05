# Future Vision Agency

A React application for Future Vision Agency, showcasing events, team members, and providing an admin dashboard for content management.

## Features

- Public-facing website with sections for:
  - About the agency
  - Team members/athletes
  - Competitions and events
  - Partners
  - Contact information

- Admin dashboard with:
  - Firebase authentication
  - Team management
  - Event management

## Technical Stack

- React (with TypeScript)
- Vite
- Framer Motion
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- React Router

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Authentication

The application uses Firebase Authentication with email/password login for the admin dashboard.

### Admin Login

To access the admin dashboard, navigate to `/admin` and log in with your Firebase account credentials.

## Configuration

Firebase configuration is stored in `src/firebase/config.ts` and includes:
- Authentication
- Firestore Database
- Storage

## License

This project is licensed under the MIT License.
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
