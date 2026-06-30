import React, { useState } from 'react';

// Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import ReadingRoom from './pages/ReadingRoom';
import Dashboard from './pages/Dashboard';
import Membership from './pages/Membership';
import LibrarianDashboard from './pages/LibrarianDashboard';

export default function App() {
  // Global State for Custom Router
  const [user] = useState({ name: 'Sougat', role: 'librarian' }); // Change to 'member' to test restrictions
  const [currentView, setCurrentView] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  // The librarian dashboard ships its own sidebar/topbar (see Sidebar/Topbar in
  // LibrarianDashboard.jsx), so the public site chrome would just be a second,
  // redundant nav stacked on top of it. Hide both when this view is active.
  const isLibrarianView = currentView === 'librarian-dashboard';

  // Router Engine
  const navigateTo = (view, data = null) => {
    // Role-based security check
    if (view === 'librarian-dashboard' && user.role !== 'librarian') {
      alert("Access Denied: Only librarians can access this portal.");
      return;
    }

    setCurrentView(view);
    if (data) setSelectedBook(data);
    setShowSearchOverlay(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {!isLibrarianView && (
        <Navbar
          user={user}
          currentView={currentView}
          navigateTo={navigateTo}
          setShowSearchOverlay={setShowSearchOverlay}
        />
      )}

      {showSearchOverlay && (
        <SearchOverlay
          setShowSearchOverlay={setShowSearchOverlay}
          navigateTo={navigateTo}
        />
      )}

      <main style={{ minHeight: isLibrarianView ? '100vh' : '80vh' }}>
        {currentView === 'home' && <Home navigateTo={navigateTo} />}
        {currentView === 'books' && <Books navigateTo={navigateTo} />}
        {currentView === 'book-details' && <BookDetails selectedBook={selectedBook} navigateTo={navigateTo} />}
        {currentView === 'reading-room' && <ReadingRoom />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'membership' && <Membership />}
        {currentView === 'librarian-dashboard' && <LibrarianDashboard />}
      </main>

      {!isLibrarianView && <Footer />}
    </>
  );
}