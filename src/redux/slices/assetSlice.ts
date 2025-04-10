import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCoinOHLC } from "../../api/services/coinService";
import { OHLCDataResponse } from "../../types/coin";

interface AssetState {
  ohlcData: OHLCDataResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AssetState = {
  ohlcData: null,
  loading: false,
  error: null,
};

export const fetchCoinOHLC = createAsyncThunk(
  "asset/fetchCoinOHLC",
  async (
    { productId, days }: { productId: string; days?: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await getCoinOHLC(productId, days);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    clearAssetData: (state) => {
      state.ohlcData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinOHLC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCoinOHLC.fulfilled,
        (state, action: PayloadAction<OHLCDataResponse>) => {
          state.loading = false;
          state.ohlcData = action.payload;
        }
      )
      .addCase(fetchCoinOHLC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAssetData } = assetSlice.actions;
export default assetSlice.reducer;
