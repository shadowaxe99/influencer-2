
import React from "react";
import { getFontSizeForHeading, getTextAlign } from "@utils/helper";

// This component serves as a reusable title element
export const Title = ({
    textAlign = "left",  // Text alignment (e.g., left, right, center)
    content,             // Content of the title
    level = 1,           // HTML heading level (e.g., 1 for h1, 2 for h2, etc.)
    color = "black",     // Text color
    fontStyle = "normal" // Font style (e.g., normal, italic)
}) => {
    // Create the title tag based on the provided level
    const tag = React.createElement(
        `h${level}`,
        {
            className: `max-w-5xl mx-auto my-5 text-5xl ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`,
            style: { color, fontStyle }
        },
        content
    );
    
    return tag;
};

export default Title;
