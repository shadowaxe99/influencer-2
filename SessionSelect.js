import { Box, Button, Typography } from "@mui/material";
// import { lightdm } from "nody-greeter-types";
import { Field, useForm } from "react-final-form";
// import smallButton from "../assets/images/components/smallButton.png";

const SessionSelect = (visibility) => {
    const smallButtonStyle = {
        width: 100,
        height: 35,
        fontFamily: "RuneScape07Bold",
        backgroundImage: `url(${"smallButton"})`,
        textTransform: "none",
        color: "#FFFFFF",
        textShadow: "1px 1px #000000",
        display: "block"
    };
    const form = useForm();

    // sessions for browser demo
    const devSessionNameList = [
        "bspwm",
        "sowm",
        "Plasma (X11)",
        "Plasma (Wayland)"
    ];
    const devSessionKeyList = ["bspwm", "sowm", "plasma", "plasmawayland"];
    const devDefaultSessionName = devSessionNameList[0];
    const devDefaultSessionKey = devSessionKeyList[0];

    const sessionNameList =
        process.env.REACT_APP_ENV !== "dm" ? devSessionNameList : "";
    const sessionKeyList =
        process.env.REACT_APP_ENV !== "dm" ? devSessionKeyList : "";
    const defaultSessionName =
        process.env.REACT_APP_ENV !== "dm" ? devDefaultSessionName : "";
    const defaultSessionKey =
        process.env.REACT_APP_ENV !== "dm" ? devDefaultSessionKey : "";

    return (
        <Box sx={{ visibility: visibility }}>
            <Field name="sessionKey" initialValue={defaultSessionKey}>
                {() => {
                    return <></>;
                }}
            </Field>
            <Field name="sessionName" initialValue={defaultSessionName}>
                {({ input }) => {
                    return (
                        <Button
                            type="button"
                            sx={smallButtonStyle}
                            onClick={() => {
                                const current = sessionNameList?.indexOf(
                                    input.value
                                );
                                const next =
                                    (current + 1) % sessionNameList?.length;
                                input.onChange(sessionNameList?.[next]);
                                form.change(
                                    "sessionKey",
                                    sessionKeyList?.[next]
                                );
                            }}
                        >
                            <Typography
                                mt="-0.4rem"
                                overflow="hidden"
                                whiteSpace="nowrap"
                                sx={{
                                    fontFamily: "RuneScape07Bold",
                                    color: "#FFFFFF",
                                    textShadow: "1px 1px #000000"
                                }}
                            >
                                {input.value ? input.value : "Default"}
                            </Typography>
                            <Typography
                                mt="-0.5rem"
                                fontSize="0.8rem"
                                sx={{
                                    fontFamily: "RuneScape07",
                                    color: "#FFFFFF",
                                    textShadow: "1px 1px #000000"
                                }}
                            >
                                Click to switch
                            </Typography>
                        </Button>
                    );
                }}
            </Field>
        </Box>
    );
};

export default SessionSelect;
