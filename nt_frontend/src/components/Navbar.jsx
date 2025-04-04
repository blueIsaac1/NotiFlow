import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Notificações', href: '/notifications', icon: BellIcon },
  { name: 'Configurações', href: '/settings', icon: Cog6ToothIcon },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-card shadow-lg border-b border-card/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-2xl font-bold text-accent">NotiFlow</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'border-b-2 border-accent text-text'
                        : 'text-text/60 hover:border-b-2 hover:border-accent/40 hover:text-text'
                    }`}
                  >
                    <item.icon className="icon-sm mr-1.5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 