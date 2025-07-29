'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  UsersIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Subscription Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Manage Your Subscription Business
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Keep track of your clients, monitor renewals, and grow your subscription revenue with our comprehensive management platform.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link href="/register">
                <Button size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Client Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Organize and manage all your subscription clients in one place.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-green-100">
                  <CalendarIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Renewal Tracking</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Never miss a renewal with automated tracking and notifications.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-yellow-100">
                  <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Revenue Analytics</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Track your monthly recurring revenue and growth metrics.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-purple-100">
                  <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Secure & Reliable</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Enterprise-grade security to protect your business data.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
