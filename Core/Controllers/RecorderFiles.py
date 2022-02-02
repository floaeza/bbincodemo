from telnetlib import DO
import paramiko
import sys
from moviepy.editor import *
from pyparsing import line
import wget
import requests
import moviepy.video.fx.all as vfx
import json

FilesData = ' '.join(sys.argv[1:])
FilesData = FilesData.strip()
#print(FilesData)

FilesData = FilesData.split('#')

parametros = FilesData[0]
parametros = parametros.strip()

parametros = parametros.split('|')
videos = []
video_names = []
pos = 0
name = ''
name_file = ''
name_file_origin = ''
file_db = ''

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
    if pos > 0:
        datos = parametro.split(',')
        URL = datos[0]
        #print(URL)
        file = datos[1]
        if pos == 1:
            file_db = URL
            name_file = 'EDIT_' + file
            name_file_origin = file
            name = '/var/www/html/INFOMIR_RECORDINGS/'+name_file
        DownloadFile(URL, '/var/www/html/INFOMIR_RECORDINGS/'+file)
        clip = VideoFileClip('/var/www/html/INFOMIR_RECORDINGS/'+file)
        clip = clip.fx(vfx.speedx,1)
        videos.append(clip)
        video_names.append(file)   
    pos += 1

final_clip = concatenate_videoclips(videos)
final_clip.write_videofile(name, codec='libx264', threads = 10, fps=30)


client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.load_system_host_keys()

file_db_ = file_db.split("/")

client.connect(hostname=FilesData[1].strip(), port='22', username='root',password='930920')

for video_name in video_names:
    stdin, stdout, stderr = client.exec_command("cd /ram/media/* && rm " + video_name)

stdin, stdout, stderr = client.exec_command("cd /media/" + file_db_[3] + " && wget http://10.0.3.9/INFOMIR_RECORDINGS/"+name_file)
lines = stdout.readlines()
print(lines)
print("cd /media/" + file_db_[3] + " && wget http://10.0.3.9/INFOMIR_RECORDINGS/"+name_file)
stdin, stdout, stderr = client.exec_command("mv /media/"+file_db_[3]+"/EDIT_"+file_db_[4] + " " + '/media/'+file_db_[3]+"/"+file_db_[4])
print("mv /media/"+file_db_[3]+"/EDIT_"+file_db_[4] + " " + '/media/'+file_db_[3]+"/"+file_db_[4])
lines = stdout.readlines()
stdin.close()
stdout.close()
stderr.close()
client.close()

payload = {'Option': 'UpdateProgramOperaPython', 'File': '/media/'+file_db_[3]+"/"+file_db_[4], 'OperationId':'4', 'ActiveRecording': 'false'}
Devices = requests.post('http://10.0.3.9/BBINCO/TV/Core/Controllers/Recorder.php', data=payload)
#IDF = json.loads(Devices.content)
#print(IDF)