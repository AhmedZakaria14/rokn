// ضبط عتبة التمرير (قيمة البكسل بعد أيها يتغير الهيدر)
const SCROLL_THRESHOLD = 60; // غيّر الرقم حسب رغبتك

const header = document.getElementById('site-header')
function onScroll() {
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
// تنفيذ فوري عند التحميل لفحص الحالة إذا كانت الصفحة مفتوحة في منتصفها
onScroll();
// ربط الحدث مع استخدام passive listener لتحسين الأداء
window.addEventListener('scroll', onScroll, { passive: true });

// =================================================================================================================
// app.js — modular vanilla JS for the page
document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------
     Header / Mobile nav
     ---------------------- */
  (function headerModule() {
    const hamb = document.getElementById('hamburger');
    const nav = document.querySelector('.nav-links');
    hamb && hamb.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
   
    // close mobile menu on link click
    document.querySelectorAll('.main-nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 980 && nav) nav.style.display = 'none';
      });
    });
  })();

  /* ----------------------
     Smooth scroll
     ---------------------- */
  (function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  })();

});

// خلي الكليك على اللينك اللي جوه .dropdown يفتح القايمة
document.querySelectorAll(".dropdown > a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // يمنع الانتقال لصفحة services.html
    const parent = link.parentElement;

    // قفل أي قايمة مفتوحة قبل ما نفتح الجديدة
    document.querySelectorAll(".dropdown.open").forEach(drop => {
      if (drop !== parent) drop.classList.remove("open");
    });

    // فتح/قفل القايمة الحالية
    parent.classList.toggle("open");
  });
});

// إغلاق القايمة لو ضغطت براها
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown.open").forEach(drop => {
      drop.classList.remove("open");
    });
  }
});

// تمييز اللينك الحالي
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-links a');
menuItem.forEach(link => {
  if (link.href === currentLocation) {
    link.classList.add("active");
  }
});
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // يغير شكل الزرار
  hamburger.classList.toggle("show");    // يفتح/يقفل القائمة
});
const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
  const btn = item.querySelector(".accordion-button");
  btn.addEventListener("click", () => {
    // نقفل الكل
    items.forEach(i => i.classList.remove("active"));
    // نفتح العنصر اللي اتضغط عليه
    item.classList.add("active");
  });
});
  // دالة تحريك الأرقام
  function animateCounter(el) {
    const target = +el.getAttribute("data-letters"); // الرقم النهائي
    let count = 0;
    const speed = target / 200; // سرعة العد

    const updateCount = () => {
      count += speed;
      if (count < target) {
        el.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target; // يتوقف عند الرقم النهائي
      }
    };
    updateCount();
  }

  // تشغيل عند ظهور العناصر في الشاشة
  const counters = document.querySelectorAll(".rs-counter");
  const options = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });

  const slides = document.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");
        const indicatorsContainer = document.querySelector(".slider-indicators");
        let currentIndex = 0;
        let autoSlide;

        // إنشاء النقاط (Indicators)
        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll(".slider-indicators span");

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                dots[i].classList.remove("active");
            });
            slides[index].classList.add("active");
            dots[index].classList.add("active");
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }

        // أوتوماتيك سلايدر
        function startAutoSlide() {
            autoSlide = setInterval(nextSlide, 9000); // 5 ثواني
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        prevBtn.addEventListener("click", () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        nextBtn.addEventListener("click", () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        // تشغيل
        showSlide(currentIndex);
        startAutoSlide();