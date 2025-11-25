import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  currentViewMobile: "map",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payLoad };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payLoad };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        currentCity: {},
      };

    case "map/mobile":
      return {
        ...state,
        isLoading: false,
        currentViewMobile: action.payLoad,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payLoad };

    default:
      throw new Error("unknown action type");
  }
};

const CitiesProvider = ({ children }) => {
  const [
    { cities, isLoading, currentCity, error, currentViewMobile },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "loading" });
    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);

        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
        // setCities(data);
      } catch {
        dispatch({
          type: "rejected",
          payLoad: "there was an error loading data",
        });
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "there was an error loading the city",
      });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "there was an error creating the city",
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "POST",
      });

      dispatch({ type: "city/deleted", payLoad: id });
    } catch {
      dispatch({
        type: "rejected",
        payLoad: "there was an error deleting the city",
      });
    }
  };
  // const mobileForm = async (view) => {
  //   dispatch({ type: "loading" });
  //   try {
  //     dispatch({ type: "map/mobile", payLoad: view });
  //     alert(`dd ${currentViewMobile}`);
  //   } catch {
  //     dispatch({
  //       type: "rejected",
  //       payLoad: "there was an error deleting the city",
  //     });
  //   }
  // };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        createCity,
        deleteCity,
        // mobileForm,
        currentViewMobile,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("citiesContext was used outside the citiesProviders");
  return context;
};

export { CitiesProvider, useCities };
