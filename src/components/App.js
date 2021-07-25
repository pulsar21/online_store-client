import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '../assets/scss/App.scss';

import { useTypeAction } from '../hooks/useTypeAction';
import AppLoader from './loader/AppLoader';
import AppRouter from './router/AppRouter';

const App = () => {
  const initialized = useSelector(state => state.app.initialized)
  const { initializeApp } = useTypeAction();

  useEffect(() => {
      initializeApp();
  }, []);

  if(!initialized) {
      return <AppLoader />;
  };
  
  return <>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </>
};

export default App;
