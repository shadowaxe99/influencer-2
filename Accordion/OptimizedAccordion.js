
import { useState, memo } from "react";

const Accordion = memo(({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="accordion-wrapper">
            <div className="accordion-title" onClick={toggleOpen}>
                {title}
            </div>
            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    );
});

export default Accordion;
