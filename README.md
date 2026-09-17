# Un girasol antes del amanecer

Experiencia web interactiva y cinematográfica para Andrea, construida con
HTML, CSS, SVG y JavaScript vanilla. La historia está condensada en siete
momentos y plantea una despedida honesta: gratitud, responsabilidad, respeto,
un último regalo, el risco y finalmente el amanecer. No requiere instalación,
compilación, backend ni dependencias de producción.

## Ver en local

Desde esta carpeta:

```powershell
py -m http.server 4173
```

Después abre `http://localhost:4173/`.

También puede publicarse directamente desde la raíz en GitHub Pages,
Cloudflare Pages o un Worker configurado con Static Assets.

## Personalizar

- Los textos secuenciales están centralizados en `js/app.js`.
- `NarrativePacer` concentra los perfiles de lectura, pausas y cancelación de
  tiempos al cambiar de escena.
- `?test=1` recorre automáticamente los siete momentos para una comprobación
  funcional rápida.
- La música opcional se documenta en `assets/audio/README.txt`.

Toda la dirección visual está construida en el propio frontend. La música debe
ser aportada localmente por el propietario; el proyecto no descarga ni
redistribuye archivos protegidos.
