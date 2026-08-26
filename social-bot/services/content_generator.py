def generate(product, platform):
    base = f"🔥 {product.name} por {product.price} 🔥\n\n{product.offer}\n\n"
    if platform == 'tiktok':
        return base + "¿Te lo comprarías? 👀📱\n#movixia #iphone #tecnologia #moviles #oferta #parati #fyp"
    if platform == 'instagram':
        return base + "Disponible en MOVIXIA. 📲\n\n#movixia #iphone #apple #tecnologia #moviles"
    return base + "Disponible en MOVIXIA. Consulta disponibilidad y condiciones."
