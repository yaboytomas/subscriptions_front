'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Client, apiService, ApiError } from '@/lib/api';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOfficeIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ClientFormModal } from '@/components/ClientFormModal';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await apiService.getClients();
      setClients(data);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Error al cargar los clientes');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) return;
    
    try {
      await apiService.deleteClient(id);
      setClients(clients.filter(client => client._id !== id));
      toast.success('Cliente eliminado exitosamente');
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Error al eliminar el cliente');
      }
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUpcomingRenewals = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return clients.filter(client => {
      const renewalDate = new Date(client.subscriptionRenewalDate);
      return renewalDate <= thirtyDaysFromNow && renewalDate >= new Date();
    });
  };

  const getTotalRevenue = () => {
    return clients.reduce((total, client) => total + client.subscriptionAmount, 0);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Clientes</h1>
            <p className="mt-1 text-sm text-gray-400">
              Gestiona tus clientes de suscripción y sus renovaciones
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={() => setShowCreateModal(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Agregar Cliente
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                                 <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                   <BuildingOfficeIcon className="h-5 w-5 text-blue-400" />
                 </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Clientes</p>
                <p className="text-2xl font-semibold text-gray-100">{clients.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                                 <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center">
                   <CalendarIcon className="h-5 w-5 text-green-400" />
                 </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Próximas Renovaciones</p>
                <p className="text-2xl font-semibold text-gray-100">{getUpcomingRenewals().length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                                 <div className="w-8 h-8 bg-yellow-900 rounded-lg flex items-center justify-center">
                   <BuildingOfficeIcon className="h-5 w-5 text-yellow-400" />
                 </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Ingresos Mensuales</p>
                <p className="text-2xl font-semibold text-gray-100">${getTotalRevenue().toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
           </div>
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Clients List */}
        <Card>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Fecha de Renovación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {filteredClients.map((client) => {
                  const renewalDate = new Date(client.subscriptionRenewalDate);
                  const isUpcoming = renewalDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                  
                  return (
                    <tr key={client._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                     <div className="flex items-center text-sm text-gray-500">
                             <EnvelopeIcon className="h-4 w-4 mr-1" />
                             {client.email}
                           </div>
                           <div className="flex items-center text-sm text-gray-500">
                             <PhoneIcon className="h-4 w-4 mr-1" />
                             {client.phone}
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(renewalDate, 'MMM dd, yyyy')}
                        </div>
                        {isUpcoming && (
                          <div className="text-xs text-orange-600 font-medium">
                            Upcoming renewal
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${client.subscriptionAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                                                     <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => setEditingClient(client)}
                           >
                             <PencilIcon className="h-4 w-4" />
                           </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClient(client._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                                                         <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  {searchTerm ? 'No clients found matching your search.' : 'No clients yet. Add your first client to get started.'}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

             <ClientFormModal
         isOpen={showCreateModal || !!editingClient}
         onClose={() => {
           setShowCreateModal(false);
           setEditingClient(null);
         }}
         client={editingClient}
         onSuccess={loadClients}
                />
       </DashboardLayout>
     </ProtectedRoute>
   );
 } 