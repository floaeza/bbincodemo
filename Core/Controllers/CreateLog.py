import sys

parametro = ' '.join(sys.argv[1:])
parametro = parametro.strip()
print(parametro)

with open("/var/www/html/BBINCO/TV/Core/Controllers/logInformir.txt", "r") as f:
    lines = f.readlines()
f.close()

log = ''

for line in lines:
    log = log+line 

parametro = parametro.split(',')

try:
    file = open("/var/www/html/BBINCO/TV/Core/Controllers/logInformir.txt", "w")
    file.write(log + parametro[0] + ' -----> ' + parametro[1] + ' | ' + parametro[2] + ' | ' + parametro[3] + ' | ' + parametro[4]+'\n')
    file.close()
except:
    file = open("/var/www/html/BBINCO/TV/Core/Controllers/logInformir.txt", "w")
    file.write(log + parametro[0] + ' | ' + parametro[1] + ' | ' + parametro[2] + ' | ' + parametro[3]+ '\n')
    file.close()