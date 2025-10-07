import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AllVendorResponse } from "../interfaces/vendorInterface";
import type { DropDown } from "../services/operations/routingRule";
import type { PageData } from "../interfaces/commonInterface";


// State ka type
interface VendorState {
  data: PageData<AllVendorResponse[]> | null;
  dropDown:DropDown[] | null
  errorMassage:string | null;
  loading:boolean
}


// Initial state
const initialState: VendorState = {
  data: null,
  dropDown:null,
  errorMassage:null,
  loading:false
};


// Slice
const VendorSlice = createSlice({

  name: "vendor",
  initialState,
  reducers: {
    setVendor(state, action: PayloadAction<PageData<AllVendorResponse[]>>) {
      state.data = action.payload;
    },
    setDropdownVendor(state, action: PayloadAction<DropDown[]>) {
      state.dropDown = action.payload;
    },
    setErrorMsaage(state, action: PayloadAction<string>) {
      state.errorMassage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    clearVendor(state) {
      state.data = null;
    },
  },
});

// Export
export const { setVendor, clearVendor,setLoading,setErrorMsaage,setDropdownVendor } = VendorSlice.actions;
export default VendorSlice.reducer;
