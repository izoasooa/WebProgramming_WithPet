const videos = [
  { src: "https://www.youtube.com/embed/MUAvchijfEU", desc: "강아지가 밤에 우는 이유" },
  { src: "https://www.youtube.com/embed/1TSykK48zD8", desc: "강아지의 꼬리 흔들기" },
  { src: "https://www.youtube.com/embed/v1nkM43QRAk", desc: "강아지가 만지면 싫어하는 부위" },
  { src: "https://www.youtube.com/embed/rqKQphyQn-c", desc: "강아지의 사춘기" },
  { src: "https://www.youtube.com/embed/ZKqPZooRchk", desc: "치료가 필요한 강아지의 문제 행동" },
  { src: "https://www.youtube.com/embed/4XD_xAfHd3M", desc: "강아지가 싫어하는 사람의 행동" },
  { src: "https://www.youtube.com/embed/9DfjPlLLRGA", desc: "강아지의 마음" }
];

let currentPage = 0;
const perPage = 4;
const section = document.getElementById("video-section");
const pageIndicator = document.getElementById("pageIndicator");

function renderVideos() {
  section.innerHTML = "";
  const start = currentPage * perPage;
  const currentVideos = videos.slice(start, start + perPage);

  currentVideos.forEach((v) => {
    const box = document.createElement("div");
    box.className = "video-box";

    box.innerHTML = `
      <iframe src="${v.src}" allowfullscreen></iframe>
      <div class="description">${v.desc}</div>
    `;
    section.appendChild(box);
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

renderVideos();

