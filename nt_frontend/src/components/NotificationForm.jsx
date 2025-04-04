import { useState, useEffect } from 'react';
import { XMarkIcon, ChatBubbleLeftRightIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

function NotificationForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    platform: 'Slack',
    user_id: 0
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Limpar erros quando o formulário é fechado
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setTouched({});
      setFormData({
        title: '',
        message: '',
        platform: 'Slack',
        user_id: ''
      });
    }
  }, [isOpen]);

  const validate = (data) => {
    const newErrors = {};
    
    if (!data.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    } else if (data.title.length > 100) {
      newErrors.title = 'O título deve ter no máximo 100 caracteres';
    }
    
    if (!data.message.trim()) {
      newErrors.message = 'A mensagem é obrigatória';
    }
    
    if (!data.user_id) {
      newErrors.user_id = 'O ID do usuário é obrigatório';
    } else if (isNaN(Number(data.user_id)) || !Number.isInteger(Number(data.user_id))) {
      newErrors.user_id = 'O ID do usuário deve ser um número inteiro';
    }
    
    return newErrors;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar apenas o campo que perdeu o foco
    const fieldErrors = validate({ ...formData });
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Se o campo já foi tocado, valide-o em tempo real
    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos os campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validar todos os campos
    const formErrors = validate(formData);
    setErrors(formErrors);
    
    // Se houver erros, não prossiga
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Converter o ID do usuário para um número inteiro antes de enviar
      const formDataToSubmit = {
        ...formData,
        user_id: parseInt(formData.user_id, 10)
      };
      
      await onSubmit(formDataToSubmit);
      setFormData({
        title: '',
        message: '',
        platform: 'Slack',
        user_id: ''
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Slack':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-[#4A154B]" />;
      case 'WhatsApp':
        return <PhoneIcon className="h-5 w-5 text-[#25D366]" />;
      case 'Gmail':
        return <EnvelopeIcon className="h-5 w-5 text-[#EA4335]" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <motion.div 
              className="fixed inset-0 bg-background/80 transition-opacity" 
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            
            <motion.div 
              className="relative transform overflow-hidden rounded-lg bg-card px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-card text-text/60 hover:text-text"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  <span className="sr-only">Fechar</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="flex items-center">
                    <motion.div 
                      className="flex-shrink-0 rounded-full bg-accent/10 p-2"
                      key={formData.platform}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getPlatformIcon(formData.platform)}
                    </motion.div>
                    <h3 className="ml-3 text-lg font-semibold leading-6 text-text">
                      Nova Notificação
                    </h3>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-text mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input-field w-full ${errors.title ? 'border-red-500' : ''}`}
                        placeholder="Título da notificação"
                        required
                        disabled={isSubmitting}
                      />
                      {errors.title && touched.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                        Mensagem
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input-field w-full ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Conteúdo da mensagem"
                        required
                        disabled={isSubmitting}
                      />
                      {errors.message && touched.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="platform" className="block text-sm font-medium text-text mb-1">
                        Plataforma
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <motion.button
                          type="button"
                          onClick={() => handleChange({ target: { name: 'platform', value: 'Slack' } })}
                          className={`flex items-center justify-center p-2 rounded-md border ${
                            formData.platform === 'Slack' 
                              ? 'border-accent bg-accent/10 text-accent' 
                              : 'border-card/50 text-text/60 hover:border-accent/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
                          <span>Slack</span>
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => handleChange({ target: { name: 'platform', value: 'WhatsApp' } })}
                          className={`flex items-center justify-center p-2 rounded-md border ${
                            formData.platform === 'WhatsApp' 
                              ? 'border-accent bg-accent/10 text-accent' 
                              : 'border-card/50 text-text/60 hover:border-accent/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          <PhoneIcon className="h-5 w-5 mr-1" />
                          <span>WhatsApp</span>
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => handleChange({ target: { name: 'platform', value: 'Gmail' } })}
                          className={`flex items-center justify-center p-2 rounded-md border ${
                            formData.platform === 'Gmail' 
                              ? 'border-accent bg-accent/10 text-accent' 
                              : 'border-card/50 text-text/60 hover:border-accent/50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          <EnvelopeIcon className="h-5 w-5 mr-1" />
                          <span>Gmail</span>
                        </motion.button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="user_id" className="block text-sm font-medium text-text mb-1">
                        ID do Usuário
                      </label>
                      <input
                        type="number"
                        name="user_id"
                        id="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input-field w-full ${errors.user_id ? 'border-red-500' : ''}`}
                        placeholder="ID do destinatário (apenas números)"
                        required
                        disabled={isSubmitting}
                      />
                      {errors.user_id && touched.user_id && (
                        <p className="mt-1 text-sm text-red-500">{errors.user_id}</p>
                      )}
                    </div>
                    
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <motion.button
                        type="submit"
                        className="btn-primary w-full sm:ml-3 sm:w-auto relative"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </div>
                        ) : (
                          'Enviar'
                        )}
                      </motion.button>
                      <motion.button
                        type="button"
                        className="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto"
                        onClick={onClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationForm; 