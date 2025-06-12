document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.info-box.bullet-list a[href^="#"]');
  const sections = document.querySelectorAll(".info-box-card");

  function activateSection(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      // 기존 active 제거
      sections.forEach(section => section.classList.remove("active"));
      // 클릭된 박스에 active 클래스 추가
      target.classList.add("active");
    }
  }

  // 목차 링크 클릭 시
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      activateSection(targetId);
    });
  });

  // 각 info-box-card 클릭 시 자기 자신을 강조
  sections.forEach(section => {
    section.addEventListener("click", function () {
      activateSection(this.id);
    });
  });
});
