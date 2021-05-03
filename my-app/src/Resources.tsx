import React from 'react';
import { Card, List, ListItem, Grid, Box, Typography } from '@material-ui/core';
import Introduction from "./Introduction";
import Potential from "./Potential";
import Models from "./Models"
import External from "./External";


export const Resources = () => {
    const [text, setText] = React.useState(0);

    return (
        <>
            {/* <h1>Additional Resources</h1> */}
            <Grid container>
                <Grid item xs={12} sm={2}>
                    {/* <Card> */}
                    <Box m={1}>
                        <List component="nav">
                            <Typography variant="button" display="block" gutterBottom >
                                <ListItem button onClick={function x() { setText(0) }}>
                                    Introduction to deepfakes
                                </ListItem>
                            </Typography>
                            <Typography variant="button" display="block" gutterBottom>
                                <ListItem button onClick={function x() { setText(1) }}>
                                    Introduction to deepfake models
                                </ListItem>
                            </Typography>
                            <Typography variant="button" display="block" gutterBottom>
                                <ListItem button onClick={function x() { setText(2) }}>
                                    Potential Application and Related Incidents
                                </ListItem>
                            </Typography>
                            <Typography variant="button" display="block" gutterBottom>
                                <ListItem button onClick={function x() { setText(3) }}>
                                    External links
                                </ListItem>
                            </Typography>
                        </List>
                    </Box>
                    {/* </Card> */}
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Card>
                        <Box m={4}>
                            {text === 0 && <Introduction />}
                            {text === 1 && <Models />}
                            {text === 2 && <Potential />}
                            {text === 3 && <External />}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>

    );
}
