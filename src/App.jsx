import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Leaderboard from './components/Leaderboard';
import TeamDetail from './components/TeamDetail';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/:teamId" element={<TeamDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
