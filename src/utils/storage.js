import { useState, useEffect } from 'react';

// --- localStorage 접근 유틸리티 함수 ---
const getStorage = (key) => {
  // 브라우저 환경이 아닐 경우(예: 서버 사이드 렌더링) 접근하지 않음
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
    //파싱 오류시 null반환
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

const setStorage = (key, data) => {
  // 브라우저 환경이 아닐 경우(예: 서버 사이드 렌더링) 접근하지 않음
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(data));
    //파싱 오류시 null반환
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};


/**
 * React 상태와 localStorage를 동기화하는 커스텀 훅.
 * 컴포넌트 마운트 시 localStorage에서 값을 불러오고,
 * 상태 변경 시 localStorage에 자동으로 저장.
 */
function useLocalStorage(key, initialValue) {
  // 상태 초기화: localStorage에서 값을 불러오거나, 없으면 initialValue 사용
  const [value, setValue] = useState(() => {
    const storedValue = getStorage(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  // 상태 변경 시 localStorage에 자동 저장 (부수 효과)
  useEffect(() => {
    setStorage(key, value); // 위에 정의된 setStorage 함수 사용
  }, [key, value]); // 의존성 배열: key 또는 value가 변경될 때마다 실행

  // 현재 값과 값을 설정하는 함수를 반환
  return [value, setValue];
}

export default useLocalStorage;