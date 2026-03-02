from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import uvicorn
from datetime import datetime
import os
import shutil
from pathlib import Path

from database import SessionLocal, engine, Base
from models import Project, Service, Message, Newsletter, Stat, Setting, Branch
from schemas import (
    ProjectCreate, ProjectUpdate, ProjectResponse,
    ServiceCreate, ServiceUpdate, ServiceResponse,
    MessageCreate, MessageResponse,
    NewsletterCreate, NewsletterResponse,
    StatUpdate, StatResponse,
    SettingUpdate, SettingResponse,
    BranchCreate, BranchUpdate, BranchResponse
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Create uploads directory (relative to repo root, robust to CWD)
_BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = _BASE_DIR.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
IMAGES_DIR = UPLOAD_DIR / "images"
IMAGES_DIR.mkdir(exist_ok=True)

app = FastAPI(title="سمو النبلاء - Dashboard API", version="1.0.0")

# Mount static files for images
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost",
        "http://127.0.0.1",
        "file://"  # للسماح بفتح الملفات مباشرة
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==================== Projects Endpoints ====================
@app.get("/api/projects", response_model=List[ProjectResponse])
def get_projects(skip: int = 0, limit: int = 100, status: Optional[str] = None, db: Session = Depends(get_db)):
    """الحصول على جميع المشاريع"""
    query = db.query(Project)
    if status:
        query = query.filter(Project.status == status)
    projects = query.offset(skip).limit(limit).all()
    return projects

@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """الحصول على مشروع محدد"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="المشروع غير موجود")
    return project

@app.post("/api/projects", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """إنشاء مشروع جديد"""
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.put("/api/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    """تحديث مشروع"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="المشروع غير موجود")
    
    update_data = project.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """حذف مشروع"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="المشروع غير موجود")
    
    db.delete(db_project)
    db.commit()
    return {"message": "تم حذف المشروع بنجاح"}


# ==================== Services Endpoints ====================
@app.get("/api/services", response_model=List[ServiceResponse])
def get_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """الحصول على جميع الخدمات"""
    services = db.query(Service).offset(skip).limit(limit).all()
    return services

@app.get("/api/services/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db: Session = Depends(get_db)):
    """الحصول على خدمة محددة"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="الخدمة غير موجودة")
    return service

@app.post("/api/services", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    """إنشاء خدمة جديدة"""
    db_service = Service(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@app.put("/api/services/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, service: ServiceUpdate, db: Session = Depends(get_db)):
    """تحديث خدمة"""
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="الخدمة غير موجودة")
    
    update_data = service.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_service, field, value)
    
    db.commit()
    db.refresh(db_service)
    return db_service

@app.delete("/api/services/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    """حذف خدمة"""
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="الخدمة غير موجودة")
    
    db.delete(db_service)
    db.commit()
    return {"message": "تم حذف الخدمة بنجاح"}


# ==================== Messages Endpoints ====================
@app.get("/api/messages", response_model=List[MessageResponse])
def get_messages(skip: int = 0, limit: int = 100, is_read: Optional[bool] = None, db: Session = Depends(get_db)):
    """الحصول على جميع الرسائل"""
    query = db.query(Message)
    if is_read is not None:
        query = query.filter(Message.is_read == is_read)
    messages = query.order_by(Message.created_at.desc()).offset(skip).limit(limit).all()
    return messages

@app.get("/api/messages/{message_id}", response_model=MessageResponse)
def get_message(message_id: int, db: Session = Depends(get_db)):
    """الحصول على رسالة محددة"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="الرسالة غير موجودة")
    return message

@app.post("/api/messages", response_model=MessageResponse)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    """إنشاء رسالة جديدة (من نموذج الاتصال)"""
    db_message = Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@app.put("/api/messages/{message_id}/read")
def mark_message_read(message_id: int, db: Session = Depends(get_db)):
    """تحديد الرسالة كمقروءة"""
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="الرسالة غير موجودة")
    
    db_message.is_read = True
    db.commit()
    return {"message": "تم تحديد الرسالة كمقروءة"}

@app.delete("/api/messages/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    """حذف رسالة"""
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="الرسالة غير موجودة")
    
    db.delete(db_message)
    db.commit()
    return {"message": "تم حذف الرسالة بنجاح"}


# ==================== Newsletter Endpoints ====================
@app.get("/api/newsletter", response_model=List[NewsletterResponse])
def get_subscribers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """الحصول على جميع المشتركين"""
    subscribers = db.query(Newsletter).offset(skip).limit(limit).all()
    return subscribers

@app.post("/api/newsletter", response_model=NewsletterResponse)
def subscribe_newsletter(newsletter: NewsletterCreate, db: Session = Depends(get_db)):
    """الاشتراك في النشرة البريدية"""
    # التحقق من وجود البريد الإلكتروني مسبقاً
    existing = db.query(Newsletter).filter(Newsletter.email == newsletter.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="البريد الإلكتروني مشترك بالفعل")
    
    db_subscriber = Newsletter(**newsletter.dict())
    db.add(db_subscriber)
    db.commit()
    db.refresh(db_subscriber)
    return db_subscriber

@app.delete("/api/newsletter/{subscriber_id}")
def unsubscribe_newsletter(subscriber_id: int, db: Session = Depends(get_db)):
    """إلغاء الاشتراك من النشرة البريدية"""
    db_subscriber = db.query(Newsletter).filter(Newsletter.id == subscriber_id).first()
    if not db_subscriber:
        raise HTTPException(status_code=404, detail="المشترك غير موجود")
    
    db.delete(db_subscriber)
    db.commit()
    return {"message": "تم إلغاء الاشتراك بنجاح"}


# ==================== Stats Endpoints ====================
@app.get("/api/stats", response_model=StatResponse)
def get_stats(db: Session = Depends(get_db)):
    """الحصول على الإحصائيات"""
    stats = db.query(Stat).first()
    if not stats:
        # إنشاء إحصائيات افتراضية
        stats = Stat(
            completed_projects=15,
            residential_units=2000,
            completion_rate=23,
            ongoing_projects=8
        )
        db.add(stats)
        db.commit()
        db.refresh(stats)
    return stats

@app.put("/api/stats", response_model=StatResponse)
def update_stats(stats: StatUpdate, db: Session = Depends(get_db)):
    """تحديث الإحصائيات"""
    db_stats = db.query(Stat).first()
    if not db_stats:
        db_stats = Stat(**stats.dict())
        db.add(db_stats)
    else:
        update_data = stats.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_stats, field, value)
    
    db.commit()
    db.refresh(db_stats)
    return db_stats


# ==================== Settings Endpoints ====================
@app.get("/api/settings", response_model=SettingResponse)
def get_settings(db: Session = Depends(get_db)):
    """الحصول على الإعدادات"""
    settings = db.query(Setting).first()
    if not settings:
        # إنشاء إعدادات افتراضية
        settings = Setting(
            site_name="شركة سمو النبلاء",
            site_description="شركة متخصصة في البناء والتشييد",
            email="info@company.com",
            phone="+966 50 123 4567",
            address="الرياض، المملكة العربية السعودية",
            primary_color="#667eea",
            secondary_color="#764ba2"
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

@app.put("/api/settings", response_model=SettingResponse)
def update_settings(settings: SettingUpdate, db: Session = Depends(get_db)):
    """تحديث الإعدادات"""
    db_settings = db.query(Setting).first()
    if not db_settings:
        db_settings = Setting(**settings.dict())
        db.add(db_settings)
    else:
        update_data = settings.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_settings, field, value)
    
    db.commit()
    db.refresh(db_settings)
    return db_settings


# ==================== Branches Endpoints (فروع الشركة) ====================
@app.get("/api/branches", response_model=List[BranchResponse])
def get_branches(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """الحصول على جميع الفروع"""
    branches = db.query(Branch).order_by(Branch.display_order.asc(), Branch.id.asc()).offset(skip).limit(limit).all()
    return branches

@app.get("/api/branches/{branch_id}", response_model=BranchResponse)
def get_branch(branch_id: int, db: Session = Depends(get_db)):
    """الحصول على فرع محدد"""
    branch = db.query(Branch).filter(Branch.id == branch_id).first()
    if not branch:
        raise HTTPException(status_code=404, detail="الفرع غير موجود")
    return branch

@app.post("/api/branches", response_model=BranchResponse)
def create_branch(branch: BranchCreate, db: Session = Depends(get_db)):
    """إضافة فرع جديد"""
    db_branch = Branch(**branch.dict())
    db.add(db_branch)
    db.commit()
    db.refresh(db_branch)
    return db_branch

@app.put("/api/branches/{branch_id}", response_model=BranchResponse)
def update_branch(branch_id: int, branch: BranchUpdate, db: Session = Depends(get_db)):
    """تحديث فرع"""
    db_branch = db.query(Branch).filter(Branch.id == branch_id).first()
    if not db_branch:
        raise HTTPException(status_code=404, detail="الفرع غير موجود")
    update_data = branch.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_branch, field, value)
    db.commit()
    db.refresh(db_branch)
    return db_branch

@app.delete("/api/branches/{branch_id}")
def delete_branch(branch_id: int, db: Session = Depends(get_db)):
    """حذف فرع"""
    db_branch = db.query(Branch).filter(Branch.id == branch_id).first()
    if not db_branch:
        raise HTTPException(status_code=404, detail="الفرع غير موجود")
    db.delete(db_branch)
    db.commit()
    return {"message": "تم حذف الفرع بنجاح"}


# ==================== Dashboard Stats Endpoint ====================
@app.get("/api/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """الحصول على إحصائيات لوحة التحكم"""
    stats = db.query(Stat).first()
    projects_count = db.query(Project).count()
    services_count = db.query(Service).count()
    messages_count = db.query(Message).filter(Message.is_read == False).count()
    subscribers_count = db.query(Newsletter).count()
    
    return {
        "stats": stats.__dict__ if stats else {
            "completed_projects": 15,
            "residential_units": 2000,
            "completion_rate": 23,
            "ongoing_projects": 8
        },
        "projects_count": projects_count,
        "services_count": services_count,
        "unread_messages": messages_count,
        "subscribers_count": subscribers_count
    }


# ==================== File Upload Endpoints ====================
@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...)):
    """رفع صورة"""
    # Check file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="الملف يجب أن يكون صورة")
    
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = Path(file.filename).suffix
    filename = f"{timestamp}_{file.filename}"
    file_path = IMAGES_DIR / filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return relative URL
        image_url = f"/uploads/images/{filename}"
        return {"url": image_url, "filename": filename, "message": "تم رفع الصورة بنجاح"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ في رفع الصورة: {str(e)}")

@app.get("/api/images")
def list_images():
    """الحصول على قائمة الصور المرفوعة"""
    images = []
    for file in IMAGES_DIR.iterdir():
        if file.is_file() and file.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
            images.append({
                "filename": file.name,
                "url": f"/uploads/images/{file.name}",
                "size": file.stat().st_size
            })
    return {"images": images}

@app.delete("/api/images/{filename}")
def delete_image(filename: str):
    """حذف صورة"""
    file_path = IMAGES_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="الصورة غير موجودة")
    
    try:
        file_path.unlink()
        return {"message": "تم حذف الصورة بنجاح"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"حدث خطأ في حذف الصورة: {str(e)}")


@app.get("/")
def root():
    return {"message": "مرحباً بك في API لوحة تحكم سمو النبلاء", "version": "1.0.0"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
