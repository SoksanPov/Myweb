document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('event-detail-modal');
    const closeBtn = document.querySelector('.close-btn');
    const titleEl = document.getElementById('modal-title');
    const descriptionEl = document.getElementById('modal-description');
    const carouselEl = document.getElementById('carousel-images');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let galleryImages = [];

    // បើក Modal និងបំពេញទិន្នន័យ
    document.querySelectorAll('.view-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            // 1. ទាញយកទិន្នន័យពី data-attributes
            const title = this.getAttribute('data-title');
            const fullDesc = this.getAttribute('data-full-desc');
            const galleryJson = this.getAttribute('data-gallery-images');
            
            // បំប្លែងទិន្នន័យរូបភាព JSON ទៅជា Array
            galleryImages = JSON.parse(galleryJson);
            currentSlide = 0;

            // 2. បំពេញមាតិកា Modal
            titleEl.textContent = title;
            descriptionEl.innerHTML = `<p>${fullDesc}</p>`;
            
            // 3. បង្កើត Carousel
            renderCarousel();
            
            // 4. បើក Modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // បិទ Scroll ផ្ទៃខាងក្រោយ
        });
    });

    // មុខងារសម្រាប់បង្កើត Carousel
    function renderCarousel() {
        carouselEl.innerHTML = ''; // លុបរូបភាពចាស់
        galleryImages.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = titleEl.textContent;
            carouselEl.appendChild(img);
        });
        updateCarouselDisplay();
    }

    // មុខងារសម្រាប់ប្តូររូបភាពក្នុង Carousel
    function updateCarouselDisplay() {
        if (galleryImages.length === 0) {
            carouselEl.innerHTML = '<p>គ្មានរូបភាព Gallery បន្ថែមទេ។</p>';
            return;
        }
        
        // គណនាការផ្លាស់ប្តូរ (Translate)
        const offset = currentSlide * -100; // ផ្លាស់ប្តូរ 100% សម្រាប់រូបភាពនីមួយៗ
        carouselEl.style.transform = `translateX(${offset}%)`;
    }

    // Next Button
    nextBtn.addEventListener('click', function() {
        if (currentSlide < galleryImages.length - 1) {
            currentSlide++;
            updateCarouselDisplay();
        } else {
            currentSlide = 0; // ត្រឡប់ទៅរូបភាពដំបូង (Loop)
            updateCarouselDisplay();
        }
    });

    // Previous Button
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarouselDisplay();
        } else {
             currentSlide = galleryImages.length - 1; // ទៅរូបភាពចុងក្រោយ (Loop)
             updateCarouselDisplay();
        }
    });


    // បិទ Modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // បើក Scroll វិញ
    }

    closeBtn.addEventListener('click', closeModal);

    // បិទ Modal នៅពេលចុចក្រៅប្រអប់
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});