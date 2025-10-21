// ========================================
// LUXE FASHION STORE - COMPLETE JAVASCRIPT
// ========================================
// ========================================
// TRANSLATIONS DATABASE
// ========================================
const translations = {
    en: {
        addToCart: 'Add to Cart',
        added: 'Added!',
        shoes: 'Shoes',
        tshirts: 'T-Shirts',
        clothing: 'Clothing',
        new: 'New',
        hot: 'Hot',
        sale: 'Sale'
    },
    fr: {
        addToCart: 'Ajouter au Panier',
        added: 'Ajouté!',
        shoes: 'Chaussures',
        tshirts: 'T-Shirts',
        clothing: 'Vêtements',
        new: 'Nouveau',
        hot: 'Populaire',
        sale: 'Solde'
    },
    ar: {
        addToCart: 'أضف إلى السلة',
        added: 'تمت الإضافة!',
        shoes: 'أحذية',
        tshirts: 'قمصان',
        clothing: 'ملابس',
        new: 'جديد',
        hot: 'رائج',
        sale: 'تخفيض'
    }
};

// ========================================
// GLOBAL STATE MANAGEMENT
// ========================================
const state = {
    cart: [],
    wishlist: [],
    products: [],
    currentFilter: 'all',
    theme: 'light',
    language: 'en'
};

// ========================================
// PRODUCTS DATABASE
// ========================================
const productsData = [
    {
        id: 1,
        name: { en: 'Urban Runner Pro', fr: 'Coureur Urbain Pro', ar: 'حذاء رياضي حضري' },
        category: 'shoes',
        price: 129.99,
        originalPrice: 199.99,
        image: 'images/run.jpg',
        rating: 5,
        reviews: 128,
        badge: 'new'
    },
    {
        id: 2,
        name: { en: 'Classic Cotton Tee', fr: 'T-Shirt Coton Classique', ar: 'قميص قطني كلاسيكي' },
        category: 'tshirts',
        price: 34.99,
        originalPrice: 49.99,
        image: 'images/classic.jpg',
        rating: 4,
        reviews: 89,
        badge: 'sale'
    },
    {
        id: 3,
        name: { en: 'Premium Jacket', fr: 'Veste Premium', ar: 'سترة فاخرة' },
        category: 'clothing',
        price: 189.99,
        originalPrice: null,
        image: 'images/jacket.jpg',
        rating: 5,
        reviews: 156,
        badge: null
    },
    {
        id: 4,
        name: { en: 'Leather Elegance', fr: 'Élégance en Cuir', ar: 'أناقة جلدية' },
        category: 'shoes',
        price: 159.99,
        originalPrice: 229.99,
        image: 'images/leather.jpg',
        rating: 5,
        reviews: 203,
        badge: 'hot'
    },
    {
        id: 5,
        name: { en: 'Graphic Print Tee', fr: 'T-Shirt Imprimé', ar: 'قميص بطباعة جرافيك' },
        category: 'tshirts',
        price: 39.99,
        originalPrice: null,
        image: 'images/graphic.jpg',
        rating: 4,
        reviews: 67,
        badge: null
    },
    {
        id: 6,
        name: { en: 'Designer Jeans', fr: 'Jean Design', ar: 'جينز مصمم' },
        category: 'clothing',
        price: 89.99,
        originalPrice: 129.99,
        image: 'images/jeans.jpg',
        rating: 5,
        reviews: 142,
        badge: 'new'
    },
    {
        id: 7,
        name: { en: 'Adventure Boots', fr: 'Bottes Aventure', ar: 'أحذية مغامرة' },
        category: 'shoes',
        price: 149.99,
        originalPrice: null,
        image: 'images/adv.jpg',
        rating: 4,
        reviews: 94,
        badge: null
    },
    {
        id: 8,
        name: { en: 'Premium Polo Shirt', fr: 'Polo Premium', ar: 'قميص بولو فاخر' },
        category: 'tshirts',
        price: 44.99,
        originalPrice: 74.99,
        image: 'images/polo.jpg',
        rating: 5,
        reviews: 178,
        badge: 'sale'
    },
    {
        id: 9,
        name: { en: 'Casual Sneakers', fr: 'Baskets Casual', ar: 'أحذية رياضية كاجوال' },
        category: 'shoes',
        price: 99.99,
        originalPrice: null,
        image: 'images/sneaker.jpg',
        rating: 5,
        reviews: 215,
        badge: null
    },
    {
        id: 10,
        name: { en: 'Vintage Hoodie', fr: 'Sweat Vintage', ar: 'هودي فينتج' },
        category: 'clothing',
        price: 79.99,
        originalPrice: 119.99,
        image: 'images/hoodie.jpg',
        rating: 4,
        reviews: 103,
        badge: 'sale'
    },
    {
        id: 11,
        name: { en: 'Sport T-Shirt', fr: 'T-Shirt Sport', ar: 'قميص رياضي' },
        category: 'tshirts',
        price: 29.99,
        originalPrice: null,
        image: 'images/sport.jpg',
        rating: 4,
        reviews: 76,
        badge: null
    },
    {
        id: 12,
        name: { en: 'Elegant Blazer', fr: 'Blazer Élégant', ar: 'بليزر أنيق' },
        category: 'clothing',
        price: 199.99,
        originalPrice: 279.99,
        image: 'images/blazer.jpg',
        rating: 5,
        reviews: 189,
        badge: 'new'
    }
];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    state.products = productsData;
    loadFromStorage();
    renderProducts(state.products);
    setupEventListeners();
    updateCartCount();
    updateWishlistCount();
    initializeTheme();
    initializeLanguage();
    addScrollAnimations();
}

// ========================================
// LOCAL STORAGE MANAGEMENT
// ========================================
function loadFromStorage() {
    try {
        const savedCart = localStorage.getItem('luxe_cart');
        const savedWishlist = localStorage.getItem('luxe_wishlist');
        const savedTheme = localStorage.getItem('luxe_theme');
        const savedLanguage = localStorage.getItem('luxe_language');

        if (savedCart) state.cart = JSON.parse(savedCart);
        if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
        if (savedTheme) state.theme = savedTheme;
        if (savedLanguage) state.language = savedLanguage;
    } catch (error) {
        console.error('Error loading from storage:', error);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('luxe_cart', JSON.stringify(state.cart));
        localStorage.setItem('luxe_wishlist', JSON.stringify(state.wishlist));
        localStorage.setItem('luxe_theme', state.theme);
        localStorage.setItem('luxe_language', state.language);
    } catch (error) {
        console.error('Error saving to storage:', error);
    }
}

// ========================================
// THEME MANAGEMENT
// ========================================
function initializeTheme() {
    if (state.theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        state.theme = 'light';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        state.theme = 'dark';
    }

    saveToStorage();
}

// ========================================
// LANGUAGE MANAGEMENT
// ========================================
function initializeLanguage() {
    updateLanguage(state.language);

    // Update active language button
    document.querySelectorAll('.lang-option').forEach(btn => {
        if (btn.getAttribute('data-lang') === state.language) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    // Set RTL for Arabic
    if (state.language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

function updateLanguage(lang) {
    state.language = lang;

    // Update all elements with data attributes
    document.querySelectorAll('[data-en], [data-fr], [data-ar]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
             if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${lang}-placeholder`) || text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update products
    renderProducts(state.products);

    // Set RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    saveToStorage();
}

// ========================================
// PRODUCTS RENDERING
// ========================================
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    products.forEach(product => {
        const isInWishlist = state.wishlist.some(item => item.id === product.id);
        const productCard = createProductCard(product, isInWishlist);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product, isInWishlist) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    // Create star string
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    // Get translated product name and category
    const productName = product.name[state.language] || product.name.en;
    const categoryKey = product.category;
    const categoryName = translations[state.language][categoryKey] || categoryKey;
    
    // Get translated badge text
    const badgeKey = product.badge;
    const badgeText = badgeKey ? translations[state.language][badgeKey] || badgeKey : '';
    
    const addToCartText = translations[state.language].addToCart;

    card.innerHTML = `
        <div class="product-image">
            ${product.badge ? `<span class="product-badge">${badgeText}</span>` : ''}
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}" aria-label="Add to wishlist">
                <i class="fa${isInWishlist ? 's' : 'r'} fa-heart"></i>
            </button>
            <img src="${product.image}" alt="${productName}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-category">${categoryName}</div>
            <h3 class="product-name">${productName}</h3>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span>(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="price-current">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">${addToCartText}</button>
        </div>
    `;

    // Add event listeners
    const wishlistBtn = card.querySelector('.wishlist-btn');
    const addToCartBtn = card.querySelector('.add-to-cart-btn');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
        });
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
        });
    }

    return card;
}

// ========================================
// PRODUCT FILTERING
// ========================================
function filterProducts(category) {
    state.currentFilter = category;

    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const products = productsGrid.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    // Find the button that triggered the event (or the one matching the filter)
    const targetButton = event.target.closest('.filter-btn') || document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }

    // Filter products with animation
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
            }, 50); // Small delay for better visual effect
        } else {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// ========================================
// CART MANAGEMENT
// ========================================
function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = state.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    saveToStorage();
    showToast('Product added to cart!', 'success');
    animateCartIcon();

    // Update button text temporarily
    const btn = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = translations[state.language].added;
        btn.style.background = 'var(--success)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
    saveToStorage();
    showToast('Product removed from cart', 'success');
}

function updateQuantity(productId, change) {
    const item = state.cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        renderCart();
        saveToStorage();
    }
}

function updateCartCount() {
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');

    if (cartCountElement) {
        cartCountElement.textContent = count;
        // Optionally show/hide the badge
        if (count > 0) {
            cartCountElement.style.display = 'inline-block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

function calculateCartTotal() {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutContainer = document.querySelector('.cart-footer');
    
    if (!cartItems || !cartTotal || !checkoutContainer) return;

    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        checkoutContainer.style.display = 'none'; // Hide checkout button if empty
        return;
    }

    checkoutContainer.style.display = 'flex'; // Show checkout button if items exist
    
    cartItems.innerHTML = state.cart.map(item => {
        const productName = item.name[state.language] || item.name.en;
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${productName}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${productName}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `$${calculateCartTotal().toFixed(2)}`;
}

function animateCartIcon() {
    const cartIcon = document.querySelector('#cartBtn');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

// ========================================
// WISHLIST MANAGEMENT
// ========================================
function toggleWishlist(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.wishlist.findIndex(item => item.id === productId);
    
    // Find button across the entire document (product grid or wishlist modal)
    const buttons = document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`);

    if (existingIndex > -1) {
        state.wishlist.splice(existingIndex, 1);
        buttons.forEach(button => {
            button.classList.remove('active');
            const icon = button.querySelector('i');
            if (icon) icon.className = 'far fa-heart';
        });
        showToast('Removed from wishlist', 'success');
        // If wishlist modal is open, re-render it
        if (document.getElementById('wishlistModal')?.classList.contains('active')) {
            renderWishlist();
        }
    } else {
        state.wishlist.push(product);
        buttons.forEach(button => {
            button.classList.add('active');
            const icon = button.querySelector('i');
            if (icon) icon.className = 'fas fa-heart';
        });
        showToast('Added to wishlist!', 'success');
    }

    updateWishlistCount();
    saveToStorage();
}

function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlistCount');

    if (wishlistCountElement) {
        wishlistCountElement.textContent = state.wishlist.length;
         // Optionally show/hide the badge
        if (state.wishlist.length > 0) {
            wishlistCountElement.style.display = 'inline-block';
        } else {
            wishlistCountElement.style.display = 'none';
        }
    }
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    if (!wishlistItems) return;

    if (state.wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
            </div>
        `;
        return;
    }

    wishlistItems.innerHTML = state.wishlist.map(item => {
        const productName = item.name[state.language] || item.name.en;
        const addToCartText = translations[state.language].addToCart;
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${productName}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${productName}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id}); closeWishlist();" style="margin-top: 1rem;">
                        ${addToCartText}
                    </button>
                </div>
                <button class="remove-item" onclick="toggleWishlist(${item.id}); renderWishlist();" aria-label="Remove from wishlist">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function handleSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (!query.trim()) {
        searchResults.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Start typing to search...</p>';
        return;
    }

    const results = state.products.filter(product => {
        const productName = product.name[state.language] || product.name.en;
        return productName.toLowerCase().includes(query.toLowerCase()) ||
               product.category.toLowerCase().includes(query.toLowerCase());
    });

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No products found</p>';
        return;
    }

    searchResults.innerHTML = results.map(product => {
        const productName = product.name[state.language] || product.name.en;
        return `
            <div class="search-result-item" onclick="closeSearch(); scrollToProduct(${product.id});">
                <div class="search-result-image">
                    <img src="${product.image}" alt="${productName}">
                </div>
                <div class="search-result-info">
                    <h4>${productName}</h4>
                    <p class="search-result-price">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');
}

function scrollToProduct(productId) {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const btn = card.querySelector('.add-to-cart-btn');
            if (btn && parseInt(btn.getAttribute('data-id')) === productId) {
                // Apply a temporary highlight effect
                card.style.transition = 'transform 0.3s, box-shadow 0.3s';
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 20px 60px var(--accent)';
                
                // Remove the effect after a delay
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 2000);
            }
        });
    }, 500); // Wait for the scroll to finish
}

// ========================================
// MODAL MANAGEMENT
// ========================================
function openCart() {
    renderCart();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');

    if (searchModal) {
        searchModal.classList.add('active');
        if (searchInput) {
            searchInput.focus();
            handleSearch(searchInput.value); // Load initial results if any text exists
        }
        document.body.style.overflow = 'hidden';
    }
}

function closeSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchModal) searchModal.classList.remove('active');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
    document.body.style.overflow = '';
}

function openWishlist() {
    renderWishlist();
    const wishlistModal = document.getElementById('wishlistModal');
    if (wishlistModal) {
        wishlistModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeWishlist() {
    const wishlistModal = document.getElementById('wishlistModal');
    if (wishlistModal) {
        wishlistModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast ? toast.querySelector('i') : null;

    if (!toast || !toastMessage) return;

    // Clear previous classes and add the new one
    toast.className = `toast ${type}`;
    toastMessage.textContent = message;

    if (icon) {
        if (type === 'success') {
            icon.className = 'fas fa-check-circle';
        } else {
            icon.className = 'fas fa-exclamation-circle';
        }
    }

    toast.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// EVENT LISTENERS SETUP
// ========================================
function setupEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language Selector
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
             // Check if the click is outside the button and the dropdown
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                 langDropdown.classList.remove('active');
            }
        });
        // Language options
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = btn.getAttribute('data-lang');
                updateLanguage(lang);

                // Update active state
                document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                langDropdown.classList.remove('active');
            });
        });
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Cart
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCart'); // Renamed to avoid function name conflict
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

    // Search
    const searchBtn = document.getElementById('searchBtn');
    const closeSearchBtn = document.getElementById('closeSearch'); // Renamed to avoid function name conflict
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }

    // Wishlist
    const wishlistBtn = document.getElementById('wishlistBtn');
    const closeWishlistBtn = document.getElementById('closeWishlist'); // Renamed to avoid function name conflict
    if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlist);
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlist);

    // Product Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
            setTimeout(() => {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
                if (filterBtn) {
                    // Manually trigger the filter function instead of a click event
                    filterProducts(category);
                    // Also ensure the button is visually active, as filterProducts uses the event target
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    filterBtn.classList.add('active');
                }
            }, 500);
        });
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Checkout Button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeCart();
                closeSearch();
                closeWishlist();
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (!navLinks || !mobileMenuBtn) return;

    const icon = mobileMenuBtn.querySelector('i');

    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        if (icon) icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    } else {
        if (icon) icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
    }
    // Escape to close modals
    if (e.key === 'Escape') {
        closeCart();
        closeSearch();
        closeWishlist();
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
        const langDropdown = document.getElementById('langDropdown');
        if (langDropdown) langDropdown.classList.remove('active');
    }
}

// ========================================
// FORM SUBMISSIONS
// ========================================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('.newsletter-input');
    const button = e.target.querySelector('.newsletter-btn');
    const subscribeText = translations[state.language].addToCart || 'Subscribe';

    if (!input || !button) return;

    const email = input.value;
    if (!email || !validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.style.background = 'var(--success)';
        showToast('Successfully subscribed to newsletter!', 'success');

        setTimeout(() => {
            button.textContent = subscribeText;
            button.style.background = '';
            button.disabled = false;
            input.value = '';
        }, 3000);
    }, 1500);
}

function handleContactSubmit(e) {
    e.preventDefault();
    const button = e.target.querySelector('.submit-btn');

    if (!button) return;

    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Sent!';
        button.style.background = 'var(--success)';
        showToast('Message sent successfully!', 'success');

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.disabled = false;
            e.target.reset(); // Clear form fields
        }, 3000);
    }, 1500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// CHECKOUT MANAGEMENT (Missing/Completed Section)
// ========================================
function handleCheckout() {
    if (state.cart.length === 0) {
        showToast('Your cart is empty. Add products before checking out.', 'error');
        return;
    }

    const total = calculateCartTotal().toFixed(2);
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.textContent;
    
    checkoutBtn.textContent = 'Processing...';
    checkoutBtn.disabled = true;

    showToast(`Initiating checkout for $${total}...`, 'success');

    // Simulate a payment/checkout process delay
    setTimeout(() => {
        clearCart();
        closeCart();
        showToast('🎉 Checkout successful! Thank you for your purchase.', 'success');
        
        // Reset button state
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
        
        // In a real application, you'd redirect here.
        // window.location.href = '/order-confirmation';
    }, 2500); // Simulate network delay
}

function clearCart() {
    state.cart = [];
    updateCartCount();
    renderCart();
    saveToStorage();
}

// ========================================
// SCROLL ANIMATIONS (Missing/Completed Section)
// ========================================
function addScrollAnimations() {
    // Uses Intersection Observer for a clean, performant scroll-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Apply the observer to elements intended to animate (assuming a CSS class 'visible' exists)
    document.querySelectorAll('.product-card, .category-card, .section-heading, .anim-scroll').forEach(element => {
        observer.observe(element);
    });
}