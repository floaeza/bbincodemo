var   navigationPanel       = 0,
      indexBtnPanel         = 0;

function MenuRight(){
    switch (navigationPanel) {
        case 0:
            $('#customCarousel1').carousel('next');
            break;
        case 1:
            var currentIndex        = $('.carousel-item.active').index(),
                btnCollection       = document.getElementsByClassName('btn-box '+currentIndex)[0].children,
                btnCollectionLength = btnCollection.length-1;
                currentIndex        = currentIndex.toString();
                btnCollection[indexBtnPanel].classList.remove('btnActive');
                if (indexBtnPanel >= btnCollectionLength) {
                    indexBtnPanel = 0;
                }else{
                    indexBtnPanel = indexBtnPanel+1;
                }
                btnCollection[indexBtnPanel].classList.add('btnActive');
            break;
        default:
            break;
    }
}
function MenuLeft(){
    switch (navigationPanel) {
        case 0:
            $('#customCarousel1').carousel('prev');
            break;
        case 1:
            var currentIndex        = $('.carousel-item.active').index(),
                btnCollection       = document.getElementsByClassName('btn-box '+currentIndex)[0].children,
                btnCollectionLength = btnCollection.length-1;
                currentIndex        = currentIndex.toString();
                btnCollection[indexBtnPanel].classList.remove('btnActive');
                if (indexBtnPanel === 0) {
                    indexBtnPanel = btnCollectionLength;
                }else{
                    indexBtnPanel = indexBtnPanel-1;
                }
                btnCollection[indexBtnPanel].classList.add('btnActive');
            break;
        default:
            break;
    }
}
function MenuDown(){
    switch (navigationPanel) {
        case 0:
            break;
        case 1:
            var currentIndex        = $('.carousel-item.active').index(),
                btnCollection       = document.getElementsByClassName('btn-box '+currentIndex)[0].children;
                currentIndex        = currentIndex.toString();
                btnCollection[indexBtnPanel].classList.remove('btnActive');
                navigationPanel     = 0;
                indexBtnPanel       = 0
            break;
        default:
            break;
    }
}
function MenuUp(){
    switch (navigationPanel) {
        case 0:
            navigationPanel = 1;
            var currentIndex    = $('.carousel-item.active').index(),
                btnCollection   = document.getElementsByClassName('btn-box '+currentIndex)[0].children;
                currentIndex    = currentIndex.toString();
                btnCollection[indexBtnPanel].classList.add('btnActive');
            
            break;
        case 1:
            var currentIndex    = $('.carousel-item.active').index(),
                btnCollection   = document.getElementsByClassName('btn-box '+currentIndex)[0].children;
                currentIndex    = currentIndex.toString();
                btnCollection[indexBtnPanel].classList.remove('btnActive');   
                navigationPanel = 0;
                indexBtnPanel   = 0;
            break;
        default:
            break;
    }
}
function MenuOk(){
    switch (navigationPanel) {
        case 0:
            break;
        case 1:
            var currentIndex    = $('.carousel-item.active').index(),
                btnCollection   = document.getElementsByClassName('btn-box '+currentIndex)[0].children,
                currentIndex    = currentIndex.toString(),
                currentBtn      = btnCollection[indexBtnPanel].innerHTML.trim();
                btnCollection[indexBtnPanel].classList.remove('btnActive'); 
                if (currentBtn === 'Institución') {
                    GoPage('content.php', '8', 'Institucion');
                }else if (currentBtn === 'Equipo'){
                    GoPage('content.php', '9', 'Equipo');
                }else if (currentBtn === 'Nosotros'){
                    GoPage('content.php', '10', 'Nosotros');
                }else if (currentBtn === 'Paquetes'){
                    GoPage('content.php', '11', 'Paquetes');
                }else if (currentBtn === 'Precios'){
                    GoPage('content.php', '12', 'Precios');
                }else if (currentBtn === 'Televisión'){
                    GoPage('tv.php', '1', 'Tv');
                }
            break;
    }
}