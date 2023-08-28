
var Comando = [];
var MacAddressAppControl = '00:00:00:00:00:00';

$(function() {
    InitialDataAppControl();
    if(STBControll[0]['CON']=="1"){
        DBAppControl();
    }
});

function InitialDataAppControl(){    
    
    if (typeof(ASTB) !== 'undefined') {
        MacAddressAppControl  = ASTB.GetMacAddress();
    } else if (typeof(ENTONE) !== 'undefined') {
        MacAddressAppControl  = ENTONE.stb.getMacAddress();
    } else if (typeof(gSTB) !== 'undefined'){
        MacAddressAppControl  = gSTB.GetDeviceMacAddress();
    }  
    
    $.ajax({
        type: "POST",
        url: 'Core/Controllers/Firebase.php',
        data: { 
            Option    : 'GetDeviceByMac',
            mac_address: MacAddressAppControl
        }, 
        async: false,
        success: function (response) {
            STBControll  = $.parseJSON(response);
        }
    });
    
}

function DBAppControl(){
    $.ajax({
        type: "POST",
        url: 'Core/Controllers/Firebase.php',
        data: { 
            Option    : 'GetControllByMac',
            mac_address: MacAddressAppControl
        }, 
        async: false,
        success: function (response) {
            Comando  = $.parseJSON(response);
            setTimeout(DBAppControl, 1000);
        }
    });
    ChangeAppControl()
}

function ChangeAppControl(){
       
    for(var i = 0; i < Comando.length; i++){
        
        //alert(Comando[0].MAC);
        if (Comando[i].STATUS === 'pendingServer'){
            
            switch(Comando[i].ORDEN){
                
                case 'REMOTE_RED':
                    
                    Red();
                    break;
    
                
                case 'REMOTE_BLUE':
                    
                    Blue();
                    break;
    
                
                case 'REMOTE_GREEN':
                    
                    Green();
                    break;
    
                
                case 'REMOTE_YELLOW':
                    
                    Yellow();
                    break;
                
                
                case 'ARROW_KEY_UP':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvUp();
                    
                    } else if(CurrentModule === 'Menu'){
                        
                        MenuUp();
                    
                    } else if(CurrentModule === 'Movies'){
                        
                        VodUp();
                    }
                    break;
                
                
                case 'ARROW_KEY_DOWN':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvDown();
                    
                    } else if(CurrentModule === 'Menu'){
                        
                        MenuDown();
                    
                    } else if(CurrentModule === 'Movies'){
                        
                        VodDown();
                    }
                    break;
    
                
                case 'ARROW_KEY_RIGHT':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvRight();
                    
                    } else if(CurrentModule === 'Menu'){
                        
                        MenuRight();
                    
                    } else if(CurrentModule === 'Movies'){
                        
                        VodRight();
                    
                    } else if(CurrentModule === 'Moods'){
                        
                        MoodsRight();
                    } 
                    break;
    
                
                case 'ARROW_KEY_LEFT':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvLeft();
                    
                    } else if(CurrentModule === 'Menu'){
                        
                        MenuLeft();
                    
                    } else if(CurrentModule === 'Movies'){
                        
                        VodLeft();
                    
                    } else if(CurrentModule === 'Moods'){
                        
                        MoodsLeft();
                    } 
                    break;
                    
                
                case 'SMALL_ARROW_UP':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvPageUp();
                    }
                    break;
                    
                
                case 'SMALL_ARROW_DOWN':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvPageDown();
                    }
                    break;
                    
            /********** CANAL +/- **********/
    
                
                case 'REMOTE_CHANNEL_UP':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvChannelUp();
                    }
                    break;
    
                
                case 'REMOTE_CHANNEL_DOWN':
                    
                    if(CurrentModule === 'Tv'){
                        
                        TvChannelDown();
                    }
                    break;
                case 'REMOTE_GUIDE':
                        if(CurrentModule === 'Tv'){
                            TvGuide();
                        }
                    break;
            }
    
            //$.ajax({
            //    type: "POST",
            //    url: 'BBINCO/TVCHL/Core/Controllers/Firebase.php',
            //    data: { 
            //        Option    : 'DeleteControlbyMac',
            //        MacAddress: '00:1a:79:6c:cc:3e'
            //    }, 
            //    async: false,
            //    success: function (response) {
            //        
            //        Comando  = $.parseJSON(response);
            //        //alert(Comando[0].MAC);
            //    }
            //});
    

            $.ajax({
                type: "POST",
                url: 'Core/Controllers/Firebase.php',
                data: { 
                    Option    : 'UpdateControlByMac',
                    mac_address: MacAddressAppControl
                }
            });
        }
    }
}



     
