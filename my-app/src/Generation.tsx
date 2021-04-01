import React from "react";
import { DropzoneAreaPhoto, DropzoneAreaVideo } from "./DropZone";
import { NewVideoComponent } from "./NewVideoComponent";
import { Box, Card, Button } from "@material-ui/core";
import { useUserContext } from "./userContext";
import { observer } from "mobx-react-lite";

export const Generation = observer(() => {
    const state = useUserContext();
    return <>
        Record your video:
        <Box alignContent="center">
            <NewVideoComponent />
        </Box>
        {/* Put your Video here

          <DropzoneAreaVideo /> */}
        <Card raised>
            Put your Photo here:
            <Box>
                <DropzoneAreaPhoto />
            </Box>
        </Card>
        <Box>
            {state.photoFile && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        const imgFile = state.photoFile;
                        const img = new Image();

                        img.onload = function () {
                            const canvas: any = document.getElementById("canvas");
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);
                            const imgData = ctx.getImageData(0, 0, 320, 240).data;
                            console.log("imgData", imgData);
                        };
                        img.src = URL.createObjectURL(imgFile);

                        // // state.videoFile;
                        // const imgbuff = await img!.arrayBuffer();
                        // console.log(imgbuff);
                        // imageToRgbaMatrix(imgbuff).then(console.log);
                        // console.log("imgData", imgData);
                    }}
                >
                    Deepfake this video and Photo
                </Button>
            )}
        </Box>
        <Box>
            <canvas id="canvas"></canvas>
        </Box>
    </>
});