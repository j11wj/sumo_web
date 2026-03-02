# تشغيل الباك اند على السيرفر (دائماً يعمل)

## الطريقة 1: المشروع موجود على السيرفر في `/var/www/sumo_web`

```bash
cd /var/www/sumo_web
chmod +x deploy/setup_backend_service.sh
./deploy/setup_backend_service.sh
```

## الطريقة 2: نسخ المشروع من جهازك ثم التشغيل

على **جهازك المحلي** (Mac):

```bash
cd /Volumes/hh/sumo_alnubala_company/web2
rsync -avz --exclude 'backend/venv' --exclude 'backend/__pycache__' --exclude 'backend/dashboard.db' --exclude 'uploads/images/*' -e ssh . root@72.62.53.138:/var/www/sumo_web/
```

ثم على **السيرفر** (ضمن SSH):

```bash
mkdir -p /var/www/sumo_web
cd /var/www/sumo_web
chmod +x deploy/setup_backend_service.sh
./deploy/setup_backend_service.sh
```

## الطريقة 3: استنساخ من GitHub ثم التشغيل

على **السيرفر**:

```bash
apt-get update && apt-get install -y git
mkdir -p /var/www && cd /var/www
git clone https://github.com/j11wj/sumo_web.git sumo_web
cd sumo_web
# إن لم يكن مجلد deploy موجوداً، أنشئ خدمة systemd يدوياً:
mkdir -p backend/venv
python3 -m venv backend/venv
backend/venv/bin/pip install -r requirements.txt
cat > /etc/systemd/system/sumo-backend.service << 'EOF'
[Unit]
Description=Sumo Backend API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/sumo_web/backend
Environment="PATH=/var/www/sumo_web/backend/venv/bin"
ExecStart=/var/www/sumo_web/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable sumo-backend
systemctl start sumo-backend
systemctl status sumo-backend
```

## التحقق

- الباك اند يعمل على: `http://72.62.53.138:8000`
- فتح الوثائق: `http://72.62.53.138:8000/docs`
- الحالة: `systemctl status sumo-backend`
- إعادة التشغيل: `systemctl restart sumo-backend`
