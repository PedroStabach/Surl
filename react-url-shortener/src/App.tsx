import './App.css';
import { Footer } from './Footer/index.tsx';
import { Header } from './Header/index.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home/index.tsx';
import { YourLinks } from './YourLinks/index.tsx';
import { CreateAccount } from './CreateAcount/index';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<YourLinks />} />
          <Route path='/createUser' element={<CreateAccount />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
