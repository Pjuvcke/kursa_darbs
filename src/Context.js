import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

function AppContext(props) {
  const [user, setUser] = useState("Guest");
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default AppContext;
