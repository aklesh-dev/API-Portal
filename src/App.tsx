import { Route, Routes } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />

          <Route index element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
