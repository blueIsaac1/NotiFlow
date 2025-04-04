import { BellIcon, EnvelopeIcon, ChatBubbleLeftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { getNotifications } from '../services/api';
import PageTransition from '../components/PageTransition';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    gmail: 0,
    whatsapp: 0,
    slack: 0
  });

  const statsConfig = [
    { name: 'Total de Notificações', value: stats.total, icon: BellIcon },
    { name: 'G-mails Enviados', value: stats.gmail, icon: EnvelopeIcon },
    { name: 'Mensagens WhatsApp', value: stats.whatsapp, icon: ChatBubbleLeftIcon },
    { name: 'Slack', value: stats.slack, icon: ChatBubbleLeftRightIcon },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();

        setStats({
          total: data.length,
          gmail: data.filter(n => n.platform === 'Gmail').length,
          whatsapp: data.filter(n => n.platform === 'Whatsapp').length,
          slack: data.filter(n => n.platform === 'Slack').length
        }); 
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-bold text-text mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statsConfig.map((item) => (
            <div
              key={item.name}
              className="card card-hover"
            >
              <dt>
                <div className="absolute rounded-md bg-primary p-2">
                  <item.icon className="icon-md text-white" aria-hidden="true" />
                </div>
                <p className="ml-14 truncate text-sm font-medium text-text/60">{item.name}</p>
              </dt>
              <dd className="ml-14 flex items-baseline">
                <p className="text-2xl font-semibold text-text">{item.value}</p>
              </dd>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="card">
            <h2 className="text-lg font-medium text-text mb-4">Atividade Recente</h2>
            <div className="border-t border-card/50">
              <p className="text-text/60 text-center py-4">Nenhuma atividade recente</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Dashboard; 