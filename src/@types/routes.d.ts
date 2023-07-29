type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Loading: undefined;
  Welcome: undefined;
  InitBalance: undefined;
  Main: undefined;
  Report: undefined;
  NewEntry: {
    id?: string;
    amount: number;
    description?: string;
    entryAt?: FirebaseFirestoreTypes.Timestamp;
    latitude?: number;
    longitude?: number;
    address?: string;
    photo?: string;
    isInit: boolean;
    category: CategoryObject;
  };
};
