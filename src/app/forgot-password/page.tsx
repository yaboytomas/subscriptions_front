'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { apiService, ApiError } from '@/lib/api';
import toast from 'react-hot-toast';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      await apiService.forgotPassword(data.email);
      setEmailSent(true);
      toast.success('Email de restablecimiento de contraseña enviado exitosamente');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Revisa tu correo electrónico
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Te hemos enviado un enlace para restablecer tu contraseña. Por favor revisa tu correo y sigue las instrucciones.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <div className="text-center py-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-900">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-100">Email enviado exitosamente</h3>
              <p className="mt-2 text-sm text-gray-400">
                Si no ves el email, revisa tu carpeta de spam.
              </p>
              <div className="mt-6">
                <Link href="/login">
                  <Button variant="secondary">
                    Volver a Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Restablecer tu contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Ingresa tu dirección de email y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Dirección de correo electrónico"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Dirección de email inválida'
                }
              })}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Enviar enlace de restablecimiento
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-sm text-blue-400 hover:text-blue-300">
                Volver a iniciar sesión
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 