// pages
import AppContent from "./AppContent";

// provider
import { UserContextProvider } from "./context/User";
import { InterfaceContextProvider } from "./context/Interface";

function App() {
  return (
    <UserContextProvider>
      <InterfaceContextProvider>
        <AppContent />
      </InterfaceContextProvider>
    </UserContextProvider>
  );
}

export default App;
