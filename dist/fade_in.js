window.onload = function () {
  const body = document.querySelector("body");

  // Make the body visible after a short delay (optional, adjust as needed)
  setTimeout(() => {
    body.classList.remove("opacity-0");
    body.classList.add("opacity-100");

    // Then start fading in images
    const photos = document.querySelectorAll("img");
    let delay = 0;
    photos.forEach((photo) => {
      setTimeout(() => {
        photo.classList.remove("opacity-0");
        photo.classList.add("opacity-100");
      }, delay);
      delay += 100;
    });
  }, 2000); // delay after full load before starting fade-ins
};


/* document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  body.classList.remove("opacity-0");
  body.classList.add("opacity-100");
  const photos = document.querySelectorAll("img");
  let delay = 0;
  photos.forEach((photo) => {
    setTimeout(() => {
      photo.classList.remove("opacity-0");
      photo.classList.add("opacity-100");
    }, delay);
    delay += 100;
  });
}); */
