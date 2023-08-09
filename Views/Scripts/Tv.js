// @ts-nocheck
 /******************************************************************************
 * @Objetivo: Ejecucion de funciones para EPG
 * @CreadoPor: Tania Maldonado
 * @Fecha: Mayo 26, 2018
 * 
 * @NavegadoresPorMarca:
 * Amino A50: Opera 12
 * Amino A540, A140, A138: Opera 11
 * Kamai 500x: Safari 538.1
 * Lg UV770H: Chrome 53 
 *******************************************************************************/
  //window.history.forward(1);
    /* Funcion para dar formato a la fecha */
    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1;
        var dd = this.getDate();
        return [this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('');
    };
    
    /* Variables generales */
    var ChannelsJson         = '',
        BackUpChannelsJson   = '',
        ChannelPosition      = 0,
        LastChannelPosition  = 0,
        SourceEpgFile        = '',
        ChannelsLength       = 0,
        Hours                = [],
        EpgDataActive        = false,
        CurrentDateFormat    = '',
        CurrentDate          = '',
        SkipChapter          = null,
        SkipChapterClick     = 0;

        var Booting     = true;

    /* Canal */
    var Source               = '',
        Port                 = '',
        ProgramIdChannnel    = 0,
        ProgramIdPosition    = 0,
        AudioPid             = 0,
        Direction            = 'UP';

    /* Horas y fechas */
    var FormatDateAndHour    = '',
        FormatHour           = '',
        StartDateChannel     = '',
        FormatStartDate      = '',
        CurrentStbDate       = '';
        
    /* Epg */
    var ActiveEpgContainer   = false,
        ProgramPosition      = 0,
        ChannelPositionFocus = 0;
 
    /* Info */
    var ActiveInfoContainer  = false,
        InfoTimer            = '',
        SecondsToCloseInfo   = 10,                                   /* Segundos para ocultar cuadro de informacion */
        TimeoutInfo          = SecondsToCloseInfo * 1000,
        InfoContainer        = document.getElementById('InfoContainer'),
        InfoContainerNodes   = document.getElementById('InfoContainer').childNodes,
        load                 = true;

    /* Canal */
    var ChannelContainer     = document.getElementById('ChannelNumber'),
        NumericChangeTimer   = '',
        ChannelToChange      = 0,
        ChannelMax           = 0;
    
    /* Definicion del arreglo que contendra todas las horas del dia a mostrar */
        Hours = [['00:00','12:00 am'],['00:30','12:30 am'],['01:00','1:00 am'],['01:30','1:30 am'],['02:00','2:00 am'],['02:30','2:30 am'],['03:00','3:00 am'],['03:30','3:30 am'],
                 ['04:00','4:00 am'],['04:30','4:30 am'],['05:00','5:00 am'],['05:30','5:30 am'],['06:00','6:00 am'],['06:30','6:30 am'],['07:00','7:00 am'],['07:30','7:30 am'],
                 ['08:00','8:00 am'],['08:30','8:30 am'],['09:00','9:00 am'],['09:30','9:30 am'],['10:00','10:00 am'],['10:30','10:30 am'],['11:00','11:00 am'],['11:30','11:30 am'],
                 ['12:00','12:00 pm'],['12:30','12:30 pm'],['13:00','1:00 pm'],['13:30','1:30 pm'],['14:00','2:00 pm'],['14:30','2:30 pm'],['15:00','3:00 pm'],['15:30','3:30 pm'],
                 ['16:00','4:00 pm'],['16:30','4:30 pm'],['17:00','5:00 pm'],['17:30','5:30 pm'],['18:00','6:00 pm'],['18:30','6:30 pm'],['19:00','7:00 pm'],['19:30','7:30 pm'],
                 ['20:00','8:00 pm'],['20:30','8:30 pm'],['21:00','9:00 pm'],['21:30','9:30 pm'],['22:00','10:00 pm'],['22:30','10:30 pm'],['23:00','11:00 pm'],['23:30','11:30 pm']];

    /* Validacion para reinicar dispositivo y buscar actualizaciones de la epg */
    var LastUpdatedTime     = '';

    /* Variable grabador */
    var RecordingsToCheck   = '',
        IndexRec              = 0;

    /* Canales digitales */
    var ImageDigital            = document.getElementById('ImageDigitalChannel'),
        ActiveDigitalChannel    = false,
        DigitalContent          = [],
        IndexDigital            = 0,
        IntervalDigital         = '',
        DigitalSource           = '',
        DigitalImgSource        = '';

    var ContentFrame            = document.getElementById('ContentFrame'),
        ActiveFrame             = false;

    
    // var div = document.getElementById('loadingTV');
    // var parent = div.parentElement;
    // parent.removeChild(div);
    // div = null;
    // parent = null;
    // if(MacAddress === '00:00:00:00:00:00'){
    //     ////Debug('Imagen para test');
    //     document.getElementsByClassName('GeneralBox')[0].style.backgroundImage = "url('./Media/General/tv.jpg')";
    // }
/*******************************************************************************
 * Obtiene los datos del archivo JSON y empieza la reproduccion de canales
 *******************************************************************************/

    /* Asigna archivo para consultar por primera vez */
    setTimeout(SetEpgFile,200);
    /* Carga inicial para reproducir canal por primera vez */
    //setTimeout(SetChannel,1800, '');
function SetEpgFile(){
    /* Consulta la fecha actual cada vez que actualiza la guia */
    if(typeof(ASTB) !== 'undefined'){
        ASTB.DebugString('2~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONSULTA DE DATOS FECHA');
        Debug('2~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONSULTA DE DATOS FECHA');

    }
    CurrentDateFormat = new Date();
    CurrentDate = CurrentDateFormat.yyyymmdd();
    NewDate     = CurrentDate;
    if(typeof(ASTB) !== 'undefined'){
        ASTB.DebugString('3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FECHA DEL JS= '+NewDate);
        Debug('3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FECHA DEL JS= '+NewDate);

    }
    /* Si tiene activa EPG actualiza la variable que por defecto tiene el valor de general */
    if(Device['Services']['ActiveEpg'] === true){
            //if(MacAddress === '00:00:00:00:00:01'){
            //  SourceEpgFile = Libraries['EpgDaysPath'] + 'epg_demo.json';
            // } else {
                SourceEpgFile = Libraries['EpgDaysPath'] + 'epg_' + CurrentDate + '_' + Device['Services']['PackageId'] + '.json';
            // }
        if(typeof(ASTB) !== 'undefined'){
            ASTB.DebugString('3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LLAMANDO FUNCION PARA DESCARGAR INFO DE SERVER CON URL= '+SourceEpgFile);
            Debug('3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LLAMANDO FUNCION PARA DESCARGAR INFO DE SERVER CON URL= '+SourceEpgFile);
            
        }
        //Debug('------- SetEpgFile ->>> SourceEpgFile: ' + SourceEpgFile);
        GetJsonEpg(SourceEpgFile, 0);
    } else {
        EpgDataActive = false;

        //////Debug('------- EpgDataActive: FALSE');
        GetJsonChannels();
        
    }
    // SetChannel('');
}
    
function GetJsonEpg(Sour, rest){

    if(typeof(ASTB) !== 'undefined'){
        ASTB.DebugString('4~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PREPARANDO AJAX');
        Debug('4~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PREPARANDO AJAX');

    }
     jqxhr =  $.getJSON( Sour )
        .done(function( json ) {
            // console.log( json );
            SourceEpgFile = Sour;
            if(typeof(ASTB) !== 'undefined'){
                ASTB.DebugString('5~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE SOURCEEPGFILE= '+SourceEpgFile);
                Debug('5~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE SOURCEEPGFILE= '+SourceEpgFile);
            }
            ChannelsJson = [];
            ChannelsJson = json;
            EpgDataActive = true;
            if(typeof(ASTB) !== 'undefined'){
                ASTB.DebugString('6~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANNELSJSON= '+ChannelsJson[0]['NAME']);
                Debug('6~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANNELSJSON= '+ChannelsJson[0]['NAME']);
            }
            ////Debug(Sour);
            ChannelsLength = ChannelsJson.C_Length - 1;
            if(typeof(ASTB) !== 'undefined'){
                ASTB.DebugString('7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANELSLENGHT= '+ChannelsLength.toString());
                Debug('7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANELSLENGHT= '+ChannelsLength.toString());
            }
            ChannelMax     = parseInt(ChannelsJson[ChannelsLength].CHNL, 10);
            if(typeof(ASTB) !== 'undefined'){
                ASTB.DebugString('8~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE ChannelMax= '+ChannelMax.toString());
                Debug('8~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE ChannelMax= '+ChannelMax.toString());
            }
            SetChannel('');
            if(typeof(ASTB) !== 'undefined'){
                ASTB.DebugString('9~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES Se termina de cargar la guia y se cambia de canal ');
                Debug('9~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES Se termina de cargar la guia y se cambia de canal ');
            }
        })
        .fail(function( jqxhr, DFDDtextStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    jqxhr = null;
       

    // $.ajax({
    //     cache: false,
    //     type: 'GET',
    //     url: ServerSource + Sour,
    //     success: function (response){
    //         // console.log(response[0]);
    //         SourceEpgFile = Sour;
    //         if(typeof(ASTB) !== 'undefined'){
    //             ASTB.DebugString('5~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE SOURCEEPGFILE= '+SourceEpgFile);
    //             Debug('5~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE SOURCEEPGFILE= '+SourceEpgFile);
    //         }
    //         ChannelsJson = [];
    //         ChannelsJson = response;
    //         EpgDataActive = true;
    //         if(typeof(ASTB) !== 'undefined'){
    //             ASTB.DebugString('6~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANNELSJSON= '+ChannelsJson[0]['NAME']);
    //             Debug('6~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANNELSJSON= '+ChannelsJson[0]['NAME']);
    //         }
    //         ////Debug(Sour);
    //         ChannelsLength = ChannelsJson.C_Length - 1;
    //         if(typeof(ASTB) !== 'undefined'){
    //             ASTB.DebugString('7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANELSLENGHT= '+ChannelsLength.toString());
    //             Debug('7~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE CHANELSLENGHT= '+ChannelsLength.toString());
            
    //         }
    //         ChannelMax     = parseInt(ChannelsJson[ChannelsLength].CHNL, 10);
    //         if(typeof(ASTB) !== 'undefined'){
    //             ASTB.DebugString('8~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE ChannelMax= '+ChannelMax.toString());
    //             Debug('8~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES AJAX/VARIABLE ChannelMax= '+ChannelMax.toString());
    //         }
    //         SetChannel('');
    //         if(typeof(ASTB) !== 'undefined'){
    //             ASTB.DebugString('9~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES Se termina de cargar la guia y se cambia de canal ');
    //             Debug('9~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SUCCES Se termina de cargar la guia y se cambia de canal ');
    //         }
    //     },
    //     error: function (response){
    //         if(typeof(ASTB) !== 'undefined'){
    //             ASTB.DebugString('10~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR LA RESPUESTA DEL SERVIDOR NO TRAE INFORMACION O LA URL ESTA MAL');
    //             Debug('10~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR LA RESPUESTA DEL SERVIDOR NO TRAE INFORMACION O LA URL ESTA MAL');
            
    //         }
    //         if(rest!==-1){
    //             if(rest<2){
    //                 if(typeof(ASTB) !== 'undefined'){
    //                     ASTB.DebugString('11~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENTRA A FUNCION PARA MANDAR A TRAER LA INFO DE LA GUIA DE DIAS ATRAS');
    //                     Debug('11~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ENTRA A FUNCION PARA MANDAR A TRAER LA INFO DE LA GUIA DE DIAS ATRAS');
    //                 }
    //                 rest++;
    //                 if(typeof(ASTB) !== 'undefined'){
    //                     ASTB.DebugString('12~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR AJAX/VARIABLE REST='+rest.toString());
    //                     Debug('12~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR AJAX/VARIABLE REST='+rest.toString());

    //                 }
    //                 var d = new Date();
    //                 d.setDate(d.getDate() - rest);
    //                 if(typeof(ASTB) !== 'undefined'){
    //                     ASTB.DebugString('13~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR AJAX/VARIABLE FECHA RESTADA='+d.toString());
    //                     Debug('13~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR AJAX/VARIABLE FECHA RESTADA='+d.toString());

    //                 }
    //                 Sour = Libraries['EpgDaysPath'] + 'epg_' + d.yyyymmdd() + '_' + Device['Services']['PackageId'] + '.json';
    //                 if(typeof(ASTB) !== 'undefined'){
    //                     ASTB.DebugString('14~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR AJAX/VARIABLE Sour='+Sour);
    //                     Debug('14~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR AJAX/VARIABLE Sour='+Sour);

    //                 }
    //                 ////Debug("NO SE ENCONTRO EL ARCHIVO, BUSCANDO: " + SourceEpgFile);
    //                 if(typeof(ASTB) !== 'undefined'){
    //                     ASTB.DebugString('15~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR Se vuelve a llamar getjsonepg con fecha cambiada='+d.toString());
    //                     Debug('15~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR Se vuelve a llamar getjsonepg con fecha cambiada='+d.toString());

    //                 }
    //                 GetJsonEpg(Sour, rest);

    //             }else{
    //                 Sour = Libraries['EpgDaysPath'] + 'Default/epg_default_' + Device['Services']['PackageId'] + '.json';
                    
    //                 if(typeof(ASTB) !== 'undefined'){
    //                     ASTB.DebugString('17~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR SIGUE BUSCANDO GUIA CON DIAS ATRAS'+Sour);
    //                     Debug('17~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR SIGUE BUSCANDO GUIA CON DIAS ATRAS'+Sour);

    //                 }
    //                 ////Debug("NO SE ENCONTRO EL ARCHIVO, BUSCANDO: " + SourceEpgFile);
    //                 GetJsonEpg(Sour, -1);
                
    //             }
    //         }else{
    //             // El archivo no se encuentra o viene vacio, consulta a la base de datos
    //             EpgDataActive = false;
    //             GetJsonChannels();
    //             if(typeof(ASTB) !== 'undefined'){
    //                 ASTB.DebugString('16~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR Si no encuentra nada de guia consilta la BD');
    //                 Debug('16~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR Si no encuentra nada de guia consilta la BD');k
    //             }
    //         }
    //     }
    // });
}
function CheckUpdatedJson(){
    if (typeof ChannelsJson[0].PROGRAMS === 'undefined') {
        // Regresa al respaldo
        ChannelsJson = BackUpChannelsJson;
    } else {
        if(ChannelsJson[0].PROGRAMS[0]['DTNU'] === CurrentDate) {
            // Borra el respaldo
            BackUpChannelsJson = '';
        }
    }
}

function GetJsonChannels(){ 
    $.ajax({
        type: 'POST',
        // async: false,
        cache: false,
        url: ServerSource + 'Core/Controllers/Packages.php',
        data: { 
            Option : 'GetChannels',
            PackageId: Device['Services']['PackageId']
        },
        success: function (response){
            ChannelsJson = $.parseJSON(response);   
            ChannelsLength = ChannelsJson.length - 1;
            ChannelMax     = parseInt(ChannelsJson[ChannelsLength].CHNL, 10);
            
            ////Debug('------- GetJsonChannels -> ChannelsLength: '+ChannelsLength);
            
            if(Device['Services']['ActiveEpg'] === true){
                SetLog(ErrorLoadGuide);
            }
            SetChannel('');
        }
    });
}
    
/*******************************************************************************
 * Reproduce canal y abre informacion del canal en reproduccionk
 *******************************************************************************/

function SetChannel(NewDirection){
    ////Debug('SetChannel = '+NewDirection);
    
    if(ActiveEpgContainer === false){
        
        /* Valida si se esta subiendo o bajando de canal para restar|sumar una posicion */
        if(NewDirection !== ''){
            
            ////Debug('############### A LastChannelPosition '+LastChannelPosition + ' ChannelPosition: '+ChannelPosition);
            /* Obtiene los datos del canal a reproducir */
            LastChannelPosition = ChannelPosition;
            ////Debug('############### B LastChannelPosition '+LastChannelPosition+ ' ChannelPosition: '+ChannelPosition);
            
            
            Direction = NewDirection;

            ////Debug('SetChannel = Direction '+Direction);
            /* Suma o resta segun sea el caso */
            (Direction === 'UP') ? ChannelPosition++: ChannelPosition--;

            ////Debug('1- ChannelPosition =  '+ChannelPosition);

            /* Validamos si llego al princio/fin del arreglo*/
            if(ChannelPosition < 0){
                ChannelPosition = ChannelsLength;
            }

            if(ChannelPosition > ChannelsLength){
                ChannelPosition = 0;
            }

            ////Debug('2- ChannelPosition =  '+ChannelPosition);
        }

        /* Actualiza el canal */
            Source = ChannelsJson[ChannelPosition].SRCE;
            Port   = ChannelsJson[ChannelPosition].PORT;
            //alert(Source + Port);
            ProgramIdChannnel = ChannelsJson[ChannelPosition].PRGM;
            ProgramIdPosition = ChannelsJson[ChannelPosition].PSCN;
            AudioPid          = ChannelsJson[ChannelPosition].ADIO;

        /* Regresamos a su valor inicial la variable DIRECTION*/
            Direction = 'UP';
            ////Debug('********************************************');
            ////Debug('STTN::: '+ChannelsJson[ChannelPosition].STTN);

            ////Debug('SRCE::: '+Source + ' : '+Port);
            //ShowRecorderMessage('CHANNEL UPP DOWN '+ChannelPosition);
            if(ChannelsJson[ChannelPosition].STTN !== 'CONTENT'){
                if(ActiveDigitalChannel === true){
                    CloseDigitalChannel();
                }
                ////Debug('PlayChannel');
                //alert('Source: '+ Source +' Port: ' +Port);
                //PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);   /* TvFunctions por marca */
                if(load){
                    
                    
                    //window.onload=function() {
                    //    alert();    
                    //    PlayChannel(Source, Port);   /* TvFunctions por marca */
                    //}
                    $(document).ready(function(){
                        //your code
                        if(window.tizen !== undefined){
                            PlayChannel(Source, Port);
                        }else{

                            PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);  
                             /* TvFunctions por marca */  
                        }
                    });
                    load = false;
                }else{
                    if(window.tizen !== undefined){
                        PlayChannel(Source, Port);
                    }else{
                        //alert(Source+Port); 
                        PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);   /* TvFunctions por marca */
                    }
                }
                
                //PlayChannel(Source, Port);   /* TvFunctions por marca */
            } else {
                Debug('GetDigitalChannel');
                //if(typeof(gSTB) !== 'undefined'){
                    //alert(ChannelsJson[ChannelPosition].STTN);
                    // if(load){
                    //     //window.onload=function() {
                    //     //    alert();    
                    //     //    PlayChannel(Source, Port);   /* TvFunctions por marca */
                    //     //}
                    //     $(document).ready(function(){
                            //your code
                            GetDigitalChannel();
                    //     });
                    //     load = false;
                    // }else{
                    //     ActiveDigitalChannel = true;
                    //     SetDigitalChannel();
    
                    //     // Si la guia esta cerrada muestra cuadro con informacion del canal en reproduccion
                    //     ShowInfo();
                    // }
                    
                // } else {
                    //  SetFrame();
                // }
                
            }
        
    }
    ////Debug('------- SetChannel ->: '+Source + ' ChannelPosition: '+ChannelPosition);
}



function GetDigitalChannel(){
    ActiveDigitalChannel = true;

    var GetModule = ChannelsJson[ChannelPosition].INDC;

    DigitalSource = Libraries['MultimediaSource'] + GetModule + '/';
    DigitalImgSource = '../../Multimedia/' + GetModule + '/';

    $.ajax({
        type: 'POST',
        url: ServerSource + 'Core/Controllers/Template.php',
        async:false,
        data: {
            Option : 'getDigitalChannel',
            ModuleName : GetModule
        },
        success: function (response){
            DigitalContent = $.parseJSON(response);
            ////Debug('SetDigitalChannel');
            
        }
    });
    setTimeout(SetDigitalChannel(),1000);
    
    
    // Si la guia esta cerrada muestra cuadro con informacion del canal en reproduccion
    ShowInfo();
}

var DigitalChannel = document.getElementById('DigitalChannel');
    
function SetDigitalChannel(){
    Debug('--> SetDigitalChannel  = ' +ActiveDigitalChannel);
    if(ActiveDigitalChannel === true){
        if(DigitalContent.length > 0){
            var FileType = DigitalContent[IndexDigital].split('.')[1];
           // ImageDigital.src = '';
            //ImageDigital.style.display = 'none';

            if(FileType === 'mp4'){
                clearTimeout(IntervalDigital);

                ImageDigital.src = '';
                ImageDigital.style.display = 'none';
                
                PlayDigitalChannel(DigitalSource+DigitalContent[IndexDigital]);
        
        
                Debug('Hasta aqui todo bien FINAL');
            } else {
                
                ImageDigital.src = DigitalSource+DigitalContent[IndexDigital];
                ImageDigital.style.display = 'inline';

                IntervalDigital = setInterval(SetDigitalChannel,9000);
            }

            ////Debug(DigitalSource+DigitalContent[IndexDigital]);

            IndexDigital++;

            if(IndexDigital > DigitalContent.length - 1){
                IndexDigital = 0;
            }
        } else {
            //ShowRecorderMessage('SetDigitalChannel');
            TvChannelUp();
        }
    }
}


function CloseDigitalChannel(){
    Debug("CloseDigitalChannel");
    ActiveDigitalChannel = false;
    ImageDigital.src = '';
    ImageDigital.style.display = 'none';
    
    clearTimeout(IntervalDigital);
}

function SetFrame(){
    ActiveFrame = true;

    // Detiene el proceso de la reproduccion anterior
    StopVideo();
    
    // Maximiza el video en caso de que no este en pantalla completa
    MaximizeTV();
    
    // Activamos la bandera
    PlayingChannel   = true;   
    
    // Si la guia esta cerrada muestra cuadro con informacion del canal en reproduccion
    ShowInfo();

    // Si tiene una fecha ya registrada guarda estadisticas en la BD
    if(StartDateChannel !== ''){
        SetChannelStatistics();
    }
    
    // Actualiza la fecha inicio de la reproduccion del canal */
    StartDateChannel = new Date();
    
    var Page         = ChannelsJson[ChannelPosition].SRCE,
        ModuleId     = ChannelsJson[ChannelPosition].PORT,
        ChangeModule = ChannelsJson[ChannelPosition].INDC;
    
    ContentFrame.style.display = 'inline';
    ContentFrame.src = Libraries['ServerSource'] + Page+'?MacAddress='+MacAddress+'&ModuleId='+ModuleId+'&CurrentModule='+ChangeModule;
    ////Debug(Libraries['ServerSource'] + Page+'?MacAddress='+MacAddress+'&ModuleId='+ModuleId+'&CurrentModule='+ChangeModule);
}

function CloseFrame(){
    ActiveFrame = false;
    
    ContentFrame.style.display = 'inline';
    ContentFrame.src = '';
}
/*******************************************************************************
 * Regresa al ultimo canal 
 *******************************************************************************/  
   
    function ReturnLastChannel(){
        
        ////Debug('................ReturnLastChannel(): '+LastChannelPosition+ ' ChannelPosition: '+ChannelPosition);
        if(ActiveEpgContainer === false){
            ////Debug('ActiveEpgContainer === false');
            if(LastChannelPosition !== ChannelPosition){
                Source = ChannelsJson[LastChannelPosition].SRCE;
                Port   = ChannelsJson[LastChannelPosition].PORT;
                ProgramIdChannnel = ChannelsJson[ChannelPosition].PRGM;
                ProgramIdPosition = ChannelsJson[ChannelPosition].PSCN;
                AudioPid          = ChannelsJson[ChannelPosition].ADIO;

                var CurrentChannelPosition = ChannelPosition;
                ChannelPosition = LastChannelPosition;
                LastChannelPosition = CurrentChannelPosition;
                if(ChannelsJson[ChannelPosition].STTN !== 'CONTENT'){
                    if(ActiveDigitalChannel === true){
                        CloseDigitalChannel();
                    }
                    
                    if(ActiveFrame === true){
                        CloseFrame();
                    }
                    if(load){
                       $(document).ready(function(){
                            //your code
                            if(window.tizen !== undefined)  
                                PlayChannel(Source, Port);
                            else
                                PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);  /* TvFunctions por marca */
                        });
                        load = false;
                    }else{
                        if(window.tizen !== undefined){
                            PlayChannel(Source, Port);
                        }else
                        PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);   /* TvFunctions por marca */
                    }
                    
                } else {
                    Debug('');
                    GetDigitalChannel();
                }
            } else {
                ////Debug('ELSE LCP === CP:: '+LastChannelPosition +' !== '+ ChannelPosition);
            }
        }
    }
    
/*******************************************************************************
 * Actualiza la posicion del canal cuando presionan las teclas numericas 0-9
 *******************************************************************************/  

    function NumericChange(Key){

        ////Debug('Key: '+Key);
        if(ActiveEpgContainer === false){
            /* Limpiamos el timer */
            clearTimeout(NumericChangeTimer);

            if(ChannelToChange === 0){
                /* Asigna el valor ingresado, ya que es el primero */
                ChannelToChange = Key;
            } else {
                /* Multiplica por 10 el digito que se haya ingresado previamente mas el nuevo que se ingreso */
                ChannelToChange *= 10;
                ChannelToChange = ChannelToChange + Key;
            }

            ////Debug('ChannelToChange: '+ChannelToChange);

            ////Debug('ChannelMax: '+ChannelMax);

            if(ChannelToChange > ChannelMax){
                /* Si excede el numero de canales maximo limpia el timer y regrese a su valor inicial el numero a cambiar */
                clearTimeout(NumericChangeTimer);
                ChannelToChange = 0;

                ChannelContainer.textContent = '';
            } else {
                /* Muestra el contener del canal con los numeros recibidos */

                ChannelContainer.textContent = ChannelToChange;
                clearTimeout(NumericChangeTimer);

                /* Crea timer para ocultar el canal y hacer el cambio */
                NumericChangeTimer = setTimeout(function () {
                    /*Obtiene el numero de canal actual*/
                    var CurrentChannel   = parseInt(ChannelsJson[ChannelPosition].CHNL, 10);
                    ////Debug('CurrentChannel: '+CurrentChannel);
                    /* Busca la posicion del canal o recibido */
                    var PositionToChange = FindChannelPosition(ChannelToChange);
                    ////Debug('PositionToChange: '+PositionToChange);
                    if(ChannelToChange !== CurrentChannel){
                        /* Asignamos el ultimo canal reproducido */
                        LastChannelPosition = ChannelPosition;
                        /* Actualizamos a la posicion a cambiar */
                        ChannelPosition = PositionToChange;
                        /* Regresa el canal a cambiar a 0 */
                        ChannelToChange = 0;
                        /* Limpia el timer */
                        clearTimeout(NumericChangeTimer);
                        /* Reproduce el canal */
                        SetChannel('');
                    }

                    /* Oculta el contenedor del numero */
                    ChannelContainer.textContent = '';
                }, 3000);
            }
        }
    }
    
/*******************************************************************************
 * Busca el canal disponible
 *******************************************************************************/

    function FindChannelPosition(ChannelToChange){
        var Index            = 0,
            NewChannelNumber = parseInt(ChannelToChange, 10),
            ChannelNumber    = '',
            CheckChannel     = false,
            IndexB           = 0,
            Position         = 0;

        /* Valida en todas las posiciones si encuentra un numero de canal igual al que se recibio */
        while(Index <= ChannelsLength){
            if(NewChannelNumber === parseInt(ChannelsJson[Index].CHNL, 10)){
                Position = Index;
                Index = ChannelsLength;
                CheckChannel = true;
            }
            Index++;
        }

        /* En caso de no encontrar el canal, buscara la posicion mas cercana */
        if(CheckChannel === false){
            while(IndexB < ChannelsLength){

                ChannelNumber = parseInt(ChannelsJson[IndexB].CHNL, 10);
                
                if(ChannelNumber === (NewChannelNumber - 1) || ChannelNumber === (NewChannelNumber + 1)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 2) || ChannelNumber === (NewChannelNumber + 2)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 3) || ChannelNumber === (NewChannelNumber + 3)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 4) || ChannelNumber === (NewChannelNumber + 4)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 5) || ChannelNumber === (NewChannelNumber + 5)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 6) || ChannelNumber === (NewChannelNumber + 6)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 7) || ChannelNumber === (NewChannelNumber + 7)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 8) || ChannelNumber === (NewChannelNumber + 8)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 9) || ChannelNumber === (NewChannelNumber + 9)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                else if(ChannelNumber === (NewChannelNumber - 10) || ChannelNumber === (NewChannelNumber + 10)){
                    Position = IndexB;
                    IndexB = ChannelsLength;
                }
                IndexB++;
            }
        }
        return Position;
    }
    
/*******************************************************************************
 * Muestra la informacion del canal
 *******************************************************************************/
    
function ShowInfo(){
    
    if(ActiveEpgContainer === false){
        if(ActiveInfoContainer === false){
            InfoContainer.style.visibility = 'visible';
        }

        /* Carga la informacion actual*/
        LoadCurrentData(FindCurrentHour(GetCurrentHour()));

        if(EpgDataActive === true){
            var Times = '<p class="Times">\u00A0('+FormatHours(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].STRH)+' - '+FormatHours(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].FNLH)+')</p>';
            var Ttle = '<p class="Ttle">'+ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].TTLE+'\u00A0</p>';
            var Rtg = '<p class="Rtg">\u00A0'+ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].TVRT+'</p>';

            InfoContainerNodes[1].textContent  = ChannelsJson[ChannelPosition].CHNL+' - ' +ChannelsJson[ChannelPosition].INDC.toUpperCase();
            //InfoContainerNodes[3].textContent  = ChannelsJson[ChannelPosition].QLTY;
            //InfoContainerNodes[5].textContent  = ChannelsJson[ChannelPosition].INDC;
            InfoContainerNodes[7].textContent  = FormatHour;
            InfoContainerNodes[9].innerHTML    = Ttle + Times + Rtg;
            if(RecordingsToCheck !== ''){
                for(IndexRec = 0; IndexRec < RecordingsToCheck.length; IndexRec++){
                    if(RecordingsToCheck[IndexRec].databasekey === ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].DBKY) {
                        InfoContainerNodes[9].innerHTML  = Ttle + Times + Rtg + '<p class="RecInfo">\u00A0REC</p>';
                        IndexRec = RecordingsToCheck.length;
                    }
                }
            }
            //InfoContainerNodes[11].textContent = TimeConvert(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].MNTS);
            //InfoContainerNodes[13].textContent = FormatHours(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].STRH)+' - '+FormatHours(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].FNLH);
            InfoContainerNodes[15].textContent = ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].DSCR;
                        
        } else {
            InfoContainerNodes[1].textContent  = ChannelsJson[ChannelPosition].CHNL+' - ' +ChannelsJson[ChannelPosition].INDC.toUpperCase();
            InfoContainerNodes[7].textContent  = FormatHour;
        }

        Times = null;
        Ttle = null;
        Rtg = null;

            /* Limpia el contador */
        clearTimeout(InfoTimer);

        /* Contador para ocultar contenedor principal con la informacion*/
        InfoTimer = setTimeout(HideInfo,TimeoutInfo);

        ActiveInfoContainer = true;
    }
}
    
// ORDEN ELEMENTOS INFO
// 1  ='ChannelNumber'
// 3  ='Quality'
// 5  ='ChannelName'
// 7  ='Date'
// 9  ='Title'
// 11 ='Duration'
// 13 ='Time'
// 15 ='Description'

/*******************************************************************************
 * Oculta la informacion del canal y vacia los contenedores
 *******************************************************************************/

    function HideInfo(){
        if(ActiveInfoContainer === true){
            InfoContainer.style.visibility = 'hidden';
            
            ActiveInfoContainer = false;

            clearTimeout(InfoTimer);
            
            ClearInfo();
        }
    }
    
    function ClearInfo(){
        InfoContainerNodes[1].textContent  = '';
        InfoContainerNodes[3].textContent  = '';
        InfoContainerNodes[5].textContent  = '';
        InfoContainerNodes[7].textContent  = '';
        InfoContainerNodes[9].innerHTML    = '';
        InfoContainerNodes[11].textContent = '';
        InfoContainerNodes[13].textContent = '';
        InfoContainerNodes[15].textContent = '';
    }
    
/*******************************************************************************
 * Funcion que posiciona las variables de tv en el programa actual, segun la hora
 * actual en la que se cambia de nacal y se muestra la info.
 *******************************************************************************/

    function LoadCurrentData(HourPosition){
        var CurrentChannelPosition,
            CurrentHour     = Hours[HourPosition][0],
            StartHour       = '', 
            EndHour         = '', 
            IndexProgram    = 0;
    
        if(ActiveEpgContainer === true){
            /* Obtenemos la posicion del canal seleccionado en la guia */
            CurrentChannelPosition = ChannelPositionFocus;
        } else {
            /* Obtenemos la posicion del canal actual*/
            CurrentChannelPosition = ChannelPosition;
        }

        /* Valida que los datos del json esten cargados y contenga mas de un programa de informacion*/
        if(EpgDataActive === true && ChannelsJson[CurrentChannelPosition].P_Length > 0){
            for(IndexProgram = 0; IndexProgram < ChannelsJson[CurrentChannelPosition].P_Length; IndexProgram++){
                /*Obtiene las horas inicio y fin de cada programa*/
                //////Debug(IndexProgram);
                StartHour = ChannelsJson[CurrentChannelPosition].PROGRAMS[IndexProgram].STRH;
                EndHour   = ChannelsJson[CurrentChannelPosition].PROGRAMS[IndexProgram].FNLH;

                //////Debug('StartHour: '+StartHour + ' CurrentHour: '+CurrentHour + ' CompareHours: ' + CompareHours(StartHour, CurrentHour));
                if(CompareHours(StartHour, CurrentHour) === '='){
                    /* Asigna la posicion correcta */
                    ProgramPosition = IndexProgram;

                    /* Iguala IndexPrograma para terminar el ciclo FOR */
                    IndexProgram = ChannelsJson[CurrentChannelPosition].P_Length;
                } else if(CompareHours(StartHour, CurrentHour) === '>'){
                    /* Asigna la posicion correcta */
                    ProgramPosition = IndexProgram;

                    /* Iguala IndexPrograma para terminar el ciclo FOR */
                    IndexProgram = ChannelsJson[CurrentChannelPosition].P_Length;
                } else if(CompareHours(StartHour, CurrentHour) === '<' && CompareHours(EndHour, CurrentHour) === '>'){
                    /* Asigna la posicion correcta */
                    ProgramPosition = IndexProgram;

                    /* Iguala IndexPrograma para terminar el ciclo FOR */
                    IndexProgram = ChannelsJson[CurrentChannelPosition].P_Length;
                } 
            }
        }
    }
    
    
    function PlayChannelEpg(){

        ChannelPosition = FocusChannelPosition;
        //ShowRecorderMessage('PlayChannelEpg '+ChannelPosition);
        CloseEpg();

        var Source = ChannelsJson[ChannelPosition].SRCE,
            Port   = ChannelsJson[ChannelPosition].PORT;
             ProgramIdChannnel = ChannelsJson[ChannelPosition].PRGM,
             ProgramIdPosition = ChannelsJson[ChannelPosition].PSCN;
             AudioPid          = ChannelsJson[ChannelPosition].ADIO;

        if(ChannelsJson[ChannelPosition].STTN !== 'CONTENT'){
            if(ActiveDigitalChannel === true){
                CloseDigitalChannel();
            }
            //PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);   /* TvFunctions por marca */
            if(load){
                
                $(document).ready(function(){
                    //your code
                    if(window.tizen !== undefined){
                        PlayChannel(Source, Port);
                    }else
                    PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);   /* TvFunctions por marca */
                });
                load = false;
            }else{
                if(window.tizen !== undefined){
                    PlayChannel(Source, Port);
                }else
                PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition);   /* TvFunctions por marca */
            }
        } else {
            Debug('##################GetDigitalChannel EPG##############');
            //if(typeof(gSTB) !== 'undefined'){
            //GetDigitalChannel();
            //if(load){
                //window.onload=function() {
                //    alert();    
                //    PlayChannel(Source, Port);   /* TvFunctions por marca */
                //}
                    //your code
                 GetDigitalChannel();
            //     load = false;
            // }else{
            //     ActiveDigitalChannel = true;
            //     SetDigitalChannel();
            //     // Si la guia esta cerrada muestra cuadro con informacion del canal en reproduccion
            //     ShowInfo();
            // }
        }  
    }
    

    
/*******************************************************************************
 * CONTENTRADO MOVIMIENTOS FLECHAS EN LA TELEVISION 
 *******************************************************************************/
/*
 * @VariablesTvSquare:
 * -- ActiveEpgContainer
 * @VariablesPauseLiveTv:
 * -- PauseLive
 * @VariablesRecorder:
 * -- PlayingRecording
 * -- RecordingOptionsActive
 * -- RecordPlayOptionsActive
 * -- ActivePvrInfoContainer
 */

    function TvOk(){
        //alert(Device['Type']);
        
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    if (Device['Type'] === 'NONE') {
                        PlayChannelEpg();
                    } else {
                        OpenRecordingOptions();
                    }
                } else if (RecordingOptionsActive === true) {
                    SelectRecordingsOption();
                } else if (RecordManualOptionsActive === true) {
                    SelectManualRecordOption();
                }
            } else if (RecordingPanel === true) {
                PvrOk();
            } else if (RecordPlayOptionsActive === true) {
                SelectRecordPlayOption();
            }
        } else {
            HideRecorderMessage();
        }
    }
    
    function TvClose(){
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    CloseEpg();
                } else if (RecordingOptionsActive === true) {
                    CloseRecordingOptions();
                } else if (RecordManualOptionsActive === true) {
                    CloseManualRecord();
                }
            } else if (RecordingPanel === true) {
                PvrClose();
            }else if(PlayingRecording===false){
                ReturnLastChannel();
                Debug('Se cambia de canal');
            }
        } else {
            HideRecorderMessage();
        }
        
    }
    
    function TvInfo(){
        if(PauseLive === true){
            /* Muestra la barra con el detalle de PauseLiveTv */
            SetSpeed('play');
            if(PlayingRecording === true){
                ShowPvrInfo();
            }else
                ShowInfo();
        } else if(PlayingRecording === true){
            ShowPvrInfo();
        } else {
            if(Device['Type'] !== 'NONE'){
                GetRecordingsToRecord();
            }
            ShowInfo();
        }
    }

    function TvRight(){
        
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    ProgramRight();
                }
                if (RecordManualOptionsActive === true) {
                    SetFocusManualOption('down');
                }

                clearTimeout(EpgTimer);
                EpgTimer = setTimeout(CloseEpg, TimeoutEpg);
            } else if (RecordingPanel === true) {
                PvrRight();
            }else if(PlayingRecording == true){
                if(DelaySkip == false){
                    DelaySkip = true;
                    SkipCommercials("right");
                    setTimeout(function(){
                        DelaySkip = false;
                    },1000);
                } 
            }
        }
    }

    function TvLeft(){
        
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    ProgramLeft();
                }
                if (RecordManualOptionsActive === true) {
                    SetFocusManualOption('up');
                }

                clearTimeout(EpgTimer);
                EpgTimer = setTimeout(CloseEpg, TimeoutEpg);
            } else if (RecordingPanel === true) {
                PvrLeft();
            }else if(PlayingRecording == true){
                if(DelaySkip == false){
                    DelaySkip = true;
                    SkipCommercials("left");
                    setTimeout(function(){
                        DelaySkip = false;
                    },1000);
                }
                
            }
        }
    }
    
    function TvDown(){
        
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    ProgramDown();
                } else if (RecordingOptionsActive === true) {
                    SetFocusOptionRecording('down');
                } else if (RecordManualOptionsActive === true) {
                    SetManualTime('down');
                }

                clearTimeout(EpgTimer);
                EpgTimer = setTimeout(CloseEpg, TimeoutEpg);
            } else if (RecordingPanel === true) {
                PvrDown();
            } else if (RecordPlayOptionsActive === true) {
                SetFocusOptionRecordPlay('down');
            }
        }
    }
    
    function TvPageDown(){
        
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    PageDown();
                }
                clearTimeout(EpgTimer);
                EpgTimer = setTimeout(CloseEpg, TimeoutEpg);
            }
        }
    }
    
    function TvUp(){
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    ProgramUp();
                } else if (RecordingOptionsActive === true) {
                    SetFocusOptionRecording('up');
                } else if (RecordManualOptionsActive === true) {
                    SetManualTime('up');
                }

                clearTimeout(EpgTimer);
                EpgTimer = setTimeout(CloseEpg, TimeoutEpg);
            } else if (RecordingPanel === true) {
                PvrUp();
            } else if (RecordPlayOptionsActive === true) {

                SetFocusOptionRecordPlay('up');

            }
        }
    }
    
    function TvPageUp(){
        
        if(RecorderMessageActive === false) {
            if (ActiveEpgContainer === true) {
                if (RecordingOptionsActive === false && RecordManualOptionsActive === false) {
                    PageUp();
                }

                clearTimeout(EpgTimer);
                EpgTimer = setTimeout(CloseEpg, TimeoutEpg);
            }
        }
    }
    
    function TvPlay(){
        if(PlayingRecording === true){
            SetSpeed('play');
        } else {
            if(Device['Type'] === 'PVR_ONLY' || Device['Type'] === 'WHP_HDDY'){
                PauseLive = true;
                SetSpeed('play');
            }
        }
    }
    
    function TvPause(){
        if(PlayingRecording === true){
            SetSpeed('pause');
        } else {
            if(Device['Type'] === 'PVR_ONLY' || Device['Type'] === 'WHP_HDDY'){
                PauseLive = true;
                SetSpeed('pause');
            }
        }
    }
    
    function TvStop(){
        if(PlayingRecording === true){
            //ShowRecorderMessage('TvStop');
            OpenRecordPlayOptions();
        }
    }
    
    function TvForward(){
        if(PlayingRecording === true){
            SetSpeed('forward');
        } else {
            if(Device['Type'] === 'PVR_ONLY' || Device['Type'] === 'WHP_HDDY'){
                PauseLive = true;
                SetSpeed('forward');
            }
        }
    }
    
    function TvBackward(){
        if(PlayingRecording === true){
            SetSpeed('backward');
        } else {
            if(Device['Type'] === 'PVR_ONLY' || Device['Type'] === 'WHP_HDDY'){
                PauseLive = true;
                SetSpeed('backward');
            }
        }
    }
    
    function TvRecord(){
        if(ActiveEpgContainer === true && Device['Type'] !== 'NONE'){
            if(ActiveEpgContainer === true ){
                if(RecordingOptionsActive === false && RecordManualOptionsActive === false){
                    if(ChannelsJson[FocusChannelPosition].PROGRAMS[FocusProgramPosition].STTN !== 'CONTENT'){
                        OpenRecordingOptions();
                    }
                }
            }
        } else if(ActiveEpgContainer === false && Device['Type'] !== 'NONE'){
            if(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].STTN !== 'CONTENT'){
                if(ChannelsJson[ChannelPosition].PROGRAMS[ProgramPosition].DRTN !== '24'){
                    REC_CHNL_POS = ChannelPosition;
                    REC_PROG_POS = ProgramPosition;
                    CheckRecordings();
                }
            }
        }
    }
    
    function TvRecorder(){
        //Debug(RecorderMessageActive   + "          "+ PlayingRecording);
        
        if(RecorderMessageActive === false) {
            if (PlayingRecording === false) {
                Debug(Device['Type']);
                if (Device['Type'] !== 'NONE') {
                    if (RecordingOptionsActive === true) {
                        CloseRecordingOptions();
                    }

                    if (ActiveEpgContainer === true) {
                        CloseEpg();
                    }

                    if (RecordManualOptionsActive === true) {
                        CloseManualRecord();
                    }

                    if (ActiveInfoContainer === true) {
                        ////Debug('ActiveInfoContainer' + ActiveInfoContainer);
                        HideInfo();
                    }
                    //Debug('(((((((((((((((TvRecorder(((((((((((((((');
                    OpenPvr();
                }
            } else {
                //ShowRecorderMessage('TvRecorder');
                OpenRecordPlayOptions();
            }
        } else {
            HideRecorderMessage();
        }
    }
    
function TvGuide(){
    
    if(RecorderMessageActive === false) {
        if (PlayingRecording === false) {
            if (RecordingOptionsActive === true) {
                CloseRecordingOptions();
            }

            if (RecordingPanel === true) {
                ClosePvr();
            }

            if (RecordManualOptionsActive === true) {
                CloseManualRecord();
            }

            if (ActiveInfoContainer === true) {
                HideInfo();
            }

            if (Device['Type'] !== 'NONE') {
                GetRecordingsToRecord();
            }
            
            OpenEpg();
        } else {
            //ShowRecorderMessage('TvGuide');
            OpenRecordPlayOptions();
        }
    }  else {
        HideRecorderMessage();
    }
}
    
function TvChannelUp(){
    //ShowRecorderMessage('TvChannelUp ='+ PlayingRecording);
    if(PlayingRecording === false){
        SetChannel('UP');
    } else {
        OpenRecordPlayOptions();
    }
}
    
function TvChannelDown(){
    //ShowRecorderMessage('TvChannelDown ='+ PlayingRecording);
    if(PlayingRecording === false){
        SetChannel('DOWN');
    } else {
        OpenRecordPlayOptions();
    }
}

function setInfomirLog(DataPVRLog){
    $.ajax({
        type: 'POST',
        url: 'Core/Controllers/Recorder.php',
        data: {
            Option: 'SendLog',
            LogInfo: DataPVRLog
        },
        success: function (response) {
            Debug('Log set');
        }
    });
}