import { useState } from 'react';
import { Switch } from '@headlessui/react';
import PageTransition from '../components/PageTransition';

function Settings() {
  const [settings, setSettings] = useState({
    slack: {
      webhook: '',
      enabled: false,
    },
    whatsapp: {
      apiKey: '',
      enabled: false,
    },
    gmail: {
      email: '',
      enabled: false,
    },
  });

  const handleToggle = (platform) => {
    setSettings((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        enabled: !prev[platform].enabled,
      },
    }));
  };

  const handleInputChange = (platform, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));
  };

  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-bold text-text mb-8">Configurações</h1>

        <div className="space-y-6">
          {/* Slack Settings */}
          <div className="card">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-text">Configurações do Slack</h3>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label htmlFor="slack-webhook" className="block text-sm font-medium text-text/60 mb-1">
                      Webhook URL
                    </label>
                    <input
                      type="text"
                      name="slack-webhook"
                      id="slack-webhook"
                      value={settings.slack.webhook}
                      onChange={(e) => handleInputChange('slack', 'webhook', e.target.value)}
                      className="input-primary"
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                  <div className="ml-4 flex items-center">
                    <Switch
                      checked={settings.slack.enabled}
                      onChange={() => handleToggle('slack')}
                      className={`${
                        settings.slack.enabled ? 'bg-primary' : 'bg-card/50'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
                    >
                      <span className="sr-only">Ativar notificações do Slack</span>
                      <span
                        className={`${
                          settings.slack.enabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <span className="ml-2 text-sm text-text/60">
                      {settings.slack.enabled ? 'Ativado' : 'Desativado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Settings */}
          <div className="card">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-text">Configurações do WhatsApp</h3>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label htmlFor="whatsapp-api" className="block text-sm font-medium text-text/60 mb-1">
                      API Key
                    </label>
                    <input
                      type="password"
                      name="whatsapp-api"
                      id="whatsapp-api"
                      value={settings.whatsapp.apiKey}
                      onChange={(e) => handleInputChange('whatsapp', 'apiKey', e.target.value)}
                      className="input-primary"
                      placeholder="Chave API do WhatsApp"
                    />
                  </div>
                  <div className="ml-4 flex items-center">
                    <Switch
                      checked={settings.whatsapp.enabled}
                      onChange={() => handleToggle('whatsapp')}
                      className={`${
                        settings.whatsapp.enabled ? 'bg-primary' : 'bg-card/50'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
                    >
                      <span className="sr-only">Ativar notificações do WhatsApp</span>
                      <span
                        className={`${
                          settings.whatsapp.enabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <span className="ml-2 text-sm text-text/60">
                      {settings.whatsapp.enabled ? 'Ativado' : 'Desativado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gmail Settings */}
          <div className="card">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-text">Configurações do Gmail</h3>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label htmlFor="gmail-email" className="block text-sm font-medium text-text/60 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="gmail-email"
                      id="gmail-email"
                      value={settings.gmail.email}
                      onChange={(e) => handleInputChange('gmail', 'email', e.target.value)}
                      className="input-primary"
                      placeholder="seu.email@gmail.com"
                    />
                  </div>
                  <div className="ml-4 flex items-center">
                    <Switch
                      checked={settings.gmail.enabled}
                      onChange={() => handleToggle('gmail')}
                      className={`${
                        settings.gmail.enabled ? 'bg-primary' : 'bg-card/50'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
                    >
                      <span className="sr-only">Ativar notificações do Gmail</span>
                      <span
                        className={`${
                          settings.gmail.enabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <span className="ml-2 text-sm text-text/60">
                      {settings.gmail.enabled ? 'Ativado' : 'Desativado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Settings; 