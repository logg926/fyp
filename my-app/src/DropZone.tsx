import React, { Component, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { observer } from "mobx-react-lite";
import { useUserContext } from "./userContext";

export const DropzoneAreaVideo = observer(() => {
  const state = useUserContext();
  function handleChange(files: any) {
    console.log("files", files);
    state.videoFile = files[0] ? files[0] : null;
  }
  return <DropzoneArea filesLimit={1} onChange={handleChange} />;
});

// export class DropzoneAreaPhoto extends Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       files: [],
//     };
//   }
//   handleChange(files: any) {
//     this.setState({
//       files: files,
//     });
//   }
//   render() {
//     return (
//       <DropzoneArea filesLimit={1} onChange={this.handleChange.bind(this)} />
//     );
//   }
// }

export const DropzoneAreaPhoto = observer(() => {
  const state = useUserContext();
  function handleChange(files: any) {
    console.log("files", files);
    state.photoFile = files[0] ? files[0] : null;
  }
  return <DropzoneArea filesLimit={1} onChange={handleChange} />;
});
