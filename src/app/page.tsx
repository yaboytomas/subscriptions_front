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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-100">Gestor de Suscripciones</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Comenzar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-100 sm:text-5xl">
              Gestiona Tu Negocio de Suscripciones
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Mantén un seguimiento de tus clientes, monitorea renovaciones y haz crecer tus ingresos por suscripción con nuestra plataforma integral de gestión.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link href="/register">
                <Button size="lg">
                  Comenzar Prueba Gratuita
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Iniciar Sesión
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
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-blue-900">
                  <UsersIcon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-100">Gestión de Clientes</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Organiza y gestiona todos tus clientes de suscripción en un solo lugar.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-green-900">
                  <CalendarIcon className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-100">Seguimiento de Renovaciones</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Nunca te pierdas una renovación con seguimiento automatizado y notificaciones.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-yellow-900">
                  <CurrencyDollarIcon className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-100">Análisis de Ingresos</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Rastrea tus ingresos recurrentes mensuales y métricas de crecimiento.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-purple-900">
                  <ShieldCheckIcon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-100">Seguro y Confiable</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Seguridad de nivel empresarial para proteger los datos de tu negocio.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
