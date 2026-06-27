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

export default function App() {
  // Global State for Custom Router
  const [currentView, setCurrentView] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  // Router Engine
  const navigateTo = (view, data = null) => {
    setCurrentView(view);
    if (data) setSelectedBook(data);
    setShowSearchOverlay(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar 
        currentView={currentView} 
        navigateTo={navigateTo} 
        setShowSearchOverlay={setShowSearchOverlay} 
      />
      
      {showSearchOverlay && (
        <SearchOverlay 
          setShowSearchOverlay={setShowSearchOverlay} 
          navigateTo={navigateTo} 
        />
      )}
      
      <main style={{ minHeight: '80vh' }}>
        {currentView === 'home' && <Home navigateTo={navigateTo} />}
        {currentView === 'books' && <Books navigateTo={navigateTo} />}
        {currentView === 'book-details' && <BookDetails selectedBook={selectedBook} navigateTo={navigateTo} />}
        {currentView === 'reading-room' && <ReadingRoom />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'membership' && <Membership />}
      </main>

      <Footer />
    </>
  );
}