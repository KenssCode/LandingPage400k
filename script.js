document.addEventListener("DOMContentLoaded", function () {
  // ========== COUNTDOWN TIMER ==========
  function startCountdown() {
    const countdownElement = document.querySelector(".countdown");
    if (!countdownElement) return;

    // Set waktu 3 hari dari sekarang
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);
    countdownDate.setHours(23, 59, 59, 0);

    function updateTimer() {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        countdownElement.innerHTML =
          '<div class="timer-box">PROMO BERAKHIR</div>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `
                <div class="timer-box">${days}<span>Hari</span></div>
                <div class="timer-box">${hours}<span>Jam</span></div>
                <div class="timer-box">${minutes}<span>Menit</span></div>
                <div class="timer-box">${seconds}<span>Detik</span></div>
            `;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ========== 2. BACK TO TOP BUTTON ==========
  function setupBackToTop() {
    const backToTop = document.getElementById("backToTop");
    if (!backToTop) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ========== 3. SMOOTH SCROLL ==========
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // ========== 9. FORM CONTACT HANDLER ==========
  function setupContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll("input, textarea");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          isValid = false;
        } else {
          input.style.borderColor = "#e2e8f0";
        }
      });

      if (isValid) {
        alert("✅ Pesan lo udah terkirim! Nanti gw hubungi via email/WA.");
        form.reset();
      } else {
        alert("❌ Isi semua kolom dulu ya!");
      }
    });
  }

  // Panggil di bagian bawah
  setupContactForm();

  // ========== 4. MODAL POPUP ==========
  function setupModal() {
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeModal");
    const submitBtn = document.getElementById("submitModal");
    const emailInput = document.getElementById("emailModal");

    if (!modal || !closeBtn || !submitBtn) return;

    // Tampilkan modal setelah 5 detik (kalo belum pernah liat)
    setTimeout(() => {
      if (!localStorage.getItem("modalKenssShown")) {
        modal.style.display = "flex";
      }
    }, 5000);

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    submitBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      if (email && email.includes("@") && email.includes(".")) {
        alert("✅ Makasih! Kode voucher udah dikirim ke email lo.");
        localStorage.setItem("modalKenssShown", "true");
        modal.style.display = "none";
        emailInput.value = "";
      } else {
        alert("❌ Masukin email yang bener dong!");
        emailInput.style.borderColor = "red";
      }
    });

    emailInput.addEventListener("input", () => {
      emailInput.style.borderColor = "#e2e8f0";
    });
  }

  // ========== 5. ANIMASI SCROLL ==========
  function setupScrollAnimation() {
    const elements = document.querySelectorAll(
      ".pricing-card, .feature, .testi-card, .problem-item, .faq-item",
    );

    if (elements.length === 0) return;

    elements.forEach((el) => {
      el.classList.add("fade-out");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  // ========== 6. HIGHLIGHT PAKET POPULER ==========
  function setupPricingHover() {
    const popularCard = document.querySelector(".pricing-card.popular");
    if (popularCard) {
      popularCard.addEventListener("mouseenter", () => {
        popularCard.style.transform = "scale(1.05) translateY(-15px)";
      });

      popularCard.addEventListener("mouseleave", () => {
        popularCard.style.transform = "scale(1.05)";
      });
    }
  }

  // ========== 7. FIX BROKEN IMAGES ==========
  function setupImageFallback() {
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", function () {
        this.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter' font-size='16' fill='%2394a3b8'%3EImage Not Found%3C/text%3E%3C/svg%3E";
      });
    });
  }

  // ========== 8. RESIZE HANDLER ==========
  function setupResizeHandler() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    });
  }

  // ========== JALANKAN SEMUA FUNGSI ==========
  startCountdown();
  setupBackToTop();
  setupSmoothScroll();
  setupModal();
  setupScrollAnimation();
  setupPricingHover();
  setupImageFallback();
  setupResizeHandler();

  console.log(
    "✅ Landing page Kenss siap! Design modern, ramah lansia, anti lag.",
  );
});
