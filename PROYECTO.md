# Rick and Morty - Cliente API con Next.js 15

Cliente moderno para consumir la API pública de Rick and Morty construido con Next.js 15 App Router y TypeScript.

## Características

- **Next.js 15** con App Router
- **TypeScript** para tipado estático
- **Server Components** por defecto
- **Client Components** solo cuando es necesario (paginación interactiva)
- **API Client tipado** con estrategias de caching
- **Metadata API** para SEO optimizado
- **Loading States** y **Error Boundaries** en todas las rutas
- **Responsive Design** con CSS moderno

## Estructura del Proyecto

```
src/
├── app/                          # App Router
│   ├── characters/               # Ruta de personajes
│   │   ├── [id]/                # Detalle de personaje
│   │   │   ├── page.tsx         # Página de detalle
│   │   │   ├── loading.tsx      # Estado de carga
│   │   │   └── error.tsx        # Manejo de errores
│   │   ├── page.tsx             # Listado de personajes
│   │   ├── loading.tsx          # Estado de carga
│   │   └── error.tsx            # Manejo de errores
│   ├── episodes/                # Ruta de episodios
│   │   ├── [id]/                # Detalle de episodio
│   │   │   ├── page.tsx         # Página de detalle
│   │   │   ├── loading.tsx      # Estado de carga
│   │   │   └── error.tsx        # Manejo de errores
│   │   ├── page.tsx             # Listado de episodios
│   │   ├── loading.tsx          # Estado de carga
│   │   └── error.tsx            # Manejo de errores
│   ├── layout.tsx               # Layout principal con navegación
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── CharacterCard.tsx        # Card de personaje (Server)
│   ├── EpisodeCard.tsx          # Card de episodio (Server)
│   └── Pagination.tsx           # Paginación (Client)
└── lib/                         # Utilidades y lógica
    ├── rickmorty.ts             # Cliente API tipado
    └── types.ts                 # Tipos TypeScript
```

## Decisiones Técnicas

### 1. Cliente API Tipado (`/lib/rickmorty.ts`)

**Decisión:** Crear un módulo centralizado para todas las llamadas a la API.

**Justificación:**
- **Separación de responsabilidades:** La lógica de fetching está separada de los componentes
- **Reutilización:** Las funciones se pueden usar en múltiples páginas
- **Tipado completo:** TypeScript proporciona autocompletado y verificación de tipos
- **Estrategias de caching:** Configuración centralizada de ISR y revalidación

**Implementación:**
```typescript
// Cache: ISR con revalidación cada 1 hora
export async function getCharacters(page: number = 1): Promise<ApiResponse<Character>> {
  return fetchAPI<ApiResponse<Character>>(`/character?page=${page}`, {
    next: { revalidate: 3600, tags: ["characters"] },
  });
}
```

### 2. Estrategias de Caching

**Decisión:** Usar diferentes estrategias según el tipo de dato.

**Implementación:**
- **Listados (characters, episodes):** ISR con revalidación cada 1 hora (3600s)
- **Detalles individuales:** Static con revalidación cada 24 horas (86400s)
- **Datos relacionados:** ISR con revalidación cada 1 hora

**Justificación:**
- Los detalles cambian raramente → cache largo
- Los listados pueden actualizarse → revalidación más frecuente
- Balance entre rendimiento y frescura de datos

### 3. Server Components First

**Decisión:** Usar Server Components por defecto y Client Components solo cuando es necesario.

**Server Components:**
- `CharacterCard.tsx` - Renderizado en servidor
- `EpisodeCard.tsx` - Renderizado en servidor
- Todas las páginas (page.tsx)

**Client Components:**
- `Pagination.tsx` - Requiere interactividad (router.push, eventos onClick)

**Justificación:**
- **Mejor rendimiento:** Menos JavaScript enviado al cliente
- **SEO optimizado:** HTML completo en el servidor
- **Menor latencia:** Fetching directo desde el servidor a la API

### 4. Manejo de Múltiples IDs

**Decisión:** Normalizar respuestas de la API que retornan diferentes tipos.

**Problema:** La API de Rick and Morty retorna un objeto cuando pides un solo ID, pero un array cuando pides múltiples IDs.

**Solución:**
```typescript
export async function getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const episode = await getEpisode(ids[0]);
    return [episode]; // Normalizar a array
  }
  // Múltiples IDs retornan array naturalmente
  const idsString = ids.join(",");
  return fetchAPI<Episode[]>(`/episode/${idsString}`, { ... });
}
```

### 5. Metadata API para SEO

**Decisión:** Usar la Metadata API de Next.js 15 para generar metadata dinámica.

**Implementación:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const character = await getCharacter(params.id);
  return {
    title: character.name,
    description: `${character.name} - ${character.species}`,
    openGraph: {
      title: character.name,
      images: [character.image],
    },
  };
}
```

**Justificación:**
- **SEO optimizado:** Cada página tiene título y descripción únicos
- **Open Graph:** Previews mejorados en redes sociales
- **Type-safe:** TypeScript valida la estructura de metadata

### 6. Loading y Error States

**Decisión:** Implementar `loading.tsx` y `error.tsx` en cada nivel de ruta.

**Beneficios:**
- **UX mejorada:** Feedback visual durante la carga
- **Manejo robusto de errores:** Boundaries específicos por ruta
- **Streaming:** Next.js puede hacer streaming de Suspense boundaries

### 7. Paginación con Search Params

**Decisión:** Usar search params en lugar de route params para paginación.

**Implementación:**
```typescript
// URL: /characters?page=2
const params = await searchParams;
const page = parseInt(params.page || "1", 10);
```

**Justificación:**
- **SEO friendly:** URLs limpias y compartibles
- **Estado en URL:** El estado de paginación persiste en la URL
- **Navegación nativa:** Funciona con botones adelante/atrás del navegador

### 8. CSS Variables para Theming

**Decisión:** Usar CSS custom properties para dark mode automático.

**Implementación:**
```css
:root {
  --background: #f8f9fa;
  --foreground: #212529;
  --primary: #00b5cc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f1419;
    --foreground: #e1e8ed;
  }
}
```

**Justificación:**
- **Automático:** Respeta preferencias del sistema operativo
- **Mantenible:** Un solo lugar para definir colores
- **Performante:** CSS nativo, sin JavaScript

## Instalación y Uso

### Prerequisitos

- Node.js 18+ 
- pnpm (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>

# Instalar dependencias
pnpm install

# Modo desarrollo
pnpm dev

# Build para producción
pnpm build

# Ejecutar producción
pnpm start
```

### Scripts Disponibles

- `pnpm dev` - Inicia servidor de desarrollo en http://localhost:3000
- `pnpm build` - Genera build optimizado para producción
- `pnpm start` - Ejecuta servidor de producción
- `pnpm lint` - Ejecuta ESLint

## Rutas

- `/` - Página de inicio
- `/characters` - Listado paginado de personajes
- `/characters/[id]` - Detalle de un personaje específico
- `/episodes` - Listado paginado de episodios
- `/episodes/[id]` - Detalle de un episodio específico

## Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript 5** - Superset tipado de JavaScript
- **Rick and Morty API** - API REST pública

## Mejoras Futuras

- [ ] Agregar filtros de búsqueda por nombre, especie, estado
- [ ] Implementar página de localizaciones
- [ ] Agregar favoritos con localStorage
- [ ] Implementar infinite scroll como alternativa a paginación
- [ ] Agregar tests unitarios con Jest/Vitest
- [ ] Implementar E2E tests con Playwright
- [ ] Agregar Analytics
- [ ] Implementar PWA (Progressive Web App)

## Licencia

Este proyecto está bajo la licencia MIT.

## Recursos

- [Rick and Morty API](https://rickandmortyapi.com/documentation)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
