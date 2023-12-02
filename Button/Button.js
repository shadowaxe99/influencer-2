import React from "react";
import PropTypes from "prop-types";

const Button = ({
    label,
    icon,
    onClick,
    styleType = "primary",
    ariaLabel,
    customStyles = {},
    size = "medium"
}) => {
    const baseStyles = {
        borderRadius: "5px",
        padding: size === "small" ? "5px 10px" : "10px 20px",
        cursor: "pointer"
    };

    const dynamicStyles = {
        primary: { backgroundColor: "#007BFF", color: "white" },
        secondary: {
            backgroundColor: "white",
            color: "#007BFF",
            border: "2px solid #007BFF"
        }
    };

    const buttonStyles = {
        ...baseStyles,
        ...dynamicStyles[styleType],
        ...customStyles
    };

    return (
        <button
            onClick={onClick}
            style={buttonStyles}
            aria-label={ariaLabel || label}
            onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onClick();
                }
            }}
            tabIndex="0"
            role="button"
        >
            {icon && <span className="button-icon">{icon}</span>}
            <span className="button-label">{label}</span>
        </button>
    );
};

// Prop Types for better documentation and validation
Button.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    styleType: PropTypes.oneOf(["primary", "secondary"]),
    ariaLabel: PropTypes.string,
    customStyles: PropTypes.object,
    size: PropTypes.oneOf(["small", "medium", "large"])
};

export default Button;
