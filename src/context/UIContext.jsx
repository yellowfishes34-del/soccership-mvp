import { createContext, useContext, useState, useCallback } from 'react';

const UICtx = createContext(null);

export function UIProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null); // 'login' | 'signup' | null

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const openModal  = useCallback((m) => setModal(m), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <UICtx.Provider value={{ toast, modal, showToast, openModal, closeModal }}>
      {children}
    </UICtx.Provider>
  );
}

export const useUI = () => useContext(UICtx);
