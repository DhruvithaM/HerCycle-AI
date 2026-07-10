import { useEffect } from "react";
import { useStore } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { initializeProfileListener } from "./services/profileService";

function App() {
  const store = useStore();

  useEffect(() => {
    const unsubscribe = initializeProfileListener(store);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [store]);

  return <AppRoutes />;
}

export default App;