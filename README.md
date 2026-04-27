# Gestor de incidencias Web

Frontend del sistema de gestión de incidencias desarrollado con React, Vite y TypeScript.

## Instalación

```bash
git clone https://github.com/rominaruizdiaz/grupo5-incidencias-web.git
cd grupo5-incidencias-web
```

instala dependencias:

```bash
npm install
```

## Ejecutar la aplicación

OPCIÓN 1:

```bash
npm run dev # Terminal 1 (frontend)
npm run server # Terminal 2 (backend fake)
```

OPCIÓN 2:

```bash
npm run dev-all # Todo junto
```

La app estará disponible en:

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:3001
```

---

## Tailwind CSS

Si el proyecto no tiene estilos cargados:

```bash
npx tailwindcss init -p
```

Asegúrate de tener en src/index.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Backend fake (json-server)

Ejecutar API simulada:

```bash
npm run server
```

API disponible en:

```
http://localhost:3001
```

---

## Tecnologías usadas

- React + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- React Router
- Axios
- Recharts
- json-server

---

## Scripts disponibles

```bash
npm run dev       # frontend (Vite)
npm run server    # backend fake (json-server)
npm run dev-all   # frontend + backend simultáneo
npm run build     # build producción
npm run preview   # preview del build
npm run lint      # análisis de código
```
