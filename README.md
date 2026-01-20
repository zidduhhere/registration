# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment Setup

1. Copy `.env.example` to `.env` and fill in your configuration:
```bash
cp .env.example .env
```

2. Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key
- `VITE_ADMIN_PASSWORD`: Password for admin dashboard access

## Admin Dashboard Features

### Delete Registration (Debug Mode Only)

The admin dashboard includes a delete feature that allows you to permanently remove registration entries along with their associated payment screenshots. This feature is **only available in debug mode** for security reasons.

#### Enabling Debug Mode:

1. Add these variables to your `.env` file:
```env
VITE_DEBUG_MODE=true
VITE_SUPABASE_SERVICE_KEY=your_service_role_key
```

2. Get your service key from Supabase Dashboard → Settings → API → Service role key

⚠️ **Security Warning:**
- **NEVER** commit your service key to version control
- **NEVER** enable debug mode in production
- Only use debug mode in development/testing environments
- The service key has full database access - handle with extreme care

#### Using the Delete Feature:

1. Start the dev server with debug mode enabled
2. Login to the admin dashboard
3. You'll see a yellow "DEBUG MODE" banner at the top of the registrations table
4. Each registration row will have a red "Delete" button
5. Click delete and confirm - this will:
   - Permanently delete the registration record from the database
   - Delete the associated payment screenshot from storage
   - Refresh the dashboard data automatically

## Development

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
