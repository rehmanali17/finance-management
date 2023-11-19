import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import ProtectedRoutes from "components/ProtectedRoutes";
import { routes } from "./utils/routes";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3554D1",
        },
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routes>
                    {routes.public.map(route => route)}
                    <Route path="home" element={<ProtectedRoutes />}>
                        {routes.protected.map(route => route)}
                    </Route>
                </Routes>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
