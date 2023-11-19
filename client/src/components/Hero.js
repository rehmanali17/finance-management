import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Sheet from "assets/sheet.png";

const styles = {
    container: {
        width: "50vw",
        position: "relative",
        boxSizing: "border-box",
        padding: "15vh 5% 0",
        background: "#2F54EB",
    },
    descriptionContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    title: {
        color: "white",
    },
    description: {
        color: "#8198F3",
    },
    image: {
        position: "absolute",
        bottom: "0",
        right: "0",
        width: "30rem",
        height: "30rem",
    },
};

const Hero = () => {
    return (
        <Grid sx={styles.container}>
            <Grid sx={styles.descriptionContainer}>
                <Typography variant="h3" component="p" sx={styles.title}>
                    Designed for Individuals
                </Typography>
                <Typography variant="p" sx={styles.description}>
                    See the analytics and grow your data remotely, from anywhere
                </Typography>
            </Grid>
            <Box
                component="img"
                sx={styles.image}
                alt="The employee directory"
                src={Sheet}
            />
        </Grid>
    );
};

export default Hero;
