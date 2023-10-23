
    function toggleMainMenu() {
        var mainMenu = document.getElementById("main-menu");
        if (mainMenu.style.display === "none" || mainMenu.style.display === "") 
        {
            mainMenu.style.display = "block";
        } 
        else {
            mainMenu.style.display = "none";
        }
    }

