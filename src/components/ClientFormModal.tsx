'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Client, ClientData, apiService, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client | null;
  onSuccess: () => void;
}

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subscriptionRenewalDate: string;
  subscriptionAmount: number;
  notes: string;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  isOpen,
  onClose,
  client,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const isEditing = !!client;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ClientFormData>();

  useEffect(() => {
    if (isOpen && client) {
      reset({
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company,
        subscriptionRenewalDate: client.subscriptionRenewalDate.split('T')[0],
        subscriptionAmount: client.subscriptionAmount,
        notes: client.notes || ''
      });
    } else if (isOpen && !client) {
      reset({
        name: '',
        email: '',
        phone: '',
        company: '',
        subscriptionRenewalDate: '',
        subscriptionAmount: 0,
        notes: ''
      });
    }
  }, [isOpen, client, reset]);

  const onSubmit = async (data: ClientFormData) => {
    setLoading(true);
    try {
      const clientData: ClientData = {
        ...data,
        subscriptionRenewalDate: new Date(data.subscriptionRenewalDate).toISOString()
      };

      if (isEditing && client) {
        await apiService.updateClient(client._id, clientData);
        toast.success('Client updated successfully');
      } else {
        await apiService.createClient(clientData);
        toast.success('Client created successfully');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditing ? 'Edit Client' : 'Add New Client'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                error={errors.name?.message}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Name must be less than 50 characters'
                  }
                })}
              />

              <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <Input
                label="Phone"
                type="tel"
                error={errors.phone?.message}
                {...register('phone', {
                  required: 'Phone is required',
                  minLength: {
                    value: 10,
                    message: 'Phone must be at least 10 characters'
                  },
                  maxLength: {
                    value: 15,
                    message: 'Phone must be less than 15 characters'
                  }
                })}
              />

              <Input
                label="Company"
                error={errors.company?.message}
                {...register('company', {
                  required: 'Company is required',
                  minLength: {
                    value: 2,
                    message: 'Company must be at least 2 characters'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Company must be less than 100 characters'
                  }
                })}
              />

              <Input
                label="Subscription Renewal Date"
                type="date"
                error={errors.subscriptionRenewalDate?.message}
                {...register('subscriptionRenewalDate', {
                  required: 'Renewal date is required'
                })}
              />

              <Input
                label="Subscription Amount ($)"
                type="number"
                min="0"
                step="0.01"
                error={errors.subscriptionAmount?.message}
                {...register('subscriptionAmount', {
                  required: 'Amount is required',
                  min: {
                    value: 0,
                    message: 'Amount must be positive'
                  }
                })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  {...register('notes', {
                    maxLength: {
                      value: 500,
                      message: 'Notes must be less than 500 characters'
                    }
                  })}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional notes about this client..."
                />
                {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                >
                  {isEditing ? 'Update Client' : 'Create Client'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}; 