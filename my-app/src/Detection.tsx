import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { dummyimg } from "./dummyimg";
const nj = require('numjs')

export const Detection = observer(() => {
  useEffect(() => {
      const {detectimg} = dummyimg
    console.log(detectimg);
    console.log(nj.fft(detectimg))
  }, []);
  return <></>;
});
