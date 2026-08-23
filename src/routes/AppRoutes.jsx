import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Landing from "../pages/Landing";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;