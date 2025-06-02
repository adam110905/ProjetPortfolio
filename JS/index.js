document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Gestion des liens actifs au clic
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Synchronisation de la navigation au défilement
    const sections = document.querySelectorAll('section[id]');
    
    function updateNavOnScroll() {
        const scrollPosition = window.scrollY + 200; // Offset pour une meilleure détection
        
        // Trouver la section actuellement visible
        let currentSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });
        
        // Mettre à jour le lien actif si une section est trouvée
        if (currentSection) {
            const currentId = currentSection.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Surveillance du défilement pour mettre à jour la navigation
    window.addEventListener('scroll', updateNavOnScroll);
    updateNavOnScroll(); // Exécuter une fois au chargement
    
    // ===== DÉFILEMENT FLUIDE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Indication d'envoi en cours
            submitBtn.innerHTML = `
                <span>Envoi en cours...</span>
                <span class="btn-emoji">🕒</span>
            `;
            
            // Simuler un délai d'envoi (remplacer par un vrai envoi de formulaire)
            setTimeout(() => {
                // Message de succès
                submitBtn.innerHTML = `
                    <span>Message envoyé!</span>
                    <span class="btn-emoji">✅</span>
                `;
                
                // Réinitialisation du formulaire et du bouton
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }
    
    // ===== MENU MOBILE =====
    function handleMobileMenu() {
        // Créer le bouton de menu mobile s'il n'existe pas déjà
        if (!document.querySelector('.mobile-nav-toggle')) {
            const mobileNavToggle = document.createElement('button');
            mobileNavToggle.classList.add('mobile-nav-toggle');
            mobileNavToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
            document.body.appendChild(mobileNavToggle);
            
            // Ajouter l'événement de toggle au bouton
            mobileNavToggle.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('mobile-active');
                }
            });
        }
    }
    
    // Vérifier la taille de l'écran pour le menu mobile
    function checkScreenSize() {
        if (window.innerWidth <= 1024) {
            handleMobileMenu();
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
            const mobileToggle = document.querySelector('.mobile-nav-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            
            // S'assurer que la sidebar n'a pas la classe mobile-active
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('mobile-active');
            }
        }
    }
    
    // Vérifier la taille au chargement et à chaque redimensionnement
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
});