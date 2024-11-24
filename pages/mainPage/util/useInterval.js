import { useEffect, useRef } from 'react';


/*
  사용법 예시
  
  useInterval(() => {
    Toast.show({
      type: 'FiremanToast',
      text1: '모든 친구에게 ',
      text2: '위치를 공유하고 있어요'
    });
    
  }, 8000);
*/
const useInterval = (callback, delay) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};

export default useInterval;