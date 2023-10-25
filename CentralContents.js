import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { Field, useFormState } from "react-final-form";
// import { lightdm } from "nody-greeter-types";
// import largeButton from "../assets/images/components/largeButton.png";
// import "./styles.css";
import Checkboxes from "./Checkboxes";
import { ConfigContext, configType } from "./Configuration";
import { useContext, useState } from "react";
import SettingsContent from "./SettingsContent";

const CentralContents = ({ error, handleEnterClick }) => {
    // const shutdown = () => {
    //     lightdm.shutdown();
    // };

    const inputStyle = {
        fontFamily: "RuneScape07Bold",
        color: "#FFFFFF",
        textShadow: "1px 1px #000000",
        backgroundColor: "transparent",
        border: "none",
        caretColor: "#F7F800"
    };

    const labelStyle = {
        fontFamily: "RuneScape07Bold",
        color: "#FFFFFF",
        textShadow: "1px 1px #000000",
        display: "inline"
    };

    const labelBoxStyle = {
        mx: "4.4rem",
        height: "1.0rem"
    };

    const largeButtonStyle = {
        width: 147,
        height: 41,
        fontFamily: "RuneScape07Bold",
        backgroundImage: `url(/components/largeButton.png)`,
        textTransform: "capitalize",
        color: "#FFFFFF",
        textShadow: "1px 1px #000000"
    };

    const capsLockMessageStyle = {
        fontFamily: "RuneScape07",
        color: "#FFFFFF",
        textShadow: "1px 1px #000000",
        fontSize: "0.85rem"
    };

    const { values: formValues } = useFormState();
    const config = useContext(ConfigContext);
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    // if (window) {
    //     ["keyup", "keydown"].forEach((type) => {
    //         window.addEventListener(type, (e) => {
    //             const event = e;
    //             const capsLock = event.getModifierState("CapsLock");
    //             setIsCapsLockOn(capsLock);
    //             if (type === "keyup" && event.key === "." && event.ctrlKey) {
    //                 setSettingsOpen(true);
    //             }
    //         });
    //     });
    // }

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    return (
        <>
            {!settingsOpen ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: "1.8rem",
                            mb: "0.7rem"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "RuneScape07Bold",
                                color: "#F7F800",
                                textShadow: "1px 1px #000000"
                            }}
                        >
                            {!error
                                ? `Enter your username & password.`
                                : "Login failed, try again."}
                        </Typography>
                    </Box>
                    <div
                        // sx={labelBoxStyle}
                        className="labelBoxStyle"
                    >
                        <InputLabel
                            //  sx={labelStyle}
                            className="labelStyle"
                        >
                            Login:
                        </InputLabel>
                        <Field
                            name="user"
                            type={"text"}
                            component="input"
                            initialValue={"Zues"}
                        >
                            {({ input }) => (
                                <input
                                    {...input}
                                    // value={"dafaf"}
                                    className="runescapeInputStyle"
                                    // style={inputStyle}
                                    autoComplete="off"
                                />
                            )}
                        </Field>
                    </div>
                    <Box
                        // sx={labelBoxStyle}
                        className="labelBoxStyle"
                    >
                        <InputLabel
                            // sx={labelStyle}
                            className="labelStyle"
                        >
                            Password:
                        </InputLabel>
                        <Field
                            name="password"
                            type="password"
                            component="input"
                            initialValue={"12345678"}
                        >
                            {({ input }) => (
                                <input
                                    // value={"12345678"}
                                    {...input}
                                    // style={inputStyle}
                                    className="runescapeInputStyle"
                                    autoComplete="off"
                                />
                            )}
                        </Field>
                    </Box>
                    <Checkboxes />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: "0.4rem",
                            mx: "1.3rem"
                        }}
                    >
                        <Grid container>
                            <Grid item xs={6} textAlign="center">
                                <Button
                                    name="login"
                                    type="submit"
                                    // sx={largeButtonStyle}
                                    className="largeButtonStyle"
                                    onClick={() => handleEnterClick()}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={6} textAlign="center">
                                {/* <Button
                                    name="shutdown"
                                    // onClick={shutdown}
                                    // sx={largeButtonStyle}
                                    className="largeButtonStyle"
                                >
                                    Shutdown
                                </Button> */}
                            </Grid>
                        </Grid>
                    </Box>
                    {isCapsLockOn && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Typography sx={capsLockMessageStyle}>
                                CapsLock is on
                            </Typography>
                        </Box>
                    )}
                </>
            ) : (
                <SettingsContent closeSettings={closeSettings} />
            )}
        </>
    );
};

export default CentralContents;
