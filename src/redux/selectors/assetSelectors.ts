import { RootState } from "../store";

export const selectOHLCData = (state: RootState) => state.asset.ohlcData;
export const selectAssetLoading = (state: RootState) => state.asset.loading;
export const selectAssetError = (state: RootState) => state.asset.error;
