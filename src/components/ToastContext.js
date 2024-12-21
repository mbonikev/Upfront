import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((icon, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, icon, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-4 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded shadow opacity-0 animate-fade-in"
          >
            {toast.icon && <span className="mr-2">{toast.icon}</span>}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};