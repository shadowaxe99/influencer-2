
import React from "react";
import PropTypes from "prop-types";
import "./Button.css"; // Assume we have a separate CSS file for styles

const buttonStyles = {
    small: "btn-small",
    medium: "btn-medium",
    large: "btn-large"
};

const Button = ({ label, icon, onClick, styleType = "primary", size = "medium" }) => (
    <button
        className={`btn ${buttonStyles[size]} btn-${styleType}`}
        onClick={onClick}
        aria-label={label}
    >
        {icon && <span className="btn-icon">{icon}</span>}
        {label}
    </button>
);

Button.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    styleType: PropTypes.oneOf(["primary", "secondary"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    customStyles: PropTypes.object
};

export default Button;
