# 🚀 Guía de Despliegue en Vercel

## Preparación Local (Opcional - Solo si no has ejecutado la app localmente)

Si quieres probar localmente primero:

```bash
# 1. Instalar dependencias
npm install

# 2. Generar el cliente de Prisma
npx prisma generate

# 3. Ejecutar migraciones
npx prisma migrate dev

# 4. Poblar la base de datos con datos iniciales
npm run db:seed

# 5. Ejecutar en desarrollo
npm run dev
```

---

## 📦 Despliegue en Vercel

### Paso 1: Preparar el repositorio

Si aún no lo has hecho, asegúrate de que tu código esté en un repositorio Git:

```bash
git add .
git commit -m "Preparar para despliegue en Vercel"
git push origin main
```

### Paso 2: Crear proyecto en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta (GitHub, GitLab o Bitbucket)
3. Haz clic en **"Add New..."** → **"Project"**
4. Selecciona tu repositorio de GitHub
5. Haz clic en **"Import"**

### Paso 3: Configurar Variables de Entorno

En la página de configuración del proyecto en Vercel, ve a **"Environment Variables"** y agrega:

```
DATABASE_URL=postgresql://addfame_user:Mag1cl0k0t32017@62.171.185.163:5432/addfame_db?schema=public

AUTH_SECRET=rnurBxChePKo5vrhDaXn2yJtPy9qcFXrkcuNlnnSpvM=

AUTH_URL=https://tu-dominio.vercel.app

ADMIN_EMAIL=jcpomog@gmail.com

ADMIN_PASSWORD=@Mag1cl0k0t32017
```

**⚠️ IMPORTANTE:** 
- Cambia `AUTH_URL` por tu dominio de Vercel cuando lo tengas (ej: `https://cv-portfolio-pomo.vercel.app`)
- Puedes dejarlo en blanco por ahora y agregarlo después del primer despliegue

### Paso 4: Configurar Build Settings

Vercel debería detectar automáticamente Next.js, pero verifica:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (ya configurado en package.json)
- **Output Directory:** `.next` (detectado automáticamente)
- **Install Command:** `npm install` (automático)

### Paso 5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (puede tardar 2-5 minutos)
3. Una vez completado, verás tu URL de producción

### Paso 6: Ejecutar Migraciones Iniciales

**IMPORTANTE:** Después del primer despliegue, necesitas ejecutar las migraciones y el seed en producción.

Opción A - Usando Vercel CLI (Recomendado):

```bash
# Instalar Vercel CLI si no la tienes
npm i -g vercel

# Hacer login
vercel login

# Vincular el proyecto
vercel link

# Ejecutar migraciones en producción
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

Opción B - Desde tu máquina local conectándote a la BD:

```bash
# Ya tienes la DATABASE_URL en tu .env, así que:
npx prisma migrate deploy
npm run db:seed
```

### Paso 7: Actualizar AUTH_URL

1. Copia tu URL de Vercel (ej: `https://cv-portfolio-abc123.vercel.app`)
2. Ve a la configuración de tu proyecto en Vercel
3. Ve a **Settings** → **Environment Variables**
4. Edita `AUTH_URL` y pon tu URL real
5. Haz un nuevo despliegue (puede ser simplemente haciendo push de un cambio pequeño)

---

## 🔄 Despliegues Futuros

Cada vez que hagas `git push` a tu rama principal, Vercel automáticamente:
- Detectará los cambios
- Ejecutará el build
- Desplegará la nueva versión

Si agregas nuevas migraciones de Prisma:

```bash
# Localmente
npx prisma migrate dev --name nombre_de_migracion

# Commit y push
git add .
git commit -m "Agregar migración: nombre_de_migracion"
git push

# Vercel ejecutará automáticamente: prisma migrate deploy
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module '@prisma/client'"
**Solución:** El `postinstall` script debería resolverlo, pero si persiste:
```bash
vercel env pull
npm install
npx prisma generate
```

### Error: "Database connection failed"
**Solución:** Verifica que la `DATABASE_URL` en Vercel sea correcta y que la base de datos sea accesible desde internet.

### Error 500 en NextAuth
**Solución:** Asegúrate de que `AUTH_URL` esté configurado con tu dominio real de Vercel.

### La base de datos está vacía
**Solución:** Ejecuta el seed:
```bash
npm run db:seed
```

---

## 📱 Dominio Personalizado (Opcional)

Para usar tu propio dominio:

1. Ve a **Settings** → **Domains** en tu proyecto de Vercel
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones
4. Actualiza `AUTH_URL` con tu nuevo dominio

---

## ✅ Checklist Final

- [ ] Código pusheado a GitHub/GitLab/Bitbucket
- [ ] Proyecto creado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Primera build completada exitosamente
- [ ] Migraciones ejecutadas (`prisma migrate deploy`)
- [ ] Base de datos poblada (`prisma db seed`)
- [ ] AUTH_URL actualizado con la URL real
- [ ] Login de admin funciona
- [ ] Todas las secciones cargan correctamente
- [ ] PDF de recomendación se descarga correctamente

---

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en: `https://tu-proyecto.vercel.app`

Para cualquier cambio futuro, simplemente:
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

¡Vercel se encargará del resto automáticamente!
