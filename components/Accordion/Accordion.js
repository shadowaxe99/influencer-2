import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import clsx from "clsx";

/**
 What does Elysium Innovations do?

Elysium Innovations is an AI platform company focused on developing an innovative AI marketplace and protocol layer to provide seamless AI-powered solutions to users.

What is Elysium Innovations' main product offering?

Their main product is the 'Butler' AI agent whi ch serves as a central coordinator for all other AI agents on their platform. This enables seamless integration and coordination of various AI solutions.

What technology does Elysium Innovations leverage?

They utilize blockchain technology which enables transparency, security, and ownership of AI agents for users on their platform.

How does Elysium Innovations make money?

They generate revenue through commissions from transactions on their AI marketplace and premium subscriptions for access to their platform.

What are Elysium Innovations' competitive advantages?

Their key advantages are the 'Butler' AI agent for coordination and the use of blockchain technology for transparency and ownership. Having prominent industry figures also provides expertise and credibility.

What is Elysium Innovations' expansion strategy?

Their strategy focuses on partnerships, acquisitions, staying ahead in innovation, and fostering an ecosystem of AI solutions. Distribution is through their AI marketplace enhanced by blockchain.

Who are some of the key people behind Elysium Innovations?

Prominent figures include CEO Michael Gruen, Chief Business Officer Doug Schaer, and Chief Evangelist Brock Pierce. 

 Who are the founders of Elysium Innovations?

The founders of Elysium Innovations include AI expert Michael Gruen along with other industry veterans who have experience across domains like entertainment, cryptocurrency, and automation.

What is the background of Elysium Innovations' core team?

Guided by CEO Michael Gruen, the core team comprises industry veterans with extensive experience in areas like entertainment, cryptocurrency, and automation. They are supported by high-profile advisors like Marc Randolph, Scott Paterson, and Anthony Scaramucci.

What problem is Elysium Innovations trying to solve?

Elysium Innovations aims to tackle the issues of fragmentation and inaccessibility that developers face in the AI industry by providing a unified and customizable platform called Elysium OS.

Who are the target customers for Elysium Innovations?

The company targets both developers and consumers. For developers, they provide tools to rapidly build AI innovations. For consumers, they offer personalized AI experiences.

What are some key features of Elysium OS?

Elysium OS allows for customization and control of AI agents. It facilitates rapid prototyping for developers. It also enables next-level personalization of the AI experience.

How does Elysium Innovations plan to scale up?

By focusing on developers first to create a ripple effect for consumers and prioritizing collaboration and personalization using their platform and AI marketplace.
 */

const accordionItemType = {
    top: "rounded-t-lg",
    default: "border rounded-none border-t-0",
    bottom: "border border-t-0 rounded-b-lg"
};

export const Accordion = ({ sections }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const accordionClickHandle = (id) => {
        setActiveAccordion(id === activeAccordion ? null : id);
    };

    return (
        <SectionContainer className="accordion--container my-16 drop-shadow-xl max-w-3xl mx-auto offset-y-0 offset-x-8">
            {sections.map((accordionItem, index) => (
                <div
                    key={accordionItem.id}
                    id={accordionItem.id}
                    className={clsx(
                        "accordion-item--container border border-neutral-200 bg-white overflow-hidden",
                        {
                            [accordionItemType.top]: index === 0,
                            [accordionItemType.default]:
                                index > 0 && index < sections.length - 1,
                            [accordionItemType.bottom]:
                                index === sections.length - 1
                        }
                    )}
                >
                    <h2 className="accordion-item--heading mb-0">
                        <button
                            className="group relative flex w-full font-semibold items-center rounded-t-lg border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition"
                            type="button"
                            aria-expanded={accordionItem.isOpen}
                            onClick={() =>
                                accordionClickHandle(accordionItem.id)
                            }
                        >
                            {accordionItem.title}
                            <Icon
                                icon="material-symbols:keyboard-arrow-up-rounded"
                                className="ml-auto h-8 w-8 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out motion-reduce:transition-none"
                            />
                        </button>
                    </h2>
                    <div
                        className={clsx(
                            "accordion-item--content py-4 px-5 text-base",
                            {
                                hidden: activeAccordion !== accordionItem.id, // Use hidden class to animate height to 0
                                "!visibility block":
                                    activeAccordion === accordionItem.id // Use block class to show content again
                            }
                        )}
                    >
                        <p>{accordionItem.content}</p>
                    </div>
                </div>
            ))}
        </SectionContainer>
    );
};
