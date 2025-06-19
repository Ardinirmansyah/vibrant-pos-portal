# Vibrant POS Portal

A modern Point of Sale (POS) system built with React, TypeScript, and Supabase.

## 🚀 Live Demo

**Live Site**: [https://ardinirmansyah.github.io/vibrant-pos-portal/](https://ardinirmansyah.github.io/vibrant-pos-portal/)

## ✨ Features

- **Dashboard**: Real-time sales overview and analytics
- **Product Management**: Add, edit, and manage inventory (Admin only)
- **Transaction Processing**: Complete sales with shopping cart functionality
- **Reports & Analytics**: Comprehensive business insights (Admin only)
- **User Management**: Role-based access control (Admin only)
- **Authentication**: Secure login with Supabase Auth
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Auth, Real-time)
- **Charts**: Recharts
- **State Management**: TanStack Query
- **Routing**: React Router
- **Icons**: Lucide React

## 🏗️ Architecture

### User Roles
- **Admin**: Full access to all features including reports and user management
- **Cashier**: Access to dashboard, transactions, and product viewing

### Pages
- `/` - Dashboard with sales overview
- `/products` - Product management (Admin: full CRUD, Cashier: view only)
- `/transactions` - Point of sale interface
- `/reports` - Analytics and reports (Admin only)
- `/users` - User management (Admin only)
- `/auth` - Authentication page

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment
1. Push changes to the `main` branch
2. GitHub Actions will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages
3. Site will be available at: https://ardinirmansyah.github.io/vibrant-pos-portal/

### Manual Setup (for development)

```bash
# Clone the repository
git clone https://github.com/ardinirmansyah/vibrant-pos-portal.git
cd vibrant-pos-portal

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Setup

The project uses Supabase for backend services. Make sure your Supabase project is properly configured with:

1. **Database Tables**:
   - `profiles` - User profiles
   - `user_roles` - User role assignments
   - `products` - Product inventory
   - `transactions` - Sales transactions
   - `transaction_items` - Transaction line items

2. **Authentication**:
   - Email/password authentication enabled
   - Row Level Security (RLS) policies configured

3. **API Configuration**:
   - Project URL and anonymous key configured in `src/integrations/supabase/client.ts`

## 🔧 Configuration

### Vite Configuration
The project is configured for GitHub Pages deployment with the correct base path:

```typescript
export default defineConfig({
  base: '/vibrant-pos-portal/',
  // ... other config
});
```

### GitHub Actions
Deployment is handled by `.github/workflows/deploy.yml` which:
- Triggers on push to main branch
- Installs dependencies with `npm ci`
- Builds the project with `npm run build`
- Deploys to GitHub Pages

## 📱 Usage

1. **Login**: Use your credentials to access the system
2. **Dashboard**: View sales overview and quick stats
3. **Products**: Manage your inventory (Admin can add/edit, Cashier can view)
4. **Transactions**: Process sales by adding products to cart
5. **Reports**: View detailed analytics and business insights (Admin only)
6. **Users**: Manage user roles and permissions (Admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Built with ❤️ using Lovable and deployed on GitHub Pages.
