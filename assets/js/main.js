/**
 * Kids Toy Store & Educational Games Shop - Main UI Script
 * Includes E-Commerce UI State (Cart, Wishlist, Quick View, Filters, Notifications)
 */

// Global State (LocalStorage Synced)
let cartState = JSON.parse(localStorage.getItem('toy_cart')) || [
  { id: 1, name: 'Wooden STEM Coding Robot', price: 49.99, qty: 1, image: 'assets/images/toys/robot.jpg', age: '6-8 Yrs' },
  { id: 2, name: '3D Solar System Magnetic Puzzle', price: 29.99, qty: 2, image: 'assets/images/toys/puzzle.jpg', age: '9-12 Yrs' }
];

let wishlistState = JSON.parse(localStorage.getItem('toy_wishlist')) || [1, 3, 5];

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateWishlistBadge();
  initQuantityButtons();
  initQuickViewModal();
  initProductFilters();
  initToyFinderWidget();
  initContactForm();
  initNewsletterForm();
});

// Update Badge Counters
function updateCartBadge() {
  const totalCount = cartState.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.textContent = totalCount;
  });
  localStorage.setItem('toy_cart', JSON.stringify(cartState));
}

function updateWishlistBadge() {
  document.querySelectorAll('.wishlist-badge-count').forEach(el => {
    el.textContent = wishlistState.length;
  });
  localStorage.setItem('toy_wishlist', JSON.stringify(wishlistState));
}

// Toast Notifications
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? '#22c55e' : '#2563eb';
  toast.style.cssText = `background:${bg};color:#ffffff;padding:12px 20px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.2);font-weight:600;font-size:0.9rem;display:flex;align-items:center;gap:10px;animation:fadeIn 0.3s ease;`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> <span>${message}</span>`;
  
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add to Cart Action
function addToCart(id, name, price, image, age = '3-5 Yrs') {
  const existing = cartState.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartState.push({ id, name, price, qty: 1, image, age });
  }
  updateCartBadge();
  showToast(`Added "${name}" to your cart!`, 'success');
}

// Toggle Wishlist Action
function toggleWishlist(id, btnElement) {
  const index = wishlistState.indexOf(id);
  if (index > -1) {
    wishlistState.splice(index, 1);
    if (btnElement) {
      btnElement.querySelector('i').className = 'far fa-heart';
      btnElement.classList.remove('active');
    }
    showToast('Item removed from wishlist', 'info');
  } else {
    wishlistState.push(id);
    if (btnElement) {
      btnElement.querySelector('i').className = 'fas fa-heart text-danger';
      btnElement.classList.add('active');
    }
    showToast('Saved to wishlist!', 'success');
  }
  updateWishlistBadge();
}

// Quantity Controller
function initQuantityButtons() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = e.target.closest('.qty-control').querySelector('.qty-input');
      let val = parseInt(input.value) || 1;
      if (btn.classList.contains('qty-plus')) {
        val++;
      } else if (btn.classList.contains('qty-minus') && val > 1) {
        val--;
      }
      input.value = val;
    });
  });
}

// Quick View Modal
function initQuickViewModal() {
  const quickViewBtns = document.querySelectorAll('.btn-quick-view');
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-name') || 'Educational Learning Kit';
      const price = btn.getAttribute('data-price') || '$39.99';
      const image = btn.getAttribute('data-image') || 'assets/images/toys/robot.jpg';
      const age = btn.getAttribute('data-age') || '3-5 Yrs';

      const modalTitle = document.getElementById('qvModalTitle');
      const modalPrice = document.getElementById('qvModalPrice');
      const modalImg = document.getElementById('qvModalImg');
      const modalAge = document.getElementById('qvModalAge');

      if (modalTitle) modalTitle.textContent = name;
      if (modalPrice) modalPrice.textContent = price;
      if (modalImg) modalImg.src = image;
      if (modalAge) modalAge.textContent = `Recommended Age: ${age}`;

      const modalEl = document.getElementById('quickViewModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
      }
    });
  });
}

// Shop Filter Logic
function initProductFilters() {
  const agePills = document.querySelectorAll('.age-pill[data-filter-age]');
  const productCards = document.querySelectorAll('.product-filter-item');

  if (agePills.length > 0 && productCards.length > 0) {
    agePills.forEach(pill => {
      pill.addEventListener('click', () => {
        agePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const ageFilter = pill.getAttribute('data-filter-age');
        productCards.forEach(card => {
          const cardAge = card.getAttribute('data-age');
          if (ageFilter === 'all' || cardAge === ageFilter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

// Interactive Toy Finder Widget (Home 2)
function initToyFinderWidget() {
  const toyFinderForm = document.getElementById('toyFinderForm');
  if (toyFinderForm) {
    toyFinderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = document.getElementById('finderAge')?.value || 'all';
      const category = document.getElementById('finderCategory')?.value || 'all';
      showToast(`Searching toys for Age: ${age}, Category: ${category}...`, 'info');
      setTimeout(() => {
        window.location.href = `shop.html?age=${encodeURIComponent(age)}&category=${encodeURIComponent(category)}`;
      }, 1000);
    });
  }
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to our Toy Experts.', 'success');
      contactForm.reset();
    });
  }
}

// Newsletter Subscription
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎉 Subscribed! Enjoy 15% OFF your first toy order.', 'success');
      form.reset();
    });
  });
}
