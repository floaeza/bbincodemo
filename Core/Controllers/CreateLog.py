import sys
# ip ='10.0.3.253'

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
<<<<<<< HEAD
    file.close()



=======
    file.close()
>>>>>>> aa2bc7a2b2e456761f5cc230835fc0a34aa476e1
