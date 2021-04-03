import { makeAutoObservable } from "mobx";
export class UserStore {
  photoFile: any = null;
  videoFile: any = null;
  photoArray = null;
  streaming = false;
  videoArray: any = null;
  cv: any = null;
  constructor() {
    makeAutoObservable(this);
  }
}

const myClientStore = new UserStore();

export function useUserContext() {
  // const myContext = useContext(ClientContext);
  return myClientStore;
}
