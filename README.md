# mutant-dna-api
Esta aplicación es una API REST diseñada para responder a un enunciado que solicita proveer de un endpoint para analizar secuencias de ADN y determinar si un ser humano es un mutante, según ciertos patrones en su ADN. La API expone varios endpoints para verificar ADN y almacenar estadísticas relacionadas con el análisis de mutantes.

## Tecnologías

- **Lenguaje:** Node.js
- **Framework:** Express

## Índice

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints](#endpoints)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/GerardoDR/mutant-dna-api.git
    ```
2. Ingresa al directorio del proyecto:
    ```bash
    cd mutant-dna-api
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
## Ejecución

1. Compila typescript
    ```bash
    npm run build
    ```
3. Ejecuta el script de inicio
    ```bash
      npm start
    ```
## Endpoints

1. POST
    ```
        http://localhost:3000/mutant
        body:{
            dna:[<dna sequence>]
        }
    ```

    
