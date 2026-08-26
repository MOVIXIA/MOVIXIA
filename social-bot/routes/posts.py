from flask import Blueprint, request, redirect, url_for
from models.database import db, Product, Post
from services.content_generator import generate

posts_bp = Blueprint('posts', __name__)

@posts_bp.post('/generate/<int:product_id>')
def generate_posts(product_id):
    product = Product.query.get_or_404(product_id)
    for platform in ('tiktok', 'instagram', 'facebook'):
        db.session.add(Post(platform=platform, content=generate(product, platform), status='BORRADOR'))
    db.session.commit()
    return redirect(url_for('dashboard.dashboard'))
