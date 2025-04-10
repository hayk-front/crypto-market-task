import { RootState } from "../store";

export const selectCoins = (state: RootState) => state.market.coins;
export const selectLoading = (state: RootState) => state.market.loading;
export const selectError = (state: RootState) => state.market.error;
export const selectPage = (state: RootState) => state.market.page;
export const selectPageSize = (state: RootState) => state.market.pageSize;
export const selectTotalItems = (state: RootState) => state.market.totalItems;
export const selectTotalPages = (state: RootState) => state.market.totalPages;
