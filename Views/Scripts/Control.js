// @ts-nocheck
/******************************************************************************
 * @Objetivo: Ejecutar botones del control remoto para todas las marcas
 * @CreadoPor: Tania Maldonado
 * @Fecha: Mayo 26, 2018
 *******************************************************************************/

var PressedKey      = 0,
    Clicks          = 0,
    MaxClicks       = 10,
    TimeClicks      = 1000, //milisegundos
    TimeCheck       = 2000, //milisegundos
    Sequence        = 0,
    ClearingClicks  = false,
    CheckingClicks  = false,
    timeMenu        = 0,
    showInfoDevi  = false,
    timeInfoDevice  = null,
    contInfoDevice  = 0,
    DelayChangeChannel = false,
    DelaySkip          = false;

    document.addEventListener('keydown',KeyHandler,false);
    
    var SwapPausePlay = true;
    
var CheckInfo = 0;
    

    function KeyHandler(e) {
        PressedKey = e.which;
        e.preventDefault();
        //alert(PressedKey);
        //Debug("BOTON:  "+PressedKey);
        if(typeof(gSTB) !== 'undefined' && PressedKey === 9){
            ShiftKey = e.shiftKey;
            if(ShiftKey === true){
                PressedKey = 7;
            }
        }
        
        //Debug('>> PressedKey: '+PressedKey);
        if(Clicks <= MaxClicks) {
            //alert(REMOTE_RED);
            //ShowRecorderMessage(PressedKey);
            switch (PressedKey) {
                case REMOTE_RED:
                    //Debug("BOTON REMOTE_RED");
                    if(showInfoDevi == false){
                        Red();
                    }
                break;
                case REMOTE_BLUE:
                    //Debug("BOTON REMOTE_BLUE");
                    if(showInfoDevi == false){
                        Blue();
                    }
                break;

                case REMOTE_GREEN:
                    //Debug("BOTON REMOTE_GREEN");

                    if(showInfoDevi == false){
                        Green();
                    }
                break;

                case REMOTE_YELLOW:
                    //Debug("BOTON REMOTE_YELLOW");

                    // if(contInfoDevice == 2 && showInfoDevi == false){
                    //     clearTimeout(timeInfoDevice);
                    //     contInfoDevice++;
                    //     timeInfoDevice = setTimeout(function(){
                    //         contInfoDevice=0;
                    //     }, 5500);
                    // }
                    if(showInfoDevi == false){
                       Yellow(); 
                    }
                    
                break;

        /********** NAVEGACION **********/

                case ARROW_KEY_UP:
                    //Debug("BOTON ARROW_KEY_UP");

                    if(contInfoDevice == 0 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }else if(contInfoDevice == 2 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }
                    console.log(contInfoDevice);
                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvUp();
                    } else if(CurrentModule === 'Menu' && showInfoDevi == false){
                        MenuUp();
                    } else if(CurrentModule === 'Movies' && showInfoDevi == false){
                        VodUp();
                    }
                break;

                case ARROW_KEY_DOWN:
                    //Debug("BOTON ARROW_KEY_DOWN");

                    if(contInfoDevice == 1 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }else if(contInfoDevice == 3 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }
                    console.log(contInfoDevice);
                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvDown();
                    } else if(CurrentModule === 'Menu' && showInfoDevi == false){
                        MenuDown();
                    } else if(CurrentModule === 'Movies' && showInfoDevi == false){
                        VodDown();
                    }
                break;

                case ARROW_KEY_RIGHT:
                    //Debug("BOTON ARROW_KEY_RIGHT");

                    if(contInfoDevice == 4 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }else if(contInfoDevice == 6 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }
                    console.log(contInfoDevice);
                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvRight();
                    } else if(CurrentModule === 'Menu' && showInfoDevi == false){
                        MenuRight();
                    } else if(CurrentModule === 'Movies' && showInfoDevi == false){
                        VodRight();
                    } else if(CurrentModule === 'Moods' && showInfoDevi == false){
                        MoodsRight();
                    } 
                break;

                case ARROW_KEY_LEFT:
                    //Debug("BOTON ARROW_KEY_LEFT");

                    if(contInfoDevice == 5 && showInfoDevi == false){
                        contInfoDevice++;
                        timeInfoDevice = setTimeout(function(){
                            contInfoDevice=0;
                        }, 5500);
                    }else if(contInfoDevice == 7 && showInfoDevi == false){
                        clearTimeout(timeInfoDevice);
                        showInfoDevice();
                        contInfoDevice=0;
                        showInfoDevi = true;
                    }
                    console.log(contInfoDevice);
                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvLeft();
                    } else if(CurrentModule === 'Menu' && showInfoDevi == false){
                        MenuLeft();
                    } else if(CurrentModule === 'Movies' && showInfoDevi == false){
                        VodLeft();
                    } else if(CurrentModule === 'Moods' && showInfoDevi == false){
                        MoodsLeft();
                    } 
                break;
                
                case SMALL_ARROW_UP:
                    //Debug("BOTON SMALL_ARROW_UP");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvPageUp();
                    }
                break;
                
                case SMALL_ARROW_DOWN:
                    //Debug("BOTON SMALL_ARROW_DOWN");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvPageDown();
                    }
                break;
                
        /********** CANAL +/- **********/

                case REMOTE_CHANNEL_UP:
                    //Debug("BOTON REMOTE_CHANNEL_UP");

                    if (ActiveEpgContainer === true && (typeof(ENTONE) !== 'undefined' || typeof(gSTB) !== 'undefined')) {
                        if(CurrentModule === 'Tv' && showInfoDevi == false){
                            TvPageUp();
                        }
                    }else if(RecordingPanel == true){
                        console.log("AAH BUENO");
                    }else{
                        if(CurrentModule === 'Tv' && showInfoDevi == false){
                            if(DelayChangeChannel == false){
                                DelayChangeChannel = true;
                                TvChannelUp();
                                setTimeout(function(){
                                    DelayChangeChannel = false;
                                },1000);
                            }
                        }
                    }
                    
                break;

                case REMOTE_CHANNEL_DOWN:
                    //Debug("BOTON REMOTE_CHANNEL_DOWN");

                    if (ActiveEpgContainer === true && (typeof(ENTONE) !== 'undefined' || typeof(gSTB) !== 'undefined')) {
                        if(CurrentModule === 'Tv' && showInfoDevi == false){
                            TvPageDown();
                        }
                    }else if(RecordingPanel == true){
                        if(ListTypeFocus === 'serie'){
                            
                            if((RecordingsList[IndexRecordedFocus].length - 1) > 9 && IndexRecordedProgFocus < (RecordingsList[IndexRecordedFocus].length - 1) ){
                                console.log("AAH BUENO: "+IndexRecordedProgFocus);
                                SetRecordings('down');
            
                                PvrRowFocus = 1;
            
                                SetFocusRecordings();
                            }
                        } else {
                            if(RecordingsList.length > 9 && IndexRecordedFocus < (RecordingsList.length - 1)){
                                SetRecordings('down');
            
                                PvrRowFocus = 1;
            
                                SetFocusRecordings();
                            }
                        }
                    }else{
                        if(CurrentModule === 'Tv' && showInfoDevi == false){
                            if(DelayChangeChannel == false){
                                DelayChangeChannel = true;
                                TvChannelDown();
                                setTimeout(function(){
                                    DelayChangeChannel = false;
                                },1000);
                            }
                            //TvChannelDown();
                        }
                    }
                break;
                
        /********** OPERACIONES **********/
        
                case REMOTE_OK:
                    //Debug("BOTON REMOTE_OK");

                    //Debug('REMOTE_OK');
                    CheckInfo++;
                    if(CurrentModule === 'Tv'){
                        //Debug('REMOTE_OK > CurrentModule '+CurrentModule);
                        TvOk();
                        
                        if(CheckInfo === 2){
                            CheckInfo = 0;
                            TvInfo();
                        }
                    } else if(CurrentModule === 'Menu'){
                        //Debug('REMOTE_OK > MenuOk '+CurrentModule);
                        MenuOk();
                    } else if(CurrentModule === 'Movies'){
                        VodOk();
                    } else if(CurrentModule === 'Moods'){
                        MoodsOk();
                    } 
                    break;
            
                case REMOTE_INFO:
                    //Debug("BOTON REMOTE_INFO");

                    // if(contInfoDevice == 3 && showInfoDevi == false){
                    //     clearTimeout(timeInfoDevice);
                    //     showInfoDevice();
                    //     contInfoDevice=0;
                    //     showInfoDevi = true;
                    // }
                    if(CurrentModule === 'Tv'){
                        TvInfo();
                    } else if(CurrentModule === 'Movies'){
                        VodInfo();
                    }
                break;
                
                case REMOTE_BACK:
                    //Debug("BOTON REMOTE_BACK");

                    if(showInfoDevi == false){
                        Back();
                    }else{
                        removeInfoDevice();
                    }
                    
                break;

                case REMOTE_CLOSE:
                    //Debug("BOTON REMOTE_CLOSE");

                    if(showInfoDevi == false){
                        Close();
                    }else{
                        removeInfoDevice();
                    }
                break;
                
                case PREVIOUS_PROGRAM:
                    //Debug("BOTON PREVIOUS_PROGRAM");

                    if(CurrentModule === 'Tv'  && showInfoDevi == false){
                        //Debug('PREVIOUS_PROGRAM');
                        ReturnLastChannel();
                    }else if(showInfoDevi){
                        removeInfoDevice();
                    }
                break;
                
        /********** GUIA **********/
                
                case REMOTE_GUIDE:
                    if(CurrentModule === 'Tv'  && showInfoDevi == false){
                        
                        TvGuide();
                    }
                break;
                
        /********** MENU **********/
                
                case REMOTE_MENU:
                    //Debug("BOTON REMOTE_MENU");

                    if(timeMenu == 0 &&  showInfoDevi == false){
                        timeMenu = 1;
                        setTimeout(function(){
                            timeMenu = 0;
                        },2000)
                        Menu();
                    } else if(showInfoDevi == true){
                        if (typeof(ASTB) !== 'undefined') {
                            Browser.Action(16);
                            removeInfoDevice();
                        }
                    }
                break;
                
        /********** GRABADOR | PAUSELIVE TV **********/
        
                case REMOTE_PVR:
                    //Debug("BOTON REMOTE_PVR");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        Debug("REMOTE_PVR");
                        TvRecorder();
                    }
                break;
                
                case REMOTE_STOP:
                    //Debug("BOTON REMOTE_STOP");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvStop();
                    }
                break;
                
                case REMOTE_PLAY:
                    //Debug("BOTON REMOTE_PLAY");

                    if(typeof(gSTB) !== 'undefined'){
                        
                        if(CurrentModule === 'Tv' && showInfoDevi == false){
                            if(SwapPausePlay === false){
                                
                                TvPlay();
                                SwapPausePlay = true;
                            } else {
                                
                                TvPause();
                                SwapPausePlay = false;
                            }
                        }
                    } else {
                        if(CurrentModule === 'Tv' && showInfoDevi == false){
                            TvPlay();
                        }
                    }
                break;

                case REMOTE_PAUSE:
                    //Debug("BOTON REMOTE_PAUSE");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvPause();
                    }
                break;
                
                case REMOTE_FORWARD:
                    //Debug("BOTON REMOTE_FORWARD");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvForward();
                    }
                break;
                
                case REMOTE_BACKWARD:
                    //Debug("BOTON REMOTE_BACKWARD");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvBackward();
                    }
                break;
                
                case REMOTE_RECORD:
                    //Debug("BOTON REMOTE_RECORD");

                    if(CurrentModule === 'Tv' && showInfoDevi == false){
                        TvRecord();
                    }
                break;
                
                case REMOTE_FAST_BACKWARD:
                    if(CurrentModule === 'Tv' && PlayingRecording == true){
                        if(DelaySkip == false){
                            DelaySkip = true;
                            TvPlay();
                            SkipChapterRecord("backward");  
                            setTimeout(function(){
                                DelaySkip = false;
                            },1000);
                        }
                    }
                break;
            
                case REMOTE_FAST_FORWARD:
                    if(CurrentModule === 'Tv' && PlayingRecording == true){
                        
                        if(DelaySkip == false){
                            DelaySkip = true;
                            TvPlay();
                            TvPlay();
                            SkipChapterRecord("forward");  
                            setTimeout(function(){
                                DelaySkip = false;
                            },1000);
                        }
                    }
                break;
                
                
        /********** NUMEROS **********/        
                
            
                case 48: // 0
                case 49: // 1
                case 50: // 2
                case 51: // 3
                case 52: // 4 
                case 53: // 5
                case 54: // 6
                case 55: // 7
                case 56: // 8
                case 57: // 9
                    if(CurrentModule === 'Tv' && showInfoDevi == false && PlayingRecording == false){
                        NumericChange(PressedKey - 48);
                    }
                    break;
                
                case 96: // 0
                case 97: // 1
                case 98: // 2
                case 99: // 3
                case 100: // 4 
                case 101: // 5
                case 102: // 6
                case 103: // 7
                case 104: // 8
                case 105: // 9
                    if(CurrentModule === 'Tv' && MacAddress === '00:00:00:00:00:00'){
                        NumericChange(PressedKey - 96);
                    }
                break;
            }

            ++Clicks;
            
            if(CheckingClicks === false){
                setTimeout(CheckClicks,TimeCheck);
                CheckingClicks = true;
            }
        }  else if (Clicks > MaxClicks){
            if(ClearingClicks === false){
                ClearingClicks = true;
                setTimeout(ClearClicks,TimeClicks);
            } 
        }
    }
    
    function ClearClicks(){
        CheckInfo = 0;
        Clicks = 0;
        ClearingClicks = false;
        Sequence = 0;
    }
    
    function CheckClicks(){
        if(ClearingClicks === false){
            Clicks = 0;
            CheckingClicks = false;
        }
    }

/*******************************************************************************
 * Función para ejecutar los eventos de las teclas en Pantalla de Vendor = Generic
 *******************************************************************************/
function MakeEvent(key){
    document.dispatchEvent(new KeyboardEvent('keydown', {'keyCode':key, 'which':key}));
}
    
    
