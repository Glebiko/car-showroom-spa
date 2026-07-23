import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import VehiclePage from './pages/VehiclePage/VehiclePage';

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclePage />} />
          <Route path="/vehicles/:vehicleId" element={<VehiclePage />} />
          <Route path="*" element={<div>Сторінку не знайдено</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
