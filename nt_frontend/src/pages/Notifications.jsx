import { useState, useEffect } from 'react';
import { getNotifications, createNotification } from '../services/api';
import { PlusIcon, EyeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import NotificationForm from '../components/NotificationForm';
import PageTransition from '../components/PageTransition';
import Toast from '../components/Toast';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        setToast({
          show: true,
          message: 'Não foi possível carregar as notificações. Tente novamente mais tarde.',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const handleSubmit = async (formData) => {
    try {
      // Garantir que user_id é um número antes de enviar
      const payload = {
        ...formData,
        user_id: parseInt(formData.user_id, 10)
      };
      
      // Chamada à API para criar a notificação
      await createNotification(payload);
      
      // Fechar o formulário após o envio
      setIsFormOpen(false);
      
      // Exibir mensagem de sucesso
      setToast({
        show: true,
        message: 'Notificação criada com sucesso!',
        type: 'success'
      });
      
      // Atualizar a lista de notificações
      setIsLoading(true);
      const updatedData = await getNotifications();
      setNotifications(updatedData);
      setIsLoading(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      
      // Exibir mensagem de erro
      setToast({
        show: true,
        message: 'Erro ao criar notificação. Tente novamente.',
        type: 'error'
      });
      
      return Promise.reject(error);
    }
  };

  return (
    <PageTransition>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold text-text">Notificações</h1>
            <p className="mt-2 text-sm text-text/60">
              Gerencie suas notificações e configure os canais de envio.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsFormOpen(true)}
            >
              <PlusIcon className="icon-sm inline-block mr-1.5" />
              Nova Notificação
            </button>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-card/50">
                  <thead className="bg-card">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text sm:pl-6">
                        Titulo
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text sm:pl-6">
                        Mensagem
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text">
                        Plataforma
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text">
                        ID Usuário
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text">
                        Data de Criação
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card/50 bg-card/50">
                    {isLoading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-text/60">
                          <div className="flex justify-center">
                            <svg className="animate-spin h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="ml-2">Carregando...</span>
                          </div>
                        </td>
                      </tr>
                    ) : notifications.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-text/60">
                          Nenhuma notificação encontrada
                        </td>
                      </tr>
                    ) : (
                      notifications.map((notification) => (
                        <tr key={notification.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-text sm:pl-6">
                            {notification.title.length > 25 
                              ? `${notification.title.substring(0, 15)}...` 
                              : notification.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-text/60">
                            {notification.message.length > 50 
                              ? `${notification.message.substring(0, 50)}...` 
                              : notification.message}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-text/60">
                            <div className="flex items-center">
                              {notification.platform}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-text/60">
                            {notification.user_id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-text/60">
                            {new Date(notification.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end space-x-2">
                              <button 
                                className="text-accent hover:text-accent/80"
                                onClick={() => openModal(notification)}
                              >
                                <EyeIcon className="h-5 w-5" />
                              </button>
                              <button className="text-accent hover:text-accent/80">
                                Editar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para exibir a mensagem completa */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          title={selectedNotification?.title || 'Detalhes da Notificação'}
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text/60">Mensagem</h4>
              <p className="mt-1 text-text whitespace-pre-wrap">{selectedNotification?.message}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-text/60">Plataforma</h4>
                <p className="mt-1 text-text">
                  <div className="flex items-center">
                    {selectedNotification?.platform === 'Slack' && (
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1 text-accent" />
                    )}
                    {selectedNotification?.platform}
                  </div>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text/60">ID Usuário</h4>
                <p className="mt-1 text-text">{selectedNotification?.user_id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text/60">Data de Criação</h4>
                <p className="mt-1 text-text">
                  {selectedNotification?.created_at 
                    ? new Date(selectedNotification.created_at).toLocaleString('pt-BR')
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        </Modal>

        {/* Formulário para criar nova notificação */}
        <NotificationForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />

        {/* Toast para feedback */}
        <Toast
          show={toast.show}
          setShow={(show) => setToast(prev => ({ ...prev, show }))}
          message={toast.message}
          type={toast.type}
        />
      </div>
    </PageTransition>
  );
}

export default Notifications; 