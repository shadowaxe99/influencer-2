import Box from "@mui/material/Box";
// import background from "../assets/images/components/loginContainer.png"
import CentralContents from "./CentralContents";

const CentralContainer = ({ error, handleEnterClick }) => {
    return (
        <Box
            sx={{
                width: 360,
                height: 200,
                backgroundImage: `url(${"/components/loginContainer.png"})`,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CentralContents
                error={error}
                handleEnterClick={handleEnterClick}
            />
        </Box>
    );
};

export default CentralContainer;
