# Admin Dashboard

This folder contains the admin dashboard for managing event registrations. **This folder is excluded from version control** and should never be published.

## Features

- 🔐 Password-protected access
- 📊 Real-time statistics and analytics
- 📋 Comprehensive registration table with search and pagination
- 🔍 Filter by event
- 📥 Export data to CSV
- 📱 Responsive design
- 🖼️ Payment screenshot viewer

## Access

- **URL**: `/admin/login`
- **Password**: Set via `VITE_ADMIN_PASSWORD` environment variable (default: `admin123`)

## Usage

1. Navigate to `/admin/login`
2. Enter the admin password
3. View and manage all registrations
4. Filter by specific events
5. Export data for analysis

## Security Notes

- Password is stored in environment variables
- Session-based authentication (clears on browser close)
- All access attempts should be monitored
- **Never commit this folder to git**

## Environment Variables

Add to your `.env` file:
```
VITE_ADMIN_PASSWORD=your_secure_password_here
```

## Components

- **Login.tsx** - Authentication page
- **Dashboard.tsx** - Main dashboard with statistics and data
- **components/Statistics.tsx** - Statistics cards and charts
- **components/RegistrationsTable.tsx** - Searchable, paginated table
- **components/EventFilter.tsx** - Event selection dropdown
- **components/ProtectedRoute.tsx** - Route protection wrapper
