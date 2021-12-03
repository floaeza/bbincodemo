from telnetlib import DO
import paramiko
import sys
#ip ='10.0.3.61'

ip = ' '.join(sys.argv[1:])
ip = ip.strip()
print(ip)
client = paramiko.SSHClient()
#client.load_system_host_keys()
#client.load_host_keys('~/.ssh/known_hosts')
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.load_system_host_keys()
client.connect(hostname=ip, port='22', username='root',password='930920')
#stdin, stdout, stderr = client.exec_command('cd /ram/media/*/ && mkdir records/')
#lines = stdout.readlines()
stdin, stdout, stderr = client.exec_command('mkdir records/')
lines = stdout.readlines()
print(lines)
stdin.close()
stdout.close()
stderr.close()
client.close()
print("REBOOT INFOMIR 420")