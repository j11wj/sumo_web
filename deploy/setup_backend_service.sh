#!/bin/bash
# تشغيل الباك اند على السيرفر وإبقاؤه يعمل دائماً (systemd)
# نفّذ هذا السكربت على السيرفر بعد رفع المشروع

set -e
APP_DIR="${APP_DIR:-/var/www/sumo_web}"

echo "=== إعداد الباك اند في $APP_DIR ==="

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -f "backend/main.py" ]; then
    echo "خطأ: لا يوجد backend/main.py في $APP_DIR"
    echo "انسخ مشروع web2 إلى السيرفر أولاً (مثلاً عبر git clone أو rsync)."
    exit 1
fi

cd backend

# إنشاء بيئة افتراضية وتثبيت المتطلبات
if [ ! -d "venv" ]; then
    echo "إنشاء venv..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r ../requirements.txt

# تثبيت خدمة systemd
SERVICE_FILE="/etc/systemd/system/sumo-backend.service"
sed "s|/var/www/sumo_web|$APP_DIR|g" "$APP_DIR/deploy/sumo-backend.service" > /tmp/sumo-backend.service 2>/dev/null || true

if [ -f "$APP_DIR/deploy/sumo-backend.service" ]; then
    sed "s|/var/www/sumo_web|$APP_DIR|g" "$APP_DIR/deploy/sumo-backend.service" > /tmp/sumo-backend.service
    sudo cp /tmp/sumo-backend.service "$SERVICE_FILE"
else
    cat > /tmp/sumo-backend.service << EOF
[Unit]
Description=Sumo Alnubala Backend API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR/backend
Environment="PATH=$APP_DIR/backend/venv/bin"
ExecStart=$APP_DIR/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
    sudo cp /tmp/sumo-backend.service "$SERVICE_FILE"
fi

sudo systemctl daemon-reload
sudo systemctl enable sumo-backend
sudo systemctl restart sumo-backend
sudo systemctl status sumo-backend --no-pager

echo ""
echo "تم. الباك اند يعمل على المنفذ 8000 ويُعاد تشغيله تلقائياً عند التعطل أو إعادة التشغيل."
echo "أوامر مفيدة:"
echo "  sudo systemctl status sumo-backend   # الحالة"
echo "  sudo systemctl restart sumo-backend # إعادة التشغيل"
echo "  sudo journalctl -u sumo-backend -f # عرض السجلات"
