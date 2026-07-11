
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.voice-gallery-img');
  const lightbox = document.getElementById('voice-lightbox');
  const lightboxImg = document.getElementById('voice-lightbox-img');
  const closeBtn = document.querySelector('.voice-lightbox-close');
  const prevBtn = document.querySelector('.voice-lightbox-prev');
  const nextBtn = document.querySelector('.voice-lightbox-next');
  const loadMoreBtn = document.getElementById('voice-load-more');

  const showLessBtn = document.createElement('button');
  showLessBtn.id = 'voice-show-less';
  showLessBtn.className = 'voice-gallery-btn'; 
  showLessBtn.textContent = 'عرض أقل';
  showLessBtn.style.display = 'none';
  loadMoreBtn.parentNode.insertBefore(showLessBtn, loadMoreBtn.nextSibling);

  let currentIndex = 0;
  let imagesPerLoad = 4;
  let currentVisible = 0;

  function showMoreImages() {
    for (let i = currentVisible; i < currentVisible + imagesPerLoad && i < images.length; i++) {
      images[i].style.display = 'block';
    }
    currentVisible += imagesPerLoad;

  
    if (currentVisible >= images.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }

    if (currentVisible > imagesPerLoad) {
      showLessBtn.style.display = 'inline-block';
    }
  }

  function showLessImages() {
    currentVisible -= imagesPerLoad;
    if (currentVisible <= imagesPerLoad) {
      currentVisible = imagesPerLoad;
      showLessBtn.style.display = 'none';
    }

    for (let i = currentVisible; i < images.length; i++) {
      images[i].style.display = 'none';
    }

    if (currentVisible < images.length) {
      loadMoreBtn.style.display = 'inline-block';
    }
  }

  showMoreImages();

  loadMoreBtn.addEventListener('click', showMoreImages);
  showLessBtn.addEventListener('click', showLessImages);

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      currentIndex = index;
    });
  });

  closeBtn.onclick = () => lightbox.style.display = 'none';
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  };
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  };

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
});

