import './App.css';
import './i18n/i18n';  // <-- ESSENCIAL, inicializa o i18next
import { Header } from './header';
import { Footer } from './footer';
import { Body } from './Body';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  )
}

export default App;
