import requests
from getpass import getpass
import os

url = 'http://localhost:3000/api'

def clean_console():
    so = os.name

    if so == "posix":
        os.system("clear")
    elif so == "ce" or so == "nt" or so == "dos":
        os.system("cls")

while True:
    clean_console()
    print("################### BIENVENIDO AL ADMINISTRADOR DE TURNATE ###################")

    email = input('\nCorreo electrónico: ')
    password = getpass('Contraseña: ')

    login_user = requests.post(url + '/auth/loginAdmin', json={
        "email": email,
        "password": password
    })

    if login_user.status_code == 200:
        break

data = login_user.json()

def show_menu():
    print()
    print("################### MENU ###################")
    print("1. Crear nueva tienda")
    print("2. Eliminar tienda")
    print("3. Salir")

def create_shop():
    while True:
        print('\n- CREACION DE NUEVO COMERCIO -')
        title = input('Ingrese nombre de comercio: ')
        username = input('Ingrese nombre de usuario para el comercio: ')
        password = input('Ingrese contraseña para el comercio: ')

        create_shop = requests.post(url + '/shops/create', json={
            "title": title,
            "username": username,
            "password": password,
            "id": data['_id']
        })

        if create_shop.status_code == 200:
            print("\n###############################################")
            print(f"# { title } fue creado exitosamente.")
            print(f"# Usuario: { username } \n# Contraseña: { password }")
            print("###############################################")
            break

        if create_shop.status_code == 403:
            print('\n' + data['msg'])
            continue

        print("Ocurrió un error vuelve a completar los campos.")

def delete_shop():


while True:
    show_menu()
    option = int(input('\nElige el numero de opcion: '))

    if option == 1:
        create_shop()
    elif option == 2:
        delete_shop()
    else:
        break
