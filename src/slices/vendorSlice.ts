import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Vendor } from "../interfaces/vendorInterface";
import type { DropDown } from "../services/operations/routingRule";


// State ka type
interface VendorState {
  vendor: Vendor | null;
  dropDown:DropDown[] | null
  errorMassage:string | null;
  loading:boolean
}


// Initial state
const initialState: VendorState = {
  vendor: null,
  dropDown:null,
  errorMassage:null,
  loading:false
};


// Slice
const VendorSlice = createSlice({

  name: "vendor",
  initialState,
  reducers: {
    setVendor(state, action: PayloadAction<Vendor>) {
      state.vendor = action.payload;
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
      state.vendor = null;
    },
  },
});

// Export
export const { setVendor, clearVendor,setLoading,setErrorMsaage,setDropdownVendor } = VendorSlice.actions;
export default VendorSlice.reducer;
