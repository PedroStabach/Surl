import './App.css';
import { Footer } from './footer';
import { Header } from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { YourLinks } from './YourLinks';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<YourLinks />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
