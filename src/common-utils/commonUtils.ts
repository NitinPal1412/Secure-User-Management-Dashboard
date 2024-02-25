export const initialUserState = {
  isLoggedIn: false,
  userDetails: {
    email : "",
  },
};

interface IUserDetails {
  email: string;
}

export interface IUser {
  isLoggedIn: boolean;
  userDetails: IUserDetails;
}

export type UserContextType = {
  userContext: IUser;
  setUserContext: (data: IUser) => void;
};
