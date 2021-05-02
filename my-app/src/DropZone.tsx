import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { observer } from "mobx-react-lite";
import { useUserContext } from "./userContext";

export const DropzoneAreaVideo = observer(() => {
  const state = useUserContext();
  function handleChange(files: File[]) {
    state.videoFile = files[0] ? URL.createObjectURL(files[0]) : null;
    state.svmresult = -1;
    state.svmerror = 0;
    state.capresult = -1;
    state.caperror = 0;
    state.cnnresult = -1;
    state.cnnerror = 0;
    state.ensresult = -1;
    state.enserror = 0;
  }
  return <DropzoneArea data-cy="drag-and-drop" showFileNames dropzoneText={"Drag and drop an video here or click"} filesLimit={1} onChange={handleChange} />;
});


export const DropzoneAreaPhoto = observer(() => {
  const state = useUserContext();
  function handleChange(files: File[]) {
    state.photoFile = files[0] ? URL.createObjectURL(files[0]) : null;
  }
  return <DropzoneArea data-cy="drag-and-drop" showFileNames dropzoneText={"Drag and drop an image here or click"} filesLimit={1} onChange={handleChange} />;
});
