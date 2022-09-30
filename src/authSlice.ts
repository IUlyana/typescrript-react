import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Answer = {
  keyUser:string;
  keyGenerate:string;
  error:string|undefined;
  isPortable: any;
}

const initialState:Answer ={
  keyUser: '',
  error: undefined,
  keyGenerate: '',
  isPortable: undefined
}

export const checkKey = createAsyncThunk(
  'auth/checkKey',
  (key:string[]) => {
    if(key[0] && key[1]){
      for (let i = 0; i < key[0].length; i++)
      {
          if (key[0][i] !== key[1][i]) {
              return false
          } 
          if(key[0][i] === key[1][i]) {
            return true 
          } 
      }
}
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    keyClients: (state, action: PayloadAction<string>) => {
      state.keyUser = action.payload;

      if(state.keyUser.length < 41) {
        state.error = 'Введенный ключ слишком короткий'
      }
    
      if(state.keyUser.length === 0 || state.keyUser === null){
        state.error = 'Введите ключ лицензии'
      };
    },
    keyСreated: (state, action: PayloadAction<string>) => {
      state.keyGenerate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkKey.fulfilled, (state, action) => {
        state.isPortable = action.payload;   
        if(state.isPortable === false) {
          state.error = 'Ключ лицензии неверный. Поробуйте еще раз.'
        }
      })


  }
});

export const { keyClients, keyСreated} = authSlice.actions;
export default authSlice.reducer;

