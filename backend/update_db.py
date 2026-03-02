"""
Script to update database schema - add latitude and longitude to settings
"""
from sqlalchemy import text
from database import engine

def update_database():
    """Add latitude and longitude columns to settings table if they don't exist"""
    with engine.connect() as conn:
        try:
            # Check if columns exist
            result = conn.execute(text("PRAGMA table_info(settings)"))
            columns = [row[1] for row in result]
            
            if 'latitude' not in columns:
                print("Adding latitude column...")
                conn.execute(text("ALTER TABLE settings ADD COLUMN latitude REAL DEFAULT 24.7136"))
                conn.commit()
                print("✅ latitude column added")
            else:
                print("✅ latitude column already exists")
            
            if 'longitude' not in columns:
                print("Adding longitude column...")
                conn.execute(text("ALTER TABLE settings ADD COLUMN longitude REAL DEFAULT 46.6753"))
                conn.commit()
                print("✅ longitude column added")
            else:
                print("✅ longitude column already exists")
                
        except Exception as e:
            print(f"❌ Error: {e}")
            conn.rollback()

if __name__ == "__main__":
    update_database()
    print("✅ Database update completed!")
