import { useState, useEffect } from 'react';
import CarList from '../../components/CarList/CarList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { mockCars } from '../../data/carsData';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedVehicleId');
    if (saved) setSelectedVehicleId(Number(saved));
  }, []);

  const handleSelectCar = (id) => {
    setSelectedVehicleId(id);
    localStorage.setItem('selectedVehicleId', id);
  };

  const handleSearchInput = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      if (!searchQuery.trim()) {
        setCars(mockCars);
        setLoading(false);
        return;
      }

      const filtered = mockCars.filter((car) => {
        const query = searchQuery.toLowerCase();
        return (
          car.title.toLowerCase().includes(query) || 
          car.brand.toLowerCase().includes(query)
        );
      });

      setCars(filtered);
      setLoading(false);
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const getSortedCars = () => {
    const carsCopy = [...cars];
    if (sortBy === 'lowToHigh') return carsCopy.sort((a, b) => a.price - b.price);
    if (sortBy === 'highToLow') return carsCopy.sort((a, b) => b.price - a.price);
    return carsCopy;
  };

  return (
    <section className={styles.carlist}>
      <h2 className={styles.title}>Список автівок</h2>
      
      <SearchForm onSearchInput={handleSearchInput}/>

      <div className={styles.sortContainer}>
        <label htmlFor="sort-select" className={styles.sortLabel}>Сортувати за:</label>
        <select 
          id="sort-select"
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="default">за замовчуванням</option>
          <option value="lowToHigh">ціна: від нижчої до вищої</option>
          <option value="highToLow">ціна: від вищої до нижчої</option>
        </select>
      </div>
      
      <CarList 
        cars={getSortedCars()} 
        loading={loading} 
        selectedId={selectedVehicleId} 
        onSelectCar={handleSelectCar} 
      />
    </section>
  );
};

export default HomePage;
