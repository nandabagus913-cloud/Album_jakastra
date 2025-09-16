const galleryData = [
            { id: 1, category: 'dipondok', title: 'Masa Paling Berharga', description: 'Cerita persahabatan di pondok pesantren', image: 'gallery/0323673a438cff221c6b2fa3b0a535aa_0.jpeg' },
            { id: 2, category: 'teman', title: 'Sahabat Selamanya', description: 'Bersama teman-teman terbaik', image: 'gallery/IMG_20230812_230224.jpg' },
            { id: 3, category: 'perjalanan', title: 'Jejak Petualang', description: 'Menjelajahi tempat baru dan Menemukan keindahan di setiap perjalanan', image: 'gallery/IMG_20250419_145051.jpg' },
            { id: 4, category: 'sekolah', title: 'Masa-Masa Muda', description: 'Masa-masa seru belajar dan bermain', image: 'gallery/IMG_20250501_210531.jpg' },
            { id: 5, category: 'olahraga', title: 'Hobi', description: 'Momen kompetisi dan kebersamaan', image: 'gallery/IMG_20250419_150503.jpg' },
            { id: 6, category: 'dipondok', title: 'The Most Valuable Time', description: 'The tale of friendship in a pesantren', image: 'gallery/IMG_20250425_150957.jpg' },
            { id: 7, category: 'teman', title: 'Friends Forever', description: 'Moments with the best friends', image: 'gallery/IMG-20240107-WA0060.jpg' },
            { id: 8, category: 'perjalanan', title: 'The Adventurers Trail', description: 'Exploring new places and finding beauty in every journey', image: 'gallery/IMG-20240107-WA0071.jpg' },
            { id: 9, category: 'sekolah', title: 'Pas Enom', description: 'Masa-masa seng nyenengke sinau karo dolanan', image: 'gallery/IMG-20240915-WA0005.jpg' },
            { id: 10, category: 'olahraga', title: 'Kesenengan', description: 'Momen tanding lan kekancan', image: 'gallery/IMG-20240921-WA0002.jpg' },
            { id: 11, category: 'dipondok', title: 'Momen paling behargo', description: 'Cerito kawan di pondok', image: 'gallery/IMG-20241219-WA0050.jpg' },
            { id: 12, category: 'teman', title: 'Road Trip', description: 'Petualangan bersama teman', image: 'gallery/IMG-20240921-WA0006.jpg' }
        ];
        
        // Generate gallery items
        function generateGallery() {
            const galleryContainer = document.getElementById('galleryContainer');
            galleryContainer.innerHTML = '';
            
            galleryData.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'col-lg-4 col-md-6 gallery-item';
                galleryItem.dataset.category = item.category;
                galleryItem.setAttribute('data-aos', 'zoom-in');
                galleryItem.setAttribute('data-aos-delay', (index % 3) * 100);
                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h5>${item.title}</h5>
                        <p>${item.description}</p>
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => openModal(item));
                galleryContainer.appendChild(galleryItem);
            });
        }
        
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const items = document.querySelectorAll('.gallery-item');
                
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Modal functionality
        function openModal(item) {
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            // Get larger version of the image
            const largeImageUrl = item.image.replace('/400/300', '/800/600');
            document.getElementById('modalImage').src = largeImageUrl;
            document.getElementById('modalTitle').textContent = item.title;
            document.getElementById('modalDescription').textContent = item.description;
            modal.show();
        }
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#gallery"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Timeline animation on scroll
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
        
        // Initialize AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
        
        // Initialize gallery on page load
        document.addEventListener('DOMContentLoaded', function() {
            generateGallery();
            
            // Show loading animation briefly
            const loading = document.getElementById('loading');
            loading.style.display = 'block';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 1000);
        });
        
        // Add hover effect to gallery items
        document.addEventListener('mouseover', function(e) {
            if (e.target.closest('.gallery-item')) {
                e.target.closest('.gallery-item').style.transform = 'translateY(-10px)';
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            if (e.target.closest('.gallery-item')) {
                e.target.closest('.gallery-item').style.transform = 'translateY(0)';
            }
        });