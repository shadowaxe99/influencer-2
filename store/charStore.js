import { create } from "zustand";
import {
    runescapePlain,
    batmanFont,
    avengersFont,
    starTrekFont,
    ancient,
    spongebobFont,
    popeFont,
    villain,
} from "@fonts/fonts";

const useCharacterStore = create((set) => ({
    characters: [
        {
            id: "0",
            name: "Wise Old Man",
            skill: "AI Master",
            img: "/chars/nobackground/runscape-oldman.png",
            video: "/char_videos/wise-old-man-video.mp4",
            description:
                "For seasoned AI experts who prefer advanced, no-nonsense discussions.",
            sound: "/sounds/wiseoldman.mp3",
            greeting: "/greeting_sounds/runescape_theme.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-wiseman/wise-1.mp4",
                "/character-theme-images/animated-wiseman/wise-2.mp4",
                "/character-theme-images/animated-wiseman/wise-3.mp4",
                "/character-theme-images/animated-wiseman/wise-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-wiseman/wise-2.mp4",
                "/character-theme-images/animated-wiseman/wise-3.mp4",
                "/character-theme-images/animated-wiseman/wise-4.mp4"
            ],
            contentText: [
                "Welcome, Adventurer",
                "To the Hallowed Halls of Elysium Innovations 🔮",
                "📜 The AI Conundrum: A Quest Most Perplexing 📜",
                "Fear not, young wanderer! The riddle of isolated AI agents has been solved in our grand tapestry of interconnected systems.",
                "🧙🏻 Your Personal AI Butler: A Familiar for the Modern Age 🧙🏻",
                "Just as I guide adventurers in Draynor Village, our AI butler shall guide you through the labyrinth of your digital life.",
                "🌟 Experience the AI Revolution: A New Dawn of Magic 🌟",
                "We're not merely enchanting runes; we're enchanting the very fabric of artificial intelligence!",
                "🔥 Automation Station: The Mage Training Arena of AI 🔥",
                "Here, you shall discover and integrate new spells—err, AI capabilities—that will make your life as wondrous as a teleportation spell!",
                "🛡️ G.U.I.D.E to Excellence: The Five Pillars of Wisdom 🛡️",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. These are the cornerstones of our arcane knowledge.",
                "📚 Dive Deeper into the Tomes of Elysium 📚",
                "From Web & Desktop Grimoires to Mobile Spellbooks, our wisdom knows no bounds!",
                "🎓 Meet the Maestros: The Council of Wise Ones 🎓",
                "From AI scholars to business archmages, we are the guardians of this new era of enlightenment.",
                "🔎 FAQs: The Oracle Speaks 🔎",
                "Your questions, answered. As clear as a crystal ball, we shall illuminate your path.",
                "🌌 To Elysium and Beyond: The Prophecy 🌌",
                "The scrolls foretell a future of endless possibility. Join us on this epic quest!",
                "So, young adventurer, are you prepared to embark on the most wondrous journey of your life? Elysium Innovations awaits!",
                "© 2023 Elysium Innovations. All rights reserved. No goblins were harmed in the forging of this platform."
            ],
            fontFamily: "font-runescape",
            fontVariable: runescapePlain.variable,
            letterSpacing: "tracking-wide",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        },
        {
            id: "1",
            name: "Elysium Butler",
            skill: "AI Novice",
            img: "/e-butler.png",
            video: "/char_videos/butler-video.mp4",
            description:
                "For AI beginners desiring simple, jargon-free introductions.",
            sound: "/sounds/elysium.mp3",
            greeting: "/greeting_sounds/butler-lockin.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-butler/butler-1.mp4",
                "/character-theme-images/animated-butler/butler-2.mp4",
                "/character-theme-images/animated-butler/butler-3.mp4",
                "/character-theme-images/animated-butler/butler-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-butler/butler-2.mp4",
                "/character-theme-images/animated-butler/butler-3.mp4",
                "/character-theme-images/animated-butler/butler-4.mp4"
            ],
            contentText: [
                "🎩 Welcome ,Sir/Madam 🎩",
                "To the future, Elysium Innovations.",
                "🔍 The AI Conundrum: A Mystery Solved 🔍",
                "Fear not, for we have addressed the issue of isolated AI agents. They now collaborate as seamlessly as Batman and Robin.",
                "☕ Your Personal AI Butler: At Your Service ☕",
                "Much like I assist Master Bruce, our AI butler is designed to manage your digital affairs with utmost discretion and efficiency.",
                "🌃 Experience the AI Revolution: A New Era Dawns 🌃",
                "We're not merely polishing silverware; we're refining the landscape of artificial intelligence.",
                "📚 Automation Station: The Batcave of AI 📚",
                "Here, you'll find an arsenal of AI capabilities, each more innovative than the last. A veritable utility belt of options, if you will.",
                "🌟 G.U.I.D.E to Excellence: The Wayne Family Values 🌟",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. These are the principles that guide our endeavors.",
                "📘 Dive Deeper: Your Next Chapter 📘",
                "We are available on Web & Desktop, and soon on Mobile. The story is just beginning, Sir/Madam.",
                "👥 Meet the Maestros: The League Behind the Scenes 👥",
                "From technological wizards to business strategists, we are the team that keeps the cogs turning.",
                "❓ FAQs: Your Inquiries, Addressed ❓",
                "Should you have questions, we have the answers prepared. No need to turn on the Bat-Signal.",
                "🌍 To Elysium and Beyond: The Path Forward 🌍",
                "Our plans are as expansive as the Wayne Enterprises empire. We invite you to be part of this exciting journey.",
                "So, shall we proceed? Elysium Innovations is ready to serve you, just as I serve the Wayne family.",
                "© 2023 Elysium Innovations. All rights reserved. No supervillains were harmed in the making of this platform."
            ],
            fontFamily: "font-batman",
            fontVariable: batmanFont.variable,
            letterSpacing: "tracking-wides",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        },
        {
            id: "2",
            name: "Nick Fury",
            skill: "AI Enthusiast",
            img: "/chars/nickfury.png",
            video: "/char_videos/nick-video.mp4",
            description:
                "For those with some AI exposure, ready to delve deeper.",
            sound: "/sounds/nickfury.mp3",
            greeting:
                "/greeting_sounds/nick-fury-thinks-its-stupid-decision.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-nickfury/fury-1.mp4",
                "/character-theme-images/animated-nickfury/fury-2.mp4",
                "/character-theme-images/animated-nickfury/fury-3.mp4",
                "/character-theme-images/animated-nickfury/fury-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-nickfury/fury-2.mp4",
                "/character-theme-images/animated-nickfury/fury-3.mp4",
                "/character-theme-images/animated-nickfury/fury-4.mp4"
            ],
            contentText: [
                "🕶️   Welcome Agent   🕶️",
                "Elysium Innovations",
                "🔫 The AI Conundrum: A Threat Neutralized🔫",
                "Listen up, soldier. We've tackled the problem of isolated AI agents. They're now part of a team, just like the Avengers.",
                "🛡️ Your Personal AI Butler: The Coulson You Never Knew You Needed 🛡️",
                "This AI butler's got your six. It'll manage your digital life so you can focus on the mission at hand.",
                "💥 Experience the AI Revolution: This Ain't Your Grandma's Tech 💥",
                "We're not playing games here. We're revolutionizing the AI landscape, and you're on the front lines.",
                "🚀 Automation Station: The S.H.I.E.L.D. Helicarrier of AI 🚀",
                "This is where you'll find the latest and greatest in AI capabilities. Consider it your personal armory.",
                "📋 G.U.I.D.E to Excellence: The S.H.I.E.L.D. Protocol 📋",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. That's how we roll.",
                "🖥️ Dive Deeper: Your Next Briefing 🖥️",
                "We're operational on Web & Desktop, and we're coming to Mobile. Stay tuned, Agent.",
                "👥 Meet the Maestros: The Team Behind the Curtain 👥",
                "From tech geniuses to business strategists, we're the ones making the calls.",
                ":❓ FAQs: Get Your Intel Here ❓",
                "You've got questions, we've got answers. No need for an interrogation room.",
                "🌎 To Elysium and Beyond: The Roadmap 🌎",
                "We've got big plans, and you're a part of them. Get ready for the next phase.",
                "So, Agent, are you in or out? Elysium Innovations is assembling a team, and you're on the list.",
                "© 2023 Elysium Innovations. All rights reserved. No Skrulls were harmed in the making of this platform."
            ],
            fontFamily: "font-avengers",
            fontVariable: avengersFont.variable,
            letterSpacing: "tracking-widest",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-700",
            }
        },
        {
            id: "3",
            name: "Spock",
            skill: "AI Strategist",
            img: "/chars/spock.jpeg",
            video: "/char_videos/spock-video.mp4",
            description:
                "For the logical minds acquainted with AI and seeking in-depth analyses.",
            sound: "/sounds/spock.mp3",
            greeting: "/greeting_sounds/spock-prosper.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-spock/spock-1.mp4",
                "/character-theme-images/animated-spock/spock-2.mp4",
                "/character-theme-images/animated-spock/spock-3.mp4",
                "/character-theme-images/animated-spock/spock-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-spock/spock-2.mp4",
                "/character-theme-images/animated-spock/spock-3.mp4",
                "/character-theme-images/animated-spock/spock-4.mp4"
            ],
            contentText: [
                "🖖 Greetings and Welcome 🖖",
                "To Elysium Innovations",
                "🌌 The AI Conundrum: A Logical Solution 🌌",
                "Isolated AI agents are inefficient. We have logically integrated them into a cooperative system for optimized performance.",
                "👽 Your Personal AI Butler: A Vulcan's Ideal Assistant 👽",
                "Much like a Vulcan serves the needs of the many, our AI butler is programmed to manage your digital life with logical precision.",
                "🚀 Experience the AI Revolution: The Final Frontier of Technology 🚀",
                "We are not merely exploring strange new worlds; we are pioneering the uncharted territories of artificial intelligence.",
                "🔬 Automation Station: The Science Lab of AI 🔬",
                "Here, you will find a curated selection of AI capabilities, each one rigorously tested for maximum efficiency.",
                "📚 G.U.I.D.E to Excellence: The Prime Directives of AI 📚",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. These are the principles that guide our mission, in accordance with Vulcan philosophy.",
                "🌠 Dive Deeper: Engage Warp Drive 🌠",
                "We are operational on Web & Desktop, and a Mobile interface is imminent. The journey has only just commenced.",
                "👤 Meet the Maestros: The Federation Council of Technology 👤",
                "From technological experts to business strategists, we are the collective minds behind this endeavor.",
                "❓ FAQs: Seek and Ye Shall Find Logical Answers ❓",
                "You have inquiries? We provide answers that are both logical and comprehensive.",
                "🌍 To Elysium and Beyond: The Five-Year Mission 🌍",
                "Our vision is as expansive as the universe itself, seeking to boldly go where no platform has gone before.",
                "Are you prepared to join us on this logical journey? Elysium Innovations stands as a paragon of technological advancement, and your participation would be most logical.",
                "© 2023 Elysium Innovations. All rights reserved. No redshirts were harmed in the making of this platform."
            ],
            fontFamily: "font-startrek",
            fontVariable: starTrekFont.variable,
            letterSpacing: "tracking-widest",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        },
        {
            id: "4",
            name: "Rabbi",
            skill: "AI Scholar",
            img: "/chars/star-of-david.png",
            video: "/char_videos/rabbi-video.mp4",
            description:
                "For learners who've explored AI basics and crave deeper insights.",
            sound: "/sounds/rabbi.mp3",
            greeting: "/sounds/rabbi.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-rabi/rabi-1.mp4",
                "/character-theme-images/animated-rabi/rabi-2.mp4",
                "/character-theme-images/animated-rabi/rabi-3.mp4",
                "/character-theme-images/animated-rabi/rabi-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-rabi/rabi-2.mp4",
                "/character-theme-images/animated-rabi/rabi-3.mp4",
                "/character-theme-images/animated-rabi/rabi-4.mp4"
            ],
            contentText: [
                "✡️ Shalom Aleichem✡️",
                "Welcome to Elysium Innovations",
                "🌹 The AI Conundrum: A Lesson in Unity 🌹",
                "Just as Esther united her people in a time of need, we bring together isolated AI agents to create a harmonious community.",
                "🕯️ Your Personal AI Butler: A Shabbos Goy for the Digital World 🕯️",
                "Much like we prepare for Shabbat with love and care, our AI butler is designed to manage your digital life with the same devotion.",
                "🍞 Experience the AI Revolution: A Challah for the Soul 🍞",
                "We're not just braiding challah here; we're weaving together the strands of artificial intelligence to create something truly nourishing.",
                "📚 Automation Station: The Midrash of AI 📚",
                "Here, you'll find a collection of AI capabilities, each one a commentary on the possibilities of technology.",
                "💖 G.U.I.D.E to Excellence: The Eshet Chayil of AI 💖",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. These are the virtues that guide our work, just as the Eshet Chayil guides her home.",
                "🍷 Dive Deeper: A Cup of Elijah for the Modern Age 🍷",
                "We're available on Web & Desktop, and soon on Mobile. The Seder is just beginning, my dear.",
                "👥 Meet the Maestros: The Matriarchs and Patriarchs of Innovation 👥",
                "From technological scholars to business visionaries, we are the guiding lights of this endeavor.",
                "❓ FAQs: A Mother's Wisdom ❓",
                "You have questions, my dear? Like any Rebbetzin, I have heartfelt advice and answers. No need to consult the Talmud, just ask.",
                "🌍 To Elysium and Beyond: A Journey Through the Desert 🌍",
                "Our vision stretches far and wide, like the journey of our ancestors through the desert, led by a pillar of fire.",
                "So, are you ready to join our community? Elysium Innovations is like a warm, welcoming Sukkah, and there's always room for one more.",
                "© 2023 Elysium Innovations. All rights reserved. No dreidels were spun in the making of this platform."
            ],
            fontFamily: "font-ancient",
            fontVariable: ancient.variable,
            letterSpacing: "tracking-wider",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        },
        {
            id: "5",
            name: "Spongebob",
            skill: "AI Explorer",
            img: "/chars/nobackground/sponge.png",
            video: "/char_videos/spongebob-video.mp4",
            description:
                "For those new to AI, seeking fun and engaging overviews.",
            sound: "/sounds/spongebob.mp3",
            greeting: "/greeting_sounds/spongebob-eternity.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-sponge/sponge-1.mp4",
                "/character-theme-images/animated-sponge/sponge-2.mp4",
                "/character-theme-images/animated-sponge/sponge-3.mp4",
                "/character-theme-images/animated-sponge/sponge-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-sponge/sponge-2.mp4",
                "/character-theme-images/animated-sponge/sponge-3.mp4",
                "/character-theme-images/animated-sponge/sponge-4.mp4"
            ],
            contentText: [
                "🍍 Welcome to Elysium Innovations 🍍",
                "Where your digital life gets the Bikini Bottom treatment!",
                "🎵 Ahoy, Mateys! Ready to set sail on the AI Revolution? 🎵",
                "🌊 Your Personal AI Butler Awaits! 🌊",
                "Just like SpongeBob is to the Krusty Krab, our AI butler is to your digital world—always there, always eager, and always exceptional!",
                "🦑 The AI Conundrum: Solved! 🦑",
                "Tired of AI agents that are as isolated as Squidward in his clarinet room? Our interconnected ecosystem is the Jellyfish Fields where all AI agents come to play!",
                "🦀 Experience the AI Revolution, Krusty Krab Style! 🦀",
                "We're not just flipping Krabby Patties; we're flipping the script on how AI works for you!",
                "🐿️ Automation Station: Where Sandy's Inventions Come to Life! 🐿️",
                "Discover and integrate the latest AI capabilities, as exciting as a day at Goo Lagoon!",
                "🍔 G.U.I.D.E to Excellence: Our Secret Formula 🍔",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. It's like the secret formula of the Krabby Patty, but for AI!",
                "🐠 Dive Deeper into the Elysium Ocean 🐠",
                "From Web & Desktop to Mobile Apps, we're as versatile as Patrick's rock house!",
                "🌟 Meet the Maestros: Our Team of Bikini Bottom All-Stars 🌟",
                "From AI enthusiasts to business moguls, we're the Mermaid Man and Barnacle Boy of the tech world!",
                "📜 FAQs: The Magic Conch Has Spoken! 📜",
                "Your queries, answered. From our mission to our methods, we've got more clarity than a Bubble Buddy!",
                "🎉 To Elysium and Beyond: Our Journey Ahead 🎉",
                "Just like SpongeBob's endless pursuit of his boating license, we're always striving for more!",
                "So, are you ready, kids? Dive into the Elysium Innovations experience and make your digital life as fun as a day in Bikini Bottom!",
                "© 2023 Elysium Innovations. All rights reserved."
            ],
            fontFamily: "font-spongebob",
            fontVariable: spongebobFont.variable,
            letterSpacing: "tracking-widest",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        },
        {
            id: "6",
            name: "The Pope",
            skill: "AI Ethicist",
            img: "/chars/nobackground/pope.png",
            video: "/char_videos/pope-video.mp4",
            description:
                "For those keen on discussing the moral and ethical implications of AI.",
            sound: "/sounds/pope.mp3",
            greeting: "/sounds/pope.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-pope/pope-1.mp4",
                "/character-theme-images/animated-pope/pope-2.mp4",
                "/character-theme-images/animated-pope/pope-3.mp4",
                "/character-theme-images/animated-pope/pope-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-pope/pope-2.mp4",
                "/character-theme-images/animated-pope/pope-3.mp4",
                "/character-theme-images/animated-pope/pope-4.mp4"
            ],
            contentText: [
                "✝️ Pax Vobiscum ✝️",
                "Welcome to Elysium Innovations",
                "🙏 The AI Conundrum: A Modern-Day Parable 🙏",
                "Just as the Good Shepherd gathers his flock, we unite isolated AI agents into a harmonious congregation, working towards the common good.",
                "🕊️ Your Personal AI Butler: A Guardian Angel in Cyberspace 🕊️",
                "Much like guardian angels watch over us, our AI butler is designed to manage your digital life with divine precision and care.",
                "🌟 Experience the AI Revolution: A New Evangelization 🌟",
                "We're not merely lighting candles; we're illuminating the entire realm of artificial intelligence with the light of innovation.",
                "📖 Automation Station: The Catechism of AI 📖",
                "Here, you'll find a compendium of AI capabilities, each one a chapter in the ever-expanding book of technological wisdom.",
                "🕯️ G.U.I.D.E to Excellence: The Beatitudes of AI 🕯️",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. These are the guiding principles that reflect our commitment to ethical technology.",
                "🍷 Dive Deeper: The Last Supper of Innovation 🍷",
                "We're available on Web & Desktop, and soon on Mobile. The liturgy has only just begun, my child.",
                "👼 Meet the Maestros: The College of Cardinals of Technology 👼",
                "From technological theologians to business apostles, we are the stewards of this divine mission.",
                "❓ FAQs: The Papal Encyclicals ❓",
                "You have questions, my child? Seek and you shall find. We offer answers that serve as spiritual guidance in the realm of technology.",
                "🌍 To Elysium and Beyond: A Pilgrimage of Progress 🌍",
                "Our vision is as expansive as the universal Church, reaching all corners of the Earth.",
                "So, are you ready to join our mission? Elysium Innovations is like a cathedral of technology, and its doors are open to all.",
                "© 2023 Elysium Innovations. All rights reserved. No rosaries were counted in the making of this platform."
            ],
            fontFamily: "font-pope",
            fontVariable: popeFont.variable,
            letterSpacing: "tracking-wide",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        },
        {
            id: "7",
            name: "Gru",
            skill: "AI Tinkerer",
            img: "/chars/nobackground/gru.png",
            video: "/char_videos/gru-video.mp4",
            description:
                "For the playful minds who've dabbled in AI and enjoy creative approaches.",
            sound: "/sounds/gru.mp3",
            greeting: "/greeting_sounds/gru-toilet-trimmed.mp3",
            themeImagePaths: [
                "/character-theme-images/animated-gru/gru-1.mp4",
                "/character-theme-images/animated-gru/gru-2.mp4",
                "/character-theme-images/animated-gru/gru-3.mp4",
                "/character-theme-images/animated-gru/gru-4.mp4"
            ],
            roadMapThemeImagePaths: [
                "/character-theme-images/animated-gru/gru-2.mp4",
                "/character-theme-images/animated-gru/gru-3.mp4",
                "/character-theme-images/animated-gru/gru-4.mp4"
            ],
            contentText: [
                "🚀 Welcome to Elysium Innovations, My Friends! Hahaha! 🚀",
                "Get ready for the ride of your life!",
                "🍌 The AI Conundrum: Solved, Just Like Stealing the Moon! 🍌",
                "Isolated AI agents? Bah! We bring them together like my Minions on a heist!",
                "👃 Your Personal AI Butler: As Loyal as Dr. Nefario! 👃",
                "This AI butler will manage your digital life better than my Minions assemble a freeze ray!",
                "💡 Experience the AI Revolution: As Grand as My Plans! 💡",
                "We're not just making jelly; we're revolutionizing the whole AI world!",
                "🔧 Automation Station: The Lab of Your Dreams! 🔧",
                "This is where you find gadgets and gizmos that even Dr. Nefario would envy!",
                "📜 G.U.I.D.E to Excellence: The Gru Family Values! 📜",
                "Growth, User Empowerment, Innovation, Data Security, and Enterprise Optimization. It's like the recipe for my famous guacamole!",
                "🚗 Dive Deeper: Hop Into My Car, Let's Go! 🚗",
                "We're on Web & Desktop, and soon on Mobile. Strap in; it's going to be a wild ride!",
                "👥 Meet the Maestros: The League of Extraordinary Villains... Err, Innovators! 👥",
                "From tech geniuses to business masterminds, we're the team behind the curtain. Or should I say, the lair?",
                "❓ FAQs: Ask Away, I Dare You! ❓",
                "You've got questions? We've got freeze rays! Just kidding, we have answers.",
                "🌍 To Elysium and Beyond: The Next Big Heist! 🌍",
                "Our plans are as ambitious as stealing the moon, and you're invited to join the caper!",
                "So, are you in or are you out? Elysium Innovations is assembling a team, and you look like you could handle a freeze ray!",
                "© 2023 Elysium Innovations. All rights reserved. No Minions were harmed in the making of this platform."
            ],
            fontFamily: "font-villain",
            fontVariable: villain.variable,
            letterSpacing: "tracking-wide",
            fontColors: {
                primary: "text-black",
                secondary: "text-red-700",
                tertiary: "text-blue-600",
            }
        }
    ],
    selectedCharacter: null,
    themeImagePaths: [],
    setSelectedCharacter: (character) => set({ selectedCharacter: character }),
    setThemeImagePaths: (imagePaths) => ({ themeImagePaths: [...imagePaths] })
}));
export default useCharacterStore;