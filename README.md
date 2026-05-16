# Finance Dashboard

Dashboard financiero personal para gestionar ingresos, gastos, presupuestos y categorías. Construido desde cero con React, TypeScript y Supabase.

🔗 **Demo en vivo:** [finance-dashboard-hazel-psi-52.vercel.app](https://finance-dashboard-hazel-psi-52.vercel.app)

<img width="1365" height="649" alt="image" src="https://github.com/user-attachments/assets/523fe86e-5a00-4a17-8097-bca02d0d0972" />

---

## Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Primeros Pasos](#primeros-pasos)
- [Scripts Disponibles](#scripts-disponibles)
- [Base de Datos](#base-de-datos)
- [Variables de Entorno](#variables-de-entorno)
- [Deployment](#deployment)
- [Monedas Soportadas](#monedas-soportadas)
- [Próximas Mejoras](#próximas-mejoras)
- [Autor](#autor)
- [Licencia](#licencia)
- [Soporte](#soporte)

---

## Características

### 💰 Funcionalidades Principales
- **📊 Dashboard** — Balance total, ingresos y gastos del mes, gráfico de los últimos 6 meses y transacciones recientes
- **💳 Transacciones** — CRUD completo con filtros por título y tipo (ingreso/gasto), edición y eliminación con confirmación
- **🏷️ Categorías** — CRUD con color personalizado, búsqueda y validación en tiempo real
- **🎯 Presupuestos** — Límites mensuales por categoría con barra de progreso (verde/amarillo/rojo) y cálculo automático de gastos
- **⚙️ Configuración** — Edición de perfil con foto de avatar, teléfono, moneda preferida y soporte multi-moneda
- **🔐 Autenticación** — Login y registro con validación de contraseña, sesión persistente y protección de rutas

### ✨ Experiencia de Usuario
- **🌓 Modo oscuro/claro** — Toggle con preferencia guardada en localStorage
- **📱 Responsive** — Sidebar colapsable en móvil, grillas adaptables, diseño mobile-first
- **⚠️ Confirmación antes de borrar** — Dialog de confirmación en todas las acciones destructivas
- **✅ Validación en tiempo real** — Formularios con validación Zod y React Hook Form
- **🛠️ Manejo de errores** — Loading states, mensajes de error, límites de presupuesto visuales

### 🔒 Seguridad
- **🔑 Autenticación Supabase** — Email/password con tokens de sesión
- **👤 Datos aislados por usuario** — Row Level Security (RLS), cada usuario solo ve sus datos
- **🚪 Rutas protegidas** — Redirección automática a login si no hay sesión
- **🛡️ Validación de entrada** — Validación en cliente y servidor

---

## Stack Tecnológico

| Tecnología | Versión | Descripción |
|---|---|---|
| ⚛️ React | 19 | UI y componentes |
| 🔷 TypeScript | 6 | Tipado estricto |
| ⚡ Vite | 8 | Build tool y dev server |
| 🛣️ TanStack Router | 1.168 | Routing basado en archivos |
| 📊 TanStack Table | 8.21 | Tablas con filtros y ordenamiento |
| 🗄️ Supabase | 2.105 | Base de datos, autenticación y storage |
| 🎨 Tailwind CSS | 4 | Estilos y theming |
| 📈 Recharts | 3.8 | Gráficos de ingresos/gastos |
| 📋 React Hook Form | 7.74 | Gestión de formularios |
| ✔️ Zod | 4.3 | Validación de esquemas |
| 🎭 Lucide React | 1.12 | Iconografía |
| 🔍 ESLint | 10 | Linting y análisis de código |

---

## Arquitectura

El proyecto sigue una arquitectura por features — cada módulo tiene su propia carpeta con componentes, hooks, schemas y datos:

```
src/
├── components/         # Componentes reutilizables (layout, confirm-dialog)
├── context/            # AuthContext, ThemeProvider
├── features/
│   ├── auth/           # Login y registro
│   ├── dashboard/      # Métricas, gráfico, transacciones recientes
│   ├── transactions/   # CRUD de transacciones
│   ├── categories/     # CRUD de categorías
│   ├── budgets/        # CRUD de presupuestos
│   └── settings/       # Perfil y avatar
├── hooks/              # Custom hooks globales
├── lib/                # Cliente Supabase, utils, schemas
└── routes/             # File-based routing con TanStack Router
```

### Patrones Implementados
- **Custom Hooks** — Lógica de datos separada en `use-*.ts` hooks
- **Validación con Zod** — Esquemas tipados para seguridad en tiempo de compilación
- **Context API** — Gestión de autenticación y tema global
- **Component Composition** — Componentes pequeños y reutilizables
- **Error Handling** — Manejo de errores con boundaries y UI

---

## Primeros Pasos

### Requisitos
- **Node.js** 18 o superior
- **pnpm** (recomendado) o npm
- Cuenta en [Supabase](https://supabase.com) (gratuita)

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/Ricky-Santiago/finance-dashboard.git
cd finance-dashboard

# Instala dependencias
pnpm install
```


## Base de Datos

El proyecto usa 4 tablas en Supabase con **Row Level Security (RLS)** habilitado — cada usuario solo ve y modifica sus propios datos.

### 📋 Tablas Principales

#### profiles
Información del perfil del usuario

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Primary Key, referencia a auth.users |
| `full_name` | TEXT | Nombre completo del usuario |
| `avatar_url` | TEXT | URL de la foto de perfil en Storage |
| `phone` | TEXT | Número de teléfono |
| `currency` | TEXT | Moneda preferida (USD, PEN, EUR, MXN, COP, ARS) |

#### categories
Categorías personalizadas del usuario

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key a auth.users |
| `name` | TEXT | Nombre de la categoría |
| `color` | TEXT | Color en formato hex (ej: #ef4444) |
| `created_at` | TIMESTAMP | Fecha de creación |

#### transactions
Transacciones de ingresos y gastos

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key a auth.users |
| `title` | TEXT | Descripción de la transacción |
| `amount` | DECIMAL | Monto |
| `type` | ENUM | 'income' o 'expense' |
| `category_id` | UUID | Foreign Key a categories (nullable) |
| `date` | TEXT | Fecha de la transacción |
| `created_at` | TIMESTAMP | Fecha de creación |

#### budgets
Presupuestos mensuales por categoría

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key a auth.users |
| `category_id` | UUID | Foreign Key a categories |
| `amount` | DECIMAL | Límite presupuestario |
| `month` | INTEGER | Mes (1-12) |
| `year` | INTEGER | Año |
| `created_at` | TIMESTAMP | Fecha de creación |

### 🎞️ Storage

**Bucket: avatars**
- **Ruta:** `{user_id}/avatar.{ext}`
- **Acceso:** Público para lectura, protegido para escritura
- **Uso:** Almacenar fotos de perfil de usuarios

### 🔒 Row Level Security (RLS)

Todas las tablas tienen políticas RLS configuradas:
- ✅ Usuarios solo pueden **ver** sus propios datos
- ✅ Usuarios solo pueden **insertar** datos con su `user_id`
- ✅ Usuarios solo pueden **actualizar** sus propios registros
- ✅ Usuarios solo pueden **eliminar** sus propios registros

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_SUPABASE_URL` | URL de tu proyecto Supabase | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Anon key de tu proyecto Supabase | `eyJhbGc...` |

**Nota**: Estas variables están expuestas públicamente (anon key) pero están protegidas por Row Level Security en Supabase.

---

## Deployment

### 🚀 Vercel 

**Pasos para desplegar:**

1. Sube el repositorio a [GitHub](https://github.com)
2. Accede a [vercel.com](https://vercel.com) y conecta tu cuenta de GitHub
3. Selecciona el repositorio `finance-dashboard`
4. En **Environment Variables**, agrega:
   ```
   VITE_SUPABASE_URL = tu_url
   VITE_SUPABASE_ANON_KEY = tu_anon_key
   ```
5. Haz clic en **Deploy**
6. ✅ ¡Listo! Vercel deployará automáticamente en cada push a `main`

## Próximas Mejoras

Características planeadas para futuras versiones:

- [ ] **Tests** — Cobertura unitaria e integración
- [ ] **Reportes** — Exportar datos a PDF/CSV
- [ ] **Transacciones Recurrentes** — Ingresos/gastos automáticos
- [ ] **Alertas de Presupuesto** — Notificaciones cuando se acerca al límite
- [ ] **Análisis Avanzado** — Gráficos de tendencias y proyecciones
- [ ] **Sincronización en Tiempo Real** — WebSockets para múltiples dispositivos
- [ ] **App Móvil** — React Native para iOS/Android
- [ ] **Importar Datos** — De otros servicios financieros

---

## Autor

Creado con ❤️ por [Ricky Santiago](https://github.com/Ricky-Santiago)

- GitHub: [@Ricky-Santiago](https://github.com/Ricky-Santiago)
- Proyecto: [finance-dashboard](https://github.com/Ricky-Santiago/finance-dashboard)

---

## Licencia

Este proyecto está bajo licencia **MIT**. Eres libre de usarlo, modificarlo y distribuirlo.

Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## Soporte y Contacto

### ¿Tienes dudas?

- 📝 **Issues:** [Abre un issue en GitHub](https://github.com/Ricky-Santiago/finance-dashboard/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Ricky-Santiago/finance-dashboard/discussions)

### 🐛 Reportar un Bug

Si encuentras un bug:
1. Verifica que no exista un issue igual
2. Crea un nuevo issue con:
   - Descripción del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)

### ✨ Sugerir una Mejora

¡Nos encanta recibir sugerencias! Abre un issue con:
- Título descriptivo
- Descripción detallada de la mejora
- Casos de uso o ejemplos

---

## Agradecimientos

Construido con tecnologías modernas:

- [React](https://react.dev) — UI library
- [Supabase](https://supabase.com) — Backend & Database
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [TanStack](https://tanstack.com) — Router & Table
- [Recharts](https://recharts.org) — Charting
- [Zod](https://zod.dev) — Schema validation
- [Vercel](https://vercel.com) — Hosting

---

**⭐ Si te fue útil, deja una star en GitHub!**
