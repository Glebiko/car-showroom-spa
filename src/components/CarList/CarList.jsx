import { Link } from 'react-router-dom';
import styles from './CarList.module.css';

const CarList = ({ cars, loading, selectedId, onSelectCar }) => {
  
  if (loading) {
    return (
      <ul className={styles.list}>
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className={`${styles.item} ${styles.skeleton}`}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
          </li>
        ))}
      </ul>
    );
  }

  if (cars.length === 0) {
    return <div className={styles.noResults}>Нічого не знайдено</div>;
  }

  return (
    <ul className={styles.list}>
      {cars.map((car) => {
        const isSelected = car.id === selectedId;
        return (
          <li 
            key={car.id} 
            className={`${styles.item} ${isSelected ? styles.selectedItem : ''}`}
            onClick={() => onSelectCar(car.id)}
          >
            <Link to={`/vehicles/${car.id}`} className={styles.linkWrapper}>
              {isSelected && <span className={styles.favoriteBadge}>Обране</span>}
              
              <img src={`/car-showroom-spa/images/${car.id}.webp`} alt={car.title} className={styles.image} />
              <h3 className={styles.title}>{car.title}</h3>
              <p className={styles.price}>Ціна: {car.price}$</p>
              <p className={styles.brand}>Бренд: {car.brand}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CarList;
