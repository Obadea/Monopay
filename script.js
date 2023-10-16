class Card3d {
  constructor(selector) {
    this.hitbox = document.getElementById(selector);
    this.card = this.hitbox.querySelector(".card--2");
    this.light = this.hitbox.querySelector(".light");
    const { width, height, left, top } = this.hitbox.getBoundingClientRect();

    this.halfSize = {
      x: width / 2,
      y: height / 2,
    };

    // Calculate the origin point for rotation
    this.origin = {
      x: left + this.halfSize.x,
      y: top + this.halfSize.y,
    };

    this.angle = {
      x: 25,
      y: 25,
    };

    this.mouse = {
      x: 0,
      y: 0,
    };

    this.ratio = {
      x: 0,
      y: 0,
    };

    this.setupListeners();
  }

  calculateCardRotation() {
    const offset = {
      x: this.mouse.x - this.origin.x,
      y: this.mouse.y - this.origin.y,
    };

    this.ratio = {
      x: offset.x / this.halfSize.x,
      y: offset.y / this.halfSize.y,
    };

    const { x, y } = this.angle;
    return {
      x: Number(this.ratio.y * x).toFixed(1),
      y: Number(this.ratio.x * y).toFixed(1),
    };
  }

  updateCardRotation() {
    const { x, y } = this.calculateCardRotation();
    this.card.animate(
      [
        {
          transform: `rotateX(${x}deg) rotateY(${y}deg) scale(1.2)`,
        },
      ],
      {
        duration: 500,
        easing: "ease-out",
        fill: "forwards",
        delay: 100,
      }
    );
  }

  resetCardRotation() {
    this.card.animate(
      [
        {
          transform: `rotateX(0deg) rotateY(0deg) scale(1)`,
        },
      ],
      {
        duration: 500,
        easing: "ease-out",
        fill: "forwards",
        delay: 400,
      }
    );
  }

  updaateLightRotation() {
    const x = this.ratio.x * 100;
    const y = this.ratio.y * 100;

    this.light.style.background = `radial-gradient(
        circle at ${x}% ${y}%,
        rgba(208, 192, 99, 0.3) 0%,
        rgba(208, 192, 99, 0.2) 10%,      
        transparent,
        transparent`;
  }

  resize() {
    const { width, height, left, top } = this.hitbox.getBoundingClientRect();

    this.halfSize = {
      x: width / 2,
      y: height / 2,
    };

    // Calculate the origin point for rotation
    this.origin = {
      x: left + this.halfSize.x,
      y: top + this.halfSize.y,
    };
  }

  setupListeners() {
    this.hitbox.addEventListener("mousemove", (e) => {
      this.mouse = {
        x: e.clientX,
        y: e.clientY,
      };

      this.updateCardRotation();
      this.updaateLightRotation();
    });
    this.hitbox.addEventListener("mouseleave", () => {
      this;
      this.resetCardRotation();
    });

    window.addEventListener("resize", () => {
      this.resize();
    });
  }
}

const card = new Card3d("hitbox");

card.angle.y = 50;

// Hover Effect
const domBox7 = document.querySelector(".grid--box7");
const box7phone = document.querySelector(".phone2");

box7phone.addEventListener("mouseenter", () => {
  setTimeout(() => {
    domBox7.style.overflow = "visible";
  }, 100);
  countToTargetFast(900, amountAanimation2);
});

box7phone.addEventListener("mouseleave", () => {
  setTimeout(() => {
    domBox7.style.overflow = "hidden";
  }, 10);
});

// grid box style
const smallGridBox = document.querySelectorAll(".part-3-grid-card");
const boxDetails = document.querySelectorAll(".hidden--details");
console.log(smallGridBox, boxDetails);

// Mouse Enter
smallGridBox.forEach((cur, i) => {
  cur.addEventListener("mouseenter", () => {
    boxDetails[i].style.transition = " 0.6s";
    boxDetails[i].style.opacity = "1";
    boxDetails[i].style.transform = "translateY(0rem)";
    boxDetails[i].style.backdropFilter ="blur(7px)";
    
  });
});

// Mouse Leave
smallGridBox.forEach((cur, i) => {
  cur.addEventListener("mouseleave", () => {
    boxDetails[i].style.transition = " 0.6s";
    boxDetails[i].style.opacity = "0";
    boxDetails[i].style.transform = "translateY(2rem)";
  });
});

// Amount Animation
const amountAanimation = document.querySelector(".amount__animation");
const amountAanimation2 = document.querySelector(".amount2__animation");

// Counting Numbers
function countToTargetFast(target, domName) {
  let count = 3;
  let count2 = 1;
  function updateCounter() {
    if (count <= target) {
      domName.textContent = `${count - 177 < 0 ? count : count - 177},${
        count - 150 < 0 ? count2 : count - 150
      }`;
      count = count * 2;
      count2 = count + 27;
      setTimeout(updateCounter, 130); // Delay for 150 milliseconds
    }
  }
  updateCounter();
}

const countOnReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  countToTargetFast(900, amountAanimation);
  observer.unobserve(entry.target);
};

const phone1Observer = new IntersectionObserver(countOnReveal, {
  root: null,
  threshold: 0.15,
});

phone1Observer.observe(amountAanimation);
