import { Box } from "@mui/system";
// import logo from "../assets/images/components/logo.png"

const Logo = () => {
    return (
        <Box
            sx={{
                width: 448,
                height: 147,
                backgroundImage: `url(${"/components/logo.png"})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'calc(50% + 30px) center',
                backgroundSize: 'contain',     // Optional: Adjust image size to fit inside the box
                my: "0.8rem"
            }}
        />
    );
};



export default Logo;
