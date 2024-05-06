# Social Media Platform
## Descripción
Este proyecto es una red social tipo Instagram donde los usuarios pueden registrarse, iniciar sesión y publicar imágenes. El backend está desarrollado en Django con Django Rest FrameworkI. La autenticación se realiza utilizando JSON Web Tokens (JWT). El frontend está construido con React, utilizando frameworks y bibliotecas. Los estilos se han implementado utilizando Tailwind CSS
## Instalación
### Requisitos
- Python
- virtualenv o venv (módulo de Python)
- Node.js
### Pasos de instalación
Clonar el repositorio:
```
git clone https://github.com/tejaby/Social-Media-Platform.git
```
Crear un entorno virtual:
- con virtualenv:
  ```
  cd backend
  virtualenv nombre_del_entorno
  nombre_del_entorno\Scripts\activate	# Windows
  source nombre_del_entorno/bin/activate	# Linux/macOS
  ```
- con venv(módulo de Python):
  ```
  cd backend
  python -m venv venv
  venv\Scripts\activate	# Windows
  source venv/bin/activate	# Linux/macOS
  ```
Instalar las dependencias del backend (Django):
```
cd backend
pip install -r requirements.txt
```
Instalar las dependencias del frontend (React):
```
cd frontend
npm install
```
Realizar las migraciones en el backend:
```
python manage.py makemigrations post
python manage.py migrate
```
Ejecutar la aplicación:
- Backend:
  ```
  python manage.py runserver
  ```
- Frontend:
  ```
  npm run dev
  ```
 >¡Eso es todo, hemos terminado!