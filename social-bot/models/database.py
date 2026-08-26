from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    offer = db.Column(db.String(255), default='')
    media_url = db.Column(db.String(500), default='')


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String(40), nullable=False)
    content = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(30), default='BORRADOR')
