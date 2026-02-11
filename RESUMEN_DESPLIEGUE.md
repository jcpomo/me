# 🚀 Resumen Rápido - Despliegue en Vercel

## ✅ Lo que ya está listo:

1. ✅ Código preparado con scripts de build correctos
2. ✅ Base de datos PostgreSQL configurada
3. ✅ Archivo `vercel.json` creado
4. ✅ `.gitignore` protege tus credenciales
5. ✅ Sección de Recomendaciones agregada con PDF

---

## 🎯 Pasos Simples para Desplegar:

### 1️⃣ Sube el código a GitHub (si no lo has hecho)

```bash
git add .
git commit -m "Agregar sección de recomendaciones y preparar despliegue"
git push origin main
```

### 2️⃣ Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio
4. **Configura estas variables de entorno:**
   - `DATABASE_URL` = `postgresql://addfame_user:Mag1cl0k0t32017@62.171.185.163:5432/addfame_db?schema=public`
   - `AUTH_SECRET` = `rnurBxChePKo5vrhDaXn2yJtPy9qcFXrkcuNlnnSpvM=`
   - `AUTH_URL` = (déjalo vacío por ahora, lo actualizarás después)
   - `ADMIN_EMAIL` = `jcpomog@gmail.com`
   - `ADMIN_PASSWORD` = `@Mag1cl0k0t32017`
5. Haz clic en **"Deploy"**

### 3️⃣ Después del primer despliegue

Una vez que Vercel te dé tu URL (ej: `https://tu-app.vercel.app`):

```bash
# Ejecuta las migraciones y seed (una sola vez)
npx prisma migrate deploy
npm run db:seed
```

Luego, ve a Vercel:
- Settings → Environment Variables
- Edita `AUTH_URL` y pon tu URL real: `https://tu-app.vercel.app`
- Redeploy (botón "Redeploy" en Deployments)

---

## 🎉 ¡Y listo!

Tu web estará en: `https://tu-proyecto.vercel.app`

---

## 📖 Documentación Completa

Para más detalles, revisa: `DESPLIEGUE.md`
