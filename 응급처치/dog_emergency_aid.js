document.querySelectorAll(".text-box").forEach((box) => {
  box.addEventListener("click", () => {
    const id = box.getAttribute("data-detail");
    const detailBox = document.getElementById(`detail-${id}`);

    // 모든 detail-content 숨기기
    document.querySelectorAll(".detail-content").forEach((el) => {
      el.classList.remove("active");
    });

    // 이미 열려있던 걸 다시 클릭하면 닫기
    if (detailBox.classList.contains("active")) {
      detailBox.classList.remove("active");
    } else {
      detailBox.classList.add("active");
    }
  });
});

// 비디오 슬라이드
const videos = [
  "https://www.youtube.com/embed/92EByzD_Dt4",
  "https://www.youtube.com/embed/R7gB825qZzM",
  "https://www.youtube.com/embed/kJOQuXUhsdw",
  "https://www.youtube.com/embed/emsYg5ZVOR0",
  "https://www.youtube.com/embed/on8dJGMPMM0",
  "https://www.youtube.com/embed/4f1QGu_7utw",
  "https://www.youtube.com/embed/O0PjNgvgGGc",
  "https://www.youtube.com/embed/O0PjNgvgGGc"
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
  if ((currentPage + 1) * perPage < videos.length) {
    currentPage++;
    renderVideos();
  }
});

renderVideos();
