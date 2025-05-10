import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LatestUpdate from "./pages/latest-update";
import DetailPage from "./pages/detail";
import WatchPage from "./pages/watch";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LatestUpdate />} path="/drama/latest-update" />
      <Route element={<DetailPage />} path="/drama/detail/:slug" />
      <Route element={<WatchPage />} path="/drama/watch/:slug" />
    </Routes>
  );
}

export default App;
