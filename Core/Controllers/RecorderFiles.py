from telnetlib import DO
import paramiko
import sys
from moviepy.editor import *
import wget
import requests

parametros = ' '.join(sys.argv[1:])
parametros = parametros.strip()
print(parametros)

parametros = parametros.split('|')
videos = []
video_names = []
pos = 0
name = ''
name_file = ''

#for parametro in parametros:
#    print(parametro)

def DownloadFile(url, local_filename):
    #local_filename = url.split('/')[-1]
    r = requests.get(url)
    with open(local_filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024): 
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
    return 

for parametro in parametros:
    datos = parametro.split(',')
    
    URL = datos[0]
    print(URL)
    file = datos[1]
    if pos == 0:
        name = '/var/www/html/INFOMIR_RECORDINGS/'+file
    pos += 1
    DownloadFile(URL, '/var/www/html/INFOMIR_RECORDINGS/'+file)
    videos.append(VideoFileClip('/var/www/html/INFOMIR_RECORDINGS/'+file))
    video_names.append('/var/www/html/INFOMIR_RECORDINGS/'+file)


final_clip = concatenate_videoclips(videos)
final_clip.write_videofile(name, codec="libx264")


client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.load_system_host_keys()
client.connect(hostname=parametro[0], port='22', username='root',password='930920')
for video_name in video_names:
    stdin, stdout, stderr = client.exec_command("cd /ram/media/* && rm " + video_name)
stdin, stdout, stderr = client.exec_command("cd /ram/media/* && wget http://10.0.3.9/INFOMIR_RECORDINGS/"+name_file)
lines = stdout.readlines()
stdin.close()
stdout.close()
stderr.close()
client.close()