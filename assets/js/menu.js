
// Menu Lateral
// @alibhtty

$ = jQuery;
    /// ADD CLASS TO HEADER ON SCROLL ///
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 70) {
            $("header").addClass("active");
        } else {
            $("header").removeClass("active");
        }
    });

    AOS.init({
        easing: 'ease-in-out-sine'
    });

    /// SHOW/HIDE MENU ///
    $(document).ready(function() {
        $(".menuSeven, .hamburger_close, .fs_menu_overlay").click(function() {
            $(".logo-image").toggleClass("showmenu");
            $("html").toggleClass("no-scroll");
            if ($(".logo-image").hasClass("showmenu")) {
                $("body").append('<div class="blur-background"></div>');
                $("header").addClass("menu-active");
            } else {
                $(".blur-background").remove();
                $("header").removeClass("menu-active");
            }
        });
    });

    /// Menú Lateral ///
    const menuSeven = document.querySelector('.menuSeven');

    function addClassFunSeven() {
        this.classList.toggle("clickMenuSeven");
    }
    menuSeven.addEventListener('click', addClassFunSeven);




    // Swipe botón Instagram
    const button = document.querySelector('.make-btn-main');
    const footerCopyBlock = document.querySelector('footer .copy-block');
    let startX = 0;
    let currentX = 0;
    
    button.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        button.classList.remove('swipe-out');
        button.querySelector('.carta').classList.add('active-blur');
        
        // Desactivar scroll en el body
        document.body.style.overflow = 'hidden';
    });
    
    button.addEventListener('touchmove', function(event) {
        event.preventDefault(); // Prevent scrolling only during touch move
        currentX = event.touches[0].clientX - startX;
        button.style.transform = `translateX(${currentX}px)`;
    });
    
    button.addEventListener('touchend', function(event) {
        button.querySelector('.carta').classList.remove('active-blur');
        if (Math.abs(currentX) > button.offsetWidth / 2) {
            button.classList.add('swipe-out');
            button.style.transform = currentX > 0 ? `translateX(${window.innerWidth}px)` : `translateX(-${window.innerWidth}px)`;
    
            // Cambiar el height de "footer .copy-block" a 9em
            footerCopyBlock.style.height = '9em';
        } else {
            button.style.transform = 'translateX(0)';
            
            // Restaurar el height de "footer .copy-block" a 18em
            footerCopyBlock.style.height = '18em';
        }
        
        // Reactivar scroll en el body
        document.body.style.overflow = 'auto';
    });



    /* const button = document.querySelector('.make-btn-main');
    let startX = 0;
    let currentX = 0;
    
    button.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        button.classList.remove('swipe-out');
        button.querySelector('.carta').classList.add('active-blur');
    
        // Desactivar scroll en el body
        document.body.style.overflow = 'hidden';
    });
    
    button.addEventListener('touchmove', function(event) {
        event.preventDefault(); // Prevent scrolling only during touch move
        currentX = event.touches[0].clientX - startX;
        button.style.transform = `translateX(${currentX}px)`;
    });
    
    button.addEventListener('touchend', function(event) {
        button.querySelector('.carta').classList.remove('active-blur');
        if (Math.abs(currentX) > button.offsetWidth / 2) {
            button.classList.add('swipe-out');
            button.style.transform = currentX > 0 ? `translateX(${window.innerWidth}px)` : `translateX(-${window.innerWidth}px)`;
        } else {
            button.style.transform = 'translateX(0)';
        }
    
        // Reactivar scroll en el body
        document.body.style.overflow = 'auto';
    }); */