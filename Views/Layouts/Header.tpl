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
        <!-- <script src='[@AppControl]'></script> -->
        <!-- <script src='./Views/Scripts/AppControl.js'></script> -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    </head>
    <body>
        <div class='GeneralBox'>
            <div id="DebugText"></div> 
            <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div class="background-container"></div>
                    <div class="custom-grid">
                      <div class="custom-item"></div>
                      <div id="UP_BTN"    class="custom-item"></div>
                      <div id="INFO_BTN"  class="custom-item"></div>
                      <div id="LEFT_BTN"  class="custom-item"></div>
                      <div id="OK_BTN"    class="custom-item"></div>
                      <div id="RIGHT_BTN" class="custom-item"></div>
                      <div id="BACK_BTN"  class="custom-item"></div>
                      <div id="DOWN_BTN"  class="custom-item"></div>
                      <div                class="custom-item"></div>
                    </div>
                    <div class="custom-grid-menu">
                      <div class="custom-item-menu"></div>
                      <div id="MENU_BTN" class="custom-item-menu"></div>
                      <div class="custom-item-menu"></div>
                    </div>
                    <div class="custom-grid-guide">
                      <div id="VOLUMENPLUS_BTN"   class="custom-item-guide"></div>
                      <div id="GUIDE_BTN"         class="custom-item-guide"></div>
                      <div id="CHANNELUP_BTN"            class="custom-item-guide"></div>
                    </div>
                    <div class="custom-grid-volumen">
                      <div id="VOLUMENLESS_BTN" class="custom-item-volumen"></div>
                      <div class="custom-item-volumen"></div>
                      <div id="CHANNELDOWN_BTN"class="custom-item-volumen"></div>
                    </div>
                  </div>
                </div>
            </div>
            