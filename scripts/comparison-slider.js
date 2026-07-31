function initComparisonSlider() {

    const slider = document.querySelector(".compare-slider");
    const wrapper = document.querySelector(".img-after-wrapper");
    const handle = document.querySelector(".slider-handle");

    if (!slider || !wrapper || !handle) return;

    function updateSlider(clientX) {

        const rect = slider.getBoundingClientRect();

        let position = clientX - rect.left;

        position = Math.max(0, Math.min(position, rect.width));

        const percentage = (position / rect.width) * 100;

        wrapper.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    }

    let dragging = false;

    handle.addEventListener("pointerdown", (event) => {
        dragging = true;
        handle.setPointerCapture(event.pointerId);
        updateSlider(event.clientX);
    });

    handle.addEventListener("pointermove", (event) => {
        if (!dragging) return;

        updateSlider(event.clientX);
    });

    handle.addEventListener("pointerup", () => {
        dragging = false;
    });

    handle.addEventListener("pointercancel", () => {
        dragging = false;
    });

}

initComparisonSlider();