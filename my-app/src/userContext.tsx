import { makeAutoObservable } from "mobx";
export class UserStore {
  photoFile: any = null;
  videoFile: any = null;
  photoArray: any = null;
  streaming = false;
  videoArray: any = [];
  cv: any = null;
  generationlink: string | null = null
  genloading = false;
  svmloading = false;
  cnnloading = false;
  ensloading = false;
  caploading = false;
  svmresult = -1;
  svmerror = 0;
  capresult = -1;
  caperror = 0;
  cnnresult =-1;
  cnnerror = 0;
  ensresult = -1;
  enserror = 0;
  uploadinstead = false
  videoloadcomplete = false
    constructor() {
  makeAutoObservable(this);
}
}

const myClientStore = new UserStore();

export function useUserContext() {
  return myClientStore;
}
