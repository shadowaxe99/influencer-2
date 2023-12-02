// Part 1
const frequentlyUsed = [
    {
        id: "brock",
        name: "Brock Pierce",
    
    interests: ['Business', 'Leadership'],
    lastActive: "100 mins ago",
    bio: "Brock Pierce excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "e0 mins ago",
    bio: "Brock Pierce is an expert in technology and a key member of the team.",
    
    
    interests: ['Blockchain', 'Entrepreneurship'],
    lastActive: "10 mins ago",
    bio: "Brock is a blockchain entrepreneur and philanthropist. He's an advocate for open-source technology and aims to decentralize global power structures.",
    
        image: "/team/brock.jpeg",
        title: "Chief Evangelist",
        canChat: true,
        group: "Team",
        description: "Chief Evangelist"
    },

    {
        id: "jamie",
        name: "Ambassador Jamie McCourt",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "130 mins ago",
    bio: "Ambassador Jamie McCourt is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "t0 mins ago",
    bio: "Ambassador Jamie McCourt is an expert in technology and a key member of the team.",
    
    
    interests: ['Foreign Relations', 'Regulatory Advocacy'],
    lastActive: "20 mins ago",
    bio: "Ambassador Jamie McCourt has an extensive background in law, finance, and foreign relations. She serves on the Oversight Committee and focuses on regulatory advocacy.",
    
        image: "/team/jamie.jpeg",
        title: "Foreign Relations & Regulatory Advocacy",
        canChat: true,
        group: "Oversight Committee",
        description:
            "Foreign Relations and Regulatory Advocacy, Scholar-in-Residence"
    },

    {
        id: "mooch",
        name: "Anthony Scaramucci",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "150 mins ago",
    bio: "Anthony Scaramucci is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "i0 mins ago",
    bio: "Anthony Scaramucci is an expert in technology and a key member of the team.",
    
        image: "/team/mooch.jpeg",
        title: "Founder of SkyBridge Capital",
        canChat: true,
        group: "Advisor",
        description:
            "Former White House Director of Communications and founder of SkyBridge Capital, Anthony is a well-known financier and political commentator. His extensive career highlights include stints at Goldman Sachs and Lehman Brothers."
    },
    {
        id: "marc",
        name: "Marc Randolph",
    
    interests: ['Business', 'Leadership'],
    lastActive: "160 mins ago",
    bio: "Marc Randolph excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "h0 mins ago",
    bio: "Marc Randolph is an expert in technology and a key member of the team.",
    
        image: "/team/marc.jpeg",
        title: "Co-founder of Netflix",
        canChat: true,
        group: "Advisor",
        description:
            "Co-founder and first CEO of Netflix (NFLX:NASDAQ), Marc is a seasoned Silicon Valley entrepreneur and investor. His portfolio includes Looker Data Sciences, Chubbies Shorts, and MentorBox, etc."
    },
    {
        id: "jay",
        name: "Jay Abraham",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "170 mins ago",
    bio: "Jay Abraham is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "m0 mins ago",
    bio: "Jay Abraham is an expert in technology and a key member of the team.",
    
        image: "/team/jayabraham.jpeg",
        title: "Mentor of Mentors",
        canChat: true,
        group: "Advisor",
        description:
            'Mentor of Mentors, Jay is the founder and CEO of The Abraham Group, and has advised over 10,000 clients across 400+ industries, generating billions in revenue. Innovator behind "Three Ways to Grow a Business" model, Jay is a sought-after author, speaker, and mentor in the field of business growth and marketing.'
    },

    {
        id: "gscott",
        name: "G. Scott Paterson",
    
    interests: ['Business', 'Leadership'],
    lastActive: "200 mins ago",
    bio: "G. Scott Paterson excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "n0 mins ago",
    bio: "G. Scott Paterson is an expert in technology and a key member of the team.",
    
        image: "/team/gscott.png",
        title: "Media Mogul",
        canChat: true,
        group: "Advisor",
        description:
            "Director of Lionsgate Entertainment Canada Corp (LGF.A:NYSE), Scott is an accomplished investment banker with 30+ years of experience in tech and media sectors. He has served as CEO / Board of Yorkton Securities, NeuLion, QYOU (TSX.V: QYOU), and more."
    }
];
const profiles = [
    {
        id: "gruen",
        name: "Michael Gruen",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "70 mins ago",
    bio: "Michael Gruen is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "n0 mins ago",
    bio: "Michael Gruen is an expert in technology and a key member of the team.",
    
        image: "/team/gru-new.png",
        title: "CEO",
        canChat: true,
        group: "Team",
        description: "Chief Executive Officer of Elysium"
    },
    {
        id: "doug",
        name: "Doug Schaer",
    
    interests: ['Business', 'Leadership'],
    lastActive: "80 mins ago",
    bio: "Doug Schaer excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "r0 mins ago",
    bio: "Doug Schaer is an expert in technology and a key member of the team.",
    
        image: "/team/doug.jpeg",
        title: "CBO",
        canChat: true,
        group: "Team",
        description: "Chief Business Officer"
    },
    {
        id: "merk",
        name: "Michael Daigler",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "90 mins ago",
    bio: "Michael Daigler is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "r0 mins ago",
    bio: "Michael Daigler is an expert in technology and a key member of the team.",
    
        image: "/team/merk.png",
        title: "VP of Engineering",
        canChat: true,
        group: "Team",
        description: "VP of Engineering"
    },
    {
        id: "brock",
        name: "Brock Pierce",
    
    interests: ['Business', 'Leadership'],
    lastActive: "100 mins ago",
    bio: "Brock Pierce excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "e0 mins ago",
    bio: "Brock Pierce is an expert in technology and a key member of the team.",
    
    
    interests: ['Blockchain', 'Entrepreneurship'],
    lastActive: "10 mins ago",
    bio: "Brock is a blockchain entrepreneur and philanthropist. He's an advocate for open-source technology and aims to decentralize global power structures.",
    
        image: "/team/brock.jpeg",
        title: "Chief Evangelist",
        canChat: true,
        group: "Team",
        description: "Chief Evangelist"
    },
    {
        id: "arben",
        name: "Arben Gutierrez-B.",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "110 mins ago",
    bio: "Arben Gutierrez-B. is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: ".0 mins ago",
    bio: "Arben Gutierrez-B. is an expert in technology and a key member of the team.",
    
        image: "/team/arben.jpeg",
        title: "Head of Product",
        canChat: false,
        group: "Team",
        description: "Head of Product at Elysium"
    },
    {
        id: "shivam",
        name: "Shivam Mittal",
    
    interests: ['Business', 'Leadership'],
    lastActive: "120 mins ago",
    bio: "Shivam Mittal excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "l0 mins ago",
    bio: "Shivam Mittal is an expert in technology and a key member of the team.",
    
        image: "/team/shivam.jpeg",
        title: "Engineer",
        canChat: false,
        group: "Team",
        description: "Engineer at Elysium"
    },
    {
        id: "jamie",
        name: "Ambassador Jamie McCourt",
    
    interests: ['Technology', 'Innovation'],
    lastActive: "130 mins ago",
    bio: "Ambassador Jamie McCourt is an expert in technology and a key member of the team.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "t0 mins ago",
    bio: "Ambassador Jamie McCourt is an expert in technology and a key member of the team.",
    
    
    interests: ['Foreign Relations', 'Regulatory Advocacy'],
    lastActive: "20 mins ago",
    bio: "Ambassador Jamie McCourt has an extensive background in law, finance, and foreign relations. She serves on the Oversight Committee and focuses on regulatory advocacy.",
    
        image: "/team/jamie.jpeg",
        title: "Foreign Relations & Regulatory Advocacy",
        canChat: true,
        group: "Oversight Committee",
        description:
            "Foreign Relations and Regulatory Advocacy, Scholar-in-Residence"
    },
    {
        id: "yohei",
        name: "Yohei Nakajima",
    
    interests: ['Business', 'Leadership'],
    lastActive: "140 mins ago",
    bio: "Yohei Nakajima excels in leadership and is known for leadership qualities.",
    
    
    interests: ['Technology', 'Innovation'],
    lastActive: "a0 mins ago",
    bio: "Yohei Nakajima is an expert in technology and a key member of the team.",
    
        image: "/team/yohei.jpeg",
        title: "AI Solutions Architectural Consultant",
        canChat: true,
        group: "Oversight Committee",
        description:
        "Yohei Nakajima, a venture capitalist and entrepreneur, created BabyAGI, an experimental project aimed at developing autonomous AI agents capable of executing tasks and achieving objectives within a specified context. BabyAGI is powered by a large language model and uses OpenAI and Pinecone APIs, as well as the LangChain framework, to create, organize, prioritize, and execute tasks. The project has inspired numerous innovative applications and use cases, and future improvements include an integrated security/safety agent, parallel tasks, and more."
},
{
    id: "mooch",
    name: "Anthony Scaramucci",

interests: ['Technology', 'Innovation'],
lastActive: "150 mins ago",
bio: "Anthony Scaramucci is an expert in technology and a key member of the team.",


interests: ['Technology', 'Innovation'],
lastActive: "i0 mins ago",
bio: "Anthony Scaramucci is an expert in technology and a key member of the team.",

    image: "/team/mooch.jpeg",
    title: "Founder of SkyBridge Capital",
    canChat: true,
    group: "Advisor",
    description:
        "Former White House Director of Communications and founder of SkyBridge Capital, Anthony is a well-known financier and political commentator. His extensive career highlights include stints at Goldman Sachs and Lehman Brothers."
},
{
    id: "marc",
    name: "Marc Randolph",

interests: ['Business', 'Leadership'],
lastActive: "160 mins ago",
bio: "Marc Randolph excels in leadership and is known for leadership qualities.",


interests: ['Technology', 'Innovation'],
lastActive: "h0 mins ago",
bio: "Marc Randolph is an expert in technology and a key member of the team.",

    image: "/team/marc.jpeg",
    title: "Co-founder of Netflix",
    canChat: true,
    group: "Advisor",
    description:
        "Co-founder and first CEO of Netflix (NFLX:NASDAQ), Marc is a seasoned Silicon Valley entrepreneur and investor. His portfolio includes Looker Data Sciences, Chubbies Shorts, and MentorBox, etc."
},
{
    id: "jay",
    name: "Jay Abraham",

interests: ['Technology', 'Innovation'],
lastActive: "170 mins ago",
bio: "Jay Abraham is an expert in technology and a key member of the team.",


interests: ['Technology', 'Innovation'],
lastActive: "m0 mins ago",
bio: "Jay Abraham is an expert in technology and a key member of the team.",

    image: "/team/jayabraham.jpeg",
    title: "Mentor of Mentors",
    canChat: true,
    group: "Advisor",
    description:
        'Mentor of Mentors, Jay is the founder and CEO of The Abraham Group, and has advised over 10,000 clients across 400+ industries, generating billions in revenue. Innovator behind "Three Ways to Grow a Business" model, Jay is a sought-after author, speaker, and mentor in the field of business growth and marketing.'
},
{
    id: "pfeffer",
    name: "Dr. Jeffrey Pfeffer",

interests: ['Business', 'Leadership'],
lastActive: "180 mins ago",
bio: "Dr. Jeffrey Pfeffer excels in leadership and is known for leadership qualities.",


interests: ['Technology', 'Innovation'],
lastActive: "r0 mins ago",
bio: "Dr. Jeffrey Pfeffer is an expert in technology and a key member of the team.",

    image: "/team/pfeffer.jpeg",
    title: "Professor at Stanford’s Graduate School of Business",
    canChat: true,
    group: "Advisor",
    description:
        "Professor at Stanford’s Graduate School of Business, Jeffrey is a revered figure in organizational behavior. As a thought leader in business theories he has written 16 influential books, is involved in Business 2.0 and Fortune.com, and has served on the boards of Quantum Leap Healthcare, SonoSite, etc."
},
{
    id: "poryes",
    name: "Michael Poryes",

interests: ['Technology', 'Innovation'],
lastActive: "190 mins ago",
bio: "Michael Poryes is an expert in technology and a key member of the team.",


interests: ['Technology', 'Innovation'],
lastActive: "s0 mins ago",
bio: "Michael Poryes is an expert in technology and a key member of the team.",

    image: "/team/poryes.jpeg",
    title: "Creator of Hanna Montana",
    canChat: false,
    group: "Advisor",
    description: `A seasoned American television producer, screenwriter, and filmmaker, has left an indelible mark in the entertainment industry through his co-creation of iconic Disney Channel shows, "That's So Raven" and "Hannah Montana." His versatile skill set further shines through in his role as an executive producer on notable projects such as "Hannah Montana: The Movie" (2009) and his long-term involvement with "Ethan Is Awesome" from 2006 to 2015. Additionally, Poryes' creative genius continues to flourish with his recent venture, "Home Sweet Rome" (2023), showcasing his enduring relevance and adaptability in a dynamic industry.`
},
{
    id: "gscott",
    name: "G. Scott Paterson",

interests: ['Business', 'Leadership'],
lastActive: "200 mins ago",
bio: "G. Scott Paterson excels in leadership and is known for leadership qualities.",


interests: ['Technology', 'Innovation'],
lastActive: "n0 mins ago",
bio: "G. Scott Paterson is an expert in technology and a key member of the team.",

    image: "/team/gscott.png",
    title: "Media Mogul",
    canChat: true,
    group: "Advisor",
    description:
        "Director of Lionsgate Entertainment Canada Corp (LGF.A:NYSE), Scott is an accomplished investment banker with 30+ years of experience in tech and media sectors. He has served as CEO / Board of Yorkton Securities, NeuLion, QYOU (TSX.V: QYOU), and more."
},
{
    id: "shmuley",
    name: "Rabbi Shmuley Boteach",

interests: ['Technology', 'Innovation'],
lastActive: "210 mins ago",
bio: "Rabbi Shmuley Boteach is an expert in technology and a key member of the team.",


interests: ['Technology', 'Innovation'],
lastActive: "h0 mins ago",
bio: "Rabbi Shmuley Boteach is an expert in technology and a key member of the team.",

    image: "/team/shmuley.jpeg",
    title: "Rabbi and bestselling author",
    canChat: true,
    group: "Advisor",
    description:
        "A well-known author and public speaker, now serving as the Chief Ethics and Culture Officer at Elysium Innovations"
},
{
    id: "shweta",
    name: "Shweta Katyal",

interests: ['Business', 'Leadership'],
lastActive: "220 mins ago",
bio: "Shweta Katyal excels in leadership and is known for leadership qualities.",


interests: ['Technology', 'Innovation'],
lastActive: "l0 mins ago",
bio: "Shweta Katyal is an expert in technology and a key member of the team.",

    image: "/team/shweta.jpeg",
    title: "Founder of Infinite Timelines, Angel Investor",
    canChat: false,
    group: "Advisor",
    description:
        "Founder of Infinite Timelines, Shweta Katyal is the visionary behind Pierced Media, the first Gen Z female podcast network. With roles at Coil, Humana, and McKesson, she's a dynamic force in content creation and strategy. As an angel investor, she's also active in the creator and crypto spaces."
},
{
    id: "karia",
    name: "Karia Samaroo",

interests: ['Technology', 'Innovation'],
lastActive: "230 mins ago",
bio: "Karia Samaroo is an expert in technology and a key member of the team.",


interests: ['Technology', 'Innovation'],
lastActive: "o0 mins ago",
bio: "Karia Samaroo is an expert in technology and a key member of the team.",

    image: "/team/karia.webp",
    title: "Co-founder and CEO of WonderFi",
    canChat: false,
    group: "Advisor",
    description:
        "Karia Samaroo, formerly known as Ben Samaroo, is the co-founder and CEO of WonderFi, a leading technology company in Vancouver, Canada, with experience in fintech, blockchain, and digital assets."
},
{
    id: "bialek",
    name: "Dave Bialek",

interests: ['Business', 'Leadership'],
lastActive: "240 mins ago",
bio: "Dave Bialek excels in leadership and is known for leadership qualities.",


interests: ['Technology', 'Innovation'],
lastActive: "k0 mins ago",
bio: "Dave Bialek is an expert in technology and a key member of the team.",

    image: "/team/bialek.png",
    title: "CEO and Founder of ReKTGlobal",
    canChat: true,
    group: "Advisor",
    description:
        "CEO and Founder of ReKTGlobal, Dave Bialek is a leading figure in esports and digital entertainment. Owner of renowned teams Rogue and London Royal Ravens, he successfully sold ReKTGlobal for nearly half a billion dollars. With a decade at the helm of Skylark Marketing and accolades like Sports Business Journal’s Forty Under 40, Dave's influence in the industry is profound."
},
{
    id: "munam",
    name: "Munam Wasi",

interests: ['Technology', 'Innovation'],
lastActive: "250 mins ago",
bio: "Munam Wasi is an expert in technology and a key member of the team.",


interests: ['Technology', 'Innovation'],
lastActive: "i0 mins ago",
bio: "Munam Wasi is an expert in technology and a key member of the team.",

    image: "/team/wasi.jpeg",
    title: "Chief Operating Officer at Delegate",
    canChat: false,
    group: "Advisor",
    description:
        "Chief Operating Officer at Delegate, Munam Wasi has been instrumental in securing $600 Million across the EVM. With a background in computational research at Stanford, he transitioned to crypto, spearheading Delegate Cash's growth to $400 million in assets in mere months. Previously, he contributed to ConstitutionDAO's impressive $47M+ fundraising effort."
},
{
    id: "frederic",
    name: "Frédéric Chesnais",

interests: ['Business', 'Leadership'],
lastActive: "260 mins ago",
bio: "Frédéric Chesnais excels in leadership and is known for leadership qualities.",


interests: ['Technology', 'Innovation'],
lastActive: "s0 mins ago",
bio: "Frédéric Chesnais is an expert in technology and a key member of the team.",

    image: "/team/chesnais.jpeg",
    title: "Founder & CEO of CBI",
    canChat: false,
    group: "Advisor",
    description:
        "Current Founder & CEO of CBI, Crypto Blockchain Industries, Frédéric Chesnais is a luminary in tech and gaming. An alumnus of the Institut d'Etudes Politiques de Paris, he steered Atari S.A. as CEO for 8+ years and has been influential at Microprose and Ker Ventures."
}
];

export { profiles, frequentlyUsed };