# Frontend Guidelines y Arquitectura

## Arquitectura del Frontend

### Estructura del Proyecto
El proyecto utiliza Next.js App Router y está organizado de la siguiente manera:

```typescript
asistente-legal-ai/
├── app/                    # Directorio principal de Next.js App Router
│   ├── layout.tsx         # Layout principal con providers
│   ├── page.tsx          # Página principal del chat
│   └── globals.css       # Estilos globales y variables CSS
├── components/            # Componentes reutilizables
│   ├── chat/            # Componentes específicos del chat
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   └── MessageList.tsx
│   ├── layout/          # Componentes de estructura
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/             # Componentes base (shadcn/ui)
│       ├── button.tsx
│       └── input.tsx
├── lib/                  # Utilidades y configuración
│   ├── types/          # Tipos TypeScript
│   └── utils.ts        # Funciones utilitarias
└── docs/                # Documentación
````
