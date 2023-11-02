import { Routes, Route, HashRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages';
import Basket from './pages/basket';
import NotFound from './pages/404';
import { GlobalThemeProvider } from './theme';

function App() {
  return (
    <GlobalThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </GlobalThemeProvider>
  );
}

export default App;
