from flask import Flask
from routes.dashboard import dashboard_bp
from routes.products import products_bp
from routes.posts import posts_bp
from models.database import init_db


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    init_db(app)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(products_bp, url_prefix='/products')
    app.register_blueprint(posts_bp, url_prefix='/posts')
    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
