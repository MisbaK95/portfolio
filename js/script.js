document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // Navbar Active on Scroll
  // =======================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });

    // Navbar shadow
    document.querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });


  // =======================
  // Scroll Reveal
  // =======================
  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  });


  // =======================
  // Project Click Logic
  // =======================
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.dataset.link;
      const category = card.dataset.category;

      if (category === "ui-ux") {
        window.location.href = link; // case study
      } else {
        window.open(link, "_blank"); // demo/github
      }
    });
  });


  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");
  const showMoreBtn = document.getElementById("showMoreBtn");

  let activeFilter = "all";
  let expanded = false;

  // get first project per category
  function getOnePerCategory() {
    const selected = {
      "ui-ux": false,
      "fullstack": false,
      "ml": false
    };

    projects.forEach(card => {
      const cat = card.dataset.category;

      if (!selected[cat]) {
        card.classList.remove("hide");
        selected[cat] = true;
      } else {
        card.classList.add("hide");
      }
    });
  }

  // show all in category
  function showCategory(category) {
    projects.forEach(card => {
      if (card.dataset.category === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  }

  // ALL VIEW
  function showAllView() {
    if (!expanded) {
      getOnePerCategory(); // 🔥 ONLY ONE PER CATEGORY
    } else {
      projects.forEach(p => p.classList.remove("hide"));
    }
  }

  // render
  function render() {

    if (activeFilter === "all") {
      showAllView();
      showMoreBtn.style.display = expanded ? "none" : "block";
    } else {
      showCategory(activeFilter);
      showMoreBtn.style.display = "none";
    }
  }

  // FILTER BUTTONS
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = btn.dataset.filter;
      expanded = false;

      render();
    });
  });

  // SHOW MORE
  showMoreBtn.addEventListener("click", () => {
    expanded = true;
    render();
  });

  // INIT
  render();


  // =======================
  // Typing Effect
  // =======================
  const texts = [
    "UI/UX Designer",
    "Full Stack Developer",
    "Product Designer",
    "React & Spring Boot Developer"
  ];

  let count = 0;
  let index = 0;

  function type() {
    if (count === texts.length) count = 0;

    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);

    const typingEl = document.getElementById("typing");
    if (typingEl) typingEl.textContent = letter;

    if (letter.length === currentText.length) {
      count++;
      index = 0;
      setTimeout(type, 1200);
    } else {
      setTimeout(type, 100);
    }
  }

  type();


  // =======================
  // Mobile Menu Toggle
  // =======================
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  // =======================
  // Contact Form Google Sheet
  // =======================
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwf8uQ5NMZAU7XHCx4uUdEOMGdzkuJn5WOnJrXerzXEzPLkNID3sM2ReeUXAjvIEV2O/exec';
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })
        .then(() => {

          const status = document.getElementById("formStatus");

          status.textContent = "Message sent successfully!";
          status.style.color = "#16a34a";

          form.reset();
          setTimeout(() => {
            status.textContent = "";
          }, 3000);

        })
        .catch(err => {

          const status = document.getElementById("formStatus");

          status.textContent = "Failed to send message!";
          status.style.color = "#dc2626";
          setTimeout(() => {
            status.textContent = "";
          }, 3000);
          console.error(err);

        });
    });
  }
});

// =======================
  // Slider Logic
  // =======================

let slides = document.querySelectorAll(".slide");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let dotsContainer = document.querySelector(".dots");

let index = 0;
let interval;

/* CREATE DOTS */
slides.forEach((_, i) => {
  let dot = document.createElement("span");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});

let dots = document.querySelectorAll(".dots span");

function showSlide(i) {
  slides.forEach(slide => {
    slide.classList.remove("active");

    // pause video
    let vid = slide.querySelector("video");
    if (vid) vid.pause();
  });

  dots.forEach(dot => dot.classList.remove("active"));

  index = (i + slides.length) % slides.length;

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  // play video if exists
  let activeVideo = slides[index].querySelector("video");
  if (activeVideo) {
    activeVideo.play();
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
}

/* NEXT / PREV */
next.onclick = () => showSlide(index + 1);
prev.onclick = () => showSlide(index - 1);

/* AUTO SLIDE */
function startAutoSlide() {
  stopAutoSlide();
  interval = setInterval(() => {
    showSlide(index + 1);
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

/* START */
showSlide(0);
startAutoSlide();

/* SWIPE SUPPORT (MOBILE) */
let startX = 0;

document.getElementById("slider").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.getElementById("slider").addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) showSlide(index + 1);
  if (endX - startX > 50) showSlide(index - 1);
});


// =======================
  // Skills Filter
  // =======================

function filterSkills(category) {

  const cards = document.querySelectorAll(".skill-card");
  const buttons = document.querySelectorAll(".tab-btn");

  /* active button change */

  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");

  /* filter cards */

  cards.forEach(card => {

    if (category === "all") {
      card.classList.remove("hide");
      card.classList.add("show");
    }
    else if (card.classList.contains(category)) {
      card.classList.remove("hide");
      card.classList.add("show");
    }
    else {
      card.classList.remove("show");
      card.classList.add("hide");
    }

  });

}
window.addEventListener("scroll", () => {
  const header = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


