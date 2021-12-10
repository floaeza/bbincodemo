// @ts-nocheck
/******************************************************************************
 * @Objetivo: Actualiza la hora
 * @CreadoPor: Tania Maldonado
 * @Fecha: Noviembre 2019
 *******************************************************************************/

/* Validacion para reinicar dispositivo y buscar actualizaciones de la epg */
    var TimeRunning       = 0,
        MaxMinutesRunning = 15,
        TimerDate         = 0,
        Offset            = 0,
        xhr;


    /* Valida la diferencia de horas en Samsung */
    if (window.tizen !== undefined) {
        var now = new tizen.TZDate(),
            TvHour = now.getHours();

        //Debug('------------------------- NOW:::: '+now);

        xhr = $.ajax({
            cache: false,
            type: 'POST',
            url: 'http://'+ServerIp+'BBINCO/TV/Core/Models/Time.php',
            async : false,
            success: function (response) {
                var Today = $.parseJSON(response),
                    ServerHour   = Today.Hours;

                ////Debug('****************************************** > '+TvHour);
                //Debug('****************************************** > '+ServerHour);

                Offset = parseInt(TvHour) - parseInt(ServerHour);

                //Debug(':::::::::::::::::::::::::::::OFFSET:: '+Offset);

                Today = null;
                ServerHour = null;
            }
        });
        xhr = null;
        now = null;
        TvHour = null;
    }

/*******************************************************************************
 * Funcion que escribe la fecha actual en la EPG, esta funcion tiene un timer
 * para actualizar fecha y hora infinitamente
 *******************************************************************************/
    
    function SetDate(){
        TimeRunning++;
        
        FormatDateAndHour = moment().subtract(Offset, 'hours').format('MMM, DD / h:mm A');
        CurrentStbDate = moment().subtract(Offset, 'hours').format('Y-MM-DD h:mm:ss');

        if(!Device){
            if (Device.Client === 'CHL') {
                FormatHour = moment().subtract(Offset, 'hours').format('h:mm A');
            } else {
                FormatHour = moment().subtract(Offset, 'hours').format('MMMM Do h:mm a');
            }
        } else {
            FormatHour = moment().subtract(Offset, 'hours').format('h:mm A');
        }

        if(CurrentModule === 'Tv'){

            if(typeof (ActiveInfoContainer) !== 'undefined' && ActiveInfoContainer === true){
                InfoContainerNodes[7].textContent  = FormatHour;
            } else if(typeof (ActiveEpgContainer) !== 'undefined' && ActiveEpgContainer === true){
                EpgDate.textContent = FormatDateAndHour;
            } else if(typeof (RecordingPanel) !== 'undefined' && RecordingPanel === true){
                PvrDate.textContent = FormatHour;
            }

            if(FormatHour === '12:01 AM' || FormatHour === '12:01 am'){

                SetEpgFile();
                //Debug('------------------------------ SetEpgFile -> FormatHour: '+FormatHour);

                if(Device['Type'] === 'WHP_HDDY' || Device['Type'] === 'PVR_ONLY'){
                    if(EpgDataActive === true){
                        GetProgramsSerie();
                    }
                }
            }

            if(((FormatHour === '1:00 am' || FormatHour === '1:01 am') || (FormatHour === '2:00 am' || FormatHour === '2:01 am') || (FormatHour === '3:00 am' || FormatHour === '3:01 am') || (FormatHour === '4:00 am' || FormatHour === '4:01 am') || (FormatHour === '5:00 am' || FormatHour === '5:01 am') || (FormatHour === '6:00 am' || FormatHour === '6:01 am') || (FormatHour === '7:00 am' || FormatHour === '7:01 am') || (FormatHour === '8:00 am' || FormatHour === '8:01 am') || (FormatHour === '9:00 am' || FormatHour === '9:01 am')  || (FormatHour === '10:00 am' || FormatHour === '10:01 am') || (FormatHour === '11:00 am' || FormatHour === '11:01 am') || (FormatHour === '12:00 pm' || FormatHour === '12:01 pm') || (FormatHour === '1:00 pm' || FormatHour === '1:01 pm') || (FormatHour === '2:00 pm' || FormatHour === '2:01 pm') || (FormatHour === '3:00 pm' || FormatHour === '3:01 pm') || (FormatHour === '4:00 pm' || FormatHour === '4:01 pm') || (FormatHour === '5:00 pm' || FormatHour === '5:01 pm') || (FormatHour === '6:00 pm' || FormatHour === '6:01 pm') || (FormatHour === '7:00 pm' || FormatHour === '7:01 pm') || (FormatHour === '8:00 pm' || FormatHour === '8:01 pm') || (FormatHour === '9:00 pm' || FormatHour === '9:01 pm') || (FormatHour === '10:00 pm' || FormatHour === '10:01 pm') || (FormatHour === '11:00 pm' || FormatHour === '11:01 pm') || (FormatHour === '12:00 am' || FormatHour === '12:01 am'))){
                rebootInHour();
            }else if(((FormatHour === '1:00 AM' || FormatHour === '1:01 AM') || (FormatHour === '2:00 AM' || FormatHour === '2:01 AM') || (FormatHour === '3:00 AM' || FormatHour === '3:01 AM') || (FormatHour === '4:00 AM' || FormatHour === '4:01 AM') || (FormatHour === '5:00 AM' || FormatHour === '5:01 AM') || (FormatHour === '6:00 AM' || FormatHour === '6:01 AM') || (FormatHour === '7:00 AM' || FormatHour === '7:01 AM') || (FormatHour === '8:00 AM' || FormatHour === '8:01 AM') || (FormatHour === '9:00 AM' || FormatHour === '9:01 AM')  || (FormatHour === '10:00 AM' || FormatHour === '10:01 AM') || (FormatHour === '11:00 AM' || FormatHour === '11:01 AM') || (FormatHour === '12:00 PM' || FormatHour === '12:01 PM') || (FormatHour === '1:00 PM' || FormatHour === '1:01 PM') || (FormatHour === '2:00 PM' || FormatHour === '2:01 PM') || (FormatHour === '3:00 PM' || FormatHour === '3:01 PM') || (FormatHour === '4:00 PM' || FormatHour === '4:01 PM') || (FormatHour === '5:00 PM' || FormatHour === '5:01 PM') || (FormatHour === '6:00 PM' || FormatHour === '6:01 PM') || (FormatHour === '7:00 PM' || FormatHour === '7:01 PM') || (FormatHour === '8:00 PM' || FormatHour === '8:01 PM') || (FormatHour === '9:00 PM' || FormatHour === '9:01 PM') || (FormatHour === '10:00 PM' || FormatHour === '10:01 PM') || (FormatHour === '11:00 PM' || FormatHour === '11:01 PM') || (FormatHour === '12:00 AM' || FormatHour === '12:01 AM'))){
                rebootInHour();
            }

        } else if(CurrentModule === 'Menu' || CurrentModule === 'Movies'){
            FormatDate = moment().subtract(Offset, 'hours').format('MMMM DD YYYY');
            FormatHour = moment().subtract(Offset, 'hours').format('h:mm a');
            
            if(((FormatHour === '1:00 am' || FormatHour === '1:01 am') || (FormatHour === '2:00 am' || FormatHour === '2:01 am') || (FormatHour === '3:00 am' || FormatHour === '3:01 am') || (FormatHour === '4:00 am' || FormatHour === '4:01 am') || (FormatHour === '5:00 am' || FormatHour === '5:01 am') || (FormatHour === '6:00 am' || FormatHour === '6:01 am') || (FormatHour === '7:00 am' || FormatHour === '7:01 am') || (FormatHour === '8:00 am' || FormatHour === '8:01 am') || (FormatHour === '9:00 am' || FormatHour === '9:01 am')  || (FormatHour === '10:00 am' || FormatHour === '10:01 am') || (FormatHour === '11:00 am' || FormatHour === '11:01 am') || (FormatHour === '12:00 pm' || FormatHour === '12:01 pm') || (FormatHour === '1:00 pm' || FormatHour === '1:01 pm') || (FormatHour === '2:00 pm' || FormatHour === '2:01 pm') || (FormatHour === '3:00 pm' || FormatHour === '3:01 pm') || (FormatHour === '4:00 pm' || FormatHour === '4:01 pm') || (FormatHour === '5:00 pm' || FormatHour === '5:01 pm') || (FormatHour === '6:00 pm' || FormatHour === '6:01 pm') || (FormatHour === '7:00 pm' || FormatHour === '7:01 pm') || (FormatHour === '8:00 pm' || FormatHour === '8:01 pm') || (FormatHour === '9:00 pm' || FormatHour === '9:01 pm') || (FormatHour === '10:00 pm' || FormatHour === '10:01 pm') || (FormatHour === '11:00 pm' || FormatHour === '11:01 pm') || (FormatHour === '12:00 am' || FormatHour === '12:01 am'))){
                rebootInHour();
            }else if(((FormatHour === '1:00 AM' || FormatHour === '1:01 AM') || (FormatHour === '2:00 AM' || FormatHour === '2:01 AM') || (FormatHour === '3:00 AM' || FormatHour === '3:01 AM') || (FormatHour === '4:00 AM' || FormatHour === '4:01 AM') || (FormatHour === '5:00 AM' || FormatHour === '5:01 AM') || (FormatHour === '6:00 AM' || FormatHour === '6:01 AM') || (FormatHour === '7:00 AM' || FormatHour === '7:01 AM') || (FormatHour === '8:00 AM' || FormatHour === '8:01 AM') || (FormatHour === '9:00 AM' || FormatHour === '9:01 AM')  || (FormatHour === '10:00 AM' || FormatHour === '10:01 AM') || (FormatHour === '11:00 AM' || FormatHour === '11:01 AM') || (FormatHour === '12:00 PM' || FormatHour === '12:01 PM') || (FormatHour === '1:00 PM' || FormatHour === '1:01 PM') || (FormatHour === '2:00 PM' || FormatHour === '2:01 PM') || (FormatHour === '3:00 PM' || FormatHour === '3:01 PM') || (FormatHour === '4:00 PM' || FormatHour === '4:01 PM') || (FormatHour === '5:00 PM' || FormatHour === '5:01 PM') || (FormatHour === '6:00 PM' || FormatHour === '6:01 PM') || (FormatHour === '7:00 PM' || FormatHour === '7:01 PM') || (FormatHour === '8:00 PM' || FormatHour === '8:01 PM') || (FormatHour === '9:00 PM' || FormatHour === '9:01 PM') || (FormatHour === '10:00 PM' || FormatHour === '10:01 PM') || (FormatHour === '11:00 PM' || FormatHour === '11:01 PM') || (FormatHour === '12:00 AM' || FormatHour === '12:01 AM'))){
                rebootInHour();
            }

            MenuDate.textContent = FormatDate;
            MenuHour.textContent = FormatHour;
        }

        //Debug('TimeRunning: '+TimeRunning);
        if(TimeRunning > MaxMinutesRunning){
            
            TimeRunning = 0;

            if(Executing === false){
                if(CurrentModule !== 'Tv') {
                    UpdateInfoDevice();
                } else {
                    UpdateQuickInfoDevice();
                }
            }
        }
        //Debug('-------------------------------- FormatDateAndHour: '+FormatDateAndHour);
        setTimeout(SetDate, 50000);
    }

/*******************************************************************************
 * Activa timer para que se ejecute cada minuto (60000 milisegundos = 60 segundos)
 *******************************************************************************/
    /* Lo ejecuta la primera vez que carga */
    setTimeout(SetDate,500);
    
    /* Agrega intervalo 50000 = 50 segundos*/
    
    setTimeout(SetDate, 50000);

