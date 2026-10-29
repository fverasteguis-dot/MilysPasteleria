const enlacesMenu = document.querySelectorAll(".nav-mobile");

const menuColapsable = document.getElementById("menu");

enlacesMenu.forEach(function(enlace){
    enlace.addEventListener("click", function(){
        const menu = bootstrap.Collapse.getInstance(menuColapsable);
        if(menu){
            menu.hide();
        }
    });
});