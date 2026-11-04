# Prompt para Herramienta Interactiva

> [!NOTE]
> Este documento contiene el prompt generado por Microsoft Copilot para ser utilizado en GitHub Copilot. Contiene las instrucciones para crear un prototipo de una herramienta MDD en el marco del Taller 3 de la Diplomatura Universitaria de Estudios Avanzados *Enseñar a Distancia*.

Quiero que generes una aplicación web educativa completa utilizando únicamente HTML5, CSS3 y JavaScript Vanilla (sin frameworks ni dependencias externas).

La aplicación será un prototipo académico de un Material Didáctico Digital (MDD) para una asignatura universitaria de Inteligencia de Negocios.

---

# Objetivo pedagógico

La aplicación debe simular el análisis de una experiencia de cliente (*Customer Experience*) para que el estudiante pueda:

- Explorar un caso organizacional.
- Analizar el Customer Journey.
- Identificar fuentes de datos relevantes.
- Seleccionar indicadores (KPIs).
- Tomar decisiones fundamentadas.
- Comprender cómo se construye un diagnóstico basado en datos.

La experiencia debe representar una simulación simplificada de formulación de proyectos de Inteligencia de Negocios basados en Customer Experience.

La aplicación no debe parecer un juego.

Debe verse como una herramienta profesional de análisis.

---

# Tecnología

Generar los siguientes archivos:

```text
index.html
styles.css
script.js
```

Utilizar exclusivamente:

- HTML5
- CSS3
- JavaScript puro

No utilizar:

- React
- Angular
- Vue
- Bootstrap
- Tailwind
- jQuery
- Librerías externas

El proyecto debe funcionar simplemente abriendo `index.html`.

---

# Diseño visual

## Estética general

Dashboard corporativo moderno.

Inspirado en:

- Power BI
- Microsoft Fluent Design
- Aplicaciones empresariales modernas

Evitar completamente:

- Estética infantil
- Apariencia gamificada
- Colores estridentes
- Elementos caricaturescos

---

## Paleta de colores

| Elemento | Color |
|-----------|---------|
| Azul principal | `#2563EB` |
| Verde de confirmación | `#10B981` |
| Gris oscuro | `#374151` |
| Gris claro | `#F3F4F6` |
| Blanco | `#FFFFFF` |

---

## Tipografía

Utilizar:

```css
Segoe UI, Arial, sans-serif
```

---

## Componentes visuales

Las tarjetas deben tener:

- Bordes redondeados.
- Sombras suaves.
- Diseño limpio.
- Buen espaciado.

La interfaz debe transmitir:

- Análisis.
- Profesionalismo.
- Toma de decisiones.
- Business Intelligence.

---

## Responsive

Debe funcionar correctamente en:

- Desktop
- Tablet
- Smartphone

---

# Estructura general

Aplicación de una sola página (SPA).

Las distintas pantallas se muestran y ocultan dinámicamente mediante JavaScript.

---

# Componente persistente

Durante toda la experiencia debe existir un panel lateral fijo llamado:

## TABLERO DE ANÁLISIS

Debe mostrar:

- Problemas resueltos: X/3
- Fuentes identificadas: X
- KPIs seleccionados: X
- Decisiones tomadas: X

Los valores deben actualizarse automáticamente.

En dispositivos móviles el panel debe ubicarse en la parte superior.

---

# Caso de estudio

## GreenShop

### Descripción

Durante los últimos tres meses las ventas disminuyeron un 18%.

La organización sospecha que existen problemas en distintos puntos de la experiencia del cliente, pero no logra identificar qué sucede ni qué información debería analizar para tomar decisiones fundamentadas.

Como analista de Inteligencia de Negocios, tu misión será explorar la experiencia del cliente, identificar fuentes de datos relevantes y seleccionar indicadores adecuados para proponer mejoras.

Agregar una tarjeta destacada con:

**Ventas:** -18%

**Objetivo:** Identificar oportunidades de mejora utilizando datos.

Botón principal:

**Comenzar análisis**

---

# Customer Journey

Crear una vista visual con las siguientes etapas:

1. Descubrimiento
2. Consideración
3. Compra
4. Uso
5. Soporte

Cada etapa debe mostrarse como una tarjeta o nodo conectado visualmente.

Al seleccionar una etapa debe mostrarse información contextual.

---

# Problemas del caso

La aplicación debe contener exactamente tres situaciones.

---

## Problema 1: Abandono de checkout

### Descripción

Muchos usuarios agregan productos al carrito pero abandonan el proceso antes de finalizar la compra.

**Touchpoint correcto**

- Checkout

**Fuentes de datos correctas**

- Logs Web
- Google Analytics

**KPIs correctos**

- Tasa de abandono
- Tasa de conversión

**Decisión recomendada**

- Simplificar el proceso de checkout.

**Retroalimentación experta**

El abandono ocurre durante la etapa de compra. Los registros de navegación permiten identificar fricciones dentro del checkout y medir el impacto sobre la conversión. La organización debería analizar los pasos del proceso e implementar mejoras para reducir el abandono.

---

## Problema 2: Demoras en la atención mediante chatbot

### Descripción

Los clientes reportan tiempos de respuesta excesivos durante las consultas posteriores a la compra.

**Touchpoint correcto**

- Chatbot

**Fuentes de datos correctas**

- Logs del chatbot
- CRM

**KPIs correctos**

- Tiempo medio de respuesta
- Nivel de satisfacción

**Decisión recomendada**

- Optimizar el chatbot y revisar el flujo de atención.

**Retroalimentación experta**

Los registros conversacionales permiten identificar cuellos de botella en la atención. El análisis de los tiempos de respuesta ayuda a comprender el impacto sobre la satisfacción de los clientes.

---

## Problema 3: Baja conversión de campañas

### Descripción

Las campañas generan visitas al sitio pero una proporción reducida de esas visitas termina en compras.

**Touchpoint correcto**

- Email Marketing

**Fuentes de datos correctas**

- Plataforma de campañas
- Google Analytics

**KPIs correctos**

- Tasa de conversión
- CTR

**Decisión recomendada**

- Segmentar mejor las audiencias y optimizar los mensajes.

**Retroalimentación experta**

El análisis conjunto de campañas y comportamiento web permite identificar oportunidades de mejora en la segmentación y en la propuesta de valor comunicada.

---

# Mecánica de interacción

Para cada problema realizar la misma secuencia.

## Paso 1

Mostrar situación problemática.

Botón:

**Analizar**

---

## Paso 2

Seleccionar touchpoint principal.

- Opciones múltiples.
- Mostrar feedback inmediato.

---

## Paso 3

Seleccionar fuentes de datos.

- Permitir seleccionar hasta dos.
- Mostrar feedback inmediato.

---

## Paso 4

Seleccionar KPIs adecuados.

- Permitir selección múltiple.
- Mostrar feedback inmediato.

---

## Paso 5

Tomar decisión.

- Presentar tres alternativas.
- El usuario selecciona una.
- Mostrar corrección.

---

## Paso 6

Retroalimentación experta.

Mostrar explicación detallada.

---

## Paso 7

Marcar problema como resuelto.

Actualizar automáticamente el tablero de análisis.

---

# Matriz CX–Datos

Cuando se completen los tres problemas mostrar una matriz resumen.

Columnas:

| Problema | Touchpoint | Fuentes de Datos | KPIs | Decisión |
|-----------|------------|------------------|-------|-----------|

La matriz debe completarse automáticamente con las respuestas correctas.

Diseño tipo tabla ejecutiva.

---

# Informe Ejecutivo Final

Después de la matriz mostrar una pantalla final.

## Informe Ejecutivo

Generar automáticamente un resumen similar al siguiente:

> El análisis realizado permitió identificar oportunidades de mejora en distintas etapas de la experiencia del cliente.
>
> La problemática con mayor impacto se encuentra en la etapa de Compra, donde se detecta un elevado abandono durante el proceso de checkout.
>
> Asimismo, se identificaron oportunidades de optimización en la atención posventa y en las campañas de marketing digital.
>
> Las evidencias obtenidas sugieren priorizar iniciativas orientadas a reducir fricciones en la compra, mejorar los tiempos de respuesta y optimizar la segmentación de campañas.
>
> La combinación de fuentes de datos, indicadores y decisiones fundamentadas permite construir una base sólida para la formulación de proyectos de Inteligencia de Negocios orientados a la mejora de la experiencia del cliente.

---

# Experiencia de usuario

Implementar:

- Animaciones suaves.
- Transiciones entre pantallas.
- Indicador de progreso.
- Botones Anterior y Siguiente.
- Navegación intuitiva.
- Accesibilidad básica.
- HTML semántico.
- Comentarios en el código explicando la estructura.

---

# Resultado esperado

Generar una aplicación web completa, visualmente profesional, orientada al análisis de Customer Experience e Inteligencia de Negocios, lista para desplegarse en GitHub Pages o incrustarse en Moodle mediante iframe.
