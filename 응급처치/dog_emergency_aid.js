function toggleContent(box) {
  const content = box.querySelector('.content');
  if (content) {
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  }
}

let currentSlide = 0;
const slides = document.querySelectorAll('.video-slide');
const pageIndicator = document.querySelector('.page-indicator');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.add('hidden');
    if (i === index) {
      slide.classList.remove('hidden');
    }
  });
  pageIndicator.textContent = `${index + 1} / ${slides.length}`;
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});
