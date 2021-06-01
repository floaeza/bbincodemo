<?php
/* Creado por: Fabian Loaeza
 * Fecha: Mayo 2021
 * Tipo: Controlador
 */

    date_default_timezone_set('America/Mazatlan');
    
    require_once '../Models/Database.php';
    require_once '../Models/Libraries.php';
    require_once '../DataAccess/Config.php';
    require_once '../DataAccess/Packages.php';
    require_once '../DataAccess/Channels.php';
    

    $CurrentController = 'EpgFilesController';
    
    $PackagesData = new Packages('system', $CurrentController);
    $ConfigData  = new Config('system', $CurrentController);
    $ChannelsData = new Channels('system', $CurrentController);
    
    $ArrayEPGInfo = array();
    $Option = !empty($_POST['Option']) ? $_POST['Option'] : 'GetOffsetZone';
    $PackageID = !empty($_POST['PackageID']) ? $_POST['PackageID'] : '1';
    $Station = !empty($_POST['Station']) ? $_POST['Station'] : 'GATO';  

         switch ($Option){
            case 'GetPackages':    
            $PackagesId = $PackagesData->getPackagesId();
                foreach ($PackagesId as $Package):
                    $id_paquete = $Package['id_paquete'];
                    array_push($ArrayEPGInfo, array('IDP' => $Package['id_paquete']));
                endforeach;    
                echo json_encode($ArrayEPGInfo);
            break;
            case 'GetGuideDays':
                $GuideDays = $ConfigData->getConfigByName('GuideDays');
                array_push($ArrayEPGInfo, array('GDY' => $GuideDays));
                echo json_encode($ArrayEPGInfo);
                break;
            case 'GetOffsetZone':
                $GuideDays = $ConfigData->getConfigByName('OffsetZone');
                array_push($ArrayEPGInfo, array('OZN' => $GuideDays));
                echo json_encode($ArrayEPGInfo);
                break;
            case 'GetChannelsInfoBypackage':
                $PreChannalesArray  = $PackagesData->getPackageListById($PackageID);
                foreach ($PreChannalesArray as $PreChannelRow):
                    array_push($ArrayEPGInfo, array('PSCN' => $PreChannelRow['posicion'],
                    'ADIO' => $PreChannelRow['audio'],
                    'PRGM' => $PreChannelRow['programa'],
                    'SRCE' => $PreChannelRow['src'],
                    'QLTY' => $PreChannelRow['id_calidad'],
                    'PORT' => $PreChannelRow['puerto'],
                    'CHNL' => $PreChannelRow['numero_canal'],
                    'STTN' => $PreChannelRow['numero_estacion'],
                    'NAME' => $PreChannelRow['nombre_estacion'],
                    'INDC' => $PreChannelRow['indicativo'],
                    'LOGO' => $PreChannelRow['logo']
                    ));
                endforeach;
                echo json_encode($ArrayEPGInfo);
                break;
            case 'GetChannelsInfoByStation':
                $ChannelsGatoByPackage   = $ChannelsData->getGatoStationsList();
                $ChannelsPassByPackage   = $ChannelsData->getPassStationsList();            
                switch ($Station) {
                    case 'GATO':
                        $cont = 0;
                        foreach ($ChannelsGatoByPackage as $PreChannelRow):
                            array_push($ArrayEPGInfo, array('PSCN' => $PreChannelRow['posicion'],
                            'ADIO' => $PreChannelRow['audio'],
                            'PRGM' => $PreChannelRow['programa'],
                            'SRCE' => $PreChannelRow['src'],
                            'QLTY' => $PreChannelRow['id_calidad'],
                            'PORT' => $PreChannelRow['puerto'],
                            'CHNL' => $PreChannelRow['numero_canal'],
                            'STTN' => $PreChannelRow['numero_estacion'],
                            'NAME' => $PreChannelRow['nombre_estacion'],
                            'INDC' => $PreChannelRow['indicativo'],
                            'LOGO' => $PreChannelRow['logo']
                            ));
                        endforeach;
                        echo json_encode($ArrayEPGInfo);
                        break;
                    case 'PASS':
                        foreach ($ChannelsPassByPackage as $PreChannelRow):
                            array_push($ArrayEPGInfo, array('PSCN' => $PreChannelRow['posicion'],
                            'ADIO' => $PreChannelRow['audio'],
                            'PRGM' => $PreChannelRow['programa'],
                            'SRCE' => $PreChannelRow['src'],
                            'QLTY' => $PreChannelRow['id_calidad'],
                            'PORT' => $PreChannelRow['puerto'],
                            'CHNL' => $PreChannelRow['numero_canal'],
                            'STTN' => $PreChannelRow['numero_estacion'],
                            'NAME' => $PreChannelRow['nombre_estacion'],
                            'INDC' => $PreChannelRow['indicativo'],
                            'LOGO' => $PreChannelRow['logo']
                            ));
                        endforeach;
                        echo json_encode($ArrayEPGInfo);
                        break;
                }
                break;
            case 'GetChannelsInfoByStationAndPackage':
                $ChannelsGatoByPackage   = $ChannelsData->getGatoChannelsList($PackageID);
                $ChannelsPassByPackage   = $ChannelsData->getPassChannelsList($PackageID);            
                switch ($Station) {
                    case 'GATO':
                        $cont = 0;
                        foreach ($ChannelsGatoByPackage as $PreChannelRow):
                            array_push($ArrayEPGInfo, array('PSCN' => $PreChannelRow['posicion'],
                            'ADIO' => $PreChannelRow['audio'],
                            'PRGM' => $PreChannelRow['programa'],
                            'SRCE' => $PreChannelRow['src'],
                            'QLTY' => $PreChannelRow['id_calidad'],
                            'PORT' => $PreChannelRow['puerto'],
                            'CHNL' => $PreChannelRow['numero_canal'],
                            'STTN' => $PreChannelRow['numero_estacion'],
                            'NAME' => $PreChannelRow['nombre_estacion'],
                            'INDC' => $PreChannelRow['indicativo'],
                            'LOGO' => $PreChannelRow['logo']
                            ));
                        endforeach;
                        echo json_encode($ArrayEPGInfo);
                        break;
                    case 'PASS':
                        foreach ($ChannelsPassByPackage as $PreChannelRow):
                            array_push($ArrayEPGInfo, array('PSCN' => $PreChannelRow['posicion'],
                            'ADIO' => $PreChannelRow['audio'],
                            'PRGM' => $PreChannelRow['programa'],
                            'SRCE' => $PreChannelRow['src'],
                            'QLTY' => $PreChannelRow['id_calidad'],
                            'PORT' => $PreChannelRow['puerto'],
                            'CHNL' => $PreChannelRow['numero_canal'],
                            'STTN' => $PreChannelRow['numero_estacion'],
                            'NAME' => $PreChannelRow['nombre_estacion'],
                            'INDC' => $PreChannelRow['indicativo'],
                            'LOGO' => $PreChannelRow['logo']
                            ));
                        endforeach;
                        echo json_encode($ArrayEPGInfo);
                        break;
                }
                break;
                case 'GetChannelsInfo':
                $ChannelsInfo  = $PackagesData->getPackageList();
                foreach ($ChannelsInfo as $PreChannelRow):
                    array_push($ArrayEPGInfo, array('SRCE' => $PreChannelRow['src'],
                    'QLTY' => $PreChannelRow['id_calidad'],
                    'PORT' => $PreChannelRow['puerto'],
                    'STTN' => $PreChannelRow['numero_estacion'],
                    'NAME' => $PreChannelRow['nombre_estacion'],
                    'INDC' => $PreChannelRow['indicativo'],
                    'LOGO' => $PreChannelRow['logo']
                    ));
                endforeach;
                echo json_encode($ArrayEPGInfo);
                    break;
        }

         