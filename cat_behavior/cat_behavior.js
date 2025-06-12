const videos = [
  { src: "https://www.youtube.com/embed/FJ8InmwM448", desc: "고양이의 주요행동 언어" },
  { src: "https://www.youtube.com/embed/GyVtSkuedEE", desc: "고양이가 잘 때 건들면 안 되는 이유" },
  { src: "https://www.youtube.com/embed/USRvBWSohe8", desc: "마음에 상처를 입은 고양이" },
  { src: "https://www.youtube.com/embed/Sssx7Jz_IHg", desc: "고양이가 놀지 않는 이유" },
  { src: "https://www.youtube.com/embed/DiCI0FguAtk", desc: "고양이 마음 알아차리기" },
  { src: "https://www.youtube.com/embed/yrRl3qHaRaQ", desc: "고양이의 꾹꾹이 행동의 이유" },
  { src: "https://www.youtube.com/embed/BRRCQOa-jQs", desc: "고양이가 갑자기 무는 이유" }
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
