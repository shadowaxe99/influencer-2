import FormWrapper from "./FormWrapper";
// import { Font } from "@next/font";
// import RuneScape07 from "./fonts/Runescape-Plain-12.woff";
// import RuneScape07Bold from "./fonts/Runescape-Bold-12.woff";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Configuration from "./Configuration";
import { useRef, useEffect } from "react";
function RunescapeLogin({ handleEnterClick }) {
    // Font.load({
    //     src: ["/public/fonts/Runescape-Plain-12.woff"]
    // });
    const theme = createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: `
          @font-face {
            font-family: 'RuneScape07';
            font-style: normal;
            font-display: swap;
            font-weight: regular;
            src: local('${"RuneScape07"}'), url(${"RuneScape07"}) format('woff');
            unicodeRange: U+0030-0039, U+0041-005A, U+0061-007A;
          }
          @font-face {
            font-family: 'RuneScape07Bold';
            font-style: normal;
            font-display: swap;
            font-weight: regular;
            src: local('RuneScape07Bold'), url(${"RuneScape07Bold"}) format('woff');
            unicodeRange: U+0030-0039, U+0041-005A, U+0061-007A;
          }
        `
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Configuration>
                    <FormWrapper handleEnterClick={handleEnterClick} />
                </Configuration>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default RunescapeLogin;

// function RunescapeLogin({ handleEnterClick }) {
//     const canvasRef = useRef(null);

//     const particlesRef = useRef([]); // Use useRef to maintain state across re-renders

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         // Set canvas dimensions to fill parent
//         canvas.width = canvas.parentElement.offsetWidth;
//         canvas.height = canvas.parentElement.offsetHeight;

//         function addParticle(x, y, size, speed, life, color) {
//             particlesRef.current.push(
//                 new FlameParticle(x, y, size, speed, life, color)
//             );
//         }

//         function animate() {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             addParticle(150, 150, 3, 1, 100, "red");
//             addParticle(160, 150, 3, 1, 100, "orange");

//             for (let i = 0; i < particlesRef.current.length; i++) {
//                 const particle = particlesRef.current[i];
//                 particle.update();
//                 particle.draw(ctx);

//                 if (particle.life <= 0) {
//                     particlesRef.current.splice(i, 1);
//                     i--;
//                 }
//             }

//             requestAnimationFrame(animate);
//         }

//         animate();
//     }, []);

//     return (
//         <div className="w-screen h-screen bg-gray-400 bg-[url('/backgrounds/default.jpg')] bg-no-repeat bg-center bg-contain">
//             <canvas ref={canvasRef} width={"100%"} height={"100%"}></canvas>
//         </div>
//     );
// }

// export default RunescapeLogin;

// class FlameParticle {
//     constructor(x, y, size, speed, life, color) {
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.speed = speed;
//         this.life = life;
//         this.color = color;
//     }

//     update() {
//         this.y -= this.speed;
//         this.life -= 1;
//     }

//     draw(ctx) {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//     }
// }
