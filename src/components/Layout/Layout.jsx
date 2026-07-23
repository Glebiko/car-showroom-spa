import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const [favoriteId, setFavoriteId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedId = localStorage.getItem('selectedVehicleId');
    if (savedId) {
      setFavoriteId(savedId);
    } else {
      setFavoriteId(null);
    }
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.inner}>
            <h1 className={styles.title}>Car Showroom SPA</h1>
            <button 
              className={`${styles.burgerButton} ${isMenuOpen ? styles.burgerActive : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Переключити меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
              <NavLink to="/" end>Головна</NavLink>
              <NavLink to={favoriteId ? `/vehicles/${favoriteId}` : '/'}>
                Обране
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">{children}</div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.text}>
            © {new Date().getFullYear()} Car Showroom Test
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
