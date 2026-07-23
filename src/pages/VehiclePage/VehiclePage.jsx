import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockCars } from '../../data/carsData';
import CarInfo from '../../components/CarInfo/CarInfo';
import Comments from '../../components/Comments/Comments';
import CommentForm from '../../components/CommentForm/CommentForm';
import styles from './VehiclePage.module.css';

const VehiclePage = () => {
  const { vehicleId } = useParams();
  const [car, setCar] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const foundCar = mockCars.find((item) => String(item.id) === String(vehicleId));
    if (foundCar) {
      setCar(foundCar);
      
      const storageKey = `comments_vehicle_${vehicleId}`;
      const savedComments = localStorage.getItem(storageKey);
      
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments(foundCar.comments || []);
      }
    }
  }, [vehicleId]);

  const handleAddNewComment = (author, text) => {
    const newComment = {
      id: Date.now(),
      author,
      text
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    const storageKey = `comments_vehicle_${vehicleId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
  };

  if (!car) {
    return <div className={styles.loader}>Машина не знайдена...</div>;
  }

  return (
    <div className={styles.container}>
      <CarInfo car={car} />
      <div className={styles.commentsSection}>
        <Comments comments={comments} />
        <CommentForm onAddComment={handleAddNewComment} />
      </div>
    </div>
  );
};

export default VehiclePage;
