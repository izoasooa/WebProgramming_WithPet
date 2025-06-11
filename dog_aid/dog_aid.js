function toggleContent(box) {
  const allBoxes = document.querySelectorAll('.text-box');
  allBoxes.forEach(b => {
    if (b !== box) b.classList.remove('active');
  });

  box.classList.toggle('active');
}

const videos = [
  "https://www.youtube.com/embed/92EByzD_Dt4",
  "https://www.youtube.com/embed/R7gB825qZzM",
  "https://www.youtube.com/embed/kJOQuXUhsdw",
  "https://www.youtube.com/embed/emsYg5ZVOR0",
  "https://www.youtube.com/embed/on8dJGMPMM0",
  "https://www.youtube.com/embed/4f1QGu_7utw",
  "https://www.youtube.com/embed/O0PjNgvgGGc",
  "https://www.youtube.com/embed/o9kmmzaXGjc",
  "https://www.youtube.com/embed/zB7WV3fjaYA"
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

