from telnetlib import DO
import paramiko
import xtelnet
import requests
import json
#from datetime import datetime
import socket
import base64

with open("/var/www/html/BBINCO/TV/Core/Controllers/ips.txt", "r") as f:
    lines = f.readlines()
f.close()

succes = 'MAC_ADDRESS;IP;1080p;ASPECT\n'

t=xtelnet.session()


for ips in lines:
    ip=ips.strip()
    try:
        ##print(ip)
        t.connect(ip, username='root',password='root2root',p=23,timeout=8)
        output1=t.execute('libconfig-get SETTINGS.DISPLAY_MODE')
        output2=t.execute('libconfig-get SETTINGS.GFX_RESOLUTION')
        print(output1)
        print(output2)
        t.close()
        print("GET CONFIG AMINO: "+ ip)
    except:
        continue


 







