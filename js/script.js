/* =========================================
   BAGIAN 1: HOME PAGE (CAROUSEL)
   ========================================= */
const containerElement = document.querySelector('.carousel-container');

// PAGAR PENGAMAN: Hanya jalankan ini JIKA ada kotak carousel (di index.html)
if (containerElement) {
    const slidesData = [
        {
            title: "New Dark Troops Update",
            desc: "Experience the power of shadow with our latest troop additions",
            bg: "linear-gradient(rgba(76, 40, 130, 0.7), rgba(33, 28, 66, 0.9)), url('assets/slide1.png')"
        },
        {
            title: "Season 5 Begins",
            desc: "Join the community championships and prove your skills",
            bg: "linear-gradient(rgba(106, 27, 98, 0.7), rgba(42, 15, 43, 0.9)), url('assets/slide2.png')"
        },
        {
            title: "Hero Balance Update",
            desc: "Major balance changes for a more competitive gameplay",
            bg: "linear-gradient(rgba(107, 81, 19, 0.7), rgba(43, 34, 11, 0.9)), url('assets/slide3.png')"
        }
    ];

    let currentSlide = 0;
    const titleElement = document.querySelector('.carousel-content h3');
    const descElement = document.querySelector('.carousel-content p');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    containerElement.style.backgroundImage = slidesData[0].bg;
    containerElement.style.backgroundSize = "cover";
    containerElement.style.backgroundPosition = "center";

    function updateSlideDisplay(index) {
        titleElement.textContent = slidesData[index].title;
        descElement.textContent = slidesData[index].desc;
        containerElement.style.backgroundImage = slidesData[index].bg;
        containerElement.style.backgroundSize = "cover";
        containerElement.style.backgroundPosition = "center";
        
        dots.forEach(function(dot) {
            dot.classList.remove('active-dot');
        });
        dots[index].classList.add('active-dot');
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            currentSlide++; 
            if (currentSlide >= slidesData.length) currentSlide = 0;
            updateSlideDisplay(currentSlide);
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            currentSlide--; 
            if (currentSlide < 0) currentSlide = slidesData.length - 1;
            updateSlideDisplay(currentSlide);
        });
    }
}


/* =========================================
   BAGIAN 2: HALAMAN TROOPS (Hover Effect)
   ========================================= */
const troopCards = document.querySelectorAll('.troop-item');

// PAGAR PENGAMAN: Hanya jalankan ini JIKA ada kartu troops (di troops.html)
if (troopCards.length > 0) {
    troopCards.forEach(function(card) {
        const statsOverlay = card.querySelector('.troop-stats');
        
        card.addEventListener('mouseenter', function() {
            card.style.boxShadow = '0 15px 35px rgba(217, 70, 158, 0.5)';
            card.style.transform = 'translateY(-10px)';
            if(statsOverlay) statsOverlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.boxShadow = 'none';
            card.style.transform = 'translateY(0)';
            if(statsOverlay) statsOverlay.style.opacity = '0';
        });
    });
}


/* =========================================
   BAGIAN 3: GALLERY PAGE (FILTER & POP-UP)
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('gallery-modal');

// PAGAR PENGAMAN: Jika ada tombol filter (berarti kita di gallery.html)
if (filterBtns.length > 0) {
    
    // 1. Logika Filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Hapus warna dari tombol sebelumnya
            filterBtns.forEach(b => b.classList.remove('active-filter'));
            // Tambahkan warna ke tombol yang diklik
            this.classList.add('active-filter');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 2. Logika Pop-up Modal
    const closeModalBtn = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modalImg.src = this.getAttribute('data-img');
            modalTitle.textContent = this.getAttribute('data-title');
            modalDesc.textContent = this.getAttribute('data-desc');
            modal.style.display = 'flex';
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/* =========================================
   BAGIAN 4: REGISTER PAGE (VALIDATION)
   ========================================= */
const registerForm = document.getElementById('registerForm');
const formMessage = document.getElementById('form-message');

// PAGAR PENGAMAN: Hanya jalankan jika form register ada di halaman
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah halaman reload otomatis saat tombol diklik
        
        // Mengambil semua nilai yang diisi oleh pengguna
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const male = document.getElementById('male').checked;
        const female = document.getElementById('female').checked;
        const troop = document.getElementById('troop').value;
        const reason = document.getElementById('reason').value;

        let errorMessage = "";

        // VALIDASI 1: Name (Tidak boleh kosong dan minimal 3 huruf)
        if (name === "" || name.length < 3) {
            errorMessage = "Name must be at least 3 characters long.";
        }
        // VALIDASI 2: Email (Tanpa Regex: Harus ada '@', ada '.com', dan '@' harus di depan '.com')
        else if (email.indexOf('@') === -1 || email.indexOf('.com') === -1 || email.indexOf('@') > email.lastIndexOf('.com')) {
            errorMessage = "Please enter a valid email address (must contain '@' and end with '.com').";
        }
        // VALIDASI 3: Age (Harus di atas 13 tahun)
        else if (age === "" || isNaN(age) || age < 13) {
            errorMessage = "You must be at least 13 years old to join the clan.";
        }
        // VALIDASI 4: Gender (Harus ada salah satu yang dipilih)
        else if (!male && !female) {
            errorMessage = "Please select your gender.";
        }
        // VALIDASI 5: Favorite Troop (Harus dipilih dari dropdown)
        else if (troop === "") {
            errorMessage = "Please select your favorite troop.";
        }
        // VALIDASI 6: Reason (Minimal 10 karakter)
        else if (reason.length < 10) {
            errorMessage = "Your reason to join must be at least 10 characters long.";
        }

        // Tampilkan Error jika ada yang salah
        if (errorMessage !== "") {
            formMessage.textContent = errorMessage;
            formMessage.style.display = "block";
            formMessage.style.color = "#ff4a4a";
            formMessage.style.backgroundColor = "rgba(255, 74, 74, 0.1)";
            formMessage.style.border = "1px solid #ff4a4a";
        } 
        // Jika semua lolos validasi, tampilkan pesan sukses
        else {
            formMessage.textContent = "Registration Successful! Welcome to Clash of BaNG.";
            formMessage.style.display = "block";
            formMessage.style.color = "#4caf50";
            formMessage.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
            formMessage.style.border = "1px solid #4caf50";
            registerForm.reset(); // Kosongkan form setelah sukses
        }
    });
}