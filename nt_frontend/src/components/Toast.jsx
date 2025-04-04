import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function Toast({ show, setShow, message, type = 'success', duration = 3000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, setShow, duration]);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <motion.div 
        className="fixed inset-0 z-50 flex items-end pointer-events-none sm:items-start sm:p-6 sm:justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div
          className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ${
            type === 'success' 
              ? 'bg-green-50 ring-green-500/10' 
              : 'bg-red-50 ring-red-500/10'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === 'success' ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                ) : (
                  <ExclamationCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {type === 'success' ? 'Sucesso!' : 'Erro!'}
                </p>
                <p className={`mt-1 text-sm ${type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {message}
                </p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className={`inline-flex rounded-md ${
                    type === 'success' 
                      ? 'bg-green-50 text-green-500 hover:text-green-600' 
                      : 'bg-red-50 text-red-500 hover:text-red-600'
                  }`}
                  onClick={() => setShow(false)}
                >
                  <span className="sr-only">Fechar</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Transition>
  );
}

export default Toast; 