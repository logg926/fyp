import { makeAutoObservable } from "mobx";
export class UserStore {
  photoFile: any = null;
  videoFile: any = null;
  photoArray:any = null;
  streaming = false;
  videoArray: any = [];
  cv: any = null;
  generationlink: string |null = null
  genloading = false;
  constructor() {
    makeAutoObservable(this);
  }
}

const myClientStore = new UserStore();

export function useUserContext() {
  // const myContext = useContext(ClientContext);
  return myClientStore;
}
