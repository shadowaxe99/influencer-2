
import React from "react";
import './Testimonials.css';  // Import a CSS file for styling

const Testimonials = () => {
    const testimonials = [
        {
            quote: "A visionary entrepreneur who's too busy innovating to bother with a hair comb.",
            author: "— Anthony “The Mooch” Scaramucci"
        },
        {
            quote: "Michael Gruen is the guy who's always late to meetings but somehow still ahead of the game.",
            author: "- Marc Roberts, Sports Agent"
        },
        {
            quote: "Michael Gruen can get you Rockets tickets but don't expect him to remember the game's score.",
            author: "- Forbes"
        },
    ];

    return (
        <div className="testimonials">
            <h3 className="title">What People Are Saying 🌟</h3>
            <div className="testimonial-list">
                {testimonials.map((item, index) => (
                    <div className="testimonial-item" key={index}>
                        <blockquote>{item.quote}</blockquote>
                        <cite>{item.author}</cite>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
