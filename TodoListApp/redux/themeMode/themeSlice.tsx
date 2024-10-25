import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  value: 'light' | 'dark';
}

const initialState: ThemeState = {
  value: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.value = action.payload;
      AsyncStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('theme', state.value); 
    },
    setInitialTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.value = action.payload;
    }
  },
});

export const { setTheme, toggleTheme, setInitialTheme } = themeSlice.actions;
export default themeSlice.reducer;
