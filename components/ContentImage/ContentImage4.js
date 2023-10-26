import { SectionContainer } from "@components/Section";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";

const ContentImageData = [
  {
    id: uuid(),
    title:
      "In a landscape crowded with AI solutions, Elysium Innovations stands out for reasons that directly benefit developers. Here's why you should care:",
    content: "",
    align: "right",
    image: "/developers.mp4",
    thumbnail: "/balmer-thumbnail.png",
    listItems: [
      {
        content:
          "Market Access: Devs tap into a ready consumer base enabling instant earning potential.",
      },
      {
        content:
          "Credible Security: Agents in Elysium's ecosystem are audited and can earn verified SAFE tags to level up consumer trust in developer's products.",
      },
      {
        content:
          "Interoperability: Seamlessly integrate their AI agents with existing software and platforms served by Elysium's infrastructure.",
      },
      {
        content:
          "Developer Collaboration: Our platform enhances opportunities for developers to work together in advancing AI Agents & solutions",
      },
    ],
  },
];

export const ContentImage4 = () => {
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      videoRefs.current.forEach((videoRef) => {
        if (videoRef) {
          const rect = videoRef.getBoundingClientRect();
          const videoTop = rect.top + scrollY;
          const videoBottom = videoTop + rect.height;

          if (videoTop > scrollY - videoRef.clientHeight && videoBottom < scrollY + windowHeight) {
              videoRef.muted = false;
            if (!isPlaying) {
              videoRef.play();
              setIsPlaying(true);
            }
            // window.removeEventListener("scroll", handleScroll);
          } else {
              videoRef.muted = true;
            if (isPlaying) {
              videoRef.pause();
              setIsPlaying(false);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call it once to check initial visibility

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);

  return (
    <SectionContainer className="process-items mt-24 space-y-16">
      {ContentImageData.map((item) => (
        <div
          id={item.id}
          key={item.id}
          className="process-item--container grid md:grid-cols-2 gap-y-8"
        >
          <div
            className={`process-item--image rounded-3xl ${
              item.align === "left" ? "md:order-1" : ""
            }`}
          >
            <video
              ref={(ref) => videoRefs.current.push(ref)}
              src={item.image}
              width={512}
              height={512}
              objectFit="cover"
              alt="Process Banner 1"
              className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-gray-300 rounded"
              autoPlay
              muted
              preload="metadata"
              playsInline={true}
              controls
              poster={item.thumbnail}
              loading="lazy"
            ></video>
          </div>
          <div
            className={`process-item--content ${
              item.align === "left"
                ? "md:pr-16 lg:pr-24 xl:pr-32 ml-auto"
                : "md:pl-16 lg:pl-24 xl:pl-32  mr-auto"
            } my-auto content text-black/60`}
          >
            <h3 className="mb-6 h4 md:h3 font-semibold text-black">
              {item.title}
            </h3>
            <p>{item.content}</p>
            <ul className="process-item--list space-y-3">
              {item.listItems?.length &&
                item.listItems.map((listItem) => (
                  <li
                    id={listItem.id}
                    key={listItem.id}
                    className="inline-grid grid-flow-col-dense"
                  >
                    <Icon
                      icon="ph:seal-check-bold"
                      className="w-6 h-6 text-secondary-500 mr-2"
                    />
                    {listItem.content}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </SectionContainer>
  );
};
