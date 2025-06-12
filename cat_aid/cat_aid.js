function toggleContent(box) {
  const allBoxes = document.querySelectorAll('.text-box');
  allBoxes.forEach(b => {
    if (b !== box) b.classList.remove('active');
  });

  box.classList.toggle('active');
}

const videos = [
  "https://www.youtube.com/embed/xaajtx7YObI",
  "https://www.youtube.com/embed/zw4rUvs3FLs",
  "https://www.youtube.com/embed/RyaQFX1Pe0c",
  "https://www.youtube.com/embed/B2u4BirFwQg",
  "https://www.youtube.com/embed/TAVmeVbGMV4",
  "https://www.youtube.com/embed/nZDeO7Xgs1o",
  "https://www.youtube.com/embed/Sga_gd2P6Tc"
];

let currentPage = 0;
const perPage = 3;
const section = document.getElementById("video-section");
const pageIndicator = document.getElementById("pageIndicator");

function renderVideos() {
  section.innerHTML = "";
  const start = currentPage * perPage;
  const end = start + perPage;
  const currentVideos = videos.slice(start, end);

  currentVideos.forEach((src) => {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    section.appendChild(iframe);
  });

  const totalPages = Math.ceil(videos.length / perPage);
  pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderVideos();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(videos.length / perPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderVideos();
  }
});

// 페이지 로드시 초기 렌더링
renderVideos();
