// libraries
import { BrowserRouter } from "react-router-dom";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { UserContextProvider } from "./context/User";
import { InterfaceContextProvider } from "./context/Interface";

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
