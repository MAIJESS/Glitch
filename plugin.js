// Glitch · tema para Kino TV (apiVersion 18)
//
// Los temas viven como datos en kino-plugin.json (appThemes): no corren código,
// no usan la red y no piden permisos. Este archivo solo dibuja una pantalla de
// presentación con un botón por tema (go.useTheme). Ajustes ▸ Apariencia sigue
// siendo la vía principal para activarlos.

const THEMES = [
  { id: "glitch-rgb", es: "Glitch RGB", en: "Glitch RGB", note: "magenta + cian", noteEn: "magenta + cyan" },
  { id: "glitch-signal", es: "Glitch Señal", en: "Glitch Signal", note: "cian + magenta", noteEn: "cyan + magenta" },
  { id: "glitch-deadpixel", es: "Píxel Muerto", en: "Dead Pixel", note: "verde ácido", noteEn: "acid green" },
];

export async function screen({ activeTheme }) {
  const buttons = THEMES.map((t) => {
    const on = activeTheme === t.id;
    return {
      type: "ElevatedButton",
      key: "theme-" + t.id,
      icon: on ? "check" : "bolt",
      labelText: on ? t.es + " · activo (desactivar)" : "Activar " + t.es,
      labelTextEn: on ? t.en + " · on (turn off)" : "Turn on " + t.en,
      onPressed: { go: { useTheme: { theme: on ? null : t.id } } },
    };
  });

  return {
    type: "SingleChildScrollView",
    children: [
      {
        type: "Column",
        padding: 16,
        gap: 12,
        children: [
          { type: "Badge", text: "SEÑAL CORRUPTA", textEn: "SIGNAL CORRUPTED", color: "error" },
          { type: "Text", text: "GL!TCH", style: "hero" },
          {
            type: "Text",
            text: "// toda la app, en modo error",
            textEn: "// the whole app, in error mode",
            style: "caption",
            color: "muted",
          },
          { type: "Divider" },
          {
            type: "Card",
            variant: "outlined",
            key: "about",
            children: [
              {
                type: "Text",
                text: "Bordes duros, esquinas rectas, reproductor cuadrado con barra gruesa, cortes de imagen en seco y un logo con aberración cromática.",
                textEn: "Hard borders, square corners, a square player with a thick seek bar, abrupt cuts and a logo with chromatic aberration.",
              },
            ],
          },
          { type: "Column", gap: 8, crossAxisAlignment: "stretch", children: buttons },
          {
            type: "Text",
            text: "También puedes cambiarlo en Ajustes ▸ Apariencia, donde ajustas acento, foco, barra y animación.",
            textEn: "You can also switch it in Settings ▸ Appearance, where you tune accent, focus, seek bar and motion.",
            style: "caption",
            color: "muted",
          },
        ],
      },
    ],
  };
}

export async function screenEvent() {
  // go.useTheme lo resuelve Kino directamente desde la pulsación del botón.
  return null;
}
