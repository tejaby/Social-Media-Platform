import { BrowserRouter } from "react-router-dom";

import { UserContextProvider } from "./context/User";
import { InterfaceContextProvider } from "./context/Interface";

import Rutas from "./routers/Routes";
import Navbar from "./components/NavBar";

function App() {
  return (
    <UserContextProvider>
      <InterfaceContextProvider>
        <BrowserRouter>
          <Navbar />
          <Rutas />
        </BrowserRouter>
      </InterfaceContextProvider>
    </UserContextProvider>
  );
}

export default App;
