"""
Script to initialize database with default data
Run this once to populate the database with sample data
"""

from database import SessionLocal, engine, Base
from models import Project, Service, Stat, Setting, Branch

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    # Check if data already exists
    if db.query(Project).count() > 0:
        print("✅ Database already has data. Skipping initialization.")
        if db.query(Branch).count() == 0:
            for b in [
                Branch(name="الفرع الرئيسي - الرياض", address="الرياض، حي العليا، شارع الملك فهد", latitude=24.7136, longitude=46.6753, phone="+966 50 123 4567", display_order=0),
                Branch(name="فرع النجف", address="النجف الأشرف، العراق", latitude=32.0290, longitude=44.3466, phone="+964 780 123 4567", display_order=1),
            ]:
                db.add(b)
            db.commit()
            print("   تمت إضافة فروع افتراضية (جدول الفروع كان فارغاً).")
    else:
        print("📦 Initializing database with default data...")
        
        # Add default projects
        projects = [
            Project(
                name="قرية السلام النموذجية",
                location="النجف",
                category="سكني",
                status="قيد التنفيذ",
                progress=75,
                description="مجمع سكني نموذجي بسعة 1800 وحدة سكنية على مساحة 220 دونم",
                image_url="image/photo_2025-12-05_21-11-46.jpg"
            ),
            Project(
                name="برج تجاري",
                location="جدة",
                category="تجاري",
                status="مكتمل",
                progress=100,
                description="برج تجاري حديث بمواصفات عالمية",
                image_url="https://via.placeholder.com/40"
            ),
            Project(
                name="مركز تسوق",
                location="الدمام",
                category="تجاري",
                status="قيد المراجعة",
                progress=45,
                description="مركز تسوق متكامل",
                image_url="https://via.placeholder.com/40"
            ),
            Project(
                name="مجمع الياسر النموذجي",
                location="النجف",
                category="سكني",
                status="قيد التنفيذ",
                progress=60,
                description="مجمع سكني فاخر يضم 175 وحدة سكنية",
                image_url="image/photo_2025-12-05_21-11-23.jpg"
            )
        ]
        
        for project in projects:
            db.add(project)
        
        # Add default services
        services = [
            Service(
                title="البناء والتشييد",
                description="تنفيذ مشاريع بناء متكاملة بأعلى معايير الجودة",
                icon="fa-hammer"
            ),
            Service(
                title="التصميم المعماري",
                description="تصاميم معمارية مبتكرة تجمع بين الجمال والوظيفة",
                icon="fa-pencil-ruler"
            ),
            Service(
                title="الصيانة والتشغيل",
                description="خدمات صيانة شاملة لضمان استمرارية المشاريع",
                icon="fa-tools"
            ),
            Service(
                title="إدارة المشاريع",
                description="إدارة احترافية للمشاريع من التخطيط حتى التسليم",
                icon="fa-chart-line"
            )
        ]
        
        for service in services:
            db.add(service)
        
        # Add default stats
        stats = Stat(
            completed_projects=15,
            residential_units=2000,
            completion_rate=23,
            ongoing_projects=8
        )
        db.add(stats)
        
        # Add default settings
        settings = Setting(
            site_name="شركة سمو النبلاء",
            site_description="شركة متخصصة في البناء والتشييد",
            email="info@company.com",
            phone="+966 50 123 4567",
            address="الرياض، المملكة العربية السعودية",
            primary_color="#667eea",
            secondary_color="#764ba2",
            dark_mode=True
        )
        db.add(settings)
        
        # فروع افتراضية (إن لم تكن موجودة)
        if db.query(Branch).count() == 0:
            branches = [
                Branch(
                    name="الفرع الرئيسي - الرياض",
                    address="الرياض، حي العليا، شارع الملك فهد",
                    latitude=24.7136,
                    longitude=46.6753,
                    phone="+966 50 123 4567",
                    display_order=0
                ),
                Branch(
                    name="فرع النجف",
                    address="النجف الأشرف، العراق",
                    latitude=32.0290,
                    longitude=44.3466,
                    phone="+964 780 123 4567",
                    display_order=1
                ),
            ]
            for branch in branches:
                db.add(branch)
            print(f"   - Added {len(branches)} default branches")
        
        db.commit()
        print("✅ Database initialized successfully!")
        print(f"   - Added {len(projects)} projects")
        print(f"   - Added {len(services)} services")
        print("   - Added default stats")
        print("   - Added default settings")
        
except Exception as e:
    print(f"❌ Error initializing database: {e}")
    db.rollback()
finally:
    db.close()
