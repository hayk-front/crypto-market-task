import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCoinPrices } from "../../api/services/coinService";
import { Coin, CoinPriceParams, PaginatedResponse } from "../../types/coin";

interface MarketState {
  coins: Coin[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: MarketState = {
  coins: [],
  page: 1,
  pageSize: 20,
  totalItems: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

interface ExtendedPaginatedResponse extends PaginatedResponse<Coin> {
  requestedPage: number;
}

export const fetchCoinPrices = createAsyncThunk<
  ExtendedPaginatedResponse,
  CoinPriceParams
>(
  "market/fetchCoinPrices",
  async (params: CoinPriceParams = {}, { rejectWithValue }) => {
    try {
      const data = await getCoinPrices(params);
      return { ...data, requestedPage: params.page || 1 };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    clearMarketData: (state) => {
      state.coins = [];
      state.page = 1;
      state.pageSize = 20;
      state.totalItems = 0;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCoinPrices.fulfilled,
        (state, action: PayloadAction<ExtendedPaginatedResponse>) => {
          state.loading = false;

          // If loading page 1, replace all coins
          if (action.payload.requestedPage === 1) {
            state.coins = action.payload.data;
          } else {
            const existingIds = new Set(state.coins.map((coin) => coin.id));
            const newCoins = action.payload.data.filter(
              (coin) => !existingIds.has(coin.id)
            );
            state.coins = [...state.coins, ...newCoins];
          }

          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
          state.totalItems = action.payload.totalItems;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchCoinPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMarketData } = marketSlice.actions;
export default marketSlice.reducer;
