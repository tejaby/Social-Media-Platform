import { BrowserRouter } from "react-router-dom";

import { UserContextProvider } from "./context/User";

import Rutas from "./routers/Routes";
import Navbar from "./components/NavBar";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Rutas />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
