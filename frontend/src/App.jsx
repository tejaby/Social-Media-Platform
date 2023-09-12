// pages
import AppContent from "./AppContent";

// provider
import { InterfaceContextProvider } from "./context/Interface";
import { UserContextProvider } from "./context/User";
import { PostContextProvider } from "./context/Post";

function App() {
  return (
    <InterfaceContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <AppContent />
        </PostContextProvider>
      </UserContextProvider>
    </InterfaceContextProvider>
  );
}

export default App;
