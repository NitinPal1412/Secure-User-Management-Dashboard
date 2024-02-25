import { createContext } from "react";
import { UserContextType } from "../common-utils/commonUtils";

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
