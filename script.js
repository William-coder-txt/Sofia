const slides = [
  {
    image: "images/photo-1.jpg",
    title: "Наша первая прогулка по лесу",
    text: "Эта фотка напоминает мне, как легко нам быть вместе — даже в самых простых днях есть особенное тепло.😘",
  },
  {
    type: "video",
    video: "videos/video-1.mp4",
    poster: "images/video-poster-1.jpg",
    title: "Прогулка под линвем",
    text: "Когда я смотрю на это видео, я будто снова попадаю туда и чувствую твое тепло.🌧️",
  },
  {
    image: "images/photo-2.jpg",
    title: "Речка",
    text: "Тут мы тусовалсиь первые проуглки.🌊",
  },
  {
    image: "images/photo-3.jpg",
    title: "Когда ты рядом",
    text: "Там, где ты, всё будто замедляется и становится спокойнее.⛪",
  },
  {
    type: "video",
    video: "videos/video-2.mp4",
    poster: "images/video-poster-2.jpg",
    title: "Одна из последних наших встреч",
    text: "Каждое мгновение с тобой становится бесценным, и я хочу сохранить их в памяти навсегда.❤️",
  },
  {
    image: "images/photo-4.jpg",
    title: "Поцелуйчик",
    text: "В этот момент я понимаю, что счастье — это просто быть рядом с тобой и чувствовать твою любовь.💋",
  },
  {
    image: "images/photo-5.jpg",
    title: "Ножки",
    text: "Когда я нес тебя на плечах и смотрел на твои маленькие ножки, я понял, что хочу быть рядом с тобой всегда.😁",
  },
  {
    type: "video",
    video: "videos/video-3.mp4",
    poster: "images/video-poster-3.jpg",
    title: "Последняя прогулка по лесу",
    text: "Это видео напоминает мне о том, как важно ценить каждый момент вместе и как много радости ты приносишь в мою жизнь.🌲",
  },
  {
    image: "images/photo-6.jpg",
    title: "Алексей и маленький букетик",
    text: "Я очень устал пока его делал,но оно того стоило.💐🧸",
  },
  {
    image: "images/photo-7.jpg",
    title: "Месяц в общаге",
    text: "Отлично отметили.🍷",
  },
  {
    type: "video",
    video: "videos/video-4.mp4",
    poster: "images/video-poster-4.jpg",
    title: "Идем по полю",
    text: "А это как раз моментик с поля.🌾",
  },
  {
    image: "images/photo-9.jpg",
    title: "День когда ты уехала",
    text: "Я помню этот день, как будто он был вчера. Твоя улыбка и тепло остаются со мной, даже когда мы далеко друг от друга.😊",
  },
  {
    image: "images/photo-10.jpg",
    title: "Резиночка",
    text: "Твой маленький,но очень ценный подарок.💕",
  },
  {
    type: "video",
    video: "videos/video-5.mp4",
    poster: "images/video-poster-5.jpg",
    title: "Я дурной",
    text: "Это было круто.👍",
  },
  {
    type: "video",
    video: "videos/video-6.mp4",
    poster: "images/video-poster-6.jpg",
    title: "Ночевка у Евгения",
    text: "Самая пиздатя ночевка. Очень не хватает тебя рядом.❤️",
  },
  {
    type: "video",
    video: "videos/video-7.mp4",
    poster: "images/video-poster-7.jpg",
    title: "Вкусняшки",
    text: "Маленькая коробочка с вкусняшками.😋",
  },
];

const photo = document.querySelector("#photo");
const mediaFrame = document.querySelector(".photo-frame");
const title = document.querySelector("#slide-title");
const text = document.querySelector("#slide-text");
const counter = document.querySelector("#counter");
const dots = document.querySelector("#dots");
const prevButton = document.querySelector(".nav-button--prev");
const nextButton = document.querySelector(".nav-button--next");
const themeToggle = document.querySelector("#theme-toggle");

let currentSlide = 0;
let gestureStartX = 0;
let isDragging = false;

function createDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Открыть фото ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dots.appendChild(dot);
  });
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  photo.innerHTML = "";
  photo.style.removeProperty("--photo");

  if (slide.type === "video") {
    const video = document.createElement("video");
    video.src = slide.video;
    video.poster = slide.poster;
    video.controls = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "metadata";
    video.autoplay = true;
    video.volume = 1;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    photo.appendChild(video);

    const startVideo = () => {
      video.play().catch(() => {});
    };

    requestAnimationFrame(startVideo);
    document.addEventListener("pointerdown", startVideo, { once: true });
    document.addEventListener("touchstart", startVideo, { once: true });
  } else {
    photo.style.setProperty("--photo", `url("${slide.image}")`);
  }

  title.textContent = slide.title;
  text.textContent = slide.text;
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;

  document.querySelectorAll(".dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") prevSlide();
  if (event.key === "ArrowRight") nextSlide();
});

function handleGesture(endX) {
  if (!isDragging) return;

  const distance = endX - gestureStartX;
  if (Math.abs(distance) < 50) {
    isDragging = false;
    mediaFrame.classList.remove("is-dragging");
    return;
  }

  if (distance > 0) {
    prevSlide();
  } else {
    nextSlide();
  }

  isDragging = false;
  mediaFrame.classList.remove("is-dragging");
}

mediaFrame.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  gestureStartX = event.clientX;
  isDragging = true;
  mediaFrame.classList.add("is-dragging");
});

mediaFrame.addEventListener("touchstart", (event) => {
  gestureStartX = event.changedTouches[0].clientX;
  isDragging = true;
  mediaFrame.classList.add("is-dragging");
});

document.addEventListener("pointerup", (event) => {
  handleGesture(event.clientX);
});

document.addEventListener("touchend", (event) => {
  handleGesture(event.changedTouches[0].clientX);
});

document.addEventListener("pointercancel", () => {
  isDragging = false;
  mediaFrame.classList.remove("is-dragging");
});

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
  );
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

createDots();
showSlide(0);
applyTheme(initialTheme);
