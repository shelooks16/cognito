import { Routes, Route, HashRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages';
import Basket from './pages/basket';
import NotFound from './pages/404';
import { GlobalThemeProvider } from './theme';
import { BasketCtxProvider } from './features/basket/useBasket';

function App() {
  return (
    <GlobalThemeProvider>
      <BasketCtxProvider>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/basket" element={<Basket />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </BasketCtxProvider>
    </GlobalThemeProvider>
  );
}

export default App;
