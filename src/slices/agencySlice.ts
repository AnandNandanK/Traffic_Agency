import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DropDown } from "../services/operations/routingRule";



export interface AllAgencyResponse {
  id:number;
  name: string;
  contactEmail: string;
  contactPhone: string;
}


// State ka type
interface UserState {
  data: AllAgencyResponse[] | null;
  dropDown:DropDown[] | null;
  errorMassage:string | null;
  loading:boolean
}

// Initial state
const initialState: UserState = {
  data: null,
  dropDown: null,
  errorMassage:null,
  loading:false
};

// Slice
const AgencySlice = createSlice({

  name: "agency",
  initialState,
  reducers: {
    setAgency(state, action: PayloadAction<AllAgencyResponse[]>) {
      state.data = action.payload;
    },
    setDropdownAgency(state, action: PayloadAction<DropDown[]>) {
      state.dropDown = action.payload;
    },
    setErrorMsaage(state, action: PayloadAction<string>) {
      state.errorMassage = action.payload;
    },
    setAgencyLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    clearAgency(state) {
      state.data = null;
    },
  },
});

// Export
export const { setAgency, clearAgency,setAgencyLoading,setErrorMsaage,setDropdownAgency } = AgencySlice.actions;
export default AgencySlice.reducer;
