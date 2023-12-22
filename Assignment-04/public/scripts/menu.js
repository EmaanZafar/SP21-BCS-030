// menu.js

document.addEventListener('DOMContentLoaded', function () {
    // Set the active tab based on the current category
    const category = getCategoryFromUrl();
    setActiveTab(category);

    // Add click event listeners to tablinks
    document.querySelectorAll('.tablink').forEach(tablink => {
        tablink.addEventListener('click', function (event) {
            const category = getCategoryFromUrl(event.target.href);
            setActiveTab(category);
        });
    });
});

function getCategoryFromUrl(url = window.location.href) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('category');
}

function setActiveTab(category) {
    // Remove the "w3-red" class from all tablinks
    document.querySelectorAll('.tablink').forEach(tablink => {
        tablink.classList.remove('w3-red');
    });

    // Add the "w3-red" class to the tablink corresponding to the current category
    const activeTablink = document.querySelector(`.tablink[href="/menu?category=${category}"]`);
    if (activeTablink) {
        activeTablink.classList.add('w3-red');
    }
}
