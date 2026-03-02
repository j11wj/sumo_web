# تعليمات التشغيل السريع

## ✅ تم إصلاح مشكلة CORS

الآن الـ backend يدعم جميع المنافذ الشائعة:
- `http://localhost:5500` (Live Server)
- `http://127.0.0.1:5500` (Live Server)
- `http://localhost:8080`
- `http://127.0.0.1:8080`
- وغيرها...

## 🚀 كيفية التشغيل

### 1. تشغيل الـ Backend:
```bash
cd backend
python3 main.py
```

أو استخدم السكريبت:
```bash
./start_backend.sh  # Mac/Linux
start_backend.bat  # Windows
```

### 2. فتح الداشبورد:
- افتح `dashboard.html` في المتصفح
- أو استخدم Live Server على المنفذ 5500

### 3. فتح الموقع الرئيسي:
- افتح `index.html` في المتصفح
- أو استخدم Live Server على المنفذ 5500

## 🔧 إذا استمرت مشكلة CORS:

1. تأكد أن الـ backend يعمل:
   ```bash
   curl http://localhost:8000/
   ```

2. إذا كان المنفذ 8000 مستخدم:
   ```bash
   lsof -ti:8000 | xargs kill -9
   ```

3. أعد تشغيل الـ backend

## 📝 ملاحظات:

- الـ backend يعمل على: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- جميع الـ endpoints متاحة الآن مع CORS
