from telnetlib import DO
import xtelnet

with open("/var/www/html/BBINCO/TV/Core/Controllers/ips.txt", "r") as f:
    lines = f.readlines()
f.close()

succes = 'MAC_ADDRESS;IP;1080p;ASPECT\n'
failed = ''

t=xtelnet.session()


for ips in lines:
    ip=ips.strip()
    try:
        ##print(ip)
        t.connect(ip, username='root',password='root2root',p=23,timeout=8)
        #output=t.execute('libconfig-get NORFLASH.MAC_ADDRESS')
        #succes = succes + output + ';' + ip + ';'
        #output=t.execute('libconfig-get SETTINGS.GFX_RESOLUTION')
        #succes = succes + output + ';'
        #output=t.execute('libconfig-get SETTINGS.DISPLAY_MODE')
        #succes = succes + output + '\n'
        print(succes)
        t.close()
    except:
        failed = failed + ip + '\n'
        continue

file = open("logSucces.txt", "w")
file.write(succes)
file.close()
 







