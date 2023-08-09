    // @ts-nocheck
    /* Creado por: Tania Maldonado
    * Fecha: Noviembre 2019
    * Tipo: Reproductor tv
    * Vendor: Infomir
    */

    // Variables globales
    var PlayingChannel  = false,
        PlayingRecordPlaylist = false
        PlayingRecordPlaylist2 = false,
        PlayingVod      = true,
        PauseLive       = false,
        URLLog          = '',
        skipCommerialrest = 0;


    var banderaDePrueba = false;
    
    var numberFilesGlobal = 0,
        positionFile      = 0,
        RecordsPlaylist,
        SecondsOfRecord = 0,
        durationFull,
        firstPause = true,
        UpdateSecondsRecord = null,
        chapters = [],
        positionChapter = 0;

    var WindowMaxWidth  = 0,
        WindowMaxHeight = 0,
        WindowMinWidth  = 0,
        WindowMinHeight = 0;

    var player = stbPlayerManager.list[0];
    //gSTB.SetTopWin(0);

    player.videoWindowMode = 1;
    player.aspectConversion = 0;

    if(gSTB.GetDeviceModel() !== 'MAG520' && gSTB.GetDeviceModel() !=='MAG524' && gSTB.GetDeviceModel() !=='MAG522v2'){
        var player2 = stbPlayerManager.list[1];
        player2.videoWindowMode = 0;
        player2.aspectConversion = 5;    
    }
    var Swap            = false,
        Playlist        = '',
        IndexPlaylist   = -1;
    var idSeconds       = null,
        idPosition      = null,
        RewFor          = null,
        Position        = 0,
        TimeShiftStart  = 0,
        seconds         = 0,
        NewSpeed        = 0,
        isPause         = false;
    LengthPlaylist  = 0;

    GetWindowFullSize();
    GetWindowMinSize();

    /* Set the preset window over others.
    * 0 	graphic window
    * 1 	video window   */

    gSTB.SetTopWin(0);

    var storageInfo = JSON.parse(gSTB.GetStorageInfo('{}'));
    var USB = storageInfo.result || [];
    if((gSTB.GetDeviceModel() == 'MAG424' || gSTB.GetDeviceModel() =='MAG524' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() == '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() == '00:1a:79:70:06:f1') && (USB.length !== 0)){
        // set folder for saving TimeShift buffer data
        timeShift.SetTimeShiftFolder(USB[0].mountPath+"/records");
        timeShift.SetMaxDuration(7500);
        // set mode which defines what happens after reaching the left boundary of TimeShift buffer in paused mode
        timeShift.SetSlidingMode(true);
    }

    var Ext = gSTB.StandBy(false);

    /* *****************************************************************************
    * Reproductor de canal
    * ****************************************************************************/

    function PlayChannel(Source, Port, ProgramIdChannnel, ProgramIdPosition){
        //Debug("Source: asdasd   "+Source);
        var CheckPort = '';
        
        if((gSTB.GetDeviceModel() == 'MAG424' || gSTB.GetDeviceModel() =='MAG524' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() == '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() == '00:1a:79:70:06:f1') && (USB.length !== 0)){
            timeShift.ExitTimeShift();
            //Establece de forma manual la posicion en la que se encuentra el reproductor de video
            if(idPosition !== null){
                clearInterval(idPosition);
                idPosition = null;
                Position = 0;
                idPosition = setInterval(updatePosition,1000);
            }else{
                Position = 0;
                idPosition = setInterval(updatePosition,1000);
            }
            if(idSeconds !== null){
                timeShift.ExitTimeShift();
                clearInterval(idSeconds);
                seconds = 0;
                Position = 0;
                idSeconds = null;
                TvPlay();
                SwapPausePlay = true;
                ResumeVideo();
                idSeconds = setInterval(updateSeconds,1000);
                if(RewFor !== null){
                    clearInterval(RewFor);
                    RewFor = null;
                    NewSpeed = 0;
                }
            }else{
                Debug("############################################");
                seconds = 0;
                Position = 0;
                idSeconds = null;
                TvPlay();
                //SwapPausePlay = true;
                ResumeVideo();
                idSeconds = setInterval(updateSeconds,1000);
                if(RewFor !== null){
                    clearInterval(RewFor);
                    RewFor = null;
                }
            }
        }
        if(Port){
            CheckPort = ':' + Port;
        }
        // Detiene el proceso de la reproduccion anterior
        // Source = Source.replace('igmp','udp');
        // Source = (Source).slice(0, 6) + "@" + (Source).slice(6);
        // URLLog = Source+CheckPort;
        // ipMulticastTest = Source;
       
        
        StopVideo();
        
        //gSTB.Play(Source + CheckPort);
        if((gSTB.GetDeviceModel() == 'MAG424' || gSTB.GetDeviceModel() =='MAG524' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() == '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() == '00:1a:79:70:06:f1') && (USB.length !== 0)){
            player.play({
                uri: Source + CheckPort,
                solution: 'extTimeShift',
                //program: ProgramIdPosition
            });
        }else{
            // Debug("Source aa"+ Source +" Port "+CheckPort);
            Debug("Source aa"+ Source);
            // player.play({
            //     uri: Source + CheckPort,
            //     solution: 'auto',
            //     //program: ProgramIdPosition
            // });
            player.play({
                uri: Source,
                solution: 'auto',
                //program: ProgramIdPosition
            });
        }
        // Maximiza el video en caso de que no este en pantalla completa
        MaximizeTV();
        // Activamos la bandera
        PlayingChannel = true;

        // Si la guia esta cerrada muestra cuadro con informacion del canal en reproduccion
        ShowInfo();

        // Si tiene una fecha ya registrada guarda estadisticas en la BD
        if(StartDateChannel !== ''){
            SetChannelStatistics();
        }

        // Actualiza la fecha inicio de la reproduccion del canal */
        StartDateChannel = new Date();
    }
    function PlayChannel2(url){
        if((gSTB.GetDeviceModel() == 'MAG424' || gSTB.GetDeviceModel() =='MAG524' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() == '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() == '00:1a:79:70:06:f1') && (USB.length !== 0)){
            player.play({
                uri: url,
                solution: 'extTimeShift'
            });
        }else{
            player.play({
                uri: url,
                solution: 'auto'
            }); 
        }
    }

    /* *****************************************************************************
    * Reproduce canales digitales
    * ****************************************************************************/

    function PlayDigitalChannel(Source){
        // Detiene el proceso de la reproduccion anterior
        StopVideo();
        // Reproduce el video
        player.play({
            uri: Source,
            solution: 'ffrt3'
        });
        //player.onPlayStart = function () {
            //ImageDigital.src = '';
            //ImageDigital.style.display = 'none';
        //};

        //player.onPlayEnd = function () {
        //   GetDigitalChannel();
        //};
        // Maximiza el video en caso de que no este en pantalla completa
        MaximizeTV();
        // // Activamos la bandera
        // PlayingChannel = true;

        // // Si tiene una fecha ya registrada guarda estadisticas en la BD
        // if(StartDateChannel !== ''){
        //     SetChannelStatistics();
        // }
        // // Actualiza la fecha inicio de la reproduccion del canal */
        // StartDateChannel = new Date();
    }

    /* *****************************************************************************
    * Reproduce videos
    * ****************************************************************************/

    var Playlist = '',
        IndexPlaylist = 0;
        LengthPlaylist = 0;

    function PlayVideo(Source){
        // Detiene el proceso de la reproduccion anterior
        
        //Source = 'http://10.0.3.10/Recordings/prueba.m3u8';
        //Source = 'http://10.30.11.217:80/USB-E0D55EA57493F560A93E1A6B-1/Final_edit.mp4'
        //Source = 'https://youtu.be/wB_i1DL5SPc';
        // chapters = [];
        //if((gSTB.GetDeviceModel() != 'MAG424' && gSTB.GetDeviceModel() !='MAG524') && (gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d0:7a' && gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() != '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() != '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() != '00:1a:79:70:06:f1')){
        //    var source2 = Source.split('/');
        //    Source = "http://10.0.3.241/INFOMIR_RECORDINGS/" + source2[4]; 
        //}
        Debug('----------------------->0');


        // var conti = false;
        // Debug('----------------------->1');

        // if(PlayingRecording===true){
        //     conti = true;
        // }


        StopVideo();

        
        //Debug(Source);
        if(CurrentModule === 'Tv'){
            if(Source.indexOf('pvr') !== -1 || Source.indexOf('rtsp') !== -1){
                GetRaws(Source);
            
                LengthPlaylist = Playlist.length;
                Debug('--------------->>> '+Playlist[IndexPlaylist]);
                //Reproduce el video
                player.play({
                    uri: Playlist[IndexPlaylist],
                    solution: 'auto'
                });
            }else{
                //alert(Source);
                Source = Source.replace(/\s+/g, '');
                sintonizandoGrabacion = true;
                urlFromrecord = Source;
                if(gSTB.GetDeviceMacAddress() === '00:1a:79:70:06:f1' || gSTB.GetDeviceMacAddress() === '00:1a:79:6c:cc:3e' && URLLog !== ''){
                    var x24Today = new Date();	
                    var x24Hour = x24Today.getHours() + ':' + x24Today.getMinutes() + ':' + x24Today.getSeconds();
                    setInfomirLog(gSTB.GetDeviceMacAddress()+'|'+gSTB.RDir('IPAddress')+'|'+x24Today.getDate() + "/" + (x24Today.getMonth() +1) + "/" + x24Today.getFullYear()+'|'+x24Hour+'|CONSULTANDO|'+Source);
                }
                Debug('--------------->>>'+Source);
                //ShowRecorderMessage(Source);
                //Reproduce el video
                //alert(Source);
                player.play({
                    uri: Source,
                    solution: 'auto'
                });
                
                //stbPlayerManager.setBufferSize(200000, 15000000);
            }
        } else {
            //Reproduce el video
            //alert(Source);
            Debug('----------------------->1');
           
            player.play({
                uri: Source,
                solution: 'ffrt3'
            });
            Debug('----------------------->2');

        }

        // player.onPlayEnd = function () {
        //     if(CurrentModule === 'Tv' && PlayingRecording === true){
        //         // segmente de la grabacion termino
        //         //SetPlaylist('forward');
        //     } else if(CurrentModule === 'Movies'){
        //         // Termino pelicula
        //         EndOfMovie();
        //     }
        // };

        // Maximiza el video en caso de que no este en pantalla completa
        MaximizeTV();

    }

    function PlayRecordsPlaylist(filename, numberFiles, durationParts){
        Debug("ENTRO A PlayRecordsPlaylist");
        Debug("ENTRO A PlayRecordsPlaylist");
        PlayingRecordPlaylist = false;
        positionFile = 0;
        numberFilesGlobal = 0;
        
        // if((gSTB.GetDeviceModel() !== "MAG424" && gSTB.GetDeviceModel() !=="MAG524") && gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d0:7a' && gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d1:03' && gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d1:a3' && gSTB.GetDeviceMacAddress() != '00:1a:79:6d:c6:ff' && gSTB.GetDeviceMacAddress() != '00:1a:79:6d:d0:7a' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:f7' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:4a:9d' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:99' && gSTB.GetDeviceMacAddress() != '00:1a:79:74:b7:66' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:c7:13' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:cc:79' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:de' && gSTB.GetDeviceMacAddress() != '00:1a:79:72:cb:e7' && gSTB.GetDeviceMacAddress() != '00:1a:79:70:06:f1'){
        //     var source2 = filename.split('/');
        //     filename = "http://10.0.3.241/INFOMIR_RECORDINGS/" + source2[4]; 
        // }
        RecordsPlaylist = [filename];
        durationFull = parseFloat(durationParts) * 60;
        SecondsOfRecord = 0;
        for(x = 1; x <= numberFiles; x++){
            RecordsPlaylist.push(filename+x);
        }
        var conti = false;
        if(PlayingRecording===true){
            conti = true;
        }
        StopVideo();
        if(conti == true){
            PlayingRecording = true;
        }
        PlayingRecordPlaylist = true;
        positionFile = 0;
        numberFilesGlobal = RecordsPlaylist.length-1;
        for(var x = 0; x<RecordsPlaylist.length; x++){
            RecordsPlaylist[x] = RecordsPlaylist[x].replace(/\s+/g, '');
        }
        player.play({
            uri: RecordsPlaylist[0],
            solution: 'auto'
        });
        if(UpdateSecondsRecord === null){
            UpdateSecondsRecord = null;
            UpdateSecondsRecord = setInterval(SecondsOfRecordFun,1000);
        }else{
            clearInterval(UpdateSecondsRecord);
            UpdateSecondsRecord = null;
            UpdateSecondsRecord = setInterval(SecondsOfRecordFun,1000);
        }
        
    }

    function GetRaws(Source){
        var RawSource = Source.replace('rtsp','http') + '/raw/';
        RawSource = RawSource.replace('554','8080');

        Debug(RawSource);

        $.ajax({
            type: 'POST',
            async: false,
            url: 'Core/Controllers/GetRaws.php',
            data : {
                SourceRaw: RawSource
            },
            success: function(data){
                Playlist = $.parseJSON(data);

                LengthPlaylist = Playlist.length;

                Debug('---------- LengthPlaylist= '+LengthPlaylist);

                if(LengthPlaylist === 0){
                    Debug('---------- Stop record, sorry= '+LengthPlaylist);
                    PlayingRecording =  false;

                    ShowRecorderMessage('Sorry for the incoveniences, it will be activated at short term.');

                    StopVideo();

                    HideBarStatus();

                    SetChannel('');
                } else {
                    LengthPlaylist--;

                    DualPlay();
                }
            }
        });
    }

    function SwapPlayers(){
        Debug('--------------> SwapPlayers > Swap = '+Swap);
        if(Swap === false){
            Debug('--------------> SwapPlayers > FALSE ');
            player2.resume();
            Debug('--------------> SwapPlayers > player2.resume ');
            stbPlayerManager.swap(player, player2);
            Debug('--------------> SwapPlayers > stbPlayerManager.swap ');
            Swap = true;
            Debug('--------------> SwapPlayers > Swap = '+Swap);
            IndexPlaylist++;
            if(IndexPlaylist < LengthPlaylist){
                player.play({
                    uri: Playlist[IndexPlaylist],
                    solution: 'auto'
                });
            }
        } else {
            player.resume();
            stbPlayerManager.swap(player2, player);
            Swap = false;

            IndexPlaylist++;
            if(IndexPlaylist < LengthPlaylist){
                player2.play({
                    uri: Playlist[IndexPlaylist],
                    solution: 'auto'
                });
            }
        }
    }
    /* *****************************************************************************
    * Obtiene los tamanos maximos y minimos de la pantalla
    * ****************************************************************************/
    function GetWindowFullSize(){
        WindowMaxWidth   = player.viewport.width;
        WindowMaxHeight  = player.viewport.height;
    }

    function GetWindowMinSize(){
        WindowMinWidth   = Math.round((player.viewport.width*35)/100);
        WindowMinHeight  = Math.round((player.viewport.height*35)/100);
    }

    /* *****************************************************************************
    * Funcion para poner TV en pantalla completa
    * ****************************************************************************/

    function MaximizeTV(){   
        player.fullscreen = true;
    }

    /* *****************************************************************************
    * Funcion para minimizar la TV
    * ****************************************************************************/

    function MinimizeTV(){
        //player.setViewport({x: (20*WindowMaxWidth)/100, y: (8*WindowMaxWidth)/100, width: WindowMinWidth, height: WindowMinHeight});
        player.setViewport({
            x: Math.round((2*WindowMaxWidth)/100),
              y: Math.round((7.1*WindowMaxHeight)/100), 
              width: WindowMinWidth, 
              height: WindowMinHeight});
    }

    /* *****************************************************************************
    * Reinicia el dispositivo
    * ****************************************************************************/

    function RebootDevice(){
        gSTB.ExecAction('reboot');
    }

    /* *****************************************************************************
    * Funcion para detener la reproduccion de un video, multicast, etc.
    * ****************************************************************************/

    function StopVideo(){
        
        if(UpdateSecondsRecord !== null){
            clearInterval(UpdateSecondsRecord);
            UpdateSecondsRecord = null;
        }


        player.stop();

        // if(gSTB.GetDeviceModel() !== 'MAG520' && gSTB.GetDeviceModel() !=='MAG524'  && gSTB.GetDeviceModel() !=='MAG522v2'){
        //     if(player2.state !== 0){
        //         player2.stop();
        //     }
        // }


        // PlayingRecording = false;
        // PlayingRecordPlaylist = false;
        // PlayingRecordPlaylist2 = false;
        // firstPause = true;


        //PauseLive = false;
    }

    function PauseVideo(){
        if((gSTB.GetDeviceModel() == 'MAG424' || gSTB.GetDeviceModel() =='MAG524' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() == '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() == '00:1a:79:70:06:f1') && (USB.length !== 0)){
            if(firstPause == true){
                if(idPosition !== null){
                    clearInterval(idPosition);
                    idPosition = null;
                    Position = 0;
                    idPosition = setInterval(updatePosition,1000);
                }else{
                    Position = 0;
                    idPosition = setInterval(updatePosition,1000);
                }
                if(idSeconds !== null){
                    clearInterval(idSeconds);
                    seconds = 0;
                    Position = 0;
                    idSeconds = null;
                    idSeconds = setInterval(updateSeconds,1000);
                }else{
                    Debug("############################################");
                    seconds = 0;
                    Position = 0;
                    idSeconds = null;
                    idSeconds = setInterval(updateSeconds,1000);
                }

            }
            timeShift.EnterTimeShift();
            TimeShiftStart = Position;
        }
        if(RewFor !== null){
            clearInterval(RewFor);
            RewFor = null;
            NewSpeed = 0;
        }
        firstPause = false;
        player.pause();
    }
    function updateSeconds(){
        if(seconds-TimeShiftStart<7500){
            seconds += 1;
        }
        //Debug("#################################3       "+seconds);
    }
    function updatePosition(){
        if(player.state != 3){
            Position += 1;
        }
    }

    function UpdatePositionVod(Option){
        PositionAssetVod = gSTB.GetPosTimeEx();
        (Option === 'add') ? PositionAssetVod += 30000: PositionAssetVod -= 30000;
        gSTB.SetPosTimeEx(PositionAssetVod);
        PositionAssetVod = gSTB.GetPosTimeEx();
        Debug(PositionAssetVod); 
    }

    function ResumeVideo(){
        if(RewFor !== null){
            clearInterval(RewFor);
            NewSpeed = 0;
            RewFor = null;
        }
        player.resume();
        if(UpdateSecondsRecord === null && (PlayingRecordPlaylist == true || PlayingRecordPlaylist2 == true) && firstPause == false){
            clearInterval(UpdateSecondsRecord);
            UpdateSecondsRecord = null;
            UpdateSecondsRecord = setInterval(SecondsOfRecordFun,1000);
        }
    }
    function SecondsOfRecordFun(){
        SecondsOfRecord = SecondsOfRecord + 1;
    }

    function SpeedVideo(Speed){
        //player.speed = parseInt(Speed);
        if(Speed == (-2)){
            Speed = -4;
        }
        //Debug(player.speed);
        //Debug("############3    ID RewFor:"+RewFor + "   E############");
        if(RewFor === null){
            NewSpeed = Speed;
            RewFor = setInterval(updateRewFor,1000);
            //Debug("############3    ID RewFor Es Null:"+RewFor + "   E############");
        }else{
            //Debug("############3    ID RewFor No Es Null:"+RewFor + "   E############");
            NewSpeed = 0;
            clearInterval(RewFor);
            RewFor = null;
            NewSpeed = Speed;
            RewFor = setInterval(updateRewFor,1000);
        } 
    }
    function updateRewFor(){
        //Debug("############3    "+player.position + "   E############");
        Debug('PauseLive = '+PauseLive);
        var aux  = parseInt(Position) + (parseInt(NewSpeed)-1);
        var aux2 = parseInt(TimeShiftStart)+2;
        Debug('Speed = '+parseInt(NewSpeed));
        Debug('Position'+parseInt(Position));
        Debug('PauseLive = '+PauseLive);
        if(PauseLive === true && PlayingRecording === false){
            if(parseInt(Position) + (parseInt(NewSpeed)-1) >= parseInt(seconds) || aux < 0){
                Debug("############3    Se Pasa: "+parseInt(player.position) + "   E############");
                clearInterval(RewFor);
                TvPlay();
            }else{
                if(NewSpeed<0){
                    player.position += (parseInt(NewSpeed)-1);
                }else{
                    player.position += parseInt(NewSpeed);
                }
                
                Position = parseInt(Position) + parseInt(NewSpeed);
                Debug("############3    player.position "+parseInt(player.position) + "############");
            }
        }else {
            if(PlayingRecordPlaylist == false && PlayingRecordPlaylist2 == false){
                if(parseInt(player.position) + parseInt(NewSpeed) >= player.duration || parseInt(player.position) + parseInt(NewSpeed) <= 0){
                    Debug("############3    Se Pasa: "+parseInt(player.duration) + "############");
                    clearInterval(RewFor);
                    NewSpeed = 0;
                    TvPlay();
                }else{
                    player.position += parseInt(NewSpeed);
                    Position = parseInt(Position) + parseInt(NewSpeed);
                    //Debug("############3    player.position "+parseInt(player.position) + "   E############");
                }
            }else{
                if(parseInt(SecondsOfRecord) + parseInt(NewSpeed) >= (durationFull-5) || (parseInt(SecondsOfRecord) + parseInt(NewSpeed)) < 0){
                    Debug("############3    Se Pasa: "+parseInt(durationFull) + "############");
                    clearInterval(RewFor);
                    TvPlay();
                }else{
                    if(parseInt(player.position) + parseInt(NewSpeed) <= parseInt(player.duration)-2){
                        if(gSTB.GetDeviceModel() == "MAG424" || gSTB.GetDeviceModel() == "MAG524" || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:03' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d1:a3' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:c6:ff' || gSTB.GetDeviceMacAddress() == '00:1a:79:6d:d0:7a' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:f7' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:4a:9d' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:99' || gSTB.GetDeviceMacAddress() == '00:1a:79:74:b7:66' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:c7:13' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cc:79' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:de' || gSTB.GetDeviceMacAddress() == '00:1a:79:72:cb:e7' || gSTB.GetDeviceMacAddress() == '00:1a:79:70:06:f1'){
                            player.position += parseInt(NewSpeed);
                            SecondsOfRecord = SecondsOfRecord + parseInt(NewSpeed);
                            Position = parseInt(Position) + parseInt(NewSpeed);
                        }else{
                            if((parseInt(player.position) + parseInt(NewSpeed) <= 16) && NewSpeed < 0 && positionFile>0){
                                banderaDePrueba == true;
                                PlayingRecordPlaylist = true;
                                PlayingRecordPlaylist2 = false;
                                positionFile = positionFile-1;
                                player.play({
                                    uri: RecordsPlaylist[positionFile],
                                    solution: 'auto',
                                });
                                player.position = player.duration - 5;
                                SecondsOfRecord = SecondsOfRecord - 6;
                            }else {
                                player.position += parseInt(NewSpeed);
                                SecondsOfRecord = SecondsOfRecord + parseInt(NewSpeed);
                                Position = parseInt(Position) + parseInt(NewSpeed);
                            }
                        }
                    }
                }
            }
        }
    }

    function SkipCommercials(dir){
        if(dir == "right"){
            if(PlayingRecordPlaylist == false && PlayingRecordPlaylist2 == false ){
                if((parseInt(player.position) + 60)<parseInt(player.duration)){
                    player.position = parseInt(player.position) + parseInt(60);
                }
            }else{
                if((parseInt(player.position) + 60)<parseInt(player.duration)){
                    player.position = parseInt(player.position) + parseInt(60);
                    SecondsOfRecord = SecondsOfRecord + 60;
                }else if(positionFile < numberFilesGlobal){
                    skipCommerialrest =(parseInt(player.duration) - parseInt(player.position));
                    positionFile++;
                    player.play({
                        uri: RecordsPlaylist[positionFile],
                        solution: 'auto'
                    });
                    if(positionFile == numberFilesGlobal){
                        PlayingRecordPlaylist = false;
                        PlayingRecordPlaylist2 = true;
                    }
                    setTimeout(function(){
                        player.position = (60 - skipCommerialrest);
                    },500);
                    SecondsOfRecord = SecondsOfRecord + 60;
                }
            }
        }else{
            if(PlayingRecordPlaylist == false && PlayingRecordPlaylist2 == false){
                if(parseInt(player.position) > 7){
                    player.position = parseInt(player.position) - parseInt(7);
                }else{
                    player.position = 1;
                }
            }else{
                if(parseInt(player.position)>parseInt(7)){
                    player.position = parseInt(player.position) - parseInt(7);
                    SecondsOfRecord = SecondsOfRecord-7;
                }else if(positionFile>0){
                    skipCommerialrest = (parseInt(7) - parseInt(player.position));
                    positionFile = positionFile-1;
                    player.play({
                        uri: RecordsPlaylist[positionFile],
                        solution: 'auto',
                    });
                    setTimeout(function(){
                        player.position = player.duration - skipCommerialrest-10;
                    },500);
                    SecondsOfRecord = SecondsOfRecord - 17;
                }else{
                    SecondsOfRecord=1;
                    player.position = 1;
                }
            }
        }
        
    }

    function SkipChapterRecord(direccionSkip){
        var durationSkip;
        if(PlayingRecordPlaylist == false && PlayingRecordPlaylist2 == false){
            durationSkip = player.duration;
        }else{
            durationSkip = durationFull;
        }
        
        if(chapters.length == 0 && durationSkip > 300){
            chapters.push(0);
            if(durationSkip > 300 && durationSkip<= 600){
                for(var i = 0; i < Math.floor(durationSkip/60); i++){
                    chapters.push((i+1)*60);
                }
            }else if(durationSkip > 600 && durationSkip<= 1200){
                for(var i = 0; i < Math.floor(durationSkip/120); i++){
                    chapters.push((i+1)*120);
                }
            }else if(durationSkip > 1200 && durationSkip<= 1800){
                for(var i = 0; i < Math.floor(durationSkip/300); i++){
                    chapters.push((i+1)*300);
                }
            }else if(durationSkip > 1800 && durationSkip<= 2400){
                for(var i = 0; i < Math.floor(durationSkip/480); i++){
                    chapters.push((i+1)*480);
                }
            }else if(durationSkip > 2400){
                for(var i = 0; i < Math.floor(durationSkip/600); i++){
                    chapters.push((i+1)*600);
                }
            }
        }

        if(chapters.length != 0){
            if(PlayingRecordPlaylist == false && PlayingRecordPlaylist2 == false){

                for(var x = 0; x < chapters.length; x++){
                    if(x == (chapters.length-1)){
                        if(player.position>chapters[chapters.length-1]){
                            positionChapter = chapters.length-1;
                            //ShowRecorderMessage("X1=" + x + " " + chapters[x]);
                        }
                    }if(x == 0 ){
                        if(player.position<chapters[x+1]){
                            positionChapter = x;
                            //ShowRecorderMessage("X2=" + x + " " + chapters[x]);
                        }
                    }else if(x>0){
                        if(player.position>chapters[x] && player.position<chapters[x+1]){
                            positionChapter = x;
                            //ShowRecorderMessage("X3=" + x + " " + chapters[x]);
                        }
                    }
                }

                if(direccionSkip == "forward" && positionChapter<chapters.length-1){
                    positionChapter = positionChapter + 1;
                    player.position = chapters[positionChapter];
                }
                if(direccionSkip == "backward" && positionChapter>0){
                    positionChapter = positionChapter - 1;
                    player.position = chapters[positionChapter];
                }
            }else{
                for(var x = 0; x < chapters.length; x++){
                    if(x == (chapters.length-1)){
                        if(SecondsOfRecord>chapters[chapters.length-1]){
                            positionChapter = chapters.length-1;
                            //ShowRecorderMessage("X1=" + x + " " + chapters[x]);
                        }
                    }if(x == 0 ){
                        if(SecondsOfRecord<chapters[x+1]){
                            positionChapter = x;
                            //ShowRecorderMessage("X2=" + x + " " + chapters[x]);
                        }
                    }else if(x>0){
                        if(SecondsOfRecord>chapters[x] && SecondsOfRecord<chapters[x+1]){
                            positionChapter = x;
                            //ShowRecorderMessage("X3=" + x + " " + chapters[x]);
                        }
                    }
                }

                if(direccionSkip == "forward" && positionChapter<chapters.length-1 && SecondsOfRecord < chapters[positionChapter+1]){
                    positionChapter = positionChapter+1
                    var salto = chapters[positionChapter] - SecondsOfRecord;
                    var salto2 = player.duration - player.position;
                    if(salto>salto2){
                        positionFile++;
                        player.play({
                            uri: RecordsPlaylist[positionFile],
                            solution: 'auto'
                        });
                        if(positionFile == numberFilesGlobal){
                            PlayingRecordPlaylist = false;
                            PlayingRecordPlaylist2 = true;
                        }
                        setTimeout(function(){
                            if(player.duration>(salto-salto2)){
                                player.position = salto - salto2;
                            }else{
                                var s = player.duration;
                                positionFile++;
                                player.play({
                                    uri: RecordsPlaylist[positionFile],
                                    solution: 'auto'
                                });
                                if(positionFile == numberFilesGlobal){
                                    PlayingRecordPlaylist = false;
                                    PlayingRecordPlaylist2 = true;
                                }
                                setTimeout(function(){
                                    player.position = salto - salto2-s; 
                                },500);
                            }
                            
                        },500);
                        SecondsOfRecord = chapters[positionChapter]+1;
                    }else{
                        player.position = parseInt(player.position) + parseInt(salto);
                        SecondsOfRecord = chapters[positionChapter];
                    }
                }
                if(direccionSkip == "backward" && positionChapter>0){
                    positionChapter = positionChapter - 1
                    var salto = SecondsOfRecord - chapters[positionChapter];
                    if(salto>player.position){
                        positionFile= positionFile -1;
                        player.play({
                            uri: RecordsPlaylist[positionFile],
                            solution: 'auto'
                        });
                        if(positionFile == numberFilesGlobal){
                            PlayingRecordPlaylist = false;
                            PlayingRecordPlaylist2 = true;
                        }
                        setTimeout(function(){
                            player.position = (parseInt(SecondsOfRecord) - chapters[positionChapter+1])
                        },500);
                        SecondsOfRecord = chapters[positionChapter];
                    }else{
                        player.position = parseInt(player.position) + parseInt(salto);
                        SecondsOfRecord = chapters[positionChapter];
                    }
                }
            }

            
        }
    }
    /* *****************************************************************************
    * Obtiene la posicion del video en reproduccion (PAUSE LIVE Y GRABACIONES)
    * ****************************************************************************/

    function AssetStatus(Duration){
        //Debug('SecondsOfRecord  '+ SecondsOfRecord);
        if(PlayingRecording === true){
            if(PlayingRecordPlaylist == true || PlayingRecordPlaylist2 == true){
                PositionAsset = SecondsOfRecord;
                DurationAsset = parseInt(Duration,10) * 60;
                //ShowRecorderMessage(DurationAsset);
                PercentagePosition = Math.round((PositionAsset * 100) / DurationAsset);
            }else{
                PositionAsset = player.position;
                DurationAsset = parseInt(Duration,10) * 60;
                //ShowRecorderMessage("ELSE "+DurationAsset);
                PercentagePosition = Math.round((PositionAsset * 100) / DurationAsset);
            }        
        }else{ if (PauseLive === true){
            //alert('as');
            DurationAsset = Math.round(seconds);
            
            PositionAsset = Math.round(Position);
            //Debug('>>>>>> PositionAsset: '+PositionAsset);
            // if(DurationAsset !== 0){
                PercentagePosition = Math.round((PositionAsset * 100) / DurationAsset);
                if(PercentagePosition > 100){
                    PercentagePosition = 100;
                }
                //Debug('>>>>>> PercentagePosition: '+PercentagePosition);
                //DurationAsset = DurationAsset * 2;
            // }
            
        }}
    }
    function AssetStatusVod(Duration){
        //alert(Duration);
        if(PlayingRecording === true || PlayingVod === true){
            PositionAsset = gSTB.GetPosTime();
            DurationAsset = parseInt(Duration,10) * 60;
            PercentagePosition = Math.round((PositionAsset * 100) / DurationAsset);     
        }else if (PauseLive === true){
            DurationAsset = Math.round(seconds);
            PositionAsset = Math.round(Position);
            PercentagePosition = Math.round((PositionAsset * 100) / DurationAsset);
            if(PercentagePosition > 100){
                PercentagePosition = 100;
            }
        }
    }
    function rebootInHour(){
        
    }
