

# Pokemon Project



## Consideraciondes Previas

Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor


## Preparacion del Proyecto

### Paso 1
  En la carpeta `api` es necesario crear un archivo llamado: `.env` que tenga la siguiente forma:

    ```
    DB_USER = usuariodepostgres
    DB_PASSWORD = passwordDePostgres
    DB_HOST = localhost
    ```

  *__NOTA__: Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

### Paso 2

  Adicionalmente será necesario que creen desde psql una base de datos llamada `pokemon`

