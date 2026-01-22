# Rick & Morty Universe Explorer

Una aplicación web moderna para explorar el universo de Rick and Morty, construida con Next.js 15+ y React 19.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Características

- **Explorar Personajes**: Navega por más de 800 personajes con paginación
- **Detalles de Personajes**: Información completa incluyendo episodios donde aparecen
- **Explorar Episodios**: Lista completa de episodios de todas las temporadas
- **Detalles de Episodios**: Información del episodio y personajes que aparecen
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Modo Oscuro**: Tema oscuro por defecto con colores característicos de la serie
- **Performance**: Server Components, ISR caching, y optimización de imágenes

## Tech Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 16.1.4 | Framework React con App Router |
| React | 19.2.3 | Biblioteca UI |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4.1.18 | Estilos utility-first |
| Framer Motion | 12.29.0 | Animaciones |
| Lucide React | 0.562.0 | Iconografía |
| Vitest | 4.0.18 | Testing |

## Inicio Rápido

### Prerrequisitos

- Node.js 18.17 o superior
- pnpm 8+

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd rick_morty

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Construye para producción |
| `pnpm start` | Inicia servidor de producción |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm test` | Ejecuta tests en modo watch |
| `pnpm test:run` | Ejecuta tests una vez |
| `pnpm test:coverage` | Ejecuta tests con cobertura |

## Arquitectura

```
src/
├── app/                    # Next.js App Router
│   ├── characters/         # Páginas de personajes
│   │   ├── [id]/          # Detalle de personaje
│   │   ├── page.tsx       # Lista de personajes
│   │   ├── loading.tsx    # Estado de carga
│   │   └── error.tsx      # Manejo de errores
│   ├── episodes/          # Páginas de episodios
│   │   └── [id]/          # Detalle de episodio
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── CharacterCard.tsx  # Tarjeta de personaje
│   ├── EpisodeCard.tsx    # Tarjeta de episodio
│   ├── ErrorBoundary.tsx  # Manejo de errores
│   ├── Pagination.tsx     # Navegación de páginas
│   └── ClientNav.tsx      # Navegación interactiva
├── lib/                   # Utilidades y lógica de negocio
│   ├── rickmorty.ts       # Cliente de API tipado
│   ├── types.ts           # Definiciones TypeScript
│   └── utils.ts           # Funciones helper
└── test/                  # Configuración de tests
    ├── mocks/             # Datos mock
    └── setup.ts           # Setup de Vitest
```

### Patrones Clave

- **Server Components por defecto**: Mejor performance y SEO
- **ISR Caching**: Revalidación inteligente de datos
- **Error Boundaries**: Manejo graceful de errores
- **TypeScript estricto**: Tipado completo de la API

## API

Este proyecto consume la [Rick and Morty API](https://rickandmortyapi.com/), una API REST gratuita con información sobre personajes, episodios y localizaciones.

### Endpoints utilizados

- `GET /character` - Lista de personajes
- `GET /character/:id` - Detalle de personaje
- `GET /episode` - Lista de episodios
- `GET /episode/:id` - Detalle de episodio

### Estrategia de Caching

| Endpoint | Revalidación | Estrategia |
|----------|--------------|------------|
| Listas | 1 hora | ISR con tags |
| Detalles | 24 horas | Static con tags |

## Testing

El proyecto usa Vitest con React Testing Library para testing.

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar con cobertura
pnpm test:coverage

# Ejecutar UI de Vitest
pnpm test:ui
```

### Estructura de Tests

```
src/
├── lib/__tests__/
│   ├── rickmorty.test.ts   # Tests de API client
│   └── utils.test.ts       # Tests de utilidades
└── components/__tests__/
    ├── CharacterCard.test.tsx
    └── EpisodeCard.test.tsx
```

## Documentación del Proyecto

Documentación adicional disponible en `.project/`:

- `memory-bank/PROJECT_BRIEF.md` - Visión general del proyecto
- `memory-bank/PROGRESS.md` - Log de progreso
- `memory-bank/ARCHITECTURE_DECISIONS.md` - ADRs
- `skills/CODING_GUIDELINES.md` - Guías de código
- `skills/TESTING_GUIDELINES.md` - Guías de testing
- `skills/LESSONS_LEARNED.md` - Errores y soluciones

## Contribuir

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

### Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
refactor: refactorización de código
test: agregar o modificar tests
docs: documentación
```

## Licencia

MIT

## Agradecimientos

- [Rick and Morty API](https://rickandmortyapi.com/) por la API gratuita
- [Adult Swim](https://www.adultswim.com/) por la serie
