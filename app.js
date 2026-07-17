/* ================================================================
   PORTFOLIO DATA
   Edit this object to update your content, add new projects, etc.
   Each project takes an "images" array, an optional "video" URL,
   and a "pdfs" array of { label, url } — leave any of them empty
   if not applicable.
   ================================================================ */
const DATA = {
  en: {
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
      items: [
        {
          id: "p1", name: "Definitely Not Gonna Late!", type: "2d", typeLabel: "2D",
          date: "Jan 2025", tools: "Clip Studio Paint, Word, Canva, Excel",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Character%20designs.png", alt: "Character design sheet for the Definitely Not Gonna Late! short film cast" }
          ],
          video: "",
          pdfs: [
            { label: "Storyboard (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Chacchankotre%20-%20Storyboard.pdf" },
            { label: "Full Script (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Ch%E1%BA%AFc%20ch%E1%BA%AFn%20kh%C3%B4ng%20tr%E1%BB%85(Definitely%20not%20gonna%20late).pdf" }
          ],
          desc: "Short animation film project.",
          bullets: [
            "Created the script and shot list for the short animation film",
            "Designed characters in Clip Studio Paint",
            "Drew storyboard for the script in Clip Studio Paint and Canva"
          ]
        },
        {
          id: "p2", name: "Mana the Cute Battle Maid", type: "3d", typeLabel: "3D",
          date: "Nov 2025", tools: "ZBrush, Maya, Substance 3D Painter, Blender",
          images: [],
          video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Spin.mp4",
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
          id: "p3", name: "Reimagine Puss in Boots: The Last Wish", type: "2d", typeLabel: "2D",
          date: "Oct 2024", tools: "Clip Studio Paint",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Puss%20poses.png", alt: "Puss in Boots illustrated in multiple action poses and expressions" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Reimagine%20characters.png", alt: "Redesigned protagonist and two antagonists for Reimagine Puss in Boots" }
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
          id: "p4", name: "Regretful Colors (Sắc Màu Hối Hận)", type: "2d", typeLabel: "2D / Animation",
          date: "July 2025 – Sep 2025", tools: "Clip Studio Paint, After Effects",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%201.png", alt: "Regretful Colors film poster, version 1 — environmental awareness theme" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%202.png", alt: "Regretful Colors film poster, version 2 — environmental awareness theme" }
          ],
          video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Short%20film%20S%E1%BA%AFc%20m%C3%A0u%20h%E1%BB%91i%20h%E1%BA%ADn.mp4",
          pdfs: [],
          desc: "3-minute animated short film about environmental awareness through the creation of art.",
          bullets: [
            "Directed visual direction for the entire film",
            "Created shot list and storyboard from script",
            "Character illustrations for 2 main characters and props",
            "Composed special effect scenes with After Effects"
          ]
        },
        {
          id: "p5", name: "Green Summer 2025 — Wall Design", type: "2d", typeLabel: "2D / Mural",
          date: "Aug 2025 – Sep 2025", tools: "Photoshop, Illustrator, On-site mural painting",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6928459231212_33459fa428332fb275646e2049188a77.jpg", alt: "Finished Green Summer 2025 mural on-site, wide view" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6929085027631_01b1cc14e14c51c46d57109ec3f3724e.jpg", alt: "Finished Green Summer 2025 mural, close-up detail" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6935956433718_e2398be89586cb40938830c0ffa0d2f2.jpg", alt: "Green Summer 2025 mural painting in progress on-site" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/K%C3%8DCH%20TH%C6%AF%E1%BB%9AC%20T%C6%AF%E1%BB%9CNG%20LINH%20S%C6%A0N%202.png", alt: "Wall dimension and layout design for the Linh Son wall mural" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/T%C6%AF%E1%BB%9CNG%203%20B%E1%BB%A8C.png", alt: "Three-panel wall mural design mockup" }
          ],
          video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/6879675435854.mp4",
          pdfs: [],
          desc: "Mural design and public wall painting project for the Green Summer 2025 volunteer campaign.",
          bullets: [
            "Designed visual concepts for large-scale public wall paintings in Phổ Quang neighborhood and Van Lang University dorm",
            "Produced design mockups and wall measurement layouts for execution",
            "Coordinated on-site painting for quality control and construction"
          ]
        }
      ]
    },
    services: {
      title: "Services",
      items: [
        { icon: "✏️", title: "Character Illustration", desc: "Custom character designs, concept art, and commissions in 2D and 3D." },
        { icon: "🎨", title: "Concept Art & Design", desc: "Visual development, world-building, and character design for games and animation." },
        { icon: "🎬", title: "Storyboard & Animation", desc: "Shot lists, storyboards, and short animation production." },
        { icon: "🖼️", title: "Graphic Design", desc: "Logos, presentation slides, print designs, and merchandise." },
        { icon: "🖌️", title: "Mural & Wall Painting", desc: "On-site large-scale painting and visual coordination for public spaces." },
        { icon: "🧊", title: "3D Modeling & Sculpting", desc: "Character sculpting, retopology, texturing, rigging, and rendering." }
      ]
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Open for commissions and collaborations. Feel free to reach out!",
      items: [
        { icon: "📧", label: "Email", value: "minhthienhoang200105@gmail.com", href: "mailto:minhthienhoang200105@gmail.com" },
        { icon: "📱", label: "Phone", value: "(+84) 097 449 1598", href: "tel:+84974491598" },
        { icon: "🌐", label: "Portfolio", value: "drive.google.com/project", href: "https://drive.google.com" },
        { icon: "📍", label: "Location", value: "Ho Chi Minh City, Vietnam", href: null }
      ]
    },
    footer: "© 2026 Hoang Minh Thien. All rights reserved."
  },
  vn: {
    nav: { about: "Giới thiệu", projects: "Dự án", services: "Dịch vụ", contact: "Liên hệ" },
    about: {
      name: "Hoàng Minh Thiện",
      role: "Họa sĩ & Minh họa — 2D & 3D",
      education: {
        title: "Học vấn",
        items: [
          { name: "Đại học Văn Lang", meta: "TP. Hồ Chí Minh, Việt Nam — Tháng 9/2023 – Hiện nay", desc: "Sinh viên năm 3, GPA trung bình 3.5" },
          { name: "Học viện Green Academy", meta: "TP. Hồ Chí Minh, Việt Nam — Tháng 10/2022 – Tháng 5/2023", desc: "Tốt nghiệp chương trình Diễn họa 3D" },
          { name: "Trường THPT Chuyên Trần Đại Nghĩa", meta: "TP. Hồ Chí Minh, Việt Nam — Tháng 8/2020 – Tháng 5/2023", desc: "Tốt nghiệp loại Giỏi, GPA 3.7" }
        ]
      },
      experience: {
        title: "Kinh nghiệm làm việc",
        items: [
          { title: "Đạo diễn & Họa sĩ minh họa", meta: "Team 3T, Đại học Văn Lang — Tháng 7/2025 – Tháng 9/2025", bullets: [
            "Chịu trách nhiệm hình ảnh cho phim hoạt hình ngắn \"Sắc Màu Hối Hận\" (Regretful Colors), thời lượng 3 phút về đề tài môi trường",
            "Xây dựng danh sách phân cảnh (shot list) và kịch bản hình ảnh (storyboard) từ kịch bản văn học",
            "Thiết kế minh họa cho 2 nhân vật chính và các đạo cụ bằng Clip Studio Paint",
            "Thực hiện hậu kỳ và hiệu ứng đặc biệt bằng After Effects"
          ]},
          { title: "Trưởng nhóm Thiết kế", meta: "Chiến dịch Mùa hè xanh 2025 — Tháng 8/2025 – Tháng 9/2025", bullets: [
            "Thiết kế ý tưởng hình ảnh cho các bức tranh tường tại khu dân cư Phổ Quang và ký túc xá Đại học Văn Lang",
            "Trực tiếp điều phối tại hiện trường để quản lý chất lượng và thi công tranh vẽ"
          ]},
          { title: "Họa sĩ tự do (Freelance Artist)", meta: "Trực tuyến — 2024 – Hiện nay", bullets: [
            "Vẽ minh họa nhân vật theo yêu cầu riêng của khách hàng",
            "Thiết kế logo và áo đồng phục cho CLB Cầu lông Đại học Illinois Chicago (Hoa Kỳ)",
            "Thiết kế bài thuyết trình (slides) cho sinh viên Đại học RMIT"
          ]}
        ]
      },
      skills: {
        title: "Kỹ năng chuyên môn",
        tags: ["Maya","Blender","ZBrush","Substance 3D Painter","Photoshop","Clip Studio Paint","Illustrator","Premiere","After Effects","Thiết kế đồ họa","Tiếng Việt","Tiếng Anh (IELTS 7.0)","Tiếng Nhật (N4)"]
      }
    },
    projects: {
      title: "Dự án tiêu biểu",
      filters: { all: "Tất cả", f2d: "2D", f3d: "3D" },
      items: [
        {
          id: "p1", name: "Chắc Chắn Không Trễ!", type: "2d", typeLabel: "2D",
          date: "Tháng 1/2025", tools: "Clip Studio Paint, Word, Canva, Excel",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Character%20designs.png", alt: "Bảng thiết kế tạo hình các nhân vật trong phim Chắc Chắn Không Trễ!" }
          ],
          video: "",
          pdfs: [
            { label: "Storyboard (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Chacchankotre%20-%20Storyboard.pdf" },
            { label: "Kịch bản đầy đủ (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Ch%E1%BA%AFc%20ch%E1%BA%AFn%20kh%C3%B4ng%20tr%E1%BB%85(Definitely%20not%20gonna%20late).pdf" }
          ],
          desc: "Dự án phim hoạt hình ngắn.",
          bullets: [
            "Sáng tác kịch bản và danh sách phân cảnh cho phim hoạt hình ngắn",
            "Thiết kế tạo hình nhân vật bằng Clip Studio Paint",
            "Vẽ storyboard cho kịch bản trên Clip Studio Paint và Canva"
          ]
        },
        {
          id: "p2", name: "Mana the cute Battle Maid", type: "3d", typeLabel: "3D",
          date: "Tháng 11/2025", tools: "ZBrush, Maya, Substance 3D Painter, Blender",
          images: [],
          video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Spin.mp4",
          pdfs: [
            { label: "Quy trình thực hiện (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Process.pdf" }
          ],
          desc: "Thiết kế nhân vật 3D và quy trình sản xuất.",
          bullets: [
            "Sáng tạo concept cho nhân vật; điêu khắc trong ZBrush",
            "Tối ưu lưới (retopo), trải UV trong Maya và vẽ kết cấu trong Substance 3D Painter",
            "Gắn xương (rigging), tạo bộ đổ bóng (toon-shader) và render trong Blender"
          ]
        },
        {
          id: "p3", name: "Tái thiết kế Puss in Boots: The Last Wish", type: "2d", typeLabel: "2D",
          date: "Tháng 10/2024", tools: "Clip Studio Paint",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Puss%20poses.png", alt: "Puss in Boots với nhiều tư thế hành động và biểu cảm" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Reimagine%20characters.png", alt: "Nhân vật chính và hai nhân vật phản diện được thiết kế lại" }
          ],
          video: "",
          pdfs: [
            { label: "PDF đầy đủ", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Reimagine%20Puss%20in%20boots%20the%20last%20wish.pdf" }
          ],
          desc: "Phiên bản cá nhân hóa các nhân vật kinh điển.",
          bullets: [
            "Thiết kế lại nhân vật chính và 2 nhân vật phản diện theo phong cách cá nhân",
            "Vẽ minh họa nhân vật chính với nhiều tư thế hành động và biểu cảm"
          ]
        },
        {
          id: "p4", name: "Sắc Màu Hối Hận (Regretful Colors)", type: "2d", typeLabel: "2D / Hoạt hình",
          date: "Tháng 7/2025 – Tháng 9/2025", tools: "Clip Studio Paint, After Effects",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%201.png", alt: "Áp phích phim Sắc Màu Hối Hận, phiên bản 1 — chủ đề bảo vệ môi trường" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%202.png", alt: "Áp phích phim Sắc Màu Hối Hận, phiên bản 2 — chủ đề bảo vệ môi trường" }
          ],
          video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Short%20film%20S%E1%BA%AFc%20m%C3%A0u%20h%E1%BB%91i%20h%E1%BA%ADn.mp4",
          pdfs: [],
          desc: "Phim hoạt hình ngắn 3 phút về đề tài môi trường thông qua nghệ thuật.",
          bullets: [
            "Đạo diễn hình ảnh cho toàn bộ phim",
            "Xây dựng danh sách phân cảnh và storyboard từ kịch bản",
            "Minh họa nhân vật cho 2 nhân vật chính và đạo cụ",
            "Thực hiện hậu kỳ và hiệu ứng đặc biệt bằng After Effects"
          ]
        },
        {
          id: "p5", name: "Mùa Hè Xanh 2025 — Thiết kế Tranh tường", type: "2d", typeLabel: "2D / Tranh tường",
          date: "Tháng 8/2025 – Tháng 9/2025", tools: "Photoshop, Illustrator, Vẽ tranh tường hiện trường",
          images: [
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6928459231212_33459fa428332fb275646e2049188a77.jpg", alt: "Tranh tường Mùa Hè Xanh 2025 đã hoàn thành, góc rộng" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6929085027631_01b1cc14e14c51c46d57109ec3f3724e.jpg", alt: "Tranh tường Mùa Hè Xanh 2025, chi tiết cận cảnh" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6935956433718_e2398be89586cb40938830c0ffa0d2f2.jpg", alt: "Quá trình thi công tranh tường Mùa Hè Xanh 2025 tại hiện trường" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/K%C3%8DCH%20TH%C6%AF%E1%BB%9AC%20T%C6%AF%E1%BB%9CNG%20LINH%20S%C6%A0N%202.png", alt: "Bố cục và kích thước thiết kế tường Linh Sơn" },
            { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/T%C6%AF%E1%BB%9CNG%203%20B%E1%BB%A8C.png", alt: "Bản phác thảo thiết kế tường 3 bức" }
          ],
          video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/6879675435854.mp4",
          pdfs: [],
          desc: "Dự án thiết kế và thi công tranh tường công cộng cho chiến dịch tình nguyện Mùa hè xanh 2025.",
          bullets: [
            "Thiết kế ý tưởng hình ảnh cho các bức tranh tường quy mô lớn tại khu dân cư Phổ Quang và ký túc xá Đại học Văn Lang",
            "Thực hiện bản thiết kế và bố cục kích thước tường để thi công",
            "Trực tiếp điều phối tại hiện trường để quản lý chất lượng và thi công tranh vẽ"
          ]
        }
      ]
    },
    services: {
      title: "Dịch vụ",
      items: [
        { icon: "✏️", title: "Minh họa Nhân vật", desc: "Thiết kế nhân vật, concept art và đơn hàng tùy chỉnh 2D và 3D." },
        { icon: "🎨", title: "Concept Art & Thiết kế", desc: "Phát triển hình ảnh, xây dựng thế giới và thiết kế nhân vật cho game và hoạt hình." },
        { icon: "🎬", title: "Storyboard & Hoạt hình", desc: "Danh sách phân cảnh, storyboard và sản xuất phim hoạt hình ngắn." },
        { icon: "🖼️", title: "Thiết kế Đồ họa", desc: "Logo, slide thuyết trình, thiết kế in ấn và hàng hóa." },
        { icon: "🖌️", title: "Tranh tường & Tranh công cộng", desc: "Vẽ tranh quy mô lớn tại hiện trường và điều phối hình ảnh cho không gian công cộng." },
        { icon: "🧊", title: "Mô hình 3D & Điêu khắc", desc: "Điêu khắc nhân vật, tối ưu lưới, vẽ kết cấu, gắn xương và render." }
      ]
    },
    contact: {
      title: "Liên hệ",
      subtitle: "Nhận đơn hàng và hợp tác. Hãy liên hệ bất cứ lúc nào!",
      items: [
        { icon: "📧", label: "Email", value: "minhthienhoang200105@gmail.com", href: "mailto:minhthienhoang200105@gmail.com" },
        { icon: "📱", label: "Điện thoại", value: "(+84) 097 449 1598", href: "tel:+84974491598" },
        { icon: "🌐", label: "Portfolio", value: "drive.google.com/project", href: "https://drive.google.com" },
        { icon: "📍", label: "Địa điểm", value: "TP. Hồ Chí Minh, Việt Nam", href: null }
      ]
    },
    footer: "© 2026 Hoàng Minh Thiện. Bảo lưu mọi quyền."
  }
};

/* ================================================================
   APP LOGIC
   ================================================================ */
let currentLang = 'en';
let currentFilter = 'all';
let thumbVideoObserver = null;

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  render();
}

function setTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === filter));
  renderProjects();
}

function render() {
  const d = DATA[currentLang];

  // Nav
  document.querySelectorAll('[data-key]').forEach(el => {
    el.textContent = d.nav[el.dataset.key.replace('nav_','')];
  });

  // About
  document.getElementById('about-name').textContent = d.about.name;
  document.getElementById('about-role').textContent = d.about.role;
  document.getElementById('about-edu-title').textContent = d.about.education.title;
  document.getElementById('about-edu-body').innerHTML = d.about.education.items.map(it => `
    <div style="margin-bottom:14px">
      <div style="font-weight:600;font-size:0.98rem">${it.name}</div>
      <div class="card-meta">${it.meta}</div>
      <div class="card-text">${it.desc}</div>
    </div>
  `).join('');
  document.getElementById('about-exp-title').textContent = d.about.experience.title;
  document.getElementById('about-exp-body').innerHTML = d.about.experience.items.map(it => `
    <div style="margin-bottom:18px">
      <div style="font-weight:600;font-size:0.98rem">${it.title}</div>
      <div class="card-meta">${it.meta}</div>
      <ul class="card-list">${it.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
  `).join('');
  document.getElementById('about-skills-title').textContent = d.about.skills.title;
  document.getElementById('about-skills-body').innerHTML = d.about.skills.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Projects
  document.getElementById('projects-title').textContent = d.projects.title;
  document.getElementById('filter-all').textContent = d.projects.filters.all;
  document.getElementById('filter-2d').textContent = d.projects.filters.f2d;
  document.getElementById('filter-3d').textContent = d.projects.filters.f3d;
  renderProjects();

  // Services
  document.getElementById('services-title').textContent = d.services.title;
  document.getElementById('services-grid').innerHTML = d.services.items.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <div class="service-title">${s.title}</div>
      <div class="service-desc">${s.desc}</div>
    </div>
  `).join('');

  // Contact
  document.getElementById('contact-title').textContent = d.contact.title;
  document.getElementById('contact-subtitle').textContent = d.contact.subtitle;
  document.getElementById('contact-body').innerHTML = d.contact.items.map(c => `
    <div class="contact-row">
      <div class="contact-icon">${c.icon}</div>
      <div>
        <div class="contact-label">${c.label}</div>
        ${c.href ? `<a class="contact-value" href="${c.href}" target="${c.href.startsWith('http')?'_blank':'_self'}" rel="noopener">${c.value}</a>` : `<div class="contact-value">${c.value}</div>`}
      </div>
    </div>
  `).join('');

  // Footer
  document.getElementById('footer-text').textContent = d.footer;
}

function renderProjects() {
  const d = DATA[currentLang];
  const items = d.projects.items.filter(p => currentFilter === 'all' || p.type === currentFilter);
  document.getElementById('projects-grid').innerHTML = items.map(p => {
    let thumb;
    if (p.images && p.images.length) {
      thumb = `<img src="${p.images[0].src}" alt="${p.images[0].alt}" loading="lazy" decoding="async">`;
    } else if (p.video) {
      thumb = `<video data-src="${p.video}" class="thumb-video" muted loop playsinline preload="none"></video>`;
    } else {
      thumb = `<div class="placeholder">${p.name[0]}</div>`;
    }
    return `
    <div class="project-card" onclick="openModal('${p.id}')">
      <div class="project-thumb">${thumb}</div>
      <div class="project-info">
        <div class="project-name">${p.name}</div>
        <div class="project-type">${p.typeLabel} · ${p.date}</div>
      </div>
    </div>
  `;
  }).join('');
  initLazyThumbVideos();
}

// Only fetch/play thumbnail preview videos once their card actually scrolls into view.
function initLazyThumbVideos() {
  const videos = document.querySelectorAll('#projects-grid video.thumb-video');
  if (thumbVideoObserver) thumbVideoObserver.disconnect();
  if (!('IntersectionObserver' in window)) {
    videos.forEach(v => { v.src = v.dataset.src; v.play().catch(() => {}); });
    return;
  }
  thumbVideoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { rootMargin: '100px', threshold: 0.15 });
  videos.forEach(v => thumbVideoObserver.observe(v));
}

function openModal(projectId) {
  const d = DATA[currentLang];
  const p = d.projects.items.find(x => x.id === projectId);
  if (!p) return;
  document.getElementById('modal-title').textContent = p.name;

  let mediaHtml = '';
  const images = p.images || [];
  if (images.length === 1) {
    mediaHtml += `<img class="modal-img" src="${images[0].src}" alt="${images[0].alt}" decoding="async">`;
  } else if (images.length > 1) {
    mediaHtml += `<div class="modal-gallery">${images.map(img => `<img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async">`).join('')}</div>`;
  }
  if (p.video) {
    mediaHtml += `<video class="modal-video" src="${p.video}" controls preload="metadata"></video>`;
  }
  document.getElementById('modal-media').innerHTML = mediaHtml;

  const pdfHtml = (p.pdfs && p.pdfs.length)
    ? `<div class="pdf-links">${p.pdfs.map(f => `<a class="pdf-link" href="${f.url}" target="_blank" rel="noopener">📄 ${f.label}</a>`).join('')}</div>`
    : '';

  document.getElementById('modal-desc').innerHTML = `
    <div class="tags" style="margin-bottom:10px">
      <span class="tag type-${p.type}">${p.typeLabel}</span>
      <span class="tag secondary">${p.date}</span>
      <span class="tag secondary">${p.tools}</span>
    </div>
    <p>${p.desc}</p>
    <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    ${pdfHtml}
  `;
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  const modalVideo = document.querySelector('#modal-media video');
  if (modalVideo) modalVideo.pause();
}

// Theme is resolved once (stored choice, else OS preference) by the inline
// script in <head> before this file even loads — this just reflects that
// state in the toggle button and lets clicks flip it.
function updateThemeToggleUi() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('theme-toggle');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  updateThemeToggleUi();
}

// Event listeners
document.querySelectorAll('.nav-btn').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => setFilter(c.dataset.filter)));
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === document.getElementById('modal-overlay')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Init
updateThemeToggleUi();
render();
