import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useSelectorWithDelay(selector, delay, defaultValue) {
  const [currentUser, setCurrentUser] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const selectedState = useSelector(selector);

  useEffect(() => {
    const timer = setTimeout(() => {

      setTimerExpired(true);
    
    }, delay);

    if (selectedState) {
      setCurrentUser(selectedState);
      clearTimeout(timer); 
    }

    return () => clearTimeout(timer);
  }, [selectedState, delay]);

  return { currentUser, timerExpired };
}

export default useSelectorWithDelay;
