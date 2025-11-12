import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/homepage";
import Product from "./pages/product";
import AppLayout from "./pages/appLayout";
import Pricing from "./pages/pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/pageNotFound";
import CityList from "./components/cityList";
import CountryList from "./components/countryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/citiesContext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
