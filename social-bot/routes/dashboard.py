from flask import Blueprint, render_template
from models.database import Product, Post

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.get('/')
def dashboard():
    return render_template('dashboard.html', products=Product.query.all(), posts=Post.query.order_by(Post.id.desc()).all())
