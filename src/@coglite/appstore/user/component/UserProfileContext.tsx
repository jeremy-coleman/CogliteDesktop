import * as React from "react";
import { IUserProfile } from "../IUserProfile";

const UserProfileContext = React.createContext<IUserProfile>({});

export { UserProfileContext }