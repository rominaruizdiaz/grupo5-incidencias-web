# Gestor de incidencias Web

Frontend del sistema de gestión de incidencias desarrollado con React, Vite y TypeScript.

## Instalación

```bash
git clone <URL_DEL_REPO>
cd grupo5-incidencias-web
```

instala dependencias:

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm run dev
```

La app estará disponible en:

```
http://localhost:5173
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
npx json-server --watch db.json --port 3000
```

API disponible en:

```
http://localhost:3000
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
npm run dev       # desarrollo
npm run build     # build producción
npm run preview   # preview del build
```
