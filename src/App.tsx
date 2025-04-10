import "./App.css";
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { fetchCoinPrices } from "./redux/slices/marketSlice";
import { useAppSelector } from "./redux/hooks";
import { selectPageSize } from "./redux/selectors/marketSelectors";
import Market from "./pages/Market";
import AssetInfo from "./pages/AssetInfo";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(selectPageSize);
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (!initialFetchDone.current) {
      dispatch(fetchCoinPrices({ page: 1, pageSize }));
      initialFetchDone.current = true;
    }
  }, [dispatch, pageSize]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/asset-info" element={<AssetInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
