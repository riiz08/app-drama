import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LatestUpdate from "./pages/latest-update";
import DetailPage from "./pages/detail";
import WatchPage from "./pages/watch";
import SearchPage from "./pages/search";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SearchPage />} path="/:slug" />
      <Route element={<LatestUpdate />} path="/drama/latest-update" />
      <Route element={<DetailPage />} path="/drama/detail/:slug" />
      <Route element={<WatchPage />} path="/drama/watch/:slug" />
    </Routes>
  );
}

export default App;
