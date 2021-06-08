<?php
/* Creado por: Tania Maldonado
 * Fecha: Noviembre 2019
 * Tipo: Controlador
 */

    require_once './../Models/Database.php';
    require_once './../DataAccess/Config.php';
    require_once './../DataAccess/Devices.php';
    require_once './../DataAccess/Locations.php';
    require_once './../DataAccess/Modules.php';
    require_once './../DataAccess/DiskInfo.php';
    
    $CurrentController = 'DeviceController';
    
    $ArrayDeviceInfo = array();
    $Option = !empty($_POST['Option']) ? $_POST['Option'] : 'InsertControl';
    $MacAddress = !empty($_POST['MacAddress']) ? $_POST['MacAddress'] : '00:02:02:4f:9b:af';
    $Estado = !empty($_POST['Estado']) ? $_POST['Estado'] : 'ON';
    $Ip = !empty($_POST['Ip']) ? $_POST['Ip'] : '172.16.0.15';
    $Marca = !empty($_POST['Marca']) ? $_POST['Marca'] : 'AMINO';
    $Modelo = !empty($_POST['Modelo']) ? $_POST['Modelo'] : 'A50';
    $Orden = !empty($_POST['Orden']) ? $_POST['Orden'] : 'orden';
    $Version_software = !empty($_POST['Version_software']) ? $_POST['Version_software'] : 'Factory';
    
    $ConfigData   = new Config($MacAddress, $CurrentController);
    $DevicesData  = new Devices($MacAddress, $CurrentController);
    $LocationData = new Locations($MacAddress, $CurrentController);
    $ModulesData  = new Modules($MacAddress, $CurrentController);
    $DiskData     = new DiskInfo($MacAddress, $CurrentController);

    switch ($Option) {
        case 'GetDeviceByMac':
            $Device = $DevicesData->getDevice($MacAddress);
            foreach ($Device as $DeviceInfo):
                array_push($ArrayDeviceInfo, array('MAC' => $DeviceInfo['mac_address'],
                'IP' => $DeviceInfo['ip'],
                'MARK' => $DeviceInfo['marca'],
                'MDL' => $DeviceInfo['modelo'],
                'SWV' => $DeviceInfo['version_software'],
                'LEC' => $DeviceInfo['ultima_ejecucion']
                ));
            endforeach;
            echo json_encode($ArrayDeviceInfo);
            break;
        
        case 'InsertControl':
            $NewDevice = array('estado'  => $Estado,
            'ip'                         => $Ip,
            'mac_address'                => $MacAddress,
            'marca'                      => $Marca,
            'modelo'                     => $Modelo,
            'orden'                      => $Orden,
            'version_software'           => $Version_software
            );
            $DevicesData->setControl($NewDevice);
            break;
    }

   