// Adds a quick shrinking tap animation on mobile
document.querySelectorAll(".tt-btn").forEach(btn => {
    btn.addEventListener("touchstart", () => {
        btn.style.transform = "scale(0.97)";
    });

    btn.addEventListener("touchend", () => {
        btn.style.transform = "scale(1)";
    });
});
