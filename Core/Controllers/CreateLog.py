import sys

parametro = ' '.join(sys.argv[1:])
parametro = parametro.strip()
print(parametro)

# with open("/var/www/html/BBINCO/TVCHL/Core/Controllers/logInformir.txt", "r") as f:
#     lines = f.readlines()
# f.close()

# listToStr = ''.join(map(str, lines))
# parametro = parametro.split(',')

try:
    f = open("/var/www/html/BBINCO/TVCHL/Core/Controllers/logInformir.txt", "a")
    f.write("\n"+parametro)
    f.close()
except:
    f = open("/var/www/html/BBINCO/TVCHL/Core/Controllers/logInformir.txt", "a")
    f.write("\n"+parametro)
    f.close()