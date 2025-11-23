// Small tap animation for mobile
document.querySelectorAll(".image-btn img").forEach(img => {
    img.addEventListener("touchstart", () => {
        img.style.transform = "scale(0.96)";
    });

    img.addEventListener("touchend", () => {
        img.style.transform = "scale(1)";
    });
});
