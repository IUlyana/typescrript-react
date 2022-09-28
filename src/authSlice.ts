import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';

type Auth = string;
type Answer = {
  auth:string;
  error: string|null;
}



export const addAuth = createAsyncThunk<Auth, string, { rejectValue: string }>(
  'auth/addAuth',
  async function (text, { rejectWithValue }) {
      const lisence = {lisence: text}
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lisence)
      });

      if (response.status >= 400) {
        return rejectWithValue('Не удалось зарегестрироваться.Ошибка сервера');
      }

      return (await response.json()) as Auth;
  }
);
const initialState: Answer= {
  auth: '',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAuth.fulfilled, (state, action) => {
        state.auth = action.payload;        
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;             
      });
  }
});


export default authSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}