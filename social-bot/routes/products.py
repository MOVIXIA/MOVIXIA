from flask import Blueprint, request, redirect, url_for
from models.database import db, Product

products_bp = Blueprint('products', __name__)

@products_bp.post('/create')
def create_product():
    product = Product(
        name=request.form['name'],
        price=request.form['price'],
        offer=request.form.get('offer', ''),
        media_url=request.form.get('media_url', '')
    )
    db.session.add(product)
    db.session.commit()
    return redirect(url_for('dashboard.dashboard'))
