
function Red(){
    location.reload(true);
}

function Blue(){
    // var Up = 0;
    // Up = ASTB.Upgrade('http://10.0.3.10/bbinco_28_x4x_611.mcfs');
    // alert(Up);
}

function Green(){

}

function Yellow(){
    Browser.Action(7); // 7 | 16
}

function Close(){
    if(CurrentModule === 'Tv'){
        TvClose();
    } else if(CurrentModule === 'Menu'){
        //
    } else if(CurrentModule === 'Movies'){
        VodClose();
    } else if(CurrentModule === 'Moods'){
        MoodsClose();
    }
}

function Back(){
    if(CurrentModule === 'Tv'){
        TvClose();
    } else if(CurrentModule === 'Menu'){
        //
    } else if(CurrentModule === 'Movies'){
        VodClose();
    } else if(CurrentModule === 'Moods'){
        MoodsClose();
    }
}

function Menu(){
    if(CurrentModule !== 'Menu' && Device['Services']['ActiveMenu'] === true){
        GoPage('menu.php', Device['MenuId'], 'Menu');
    } else if(CurrentModule === 'Tv' && Device['Services']['ActiveMenu'] === false){
        TvRecorder();
    }
}
