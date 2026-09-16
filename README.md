# Un girasol antes del amanecer

Experiencia web interactiva y cinematográfica para Andrea, construida con
HTML, CSS, SVG, Canvas y JavaScript vanilla. La historia está condensada en
ocho momentos: misterio, recuerdo, reconocimiento, responsabilidad,
confesión, esperanza, declaración y un epílogo nocturno frente al mar. No
requiere instalación, compilación ni dependencias de producción.

## Ver en local

Desde esta carpeta:

```powershell
py -m http.server 4173
```

Después abre `http://localhost:4173/`.

También puede publicarse directamente desde la raíz en GitHub Pages,
Cloudflare Pages o un Worker configurado con Static Assets.

## Personalizar

- Los textos secuenciales y la carta están centralizados en `js/app.js`.
- `NarrativePacer` concentra los perfiles de lectura, pausas y cancelación de
  tiempos al cambiar de escena.
- La carta forma parte del momento de las flores; no es una escena adicional.
- `?test=1` recorre automáticamente los ocho momentos para una comprobación
  funcional rápida.
- Las fotografías opcionales se documentan en `assets/images/README.txt`.
- La música opcional se documenta en `assets/audio/README.txt`.

La experiencia incluye composiciones visuales de respaldo, así que funciona
completa aunque todavía no se hayan añadido fotografías, música ni nota de
voz. El audio protegido debe ser aportado localmente por el propietario; el
proyecto no descarga ni redistribuye esos archivos.
