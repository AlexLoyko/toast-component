import React from "react";
import useKeyPressed from "../../hooks/useKeyPressed";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => setToasts([]), [])
  useKeyPressed('Escape', handleEscape);

  function createToast(message, variant) {
    setToasts([...toasts, {
      id: crypto.randomUUID(),
      message,
      variant
    }]);
  }

  function dismissToast(id) {
    setToasts(toasts.filter((t) => t.id !== id));
  }

  return (
      <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
        {children}
      </ToastContext.Provider>
  );
}

export default ToastProvider;
