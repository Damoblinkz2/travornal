import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/cityList";
import CountryList from "./components/countryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/citiesContext";
import ProtectedRoute from "./components/utils.jsx";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={
                <ProtectedRoute>
                  <CityList />
                </ProtectedRoute>
              }
            />
            <Route
              path="cities/:id"
              element={
                <ProtectedRoute>
                  <City />
                </ProtectedRoute>
              }
            />
            <Route
              path="countries"
              element={
                <ProtectedRoute>
                  <CountryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="form"
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
