import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CampaignResponse } from "../interfaces/agencyInterface";
import type { DropDown } from "../services/operations/routingRule";
import type { PageData } from "../interfaces/commonInterface";



export interface AllCampaignResponse {
  id:number;
  name: string;
  contactEmail: string;
  contactPhone: string;
}


// State ka type
interface UserState {
  data: PageData<CampaignResponse[]> | null;
  dropDown:DropDown[] | null;
  errorMassage:string | null;
  loading:boolean
}

// Initial state
const initialState: UserState = {
  data: null,
  dropDown:null,
  errorMassage:null,
  loading:false
};

// Slice
const CampaignSlice = createSlice({

  name: "Campaign",
  initialState,
  reducers: {
    setCampaign(state, action: PayloadAction<PageData<CampaignResponse[]> | null>) {
      state.data = action.payload;
    },
    setDropdownCampaign(state, action: PayloadAction<DropDown[] | null>) {
      state.dropDown = action.payload;
    },
    setErrorMsaage(state, action: PayloadAction<string>) {
      state.errorMassage = action.payload;
    },
    setCampaignLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    clearCampaign(state) {
      state.data = null;
    },
  },
});

// Export
export const { setCampaign, clearCampaign,setCampaignLoading,setErrorMsaage,setDropdownCampaign } = CampaignSlice.actions;
export default CampaignSlice.reducer;
