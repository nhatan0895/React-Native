import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { setInitialTheme } from './themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

const loadTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme) {
      store.dispatch(setInitialTheme(savedTheme as 'light' | 'dark'));
    }
  } catch (e) {
    console.error('Tải Theme từ lưu trữ thất bại:', e);
  }
};

loadTheme();

export type RootState = ReturnType<typeof store.getState>;
export default store;
