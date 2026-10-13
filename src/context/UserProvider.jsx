import { UserContext } from "./contexts.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { todayISO } from "../utils/format.js";

const defaultUser = {
  name: "Guest Diner",
  email: "",
  phone: "",
  address: "",
  memberSince: todayISO(),
};

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage("ss-user", defaultUser);

  const updateUser = (changes) => setUser((current) => ({ ...current, ...changes }));

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
