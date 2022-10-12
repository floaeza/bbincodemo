<?php
/* Creado por: Tania Maldonado
 * Fecha: Julio 2020
 * Tipo: Controlador
 */

    require_once './../Models/Database.php';
    require_once './../Models/Utilities.php';
    require_once './../DataAccess/Config.php';
    require_once './../DataAccess/VideoOnDemand.php';
    
    $CurrentController = 'VideoOnDemandController';

    $Option         = !empty($_POST['Option']) ? $_POST['Option'] : 'GetFilters'; 
    $MacAddress     = !empty($_POST['MacAddress']) ? $_POST['MacAddress'] : ''; 
    $OrderBy        = !empty($_POST['OrderBy']) ? $_POST['OrderBy'] : 'year'; 
    $Order          = !empty($_POST['Order']) ? $_POST['Order'] : 'ASC'; 
    $Where          = !empty($_POST['Where']) ? $_POST['Where'] : ''; 
    $Like           = !empty($_POST['Like']) ? $_POST['Like'] : ''; 
    

    
    $VideoOnDemand  = new VideoOnDemand($MacAddress, $CurrentController);
    $Utilities      = new Utilities();
    
    $Response = '';
    $FirstElement = 0;
    switch ($Option){
        case 'GetMoviesList':

            $Result = $VideoOnDemand->getMoviesList($OrderBy, $Order, $Where, $Like);
    
            $Movies = array();
    
            $Cast = array();
    
            foreach ($Result as $Row) :
    
                $Genders = $VideoOnDemand->getGendersByMovie($Row['id_pelicula']);
    
                $Casting = $VideoOnDemand->getCastingByMovie($Row['id_pelicula']);
    
                foreach ($Casting as $CastRow) :
                    array_push($Cast, $CastRow['Name'] . ' ' . $CastRow['LastName']);
                endforeach;
    
    
                $Director = $VideoOnDemand->getDirectorByMovie($Row['id_pelicula']);
    
    
                array_push($Movies, array(
                    'TTLE' => $Row['nombre_pelicula'],
                    'DSCR' => $Row['descripcion_pelicula'],
                    'PSTR' => $Row['nombre_poster'],
                    'FILE' => $Row['archivo_pelicula'],
                    'FLDR' => $Row['folder_pelicula'] . '/',
                    'YEAR' => $Row['year'],
                    'RTNG' => 'Rating: ' .$Row['clasificacion'],
                    'MNTS' => $Row['duracion_minutos'],
                    'DRTN' => $Row['duracion_pelicula'],
                    'SCOR' => $Row['calificacion'],
                    'GNDR' => $Genders,
                    'CAST' => $Cast,
                    'DRTR' => 'Director: ' . $Director[0]['Name'] . ' ' . $Director[0]['LastName'],
                ));
    
                $Cast = array();
            endforeach;
    
            $Response = $Movies;
    
        break;
        
        case 'GetYearsList':
            $Response = $VideoOnDemand->GetYearsList();
        break;
        
        case 'GetGendersList':
            $Response = $VideoOnDemand->GetGendersList();
        break;

        case 'GetMoviesByGender':

            $Result = $VideoOnDemand->GetGendersList();
            $Movies = array();
            foreach ($Result as $Gender) :
                $Result2 = $VideoOnDemand->GetMoviesByGender($Gender);
                $Cast = array();
                foreach ($Result2 as $line) :
                    $Casting = $VideoOnDemand->getCastingByMovie($line['id_pelicula']);
    
                    foreach ($Casting as $CastRow) :
                        array_push($Cast, $CastRow['Name'] . ' ' . $CastRow['LastName']);
                    endforeach;
    
    
                    array_push($Movies, array(
                        'TTLE' => $line['nombre_pelicula'],
                        'DSCR' => $line['descripcion_pelicula'],
                        'PSTR' => $line['nombre_poster'],
                        'FILE' => $line['archivo_pelicula'],
                        'FLDR' => $line['folder_pelicula'] . '/',
                        'YEAR' => $line['year'],
                        'RTNG' => $line['clasificacion'],
                        'MNTS' => $line['duracion_minutos'],
                        'DRTN' => $line['duracion_pelicula'],
                        'SCOR' => $line['calificacion'],
                        'CAST' => $Cast,
                        'GNDR' => $Gender,
    
                    ));
    
                
                endforeach;
            endforeach;
    
            $Response = $Movies;
    
        break;
    }
    
    echo json_encode($Response);