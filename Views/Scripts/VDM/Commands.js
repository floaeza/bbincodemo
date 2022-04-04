// @ts-nocheck

var n = 0;
var prueba = false;
function Red(){
    if(typeof(gSTB) !== 'undefined'){
        gSTB.clearMemoryCaches();
        gSTB.DeleteAllCookies();
    }
    var relo = location.href;
    location.href = relo;
}

function Blue(){
    if (window.tizen !== undefined){
        var onSuccess = function() {
            Debug("[rebootDevice] succeeded!");
        };
        var onError = function(error) {
            Debug("[rebootDevice] failed! error code: " + error.code + " error name: " + error.name + "  message " + error.message);
        };
        b2bcontrol.rebootDevice(onSuccess, onError);
    }else {
        RebootDevice();
    }
}
function Green(){
    if(gSTB.GetDeviceMacAddress() === '00:1a:79:74:b7:5b' || gSTB.GetDeviceMacAddress() === '00:1a:79:74:b7:66'){
        var x24Today_qw = new Date();	
        var x24Hour_qw = x24Today_qw.getHours() + ':' + x24Today_qw.getMinutes() + ':' + x24Today_qw.getSeconds();
        var inre_qw = JSON.parse(pvrManager.GetTaskByID(0));
        var name_qw    = inre_qw.fileName,
            url_qw     = inre_qw.url,
            endTime_qw = inre_qw.endTime;
        
        pvrManager.RemoveTask(0,1);
        setInfomirLog('RECORDER,'+gSTB.GetDeviceMacAddress()+','+gSTB.RDir('IPAddress')+','+x24Today_qw.getDate() + "/" + (x24Today_qw.getMonth() +1) + "/" + x24Today_qw.getFullYear()+' '+x24Hour_qw+',STATUS_ERROR_RECORD undefined');
        restartTask(name_qw, url_qw, endTime_qw);
    }
}

function Yellow(){
    
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
    }else{
        GoPage('menu.php', Device['MenuId'], 'Menu');
    }
}

function Menu(){
    Debug('--------------------------MENU() CurrentModule:: ' +CurrentModule + ' DEVICE[SERVICES][ACTIVEMENU] '+ Device['Services']['ActiveMenu']);
    if(CurrentModule !== 'Menu' && Device['Services']['ActiveMenu'] === true){
        //alert("Menu");
        Debug('----------- GOPAGE');
        //if(CurrentModule == 'Tv'){
           //document.getElementById('loadingTV').style.display = "block"; 
        //}
        
        //GoPage('menu.php', Device['MenuId'], 'Menu');
        GoPage('menu.php', Device['MenuId'], 'Menu');
        
    } else if(CurrentModule === 'Tv' && Device['Services']['ActiveMenu'] === false){
        Debug('----------- TV RECORDER');
        TvRecorder();
    }
}
