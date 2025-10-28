// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    window.navigation = new Navigation();
    
    // Check for hash in URL for deep linking
    const hash = window.location.hash.substring(1);
    if (hash && hash !== 'dashboard') {
        window.navigation.navigateTo(hash);
    }
    
    // Initialize any global functionality
    initGlobalFeatures();
});

function initGlobalFeatures() {
    // Global event listeners and functionality can go here
    console.log('Martial Arts Dashboard initialized');
}