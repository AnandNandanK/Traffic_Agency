import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageData } from "../interfaces/commonInterface";
import type { Traffic } from "../interfaces/report";


// State ka type
interface ReportState {
  data: PageData<Traffic[]> | null;
  errorMassage:string | null;
  loading:boolean
}


// Initial state
const initialState: ReportState = {
  data: null,
  errorMassage:null,
  loading:false
};


// Slice
const reportSlice = createSlice({

  name: "report",
  initialState,
  reducers: {
    setReport(state, action: PayloadAction<PageData<Traffic[]>>) {
      state.data = action.payload;
    },

    setErrorMsaage(state, action: PayloadAction<string>) {
      state.errorMassage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    clearReport(state) {
      state.data = null;
    },
  },
});

// Export
export const { setReport, clearReport,setLoading,setErrorMsaage, } = reportSlice.actions;
export default reportSlice.reducer;
