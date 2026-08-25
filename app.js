let cart=JSON.parse(localStorage.getItem('movixia_cart')||'[]');
const CHECKOUT_URL='https://ancient-lab-10c8.thnzgls.workers.dev/checkout';
const euro=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n);
function card(p){let off=p.stock<=0||p.price<=0;return `<article class="product"><div class="photo">${p.image?`<img src="${p.image}" alt="${p.name}">`:'📱'}</div><span class="badge">${p.condition}</span><h3>${p.name}</h3><div class="spec">${p.specs}</div><div class="price">${p.price>0?euro(p.price):'Precio por configurar'}</div><div class="spec">${p.stock>0?p.stock+' unidades disponibles':'Sin stock configurado'}</div><button class="btn" ${off?'disabled':''} onclick="add(${p.id})">${off?'No disponible':'Añadir al carrito'}</button></article>`}
function render(){let q=(document.getElementById('search').value||'').toLowerCase(),c=document.getElementById('condition').value;document.getElementById('products').innerHTML=PRODUCTS.filter(p=>(!q||(p.name+p.specs).toLowerCase().includes(q))&&(!c||p.condition===c)).map(card).join('')||'<p>No hay productos.</p>'}
function add(id){let p=PRODUCTS.find(x=>x.id===id),i=cart.find(x=>x.id===id);if(i){if(i.qty<p.stock)i.qty++}else cart.push({id,qty:1});save();openCart()}
function save(){localStorage.setItem('movixia_cart',JSON.stringify(cart));drawCart()}
function drawCart(){let el=document.getElementById('cartItems'),total=0;document.getElementById('cartCount').textContent=cart.reduce((a,x)=>a+x.qty,0);el.innerHTML=cart.map(i=>{let p=PRODUCTS.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="line"><div class="mini">📱</div><div><b>${p.name}</b><br><small>${euro(p.price)}</small><div class="qty"><button onclick="qty(${p.id},-1)">−</button>${i.qty}<button onclick="qty(${p.id},1)">+</button></div></div><button onclick="remove(${p.id})">✕</button></div>`}).join('')||'<p>Tu carrito está vacío.</p>';document.getElementById('cartTotal').textContent=euro(total)}
function qty(id,d){let i=cart.find(x=>x.id===id),p=PRODUCTS.find(x=>x.id===id);i.qty+=d;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);else if(i.qty>p.stock)i.qty=p.stock;save()}
function remove(id){cart=cart.filter(x=>x.id!==id);save()}
function openCart(){document.getElementById('drawer').classList.add('open');document.getElementById('overlay').classList.remove('hidden')}
function closeCart(){document.getElementById('drawer').classList.remove('open');document.getElementById('overlay').classList.add('hidden')}
async function checkout(){
  if(!cart.length)return alert('El carrito está vacío.');
  const boton=document.querySelector('#drawer .btn.full');
  const textoOriginal=boton.textContent;
  boton.disabled=true;boton.textContent='Conectando con el pago...';
  try{
    const ids={1:'azul',2:'plata',3:'naranja'};
    const items=cart.map(i=>({id:ids[i.id],quantity:i.qty})).filter(i=>i.id);
    const respuesta=await fetch(CHECKOUT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items})});
    const datos=await respuesta.json();
    if(!respuesta.ok||!datos.url)throw new Error(datos.error||'No se pudo iniciar el pago');
    window.location.href=datos.url;
  }catch(error){
    console.error(error);
    alert('No se ha podido iniciar el pago. Comprueba la configuración de Stripe e inténtalo de nuevo.');
    boton.disabled=false;boton.textContent=textoOriginal;
  }
}
document.getElementById('wa').href='https://wa.me/'+SHOP.whatsapp;document.getElementById('featured').innerHTML=PRODUCTS.filter(p=>p.featured).map(card).join('');render();drawCart();