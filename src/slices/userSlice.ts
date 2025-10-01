import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// User ka type
interface User {
  id: number;
}


// State ka type
interface UserState {
  user: User | null;
  errorMassage:string | null;
  loading:boolean
}

// Initial state
const initialState: UserState = {
  user: null,
  errorMassage:null,
  loading:false
};

// Slice
const userSlice = createSlice({

  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setErrorMsaage(state, action: PayloadAction<string>) {
      state.errorMassage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    clearUser(state) {
      state.user = null;
    },
  },
});

// Export
export const { setUser, clearUser,setLoading,setErrorMsaage } = userSlice.actions;
export default userSlice.reducer;
