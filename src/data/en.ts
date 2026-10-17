import { ProjectSchema, type Project } from './schema';

const rawProjects = [
  {
    id: "p7",
    name: "Chroma",
    type: "3d",
    typeLabel: "3D / Game Trailer",
    date: "2026",
    tools: "Blender, Rigify, Technical Art, Animation",
    thumbnail: "/thumbnails/chroma.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Poster.web.webp", alt: "Chroma project poster" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/1ModelProta.web.webp", alt: "Chroma — Protagonist 3D model turnaround" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/2ModelAnta.web.webp", alt: "Chroma — Antagonist 3D model turnaround" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/3Thegioigoc1.web.webp", alt: "Chroma — World building and environment angle 1" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/4.web.webp", alt: "Chroma — Environment concept art" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/5thegioigoc3.web.webp", alt: "Chroma — World building and environment angle 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots1.web.webp", alt: "Chroma — Cinematic animation key shot 1" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots2.web.webp", alt: "Chroma — Cinematic animation key shot 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots3.web.webp", alt: "Chroma — Cinematic animation key shot 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots4.web.webp", alt: "Chroma — Cinematic animation key shot 4" }
    ],
    videoFirst: true,
    video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Trailer%20CHROMA_nh%C3%B3m%202.mp4",
    pdfs: [
      { label: "Game Design Document (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Game%20design%20document_CHROMA.pdf" }
    ],
    desc: "Chroma is a collaborative game demo trailer created by a team of five.",
    contributionsLabel: "My Contributions:",
    bullets: [
      "World Building & Design: Authored the game's lore and designed the visual look of the main city environment.",
      "Character Art: Modeled (our rat protagonist and snake antagonist) and rigged all characters using Rigify.",
      "Technical Art: Developed a custom, stylized shader inspired by Guilty Gear to give the project its high-energy, illustrative look.",
      "Animation & Cinematics: Storyboarded and animated key sequences, including the main antagonist's reveal. I handled the full setup for these scenes, including lighting, camera work, and VFX.",
      "Supervision: Acted as the animation supervisor, providing feedback and ensuring a consistent style across the team's work."
    ]
  },
  {
    id: "p2",
    name: "Mana the Cute Battle Maid",
    type: "3d",
    typeLabel: "3D",
    date: "Nov 2025",
    tools: "ZBrush, Maya, Substance 3D Painter, Blender",
    thumbnail: "/thumbnails/mana.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Idoru3.web.webp", alt: "Mana the Cute Battle Maid — idle pose" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Okoru3.web.webp", alt: "Mana the Cute Battle Maid — angry pose" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Zako3.web.webp", alt: "Mana the Cute Battle Maid — minion pose" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/chill.web.webp", alt: "Mana the Cute Battle Maid — chill pose" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_02.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_03.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_04.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 4" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_05.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 5" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_06.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 6" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_07.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 7" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_08.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 8" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_09.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 9" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_10.web.webp", alt: "Mana the Cute Battle Maid — Production Process Page 10" }
    ],
    video: [
      "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/final.mp4",
      "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Spin.mp4"
    ],
    pdfs: [
      { label: "Process (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Process.pdf" }
    ],
    desc: "3D character design and production pipeline.",
    bullets: [
      "Created character concept in Clip Studio Paint",
      "Sculpted the character in ZBrush; retopologized and laid out UVs in Maya",
      "Textured in Substance 3D Painter",
      "Created rig, custom toon-shader, posed and rendered in Blender"
    ]
  },
  {
    id: "p5",
    name: "Green Summer 2025 — Wall Design",
    type: "2d",
    typeLabel: "2D / Mural",
    date: "Aug 2025 – Sep 2025",
    tools: "Photoshop, Illustrator, On-site mural painting",
    thumbnail: "/thumbnails/green-summer.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6928459231212_33459fa428332fb275646e2049188a77.web.webp", alt: "Finished Green Summer 2025 mural on-site, wide view" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6929085027631_01b1cc14e14c51c46d57109ec3f3724e.web.webp", alt: "Finished Green Summer 2025 mural, close-up detail" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6935956433718_e2398be89586cb40938830c0ffa0d2f2.web.webp", alt: "Green Summer 2025 mural painting in progress on-site" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/K%C3%8DCH%20TH%C6%AF%E1%BB%9AC%20T%C6%AF%E1%BB%9CNG%20LINH%20S%C6%A0N%202.web.webp", alt: "Wall dimension and layout design for the Linh Son wall mural" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/T%C6%AF%E1%BB%9CNG%203%20B%E1%BB%A8C.web.webp", alt: "Three-panel wall mural design mockup" }
    ],
    video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/6879675435854.mp4",
    pdfs: [],
    desc: "Mural design and public wall painting project for the Green Summer 2025 volunteer campaign.",
    bullets: [
      "Designed visual concepts for large-scale public wall paintings in Phổ Quang neighborhood and Van Lang University dorm",
      "Produced design mockups and wall measurement layouts for execution",
      "Coordinated on-site painting for quality control and construction"
    ]
  },
  {
    id: "p4",
    name: "Regretful Colors (Sắc Màu Hối Hận)",
    type: "2d",
    typeLabel: "2D / Animation",
    date: "July 2025 – Sep 2025",
    tools: "Clip Studio Paint, After Effects",
    thumbnail: "/thumbnails/regretful-colors.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%201.web.webp", alt: "Regretful Colors film poster, version 1 — environmental awareness theme" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%202.web.webp", alt: "Regretful Colors film poster, version 2 — environmental awareness theme" }
    ],
    video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Short%20film%20S%E1%BA%AFc%20m%C3%A0u%20h%E1%BB%91i%20h%E1%BA%ADn.mp4",
    pdfs: [
      { label: "Storyboard (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Behind%20the%20scene/Storyboard.pdf" }
    ],
    desc: "3-minute animated short film about environmental awareness through the creation of art.",
    bullets: [
      "Directed visual direction for the entire film",
      "Created shot list and storyboard from script",
      "Character illustrations for 2 main characters and props",
      "Composed special effect scenes with After Effects"
    ]
  },
  {
    id: "p1",
    name: "Definitely Not Gonna Late!",
    type: "2d",
    typeLabel: "2D",
    date: "Jan 2025",
    tools: "Clip Studio Paint, Word, Canva, Excel",
    thumbnail: "/thumbnails/definitely-not-late.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Character%20designs.web.webp", alt: "Character design sheet for the Definitely Not Gonna Late! short film cast" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_02.web.webp", alt: "Definitely Not Gonna Late! — Storyboard Page 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_03.web.webp", alt: "Definitely Not Gonna Late! — Storyboard Page 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_09.web.webp", alt: "Definitely Not Gonna Late! — Storyboard Page 9" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_10.web.webp", alt: "Definitely Not Gonna Late! — Storyboard Page 10" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview1.web.webp", alt: "Definitely Not Gonna Late! — Animation preview shot 1" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview2.web.webp", alt: "Definitely Not Gonna Late! — Animation preview shot 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview3.web.webp", alt: "Definitely Not Gonna Late! — Animation preview shot 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview4.web.webp", alt: "Definitely Not Gonna Late! — Animation preview shot 4" }
    ],
    video: "",
    pdfs: [
      { label: "Storyboard (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Chacchankotre%20-%20Storyboard.pdf" },
      { label: "Pitch deck", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Ch%E1%BA%AFc%20ch%E1%BA%AFn%20kh%C3%B4ng%20tr%E1%BB%85(Definitely%20not%20gonna%20late).pdf" }
    ],
    desc: "Short animation film project.",
    bullets: [
      "Created the script and shot list for the short animation film",
      "Designed characters in Clip Studio Paint",
      "Drew storyboard for the script in Clip Studio Paint and Canva"
    ]
  },
  {
    id: "p3",
    name: "Reimagine Puss in Boots: The Last Wish",
    type: "2d",
    typeLabel: "2D",
    date: "Oct 2024",
    tools: "Clip Studio Paint",
    thumbnail: "/thumbnails/puss-in-boots.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Puss%20poses.web.webp", alt: "Puss in Boots illustrated in multiple action poses and expressions" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Reimagine%20characters.web.webp", alt: "Redesigned protagonist and two antagonists for Reimagine Puss in Boots" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_10.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 10" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_11.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 11" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_12.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 12" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_13.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 13" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_14.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 14" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_15.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 15" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_16.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 16" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_17.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 17" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_18.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 18" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_19.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 19" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_20.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 20" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_21.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 21" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_22.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 22" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_23.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 23" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_24.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 24" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_25.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 25" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_26.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 26" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_27.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 27" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_28.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 28" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_29.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 29" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_30.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 30" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_31.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 31" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_33.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 33" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_34.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 34" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_35.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 35" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_36.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 36" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_37.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 37" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_38.web.webp", alt: "Reimagine Puss in Boots — Concept Sheet Page 38" }
    ],
    video: "",
    pdfs: [
      { label: "Full PDF", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Reimagine%20Puss%20in%20boots%20the%20last%20wish.pdf" }
    ],
    desc: "Personal reinterpretation of the classic characters.",
    bullets: [
      "Redesigned the protagonist and 2 antagonists with personal style",
      "Illustrated the protagonist in multiple action poses and emotions"
    ]
  },
  {
    id: "p6",
    name: "Illustration Works",
    type: "2d",
    typeLabel: "2D / Illustration",
    date: "2024 – 2025",
    tools: "Clip Studio Paint",
    thumbnail: "/thumbnails/illustration-works.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/AODtease.web.webp", alt: "Group illustration of three characters in a playful pose, pastel color palette" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/ditri.web.webp", alt: "Demon-eared character design in a suit, with rough sketch studies of expressions and poses" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/fall2.web.webp", alt: "Girl reaching skyward through clouds with a small bird companion, dynamic pose" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/frieren%20love.web.webp", alt: "Frieren fan art — elf mage floating over a field of blue flowers, staff in hand" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/isometric.web.webp", alt: "Isometric illustration of a cozy bedroom with a desk setup, bed, bookshelf, and TV" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/tong.web.webp", alt: "Illustration works compilation showcase" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/phoenix.web.webp", alt: "Semi-realistic portrait painting study of a man in a red suit and tie" }
    ],
    video: "",
    pdfs: [],
    desc: "A collection of personal illustration works exploring different styles, characters, and themes.",
    bullets: [
      "Personal character illustrations and fan art across a range of styles",
      "Chibi, portrait study, and isometric environment pieces",
      "Independent practice work exploring color, lighting, and composition"
    ]
  }
];

export const enProjects: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));

export const enData = {
  nav: { about: "About", projects: "Projects", services: "Services", contact: "Contact" },
  about: {
    name: "Hoang Minh Thien",
    role: "Artist & Illustrator — 2D & 3D",
    education: {
      title: "Education",
      items: [
        { name: "Van Lang University", meta: "Ho Chi Minh City, Vietnam — Sep 2023 – Present", desc: "3rd year Undergraduate, Average GPA 3.5" },
        { name: "Green Academy", meta: "Ho Chi Minh City, Vietnam — Oct 2022 – May 2023", desc: "3D Modeling program graduate" },
        { name: "Tran Dai Nghia High School for the Gifted", meta: "Ho Chi Minh City, Vietnam — Aug 2020 – May 2023", desc: "Excellent graduate, GPA 3.7" }
      ]
    },
    experience: {
      title: "Experience",
      items: [
        { title: "Director & Illustrator", meta: "Team 3T, Van Lang University — July 2025 – Sep 2025", bullets: [
          "Directed the visual for \"Regretful Colors\" (Sắc Màu Hối Hận) — a 3-minute animated short film about environmental awareness",
          "Created shot list and storyboard from the script",
          "Character illustration for 2 main characters and props using Clip Studio Paint",
          "Composed special effect scenes with After Effects"
        ]},
        { title: "Design Lead", meta: "Project Green Summer 2025 — Aug 2025 – Sep 2025", bullets: [
          "Designed visuals for public wall paintings in Pho Quang neighborhood and Van Lang University dorm",
          "Active on-site management for quality control and painting construction"
        ]},
        { title: "Freelance Artist", meta: "Online — 2024 – Present", bullets: [
          "Custom character illustrations for clients",
          "Logo and shirt design for University of Illinois Chicago Badminton Club",
          "Presentation slide design for RMIT University students"
        ]}
      ]
    },
    skills: {
      title: "Technical Skills",
      tags: ["Maya","Blender","ZBrush","Substance 3D Painter","Photoshop","Clip Studio Paint","Illustrator","Premiere","After Effects","Graphic Design","Vietnamese","English (IELTS 7.0)","Japanese (N4)"]
    }
  },
  projects: {
    title: "Selected Projects",
    filters: { all: "All Works", f2d: "2D Works", f3d: "3D Works" },
    items: enProjects
  },
  services: {
    title: "Services",
    items: [
      { icon: "✏️", title: "Character Illustration", desc: "Custom character designs, concept art, and commissions in 2D and 3D." },
      { icon: "🎨", title: "Concept Art & Design", desc: "Visual development, world-building, and character design for games and animation." },
      { icon: "🎬", title: "Storyboard & Animation", desc: "Shot lists, storyboards, and short animation production." },
      { icon: "🖼️", title: "Graphic Design", desc: "Logos, presentation slides, print designs, and merchandise." },
      { icon: "🧊", title: "3D Modeling & Sculpting", desc: "Character sculpting, retopology, texturing, rigging, and rendering." }
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Open for commissions and collaborations. Feel free to reach out!",
    items: [
      { icon: "📧", label: "Email", value: "minhthienhoang200105@gmail.com", href: "mailto:minhthienhoang200105@gmail.com" },
      { icon: "📱", label: "Phone", value: "(+84) 097 449 1598", href: "tel:+84974491598" },
      { icon: "📍", label: "Location", value: "Ho Chi Minh City, Vietnam", href: null },
      { iconImage: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Google_Drive_icon_(2020).svg.webp", label: "Portfolio Files", value: "View full portfolio", href: "https://drive.google.com/drive/folders/1bnK9ktQCQus31J89DU4QwwlBZ0woXQ7k?usp=sharing" }
    ]
  },
  footer: "© 2026 Hoang Minh Thien. All rights reserved."
};
