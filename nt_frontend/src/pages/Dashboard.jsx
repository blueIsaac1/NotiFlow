import { BellIcon, EnvelopeIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { getNotifications } from '../services/api';



function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    gmail: 0,
    whatsapp: 0
  });

  const statsConfig = [
    { name: 'Total de Notificações', value: stats.total, icon: BellIcon },
    { name: 'G-mails Enviados', value: stats.gmail, icon: EnvelopeIcon },
    { name: 'Mensagens WhatsApp', value: stats.whatsapp, icon: ChatBubbleLeftIcon },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();

        setStats({
          total: data.length,
          gmail: data.filter(n => n.platform === 'Gmail').length,
          whatsapp: data.filter(n => n.platform === 'Whatsapp').length
        }); 
      } catch (error) {
        console.error('Erro ao carregar os dados: ', error)
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statsConfig.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-2">
                <item.icon className="icon-md text-white" aria-hidden="true" />
              </div>
              <p className="ml-14 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-14 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Atividade Recente</h2>
          <div className="border-t border-gray-200">
            <p className="text-gray-500 text-center py-4">Nenhuma atividade recente</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 