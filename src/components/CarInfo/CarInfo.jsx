import styles from './CarInfo.module.css';

const CarInfo = ({ car }) => {
  
  if (!car) return null;

  return (
    <div className={styles.carInfo}>
        <img 
          src={`/images/${car.id}.webp`}
          alt={car.title} 
          className={styles.mainImage} 
        />
      <h1 className={styles.title}>{car?.title}</h1>
      <p className={styles.price}>Ціна: {car?.price?.toLocaleString()}$</p>
      <p className={styles.brand}>Бренд: {car?.brand}</p>
      <p className={styles.category}>Категорія: {car?.category}</p>
      {car?.description && (
        <p className={styles.description}>{car.description}</p>
      )}
    </div>
  );
};

export default CarInfo;
