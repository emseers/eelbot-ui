import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URI') or "postgresql://eelbot:mysecretpassword@127.0.0.1:5432/eelbot"
    HOST = os.environ.get('BACKEND_HOST') or "127.0.0.1"

class DevelopmentConfig(Config):
    ENV = 'development'
    PORT = os.environ.get('BACKEND_PORT_DEV') or "1337"

class ProductionConfig(Config):
    PORT = os.environ.get('BACKEND_PORT') or "1338"