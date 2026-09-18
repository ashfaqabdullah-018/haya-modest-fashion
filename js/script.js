/* HAYA Shared JavaScript - Cart, products, mobile menu */
let cart = JSON.parse(localStorage.getItem('hayaCart')) || [];

function saveCart() {
  localStorage.setItem('hayaCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEls = document.querySelectorAll('.cart-count');
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  countEls.forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id && item.size === product.size);
  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart();
  showToast(product.name + ' added to cart');
}

function removeFromCart(id, size) {
  cart = cart.filter(item => !(item.id === id && item.size === size));
  saveCart();
  if (typeof renderCart === 'function') renderCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#2C2C2C;color:white;padding:12px 24px;border-radius:8px;z-index:9999;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  setTimeout(() => toast.remove(), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
  }
});

const products = [
  { id: 1, name: 'Classic Black Abaya', category: 'Abayas', price: 89, color: 'Black', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop', description: 'Elegant flowing abaya in soft premium fabric. Perfect for everyday modest wear.', badge: 'Bestseller' },
  { id: 2, name: 'Sage Green Maxi Dress', category: 'Dresses', price: 75, color: 'Sage', sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop', description: 'Soft sage green maxi dress with long sleeves. Lightweight and elegant.' },
  { id: 3, name: 'Cream Hijab Set', category: 'Hijabs', price: 28, color: 'Cream', sizes: ['One Size'], image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=800&fit=crop', description: 'Premium chiffon hijab in soft cream. Breathable and stays in place.' },
  { id: 4, name: 'Dusty Rose Abaya', category: 'Abayas', price: 95, color: 'Dusty Rose', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop', description: 'Beautiful dusty rose abaya. Modest and feminine.', badge: 'New' },
  { id: 5, name: 'Beige Everyday Set', category: 'Sets', price: 68, color: 'Beige', sizes: ['S','M','L'], image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop', description: 'Comfortable two-piece set in warm beige.' },
  { id: 6, name: 'Soft Black Long Dress', category: 'Dresses', price: 82, color: 'Black', sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop', description: 'Minimalist long dress in soft black.' },
  { id: 7, name: 'Olive Green Abaya', category: 'Abayas', price: 92, color: 'Olive', sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop', description: 'Rich olive green abaya with modern silhouette.' },
  { id: 8, name: 'Ivory Chiffon Hijab', category: 'Hijabs', price: 24, color: 'Ivory', sizes: ['One Size'], image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop', description: 'Lightweight ivory chiffon hijab.' }
];

window.hayaProducts = products;