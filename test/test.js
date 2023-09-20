const body = document.querySelector("body");
const popUp = document.querySelector(".pop-up");

body.addEventListener("click", () => {
  body.classList.toggle("clicked");
  createBalloons();
});

function createBalloons() {
  const numBalloons = 50; // Number of balloons to create
  const minSize = 20; // Minimum size of balloons
  const maxSize = 80; // Maximum size of balloons

  for (let i = 0; i < numBalloons; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.top = `${Math.random() * 100}vh`;
    const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size}px`;
    balloon.style.animationDuration = `${Math.random() * 5 + 3}s`;
    body.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 3000);
  }
}
