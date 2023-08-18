<!DOCTYPE html>
<!-- Contiene la cabecera de los modulos-->
<script> 
    var CurrentModule = '[@CurrentModule]',
        ModuleId      = '[@ModuleId]',
        IndexLogo     = '[@IndexLogo]';
</script>
<html>
    <head>
        <meta http-equiv='Content-Type' content='application/vnd.apple.mpegurl'>
        <meta http-equiv='cache-control' content='max-age=0' />
        <meta http-equiv='cache-control' content='no-cache'>
        <meta http-equiv='expires' content='0'>
        <meta http-equiv='expires' content='Tue, 01 Jan 1980 1:00:00 GMT' />
        <meta http-equiv='pragma' content='no-cache'>

        <link rel='icon' href='./Media/General/icon.png'>

        <link rel='stylesheet' href='[@GeneralStyles]' type='text/css'>
        <link rel='stylesheet' href='[@ThemeStyle]' type='text/css'>
        <link rel='stylesheet' href='[@FontAwesome]'>
        
        <link rel='stylesheet' href='[@LayoutStyle]' type='text/css'>

        <script src='[@Jquery]'></script>
        <script src='[@Skycons]'></script>
        <script src='[@Hcap]'></script>
        <script src='[@Moment]'></script>
        
        <script src='[@General]'></script>
        <script src='[@Keys]'></script>
        <script src='[@Commands]'></script>
        <script src='[@RemoteControl]'></script>
        <link rel="stylesheet" href="http://demo.bbinco.com/Views/Styles/ControlDemo.css" type="text/css">
        <!-- <script src='[@AppControl]'></script> -->
        <!-- <script src='./Views/Scripts/AppControl.js'></script> -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    </head>
    <body>
        <div class='GeneralBox'>
            <div id="DebugText"></div> 
            <button id="controlBtn" class="floating-button">
              <i class="fas fa-plus"></i> <!-- Icono de Font Awesome, puedes cambiarlo -->
            </button>
            <div id = "controlDemo" class="containerV2">
              <div class="d-flex flex-row justify-content-between px-3 py-4 align-items-center">
                  <i class="fas"></i>
                  <span>BBINCO TV</span>
                  <i class="fas"></i>
              </div>
      
              <div class="d-flex flex-row justify-content-center">
                  <div class="menu-grid">
                      <div class="d-flex flex-column align-items-center">
                          <i class="fas fa-power-off active"></i>
                          <span class="label">Power</span>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                          <i style="cursor: pointer;" id="INPUT_BTN" class="fas fa-sign-in-alt"></i>
                          <span class="label">Input</span>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                          <i class="fas fa-cog"></i>
                          <span class="label">Control</span>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                          <i style="cursor: pointer;" id="GUIDE_BTN" class="fas fa-bars"></i>
                          <span class="label">GUIDE</span>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                          <i style="cursor: pointer;" id="INFO_BTN" class="fas fa-circle"></i>
                          <span class="label">Info</span>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                          <i style="cursor: pointer;" id="BACK_BTN" class="fas fa-arrow-left"></i>
                          <span class="label">Back</span>
                      </div>
                  </div>
              </div>
      
              <div class="d-flex flex-row mt-4 justify-content-between px-2">
                  <div class="d-flex flex-column rounded-bg py-3 px-4 justify-content-center align-items-center">
                      <i style="cursor: pointer;" id="CHANNELUP_BTN" class="fas fa-chevron-up py-3 control-icon"></i>
                      <span class="label py-3">Channel</span>
                      <i style="cursor: pointer;" id="CHANNELDOWN_BACK" class="fas fa-chevron-down py-3 control-icon"></i>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                      <div class="d-flex flex-row grey-bg justify-content-center align-items-center">
                          <i style="cursor: pointer;" id="MENU_BTN" class="fas fa-home p-3 home-icon"></i>
                      </div>
                      <span class="label">MENU</span>
                  </div>
                  <div class="d-flex flex-column rounded-bg py-3 px-4 justify-content-center align-items-center">
                      <i class="fas fa-plus py-3 control-icon"></i>
                      <span class="label py-3">Volume</span>
                      <i class="fas fa-minus py-3 control-icon"></i>
                  </div>
              </div>
      
              <div class="mt-5 pt-4 position-relative d-flex flex-row justify-content-center align-items-center">
                  <div class="circle ok-inner position-absolute">
                  </div>
                  <div class="circle ok-outer position-absolute">
                      <i style="cursor: pointer;" id="OK_BTN" class="fas fa-circle"></i>
                  </div>
                  <i style="cursor: pointer;" id="RIGHT_BTN" class="fas fa-caret-right position-absolute control-icon right"></i>
                  <i style="cursor: pointer;" id="DOWN_BTN" class="fas fa-caret-right position-absolute control-icon bottom"></i>
                  <i style="cursor: pointer;" id="LEFT_BTN" class="fas fa-caret-right position-absolute control-icon left"></i>
                  <i style="cursor: pointer;" id="UP_BTN" class="fas fa-caret-right position-absolute control-icon top"></i>
              </div>
      
              <div class="d-flex flex-row justify-content-between mt-5 pt-4 px-3">
                  <div class="d-flex flex-row grey-bg">
                      <!-- <i class="fas fa-ellipsis-h p-3 control-icon"></i> -->
                  </div>
                  <div class="d-flex flex-row grey-bg">
                      <!-- <i class="fas fa-volume-mute p-3 control-icon"></i> -->
                  </div>
              </div>
            </div>
            