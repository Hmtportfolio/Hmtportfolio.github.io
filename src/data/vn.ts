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
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Poster.web.webp", alt: "Áp phích dự án Chroma" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/1ModelProta.web.webp", alt: "Chroma — Tạo hình 3D nhân vật chính" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/2ModelAnta.web.webp", alt: "Chroma — Tạo hình 3D nhân vật phản diện" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/3Thegioigoc1.web.webp", alt: "Chroma — Thiết kế thế giới và phối cảnh môi trường góc 1" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/4.web.webp", alt: "Chroma — Concept nghệ thuật môi trường" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/5thegioigoc3.web.webp", alt: "Chroma — Thiết kế thế giới và phối cảnh môi trường góc 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots1.web.webp", alt: "Chroma — Phân cảnh diễn họa chính 1" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots2.web.webp", alt: "Chroma — Phân cảnh diễn họa chính 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots3.web.webp", alt: "Chroma — Phân cảnh diễn họa chính 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Other%20images/Responsibleshots4.web.webp", alt: "Chroma — Phân cảnh diễn họa chính 4" }
    ],
    videoFirst: true,
    video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Trailer%20CHROMA_nh%C3%B3m%202.mp4",
    pdfs: [
      { label: "Game Design Document (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Game%20design%20document_CHROMA.pdf" }
    ],
    desc: "Chroma là một đoạn trailer demo cho dự án game do mình và nhóm bạn (5 người) cùng thực hiện.",
    contributionsLabel: "Các vai trò chính của mình:",
    bullets: [
      "Xây dựng Thế giới & Thiết kế: Chịu trách nhiệm viết cốt truyện (lore) và phát triển phong cách hình ảnh cho môi trường chính (Thành phố lớn).",
      "Tạo hình Nhân vật: Thực hiện modeling (cho chú chuột chính diện và rắn tím phản diện) và rigging cho toàn bộ nhân vật bằng công cụ Rigify.",
      "Kỹ thuật Shader: Nghiên cứu và phát triển shader theo phong cách stylized (lấy cảm hứng từ game Guilty Gear) để tạo nên diện mạo đồ họa độc đáo cho dự án.",
      "Diễn họa & Hình ảnh (Cinematics): Hỗ trợ xây dựng storyboard và trực tiếp diễn họa các phân cảnh quan trọng, tiêu biểu là cảnh xuất hiện của trùm cuối. Mình cũng đảm nhận toàn bộ việc đặt góc máy, ánh sáng và làm hiệu ứng trong các shot này (VFX).",
      "Giám sát Diễn họa: Giữ vai trò giám sát diễn họa, hỗ trợ kỹ thuật và phản hồi chuyên môn để đảm bảo chất lượng chuyển động đồng nhất cho toàn bộ trailer."
    ]
  },
  {
    id: "p2",
    name: "Mana the cute Battle Maid",
    type: "3d",
    typeLabel: "3D",
    date: "Tháng 11/2025",
    tools: "ZBrush, Maya, Substance 3D Painter, Blender",
    thumbnail: "/thumbnails/mana.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Idoru3.web.webp", alt: "Mana the Cute Battle Maid — dáng đứng yên" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Okoru3.web.webp", alt: "Mana the Cute Battle Maid — dáng giận dữ" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Zako3.web.webp", alt: "Mana the Cute Battle Maid — dáng lính lâu la" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/chill.web.webp", alt: "Mana the Cute Battle Maid — dáng thư giãn" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_02.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_03.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_04.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 4" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_05.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 5" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_06.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 6" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_07.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 7" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_08.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 8" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_09.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 9" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Other%20images/Process_Page_10.web.webp", alt: "Mana the Cute Battle Maid — Quy trình sản xuất trang 10" }
    ],
    video: [
      "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/final.mp4",
      "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Mana%20the%20cute%20Battle%20Maid/Spin.mp4"
    ],
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
    id: "p5",
    name: "Mùa Hè Xanh 2025 — Thiết kế Tranh tường",
    type: "2d",
    typeLabel: "2D / Tranh tường",
    date: "Tháng 8/2025 – Tháng 9/2025",
    tools: "Photoshop, Illustrator, Vẽ tranh tường hiện trường",
    thumbnail: "/thumbnails/green-summer.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6928459231212_33459fa428332fb275646e2049188a77.web.webp", alt: "Tranh tường Mùa Hè Xanh 2025 đã hoàn thành, góc rộng" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6929085027631_01b1cc14e14c51c46d57109ec3f3724e.web.webp", alt: "Tranh tường Mùa Hè Xanh 2025, chi tiết cận cảnh" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/z6935956433718_e2398be89586cb40938830c0ffa0d2f2.web.webp", alt: "Quá trình thi công tranh tường Mùa Hè Xanh 2025 tại hiện trường" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/K%C3%8DCH%20TH%C6%AF%E1%BB%9AC%20T%C6%AF%E1%BB%9CNG%20LINH%20S%C6%A0N%202.web.webp", alt: "Bố cục và kích thước thiết kế tường Linh Sơn" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/T%C6%AF%E1%BB%9CNG%203%20B%E1%BB%A8C.web.webp", alt: "Bản phác thảo thiết kế tường 3 bức" }
    ],
    video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/Green%20Summer%202025%20(MHX)%20Wall%20design/6879675435854.mp4",
    pdfs: [],
    desc: "Dự án thiết kế và thi công tranh tường công cộng cho chiến dịch tình nguyện Mùa hè xanh 2025.",
    bullets: [
      "Thiết kế ý tưởng hình ảnh cho các bức tranh tường quy mô lớn tại khu dân cư Phổ Quang và ký túc xá Đại học Văn Lang",
      "Thực hiện bản thiết kế và bố cục kích thước tường để thi công",
      "Trực tiếp điều phối tại hiện trường để quản lý chất lượng và thi công tranh vẽ"
    ]
  },
  {
    id: "p4",
    name: "Sắc Màu Hối Hận (Regretful Colors)",
    type: "2d",
    typeLabel: "2D / Hoạt hình",
    date: "Tháng 7/2025 – Tháng 9/2025",
    tools: "Clip Studio Paint, After Effects",
    thumbnail: "/thumbnails/regretful-colors.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%201.web.webp", alt: "Áp phích phim Sắc Màu Hối Hận, phiên bản 1 — chủ đề bảo vệ môi trường" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Poster%202.web.webp", alt: "Áp phích phim Sắc Màu Hối Hận, phiên bản 2 — chủ đề bảo vệ môi trường" }
    ],
    video: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Short%20film%20S%E1%BA%AFc%20m%C3%A0u%20h%E1%BB%91i%20h%E1%BA%ADn.mp4",
    pdfs: [
      { label: "Storyboard (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Behind%20the%20scene/Storyboard.pdf" }
    ],
    desc: "Phim hoạt hình ngắn 3 phút về đề tài môi trường thông qua nghệ thuật.",
    bullets: [
      "Đạo diễn hình ảnh cho toàn bộ phim",
      "Xây dựng danh sách phân cảnh và storyboard từ kịch bản",
      "Minh họa nhân vật cho 2 nhân vật chính và đạo cụ",
      "Thực hiện hậu kỳ và hiệu ứng đặc biệt bằng After Effects"
    ]
  },
  {
    id: "p1",
    name: "Chắc Chắn Không Trễ!",
    type: "2d",
    typeLabel: "2D",
    date: "Tháng 1/2025",
    tools: "Clip Studio Paint, Word, Canva, Excel",
    thumbnail: "/thumbnails/definitely-not-late.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Character%20designs.web.webp", alt: "Bảng thiết kế tạo hình các nhân vật trong phim Chắc Chắn Không Trễ!" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_02.web.webp", alt: "Chắc Chắn Không Trễ! — Storyboard trang 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_03.web.webp", alt: "Chắc Chắn Không Trễ! — Storyboard trang 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_09.web.webp", alt: "Chắc Chắn Không Trễ! — Storyboard trang 9" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Cha%CC%86%CC%81c%20cha%CC%86%CC%81n%20kho%CC%82ng%20tre%CC%82%CC%83(Definitely%20not%20gonna%20late)_Page_10.web.webp", alt: "Chắc Chắn Không Trễ! — Storyboard trang 10" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview1.web.webp", alt: "Chắc Chắn Không Trễ! — Trích đoạn diễn họa 1" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview2.web.webp", alt: "Chắc Chắn Không Trễ! — Trích đoạn diễn họa 2" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview3.web.webp", alt: "Chắc Chắn Không Trễ! — Trích đoạn diễn họa 3" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Other%20images/Preview4.web.webp", alt: "Chắc Chắn Không Trễ! — Trích đoạn diễn họa 4" }
    ],
    video: "",
    pdfs: [
      { label: "Storyboard (PDF)", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Chacchankotre%20-%20Storyboard.pdf" },
      { label: "Pitch deck", url: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Definitely%20not%20gonna%20late!%20(Chac%20chan%20khong%20tre)/Ch%E1%BA%AFc%20ch%E1%BA%AFn%20kh%C3%B4ng%20tr%E1%BB%85(Definitely%20not%20gonna%20late).pdf" }
    ],
    desc: "Dự án phim hoạt hình ngắn.",
    bullets: [
      "Sáng tác kịch bản và danh sách phân cảnh cho phim hoạt hình ngắn",
      "Thiết kế tạo hình nhân vật bằng Clip Studio Paint",
      "Vẽ storyboard cho kịch bản trên Clip Studio Paint và Canva"
    ]
  },
  {
    id: "p3",
    name: "Tái thiết kế Puss in Boots: The Last Wish",
    type: "2d",
    typeLabel: "2D",
    date: "Tháng 10/2024",
    tools: "Clip Studio Paint",
    thumbnail: "/thumbnails/puss-in-boots.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Puss%20poses.web.webp", alt: "Puss in Boots với nhiều tư thế hành động và biểu cảm" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Reimagine%20characters.web.webp", alt: "Nhân vật chính và hai nhân vật phản diện được thiết kế lại" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_10.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 10" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_11.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 11" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_12.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 12" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_13.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 13" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_14.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 14" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_15.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 15" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_16.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 16" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_17.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 17" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_18.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 18" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_19.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 19" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_20.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 20" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_21.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 21" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_22.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 22" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_23.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 23" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_24.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 24" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_25.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 25" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_26.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 26" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_27.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 27" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_28.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 28" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_29.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 29" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_30.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 30" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_31.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 31" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_33.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 33" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_34.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 34" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_35.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 35" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_36.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 36" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_37.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 37" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Reimagine%20Puss%20in%20Boots%20The%20Last%20Wish/Other%20images/TA%CC%A3O%20HI%CC%80NH%20III_Page_38.web.webp", alt: "Tái thiết kế Puss in Boots — Bản vẽ concept trang 38" }
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
    id: "p6",
    name: "Illustration Works",
    type: "2d",
    typeLabel: "2D / Minh họa",
    date: "2024 – 2025",
    tools: "Clip Studio Paint",
    thumbnail: "/thumbnails/illustration-works.webp",
    images: [
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/AODtease.web.webp", alt: "Minh họa nhóm ba nhân vật trong tư thế vui tươi, tông màu pastel" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/ditri.web.webp", alt: "Thiết kế nhân vật tai quỷ trong trang phục vest, kèm phác thảo biểu cảm và tư thế" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/fall2.web.webp", alt: "Cô gái vươn tay lên bầu trời giữa mây cùng một chú chim nhỏ, tư thế động" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/frieren%20love.web.webp", alt: "Fan art Frieren — pháp sư elf bay lượn trên cánh đồng hoa xanh, tay cầm gậy phép" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/isometric.web.webp", alt: "Minh họa isometric phòng ngủ ấm cúng với bàn làm việc, giường, kệ sách và TV" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/tong.web.webp", alt: "Bảng tổng hợp tranh minh họa sáng tạo" },
      { src: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Illustration%20Works/phoenix.web.webp", alt: "Tranh chân dung bán tả một người đàn ông mặc vest đỏ và thắt cà vạt" }
    ],
    video: "",
    pdfs: [],
    desc: "Bộ sưu tập các tác phẩm minh họa cá nhân khám phá nhiều phong cách, nhân vật và chủ đề khác nhau.",
    bullets: [
      "Minh họa nhân vật cá nhân và fan art đa dạng phong cách",
      "Các tác phẩm chibi, chân dung bán tả và bối cảnh isometric",
      "Bài tập sáng tác cá nhân khám phá màu sắc, ánh sáng và bố cục"
    ]
  }
];

export const vnProjects: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));

export const vnData = {
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
    items: vnProjects
  },
  services: {
    title: "Dịch vụ",
    items: [
      { icon: "✏️", title: "Minh họa Nhân vật", desc: "Thiết kế nhân vật, concept art và đơn hàng tùy chỉnh 2D và 3D." },
      { icon: "🎨", title: "Concept Art & Thiết kế", desc: "Phát triển hình ảnh, xây dựng thế giới và thiết kế nhân vật cho game và hoạt hình." },
      { icon: "🎬", title: "Storyboard & Hoạt hình", desc: "Danh sách phân cảnh, storyboard và sản xuất phim hoạt hình ngắn." },
      { icon: "🖼️", title: "Thiết kế Đồ họa", desc: "Logo, slide thuyết trình, thiết kế in ấn và hàng hóa." },
      { icon: "🧊", title: "Mô hình 3D & Điêu khắc", desc: "Điêu khắc nhân vật, tối ưu lưới, vẽ kết cấu, gắn xương và render." }
    ]
  },
  contact: {
    title: "Liên hệ",
    subtitle: "Nhận đơn hàng và hợp tác. Hãy liên hệ bất cứ lúc nào!",
    items: [
      { icon: "📧", label: "Email", value: "minhthienhoang200105@gmail.com", href: "mailto:minhthienhoang200105@gmail.com" },
      { icon: "📱", label: "Điện thoại", value: "(+84) 097 449 1598", href: "tel:+84974491598" },
      { icon: "📍", label: "Địa điểm", value: "TP. Hồ Chí Minh, Việt Nam", href: null },
      { iconImage: "https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Google_Drive_icon_(2020).svg.webp", label: "Tệp Portfolio", value: "Xem toàn bộ portfolio", href: "https://drive.google.com/drive/folders/1bnK9ktQCQus31J89DU4QwwlBZ0woXQ7k?usp=sharing" }
    ]
  },
  footer: "© 2026 Hoàng Minh Thiện. Bảo lưu mọi quyền."
};
