// @ts-nocheck

var n = 0;
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
    
    var x24Today = new Date();	
    var x24Hour = x24Today.getHours() + ':' + x24Today.getMinutes() + ':' + x24Today.getSeconds();
    //var info2 = JSON.parse(info);
    //var tasks   = JSON.parse(pvrManager.GetAllTasks());
    //ShowRecorderMessage(tasks.lenght);
    var inre = JSON.parse(pvrManager.GetTaskByID(0));
    var name = inre.fileName, url = inre.url, endTime = inre.endTime, errorCode = inre.errorCode;
    pvrManager.RemoveTask(0,1);
    setInfomirLog('RECORDER,'+gSTB.GetDeviceMacAddress()+','+gSTB.RDir('IPAddress')+','+x24Today.getDate() + "/" + (x24Today.getMonth() +1) + "/" + x24Today.getFullYear()+' '+x24Hour+',SIMULATION_ERROR_RECORD '+'-10');
    restartTask(name, url, endTime, errorCode);
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
