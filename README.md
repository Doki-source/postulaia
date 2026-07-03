# PostulaIA

Proyecto final de **Introducción a la Inteligencia Artificial**.

**Aplicación:** https://doki-source.github.io/postulaia/

## Problema elegido

Las personas que buscan su primer empleo tecnológico suelen tener dificultades para interpretar una oferta, reconocer sus fortalezas y detectar qué conocimientos necesitan incorporar antes de postularse.

## Objetivo

Comparar un perfil junior con una oferta laboral y generar una orientación clara, sin inventar experiencia ni estudios:

- puntaje de compatibilidad;
- fortalezas;
- brechas técnicas;
- recomendación;
- plan de aprendizaje de 30 días;
- resumen para CV.

## Flujo completo

1. El usuario completa su perfil y pega una oferta laboral.
2. JavaScript limpia y estructura los campos del formulario.
3. La interfaz envía los datos a un webhook de Make.
4. Make conecta el webhook con Google Gemini AI.
5. Gemini procesa un prompt con reglas y devuelve JSON.
6. Make responde a la aplicación.
7. La interfaz valida el JSON y muestra el análisis.

`Formulario web → Webhook de Make → Google Gemini AI → JSON → Interfaz`

## Herramientas utilizadas

- HTML5, CSS3 y JavaScript
- Make
- Google Gemini AI (Gemini Flash-Lite Latest)
- Webhooks HTTP
- Git y GitHub
- GitHub Pages

## Procesamiento de datos

- Campos obligatorios mediante validación HTML.
- Conversión del formulario a pares clave-valor.
- Normalización de la respuesta de IA.
- Eliminación de posibles bloques Markdown antes de interpretar el JSON.
- Renderizado seguro con `textContent`.
- Mensajes de carga y error.

## Integración de IA

El prompt recibe nombre, ubicación, objetivo, tecnologías, educación, proyecto y oferta. Solicita una evaluación honesta y exige una salida JSON con esta estructura:

```json
{
  "puntaje": 0,
  "nivel_compatibilidad": "",
  "fortalezas": [],
  "brechas": [],
  "recomendacion": "",
  "plan_30_dias": [],
  "resumen_cv": ""
}
```

La instrucción principal evita inventar conocimientos, experiencia o estudios. Durante la iteración se simplificó el formato para obtener respuestas consistentes y fáciles de mostrar.

## Decisiones tomadas

- Se eligió Make porque permite visualizar el workflow y conectar servicios sin desarrollar un backend completo.
- Se utilizó Gemini porque la cuenta de OpenAI no tenía crédito disponible.
- Se pidió JSON para separar cada resultado y evitar respuestas difíciles de procesar.
- Se construyó una interfaz web responsive para mostrar un flujo end-to-end funcional.
- Se desplegó en GitHub Pages para entregar una aplicación accesible mediante enlace.

## Caso de uso principal

Un candidato junior carga sus conocimientos y una oferta Full Stack. El sistema detecta coincidencias con HTML, CSS y Git, y señala brechas como JavaScript, Node.js, SQL y despliegue.

## Input de prueba

- Objetivo: Desarrollador Full Stack Junior
- Tecnologías: HTML, CSS, Bootstrap, Sass, Git y GitHub
- Educación: Diplomatura en Coderhouse
- Proyecto: 99 Pilchas
- Oferta: Full Stack Jr. con HTML, CSS, JavaScript, SQL, Node.js, Git y despliegue

## Output generado

El sistema devuelve un nivel de compatibilidad bajo-medio, reconoce las bases de frontend y propone un plan de aprendizaje centrado en JavaScript, backend, bases de datos y despliegue.

## Casos de prueba

| Caso | Entrada | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Perfil parcial | Perfil frontend vs. oferta Full Stack | Detectar coincidencias y brechas | Aprobado |
| Campos vacíos | Falta un dato obligatorio | El navegador impide el envío | Aprobado |
| Respuesta válida | Gemini devuelve JSON | Mostrar todas las secciones | Aprobado |
| Error externo | Make o Gemini no responde | Mostrar un mensaje de error | Aprobado |
| Dispositivo móvil | Pantalla angosta | Formulario y resultado en una columna | Aprobado |

## Reflexión final

### Qué funcionó bien

La conexión entre la interfaz, Make y Gemini quedó automatizada. El formato JSON permitió convertir la respuesta de IA en una visualización clara y reutilizable.

### Problemas surgidos

La API de OpenAI no tenía crédito y una variante de Gemini tuvo un error temporal por alta demanda. Se resolvió cambiando el proveedor y utilizando un modelo Flash-Lite disponible.

### Mejoras futuras

- Proteger el webhook mediante un backend o control de acceso.
- Guardar un historial de análisis.
- Permitir subir un CV.
- Comparar varias ofertas.
- Agregar autenticación y base de datos.
- Evaluar la consistencia del puntaje con más casos de prueba.
