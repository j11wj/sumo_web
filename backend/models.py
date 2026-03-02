from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float
from sqlalchemy.sql import func
from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    location = Column(String, nullable=False)
    category = Column(String, nullable=False)  # سكني، تجاري، بنية تحتية، إلخ
    status = Column(String, nullable=False)  # قيد التنفيذ، مكتمل، قيد المراجعة
    progress = Column(Integer, default=0)  # نسبة الإنجاز من 0 إلى 100
    description = Column(Text)
    image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    icon = Column(String)  # اسم الأيقونة
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String)
    subject = Column(String)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Newsletter(Base):
    __tablename__ = "newsletter"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Stat(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)
    completed_projects = Column(Integer, default=0)
    residential_units = Column(Integer, default=0)
    completion_rate = Column(Integer, default=0)  # نسبة الإنجاز
    ongoing_projects = Column(Integer, default=0)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    site_name = Column(String, default="شركة سمو النبلاء")
    site_description = Column(Text)
    email = Column(String)
    phone = Column(String)
    address = Column(String)
    map_url = Column(String)
    latitude = Column(Float, default=24.7136)  # إحداثيات الرياض الافتراضية
    longitude = Column(Float, default=46.6753)
    primary_color = Column(String, default="#667eea")
    secondary_color = Column(String, default="#764ba2")
    dark_mode = Column(Boolean, default=True)
    facebook_url = Column(String)
    twitter_url = Column(String)
    instagram_url = Column(String)
    linkedin_url = Column(String)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Branch(Base):
    """فروع الشركة - مواقع على الخريطة"""
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    phone = Column(String)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
