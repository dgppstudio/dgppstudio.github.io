const slider = document.querySelector('.compare-slider');
const after = slider.querySelector('.img-after-wrapper');
const handle = slider.querySelector('.slider-handle');

let isDragging = false;

function updateSlider(x){
  const rect = slider.getBoundingClientRect();

  x = Math.max(0, Math.min(x - rect.left, rect.width));

  const percent = (x / rect.width) * 100;

  after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  handle.style.left = percent + '%';
}

/* mouse */
slider.addEventListener('mousedown', () => {
  isDragging = true;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('mousemove', (e) => {
  if(!isDragging) return;
  updateSlider(e.clientX);
});

/* touch */
slider.addEventListener('touchstart', () => {
  isDragging = true;
});

window.addEventListener('touchend', () => {
  isDragging = false;
});

window.addEventListener('touchmove', (e) => {
  if(!isDragging) return;
  updateSlider(e.touches[0].clientX);
});
