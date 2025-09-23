import { Route, Routes } from "react-router"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
// import NIDCardServicePage from "./pages/NIDCardServicePage"
// import CompanyRegistrationPage from "./pages/CompanyRegistrationPage"
// import PanIdServicePage from "./pages/PanIdServicePage"
// import ElectionServicesPage from "./pages/ElectionServicesPage"
// import LicenseDetailsPage from "./pages/LicenseDetailsPage"
// import DataExplorerPage from "./pages/DataExplorerPage"
import PageNotFound from "./pages/PageNotFound"
import {Toaster} from "react-hot-toast"
import { AuthPage } from "./pages/AuthPage"

function App() {
  

  return (
    <>
    <Routes>
      <Route element={ <Layout />}>
        <Route path="*" element={<PageNotFound/>} />
        
        <Route index element={ <HomePage />} />
        <Route path="/login" element={ <AuthPage />} />

        {/* <Route path="/nid_card_service" element={ <NIDCardServicePage />} />
        <Route path="/company_registration_ocr" element={ <CompanyRegistrationPage />} />
        <Route path="/pan_id_service" element={ <PanIdServicePage />} />
        <Route path="/election_services" element={ <ElectionServicesPage />} />
        <Route path="/license_details" element={ <LicenseDetailsPage />} />
        <Route path="/data_explorer" element={ <DataExplorerPage />} /> */}
      </Route>
    </Routes>

    <Toaster />
    </>
  )
}

export default App
