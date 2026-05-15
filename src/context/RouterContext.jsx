import { createContext, useContext, useState, useCallback } from 'react';

const RouterCtx = createContext(null);

export function RouterProvider({ children }) {
  const [route, setRoute] = useState({ page: 'home', params: {} });

  const navigate = useCallback((page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo(0, 0);
  }, []);

  return (
    <RouterCtx.Provider value={{ route, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
}

export const useRouter = () => useContext(RouterCtx);
