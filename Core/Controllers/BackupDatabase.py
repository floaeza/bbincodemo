from subprocess import call
import subprocess
from datetime import datetime

Today= datetime.today().strftime('%Y-%m-%d')

generarBackup2 = subprocess.call(" mysqldump -u root -pBbinco1.0 BBINCOTV > /var/www/html/BBINCO/TVCHL/Core/Controllers/Backups/backup_BBINCOTV-"+Today+".sql",shell=True);
print("Termino el back up")
