from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# Project Schemas
class ProjectBase(BaseModel):
    name: str
    location: str
    category: str
    status: str
    progress: int = 0
    description: Optional[str] = None
    image_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    progress: Optional[int] = None
    description: Optional[str] = None
    image_url: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Service Schemas
class ServiceBase(BaseModel):
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None


class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Message Schemas
class MessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str


class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Newsletter Schemas
class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


# Stat Schemas
class StatBase(BaseModel):
    completed_projects: int = 0
    residential_units: int = 0
    completion_rate: int = 0
    ongoing_projects: int = 0


class StatUpdate(BaseModel):
    completed_projects: Optional[int] = None
    residential_units: Optional[int] = None
    completion_rate: Optional[int] = None
    ongoing_projects: Optional[int] = None


class StatResponse(StatBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Setting Schemas
class SettingBase(BaseModel):
    site_name: str
    site_description: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    map_url: Optional[str] = None
    latitude: float = 24.7136
    longitude: float = 46.6753
    primary_color: str = "#667eea"
    secondary_color: str = "#764ba2"
    dark_mode: bool = True
    facebook_url: Optional[str] = None
    twitter_url: Optional[str] = None
    instagram_url: Optional[str] = None
    linkedin_url: Optional[str] = None


class SettingUpdate(BaseModel):
    site_name: Optional[str] = None
    site_description: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    map_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    dark_mode: Optional[bool] = None
    facebook_url: Optional[str] = None
    twitter_url: Optional[str] = None
    instagram_url: Optional[str] = None
    linkedin_url: Optional[str] = None


class SettingResponse(SettingBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Branch Schemas (فروع الشركة)
class BranchBase(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float
    phone: Optional[str] = None
    display_order: int = 0


class BranchCreate(BranchBase):
    pass


class BranchUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    phone: Optional[str] = None
    display_order: Optional[int] = None


class BranchResponse(BranchBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
