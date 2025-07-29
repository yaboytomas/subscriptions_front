# Subscription Management Frontend

A modern, responsive web application for managing subscription clients and renewals. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Password reset functionality
- Protected routes

### 👥 Client Management
- Add, edit, and delete clients
- Search and filter clients
- Client details with contact information
- Subscription renewal tracking

### 📊 Dashboard
- Overview statistics (total clients, upcoming renewals, revenue)
- Real-time data visualization
- Responsive design for all devices

### 🎨 Modern UI
- Clean, professional design
- Responsive layout
- Toast notifications
- Loading states
- Form validation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Headless UI
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd subscriptions_front
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── register/
│   ├── forgot-password/
│   └── reset-password/
├── components/            # Reusable components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   └── ClientFormModal.tsx
├── contexts/             # React contexts
│   └── AuthContext.tsx
└── lib/                  # Utilities and API
    └── api.ts
```

## API Integration

The frontend integrates with your backend API with the following endpoints:

### Authentication
- `POST /users/registerUser` - User registration
- `POST /users/loginUser` - User login
- `POST /users/logoutUser` - User logout
- `GET /users/getProfile` - Get user profile
- `POST /users/forgot-password` - Request password reset
- `POST /users/reset-password/:token` - Reset password

### Client Management
- `GET /clients` - Get all clients
- `POST /clients` - Create new client
- `GET /clients/:id` - Get client by ID
- `PUT /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client

## Key Components

### AuthContext
Manages authentication state throughout the application:
- User login/logout
- Token management
- Protected route handling

### DashboardLayout
Responsive layout with sidebar navigation:
- Mobile-friendly design
- User menu with logout
- Navigation between sections

### ClientFormModal
Reusable modal for creating/editing clients:
- Form validation
- Error handling
- Responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3000` |

## Features in Detail

### Client Management
- **Add Clients**: Complete form with validation for all required fields
- **Edit Clients**: In-place editing with pre-filled forms
- **Delete Clients**: Confirmation dialog before deletion
- **Search**: Real-time search across name, email, and company
- **Sorting**: Sort by renewal date, amount, or name

### Dashboard Analytics
- **Total Clients**: Count of all active clients
- **Upcoming Renewals**: Clients with renewals in the next 30 days
- **Monthly Revenue**: Total subscription amount across all clients

### Responsive Design
- **Mobile**: Optimized for mobile devices with collapsible sidebar
- **Tablet**: Adaptive layout for tablet screens
- **Desktop**: Full-featured desktop experience

## Security Features

- JWT token authentication
- Protected routes
- Secure token storage in localStorage
- Automatic token refresh
- CSRF protection through proper headers

## Error Handling

- Comprehensive error handling for API calls
- User-friendly error messages
- Toast notifications for success/error states
- Loading states for better UX

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
