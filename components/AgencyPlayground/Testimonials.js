
import React from "react";
import './Testimonials.css';  // Import a CSS file for styling

const Testimonials = () => {
    const testimonials = [
        {
            quote: "A visionary entrepreneur with an innovative spirit... Beyond his accolades, what truly sets Michael apart is his commitment to empowering the next generation.",
            author: "— Anthony “The Mooch” Scaramucci"
        },
        {
            quote: "Michael Gruen is a rare breed of young men who are Ambitious, Determined, and Hard Working. He will prove to be adept at overcoming adversity. My money is on Michael.",
            author: "- Marc Roberts, Sports Agent"
        },
        {
            quote: "Michael Gruen is one of those guys who knows everybody. If you need tickets to a Rockets basketball game, he can call Tilman Fertitta, the owner of the team.",
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
