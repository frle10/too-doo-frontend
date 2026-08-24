import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const ApplicationRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/NotFound' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/:uuid' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRouter;
