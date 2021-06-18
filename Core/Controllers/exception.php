<?php
$text = !empty($_POST['text']) ? $_POST['text'] : '';
$Option = !empty($_POST['Option']) ? $_POST['Option'] : 'SetInfo';

$fichero = 'host.conf';

$fileinfo = '';

switch ($Option) {
    case 'GetFileInfo':
        $file = fopen($fichero, "r");
        while(!feof($file)) {
        $fileinfo = $fileinfo.fgets($file);
        }
        fclose($file);
        echo $fileinfo;
        break;
    
    case 'SetInfo':
        if (isset($text)) {
            $file = fopen($fichero, "r");
            while(!feof($file)) {
            $fileinfo = $fileinfo.fgets($file);
            }
            fclose($file);
            if (strcmp($fileinfo, $text)==0) {
                echo 'No se detectaron cambios';
            }else{
                $fp = fopen($fichero, 'w');
                fwrite($fp, utf8_decode($text));
                fclose($fp);
                chmod($fichero, 0777);
                echo 'Se aplicaron los cambios en el archivo de configuración';
            }

        }
        else {
            echo 'Archivo vacio';
        }
        break;

    case 'RestartDHCP':
        $resultado = shell_exec('systemctl restart dhcpd.service');   
        echo "Salida: $resultado\n"; 
        break;
}

?>
