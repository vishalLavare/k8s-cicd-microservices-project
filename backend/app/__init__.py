from flask import Flask
from flask_cors import CORS
from .db import db
import os

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Configure Database
    db_url = os.environ.get('DATABASE_URL', 'sqlite:///local_dev.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        from . import routes
        app.register_blueprint(routes.api)
        
        # In production it's better to use Alembic/Flask-Migrate
        # For this setup we will just auto-create tables
        db.create_all()
        
    return app
