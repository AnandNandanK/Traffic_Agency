import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PageData } from "../interfaces/commonInterface";



export interface AllRoutingResponse {
    id: number,
    campaignId: number,
    vendorId: number,
    nthClick: number,
    isActive: true,
    isDefault: boolean,
    capacity:number,
    campaign: {
        name: string
    },
    vendor: {
        name: string
    }
}


// State ka type
interface UserState {
    data: PageData<AllRoutingResponse[]> | null;
    errorMassage: string | null;
    loading: boolean
}

// Initial state
const initialState: UserState = {
    data: null,
    errorMassage: null,
    loading: false
};

// Slice
const RoutingSlice = createSlice({

    name: "routing",
    initialState,
    reducers: {
        setRouting(state, action: PayloadAction<PageData<AllRoutingResponse[]>>) {
            state.data = action.payload;
        },
        setErrorMsaage(state, action: PayloadAction<string>) {
            state.errorMassage = action.payload;
        },
        setRoutingLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        clearRouting(state) {
            state.data = null;
        },
    },
});


// Export
export const { setRouting, clearRouting, setRoutingLoading, setErrorMsaage} = RoutingSlice.actions;
export default RoutingSlice.reducer;
