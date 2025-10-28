// Navigation functionality
class Navigation {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.loadSidebar();
        this.loadTopNav();
        this.loadPage(this.currentPage);
        this.attachEventListeners();
    }

    async loadSidebar() {
        try {
            const response = await fetch('components/sidebar.html');
            const sidebarHTML = await response.text();
            document.getElementById('sidebar-container').innerHTML = sidebarHTML;
            this.attachSidebarEvents();
        } catch (error) {
            console.error('Error loading sidebar:', error);
        }
    }

    async loadTopNav() {
        try {
            const response = await fetch('components/top-nav.html');
            const topNavHTML = await response.text();
            document.getElementById('top-nav-container').innerHTML = topNavHTML;
            this.attachTopNavEvents();
        } catch (error) {
            console.error('Error loading top navigation:', error);
        }
    }

    async loadPage(pageName) {
        try {
            const response = await fetch(`pages/${pageName}.html`);
            const pageHTML = await response.text();
            document.getElementById('page-content').innerHTML = pageHTML;
            this.currentPage = pageName;
            this.updateActiveNavLink();
            this.updatePageTitle();
            
            // Close mobile sidebar after navigation
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('mobile-open');
            }
        } catch (error) {
            console.error(`Error loading page ${pageName}:`, error);
        }
    }

    attachEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.loadPage(event.state.page);
            }
        });
    }

    attachSidebarEvents() {
        // Toggle sidebar collapse
        const toggleBtn = document.getElementById('toggleSidebar');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('collapsed');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = e.currentTarget.getAttribute('data-page');
                this.navigateTo(pageName);
            });
        });
    }

    attachTopNavEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('mobile-open');
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (event) => {
            const sidebar = document.getElementById('sidebar');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(event.target) && 
                !mobileMenuBtn.contains(event.target) &&
                sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }

    navigateTo(pageName) {
        this.loadPage(pageName);
        
        // Update browser history
        window.history.pushState({ page: pageName }, '', `#${pageName}`);
    }

    updateActiveNavLink() {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const currentLink = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    updatePageTitle() {
        const pageTitle = document.getElementById('pageTitle');
        const currentLink = document.querySelector(`[data-page="${this.currentPage}"] span`);
        if (pageTitle && currentLink) {
            pageTitle.textContent = currentLink.textContent;
        }
    }
}