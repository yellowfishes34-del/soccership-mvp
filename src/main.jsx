import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from './context/RouterContext';
import { UIProvider }     from './context/UIContext';
import { AuthProvider }   from './context/AuthContext';
import { DataProvider }   from './context/DataContext';

import App from './App';

/**
 * Provider 순서:
 *   Router (라우팅) → UI (토스트/모달) → Auth (로그인, UI에 의존) → Data (데이터, UI에 의존)
 *
 * Supabase 연동 후에는 AuthProvider/DataProvider 내부 구현만 교체하면 됩니다.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <UIProvider>
        <AuthProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthProvider>
      </UIProvider>
    </RouterProvider>
  </StrictMode>
);
