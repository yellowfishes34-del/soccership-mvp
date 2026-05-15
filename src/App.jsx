import { useRouter } from './context/RouterContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthModal from './components/layout/AuthModal';
import { ToastNotification } from './components/shared/ui';

import HomePage          from './pages/HomePage';
import PlayersPage       from './pages/PlayersPage';
import PlayerDetailPage  from './pages/PlayerDetailPage';
import PlayerRegisterPage from './pages/PlayerRegisterPage';
import BoardPage         from './pages/BoardPage';
import PostDetailPage    from './pages/PostDetailPage';
import ConsultPage       from './pages/ConsultPage';

const PAGES = {
  home:              HomePage,
  players:           PlayersPage,
  'player-detail':   PlayerDetailPage,
  'player-register': PlayerRegisterPage,
  board:             BoardPage,
  'post-detail':     PostDetailPage,
  consult:           ConsultPage,
};

export default function App() {
  const { route } = useRouter();
  const PageComponent = PAGES[route.page] || HomePage;

  return (
    <div style={{ minHeight: '100vh', background: '#07080F', color: '#E2E8F0', fontFamily: '-apple-system, "Segoe UI", system-ui, sans-serif' }}>
      <Navbar />
      <main>
        <PageComponent />
      </main>
      <Footer />
      <AuthModal />
      <ToastNotification />
    </div>
  );
}
