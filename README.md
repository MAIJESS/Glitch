# GL!TCH · tema para Kino TV

Tema para **toda la app** de Kino (celular y TV) con una sola idea: que todo parezca una señal corrupta. Incluye tres paletas, un logo vectorial propio con aberración cromática, bordes duros y un reproductor cuadrado con barra gruesa.

Es un plugin de **solo temas**: los temas son datos en `kino-plugin.json` (`appThemes`). No ejecuta código para pintar, no usa la red (`"hosts": []`) y no pide permisos. Sigue la guía oficial: <https://kinotvapp.github.io/kino-plugins/themes/>

> Requiere **Kino 0.9.81 o posterior** (`apiVersion` 18). Los bordes (`*Border`) los dibuja Kino 0.9.82 o posterior; en 0.9.81 el tema funciona, pero sin bordes.

## Los tres temas

| id | Nombre | Acento | Foco / borde | Reproductor |
|---|---|---|---|---|
| `glitch-rgb` | Glitch RGB | magenta `#FF2E88` | cian `#00F0FF` | botones cuadrados, cortes a 60 ms |
| `glitch-signal` | Glitch Señal | cian `#00F0FF` | magenta `#FF2E88` | botones redondeados, cortes a 110 ms, deriva del héroe activa |
| `glitch-deadpixel` | Píxel Muerto | verde ácido `#B6FF00` | magenta `#FF2E88` | botones cuadrados, bordes de 2 dp, cortes a 40 ms |

> No cambies nunca un `id` después de publicar: de él cuelgan la elección y los ajustes de cada persona.

## Qué hace glitch cada parte

- **Esquinas y bordes.** Todos los radios en 0. Borde de 1 dp en tarjetas, paneles y menús, 2 dp en diálogos (3 dp en Píxel Muerto) y una línea en las cabeceras, siempre en un color de aberración distinto al acento.
- **Tipografía.** Kino no permite cargar una fuente desde un tema (solo escalas), así que la identidad tipográfica va en el **logo vectorial**: un «KINO» en bloques rectos, cortado en franjas desplazadas, con dos copias fantasma (magenta y cian) detrás. Además `typography.scale` 1,05 y `titleScale` 1,12 dan títulos más rotundos.
- **Logo.** `logo.wordmark` (menú lateral, cabecera del celular, riel abierto de la TV) y `logo.mark` (riel cerrado de la TV): solo trazos SVG con relleno `textPrimary`, dos capas de color fijo y unos píxeles sueltos con el `accent` del tema. Kino conserva su propio logo en la pantalla de inicio y en las pantallas de decisión.
- **Botones y barra del reproductor.** `player.buttonShape` cuadrado, `playButtonScale` 1,45 (1,5 en TV), `seekBarScale` 1,7 (1,9 en TV) y etiquetas un 10 % más grandes. En la TV el foco sigue siendo el marcador de Kino, recoloreado con `focus`.
- **Movimiento.** `focusZoom` 1,08 y `crossfadeMs` muy cortos: las transiciones son cortes, no fundidos. Con «efectos reducidos» activado en el aparato, Kino ignora todo `motion`.
- **Experiencia.** `"experience": "light"`: al activar el tema Kino pregunta si quieres la experiencia ligera (sin sombras ni efectos, esquinas rectas). Nada cambia sin tu «sí».
- **Plugins de terceros.** `"pluginColors": "override"`: el tema manda también sobre los colores `theme` de otros plugins. La persona puede apagarlo con el interruptor **Colores de los plugins**.

## Personalizar (Ajustes ▸ Apariencia ▸ Personalizar)

La persona puede cambiar, dentro de rangos que fijamos aquí: acento (5 muestras), color de foco (4 muestras), duración del corte (0–400 ms), grosor de la barra de reproducción (1,0–2,0), escala de letra (1,0–1,3) y el fondo. Las muestras de color son lo que funciona con un control remoto de TV.

## Pantalla de presentación

`plugin.js` exporta `screen` y `screenEvent` para una página con un botón por tema (`go.useTheme`). Se abre desde la pestaña de ajustes del plugin con **Ver presentación**. Los botones leen `activeTheme` para alternar «Activar» y «Desactivar».

## Archivos

```
kino-plugin.json   manifiesto, tres temas y logos vectoriales
plugin.js          pantalla de presentación (los temas no necesitan código)
icon.png           icono 256×256 del plugin
README.md          este archivo
```

## Probar

Con el kit oficial de plugins de Kino:

```bash
node sdk/validate.mjs .                                                  # formato y advertencias, celular y TV
node sdk/run.mjs --context '{"activeTheme":"glitch-rgb"}' . screen       # pantalla con el tema activo
node sdk/run.mjs . screenEvent activate --trigger tap
```

`validate.mjs` repite palabra por palabra las advertencias de la app. El kit no dibuja colores: revisa el resultado en Kino, en **Ajustes ▸ Apariencia** (hay una vista previa con una fila de Inicio, un diálogo y los controles del reproductor).

Los tres temas ya pasan por mi lado las protecciones de legibilidad de Kino (fondo oscuro, `accent` ≥ 3:1 sobre el fondo, `onAccent` ≥ 4,5:1, texto ≥ 4,5:1 sobre fondo, `surface` y `surfaceHigh`, `focus` ≥ 3:1), pero confirma con el validador oficial antes de publicar.

## Publicar

1. Sube la carpeta a un repositorio de GitHub (`kino-plugin.json` en la raíz, o en una subcarpeta si usas `owner/repo/ruta`).
2. Sigue <https://kinotvapp.github.io/kino-plugins/publish/>.
3. El campo `categories: ["themes"]` lo lista en **Temas** en la tienda de plugins.

El manifiesto pesa unos 13 KB de los 16 KB permitidos; si añades más temas o logos, vigila ese tope.

## Propuesta visual del icono (`icon.png`)

- **Fondo:** degradado casi negro a violeta con una cuadrícula muy tenue, como un monitor apagado.
- **Símbolo:** una «K» de bloques rectos con el mismo corte en franjas desplazadas que el logo, separada en dos canales de color (magenta a la izquierda, cian a la derecha) que se suman en blanco donde se cruzan.
- **Ruido:** bloques sueltos de píxeles en magenta, cian, verde ácido y blanco, y líneas de escaneo suaves sobre toda la imagen.
- **Marco:** doble borde fino, cian por fuera y magenta por dentro.

Es una propuesta generada con vectores y píxeles planos: puedes reemplazarla por una versión tuya de hasta 128 KB, cuadrada y en PNG, usando el mismo nombre `icon.png`.
