import { useState, useEffect } from 'react'
import { fetchListings, fetchCategories, fetchStats, fetchRatings, fetchTopKeywords, createOrder, fetchOrders } from './api'
import './App.css'

const conditionLabels = {
  used_like_new: 'เหมือนใหม่',
  used_good: 'สภาพดี',
  used_fair: 'พอใช้',
};

const statusLabels = {
  active: 'พร้อมขาย',
  reserved: 'จองแล้ว',
  sold: 'ขายแล้ว',
};

const statusColors = {
  active: '#16a34a',
  reserved: '#d97706',
  sold: '#dc2626',
};

const orderStatusLabels = {
  pending_payment: 'รอชำระเงิน',
  paid: 'ชำระแล้ว',
  shipped: 'จัดส่งแล้ว',
  completed: 'สำเร็จ',
  cancelled: 'ยกเลิก',
};

const orderStatusColors = {
  pending_payment: '#d97706',
  paid: '#2563eb',
  shipped: '#7c3aed',
  completed: '#16a34a',
  cancelled: '#dc2626',
};

const CURRENT_BUYER_ID = '65f100000000000000000010';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function QRCodeSVG({ amount }) {
  const size = 200;
  const cellSize = 4;
  const cells = Math.floor(size / cellSize);
  const data = `00020101021230${String(amount).length}${String(amount)}5303764540${String(amount).length}${String(amount)}6304`;

  const grid = [];
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const isFinder = (x < 7 && y < 7) || (x >= cells - 7 && y < 7) || (x < 7 && y >= cells - 7);
      const isBorder = isFinder && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4) || (x >= cells - 5 && x <= cells - 3 && y >= 2 && y <= 4) || (x >= 2 && x <= 4 && y >= cells - 5 && y <= cells - 3));
      const isInner = isFinder && !isBorder && ((x >= 2 && x <= 4 && y >= 2 && y <= 4) || (x >= cells - 5 && x <= cells - 3 && y >= 2 && y <= 4) || (x >= 2 && x <= 4 && y >= cells - 5 && y <= cells - 3));

      let filled = false;
      if (isBorder || isInner) filled = true;
      else if (!isFinder) {
        const seed = (x * 31 + y * 17 + amount) % 100;
        filled = seed < 45;
      }
      if (filled) {
        grid.push(
          <rect
            key={`${x}-${y}`}
            x={x * cellSize}
            y={y * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#000"
          />
        );
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ background: '#fff', borderRadius: 8 }}>
      {grid}
    </svg>
  );
}

function App() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('listings');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [cart, setCart] = useState(getCart());
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [shippingForm, setShippingForm] = useState({ name: '', phone: '', address: '' });
  const [orders, setOrders] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => { saveCart(cart); }, [cart]);

  useEffect(() => {
    const loadAll = async () => {
      const errs = [];

      const listingsRes = await fetchListings({ status: 'active' }).catch(e => { errs.push('listings: ' + e.message); return null; });
      if (listingsRes?.listings) setListings(listingsRes.listings);

      const catsRes = await fetchCategories().catch(e => { errs.push('categories: ' + e.message); return null; });
      if (Array.isArray(catsRes)) setCategories(catsRes);

      const statsRes = await fetchStats().catch(e => { errs.push('stats: ' + e.message); return null; });
      if (statsRes && !statsRes.error) setStats(statsRes);

      const ratingsRes = await fetchRatings().catch(e => { errs.push('ratings: ' + e.message); return null; });
      if (Array.isArray(ratingsRes)) setRatings(ratingsRes);

      const kwRes = await fetchTopKeywords().catch(e => { errs.push('keywords: ' + e.message); return null; });
      if (Array.isArray(kwRes)) setTopKeywords(kwRes);

      const ordersRes = await fetchOrders().catch(() => null);
      if (Array.isArray(ordersRes)) setOrders(ordersRes);

      if (errs.length) setErrors(errs);
      setLoading(false);
    };
    loadAll();
  }, []);

  useEffect(() => {
    if (!loading) {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      params.sort = 'created_at:desc';
      fetchListings(params).then((data) => {
        if (data?.listings) setListings(data.listings);
      }).catch(() => {});
    }
  }, [selectedCategory, searchTerm]);

  const addToCart = (listing) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === listing._id);
      if (exists) return prev;
      return [...prev, {
        _id: listing._id,
        title: listing.title,
        price: listing.price,
        image: listing.images?.[0] || null,
        seller: listing.seller_id?.name || 'ไม่ทราบ',
        condition: listing.item_condition,
        quantity: 1,
      }];
    });
  };

  const removeFromCart = (listingId) => {
    setCart(prev => prev.filter(item => item._id !== listingId));
  };

  const updateQuantity = (listingId, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item =>
      item._id === listingId ? { ...item, quantity: qty } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!shippingForm.name || !shippingForm.phone || !shippingForm.address) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    try {
      const orderData = {
        buyer_id: CURRENT_BUYER_ID,
        items: cart.map(item => ({
          listing_id: item._id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        total_amount: cartTotal,
        status: 'pending_payment',
        shipping_address: shippingForm.address,
        phone: shippingForm.phone,
      };
      const result = await createOrder(orderData);
      if (result._id) {
        setOrderSuccess(result);
        setCart([]);
        setCheckoutMode(false);
        setShippingForm({ name: '', phone: '', address: '' });
        const ordersRes = await fetchOrders().catch(() => null);
        if (Array.isArray(ordersRes)) setOrders(ordersRes);
      } else {
        alert('เกิดข้อผิดพลาด: ' + (result.error || 'ไม่ทราบสาเหตุ'));
      }
    } catch (e) {
      alert('เกิดข้อผิดพลาดในการสั่งซื้อ');
    }
  };

  const isAlreadyInCart = (listingId) => cart.some(item => item._id === listingId);

  if (loading) return <div className="loading">กำลังโหลด...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Used Medical Marketplace</h1>
        <p>ตลาดซื้อ-ขายอุปกรณ์การแพทย์มือสอง</p>
      </header>

      {errors.length > 0 && (
        <div className="error-banner">
          <strong>API Errors:</strong>
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <nav className="tabs">
        {['listings', 'cart', 'orders', 'stats', 'ratings'].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setCheckoutMode(false); setOrderSuccess(null); }}
          >
            {tab === 'listings' && 'สินค้า'}
            {tab === 'cart' && `ตะกร้า (${cart.length})`}
            {tab === 'orders' && 'คำสั่งซื้อ'}
            {tab === 'stats' && 'สถิติ'}
            {tab === 'ratings' && 'รีวิว'}
          </button>
        ))}
      </nav>

      {activeTab === 'listings' && (
        <section className="content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {categories.length > 0 && (
            <div className="categories">
              <button
                className={`cat-btn ${selectedCategory === '' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                ทั้งหมด
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className={`cat-btn ${selectedCategory === cat._id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat._id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          <div className="listings-grid">
            {listings.map((listing) => (
              <div key={listing._id} className="listing-card">
                <div className="listing-image">
                  {listing.images && listing.images[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <span className="placeholder-img" style={listing.images?.[0] ? { display: 'none' } : {}}>医疗器械</span>
                  <span
                    className="status-badge"
                    style={{ background: statusColors[listing.status] }}
                  >
                    {statusLabels[listing.status]}
                  </span>
                </div>
                <div className="listing-info">
                  <h3>{listing.title}</h3>
                  <p className="price">฿{listing.price.toLocaleString()}</p>
                  <div className="listing-meta">
                    <span className="condition">{conditionLabels[listing.item_condition]}</span>
                    <span className="location">{listing.location}</span>
                  </div>
                  <div className="listing-seller">
                    <span>ผู้ขาย: {listing.seller_id?.name || 'ไม่ทราบ'}</span>
                    <span>⭐ {listing.seller_id?.rating_avg ?? '-'}</span>
                  </div>
                  <div className="listing-category">
                    {listing.category_id?.name || 'ไม่มีหมวดหมู่'}
                  </div>
                  <button
                    className={`add-cart-btn ${isAlreadyInCart(listing._id) ? 'in-cart' : ''}`}
                    onClick={() => addToCart(listing)}
                    disabled={isAlreadyInCart(listing._id)}
                  >
                    {isAlreadyInCart(listing._id) ? '✓ อยู่ในตะกร้าแล้ว' : '🛒 เพิ่มในตะกร้า'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {listings.length === 0 && (
            <p className="empty">ไม่พบสินค้า</p>
          )}
        </section>
      )}

      {activeTab === 'cart' && !checkoutMode && !orderSuccess && (
        <section className="content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>ตะกร้าว่างเปล่า</p>
              <button className="btn-primary" onClick={() => setActiveTab('listings')}>เลือกซื้อสินค้า</button>
            </div>
          ) : (
            <>
              <h2 className="section-title">ตะกร้าสินค้า ({cart.length} รายการ)</h2>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.title} onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        <span className="placeholder-img">医疗器械</span>
                      )}
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p className="cart-item-price">฿{item.price.toLocaleString()}</p>
                      <span className="condition">{conditionLabels[item.condition]}</span>
                      <span className="cart-item-seller">ผู้ขาย: {item.seller}</span>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                      </div>
                      <p className="cart-item-subtotal">฿{(item.price * item.quantity).toLocaleString()}</p>
                      <button className="btn-remove" onClick={() => removeFromCart(item._id)}>ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-total">
                  <span>รวมทั้งหมด:</span>
                  <span className="total-price">฿{cartTotal.toLocaleString()}</span>
                </div>
                <button className="btn-checkout" onClick={() => setCheckoutMode(true)}>
                  ดำเนินการชำระเงิน →
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {activeTab === 'cart' && checkoutMode && !orderSuccess && (
        <section className="content">
          <h2 className="section-title">ชำระเงิน</h2>
          <div className="checkout-layout">
            <div className="checkout-form">
              <h3>ที่อยู่จัดส่ง</h3>
              <div className="form-group">
                <label>ชื่อผู้รับ</label>
                <input
                  type="text"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={shippingForm.name}
                  onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  placeholder="0xx-xxx-xxxx"
                  value={shippingForm.phone}
                  onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>ที่อยู่จัดส่ง</label>
                <textarea
                  placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                  rows={3}
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                />
              </div>

              <h3>สรุปรายการสั่งซื้อ</h3>
              <div className="order-summary">
                {cart.map((item) => (
                  <div key={item._id} className="summary-item">
                    <span>{item.title} x{item.quantity}</span>
                    <span>฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <span>รวมทั้งหมด</span>
                  <span>฿{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="checkout-actions">
                <button className="btn-back" onClick={() => setCheckoutMode(false)}>← กลับ</button>
                <button className="btn-checkout" onClick={handleCheckout}>สั่งซื้อและชำระเงิน</button>
              </div>
            </div>

            <div className="checkout-qr">
              <h3>สแกน QR เพื่อชำระเงิน</h3>
              <QRCodeSVG amount={cartTotal} />
              <div className="qr-info">
                <p><strong>จำนวนเงิน:</strong> ฿{cartTotal.toLocaleString()}</p>
                <p><strong>ธนาคาร:</strong> ธนาคารกสิกรไทย</p>
                <p><strong>ชื่อบัญชี:</strong> Used Medical Marketplace Co., Ltd.</p>
                <p><strong>เลขที่บัญชี:</strong> 012-3-45678-9</p>
              </div>
              <p className="qr-note">ชำระเงินแล้วกด "สั่งซื้อและชำระเงิน" เพื่อยืนยัน</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cart' && orderSuccess && (
        <section className="content">
          <div className="order-success">
            <div className="success-icon">✅</div>
            <h2>สั่งซื้อสำเร็จ!</h2>
            <p>หมายเลขคำสั่งซื้อ: <strong>{orderSuccess._id}</strong></p>
            <p>สถานะ: <span style={{ color: orderStatusColors[orderSuccess.status] }}>{orderStatusLabels[orderSuccess.status]}</span></p>
            <p>จำนวนเงิน: <strong>฿{orderSuccess.total_amount?.toLocaleString()}</strong></p>
            <div className="success-actions">
              <button className="btn-primary" onClick={() => { setOrderSuccess(null); setActiveTab('orders'); }}>ดูคำสั่งซื้อ</button>
              <button className="btn-secondary" onClick={() => { setOrderSuccess(null); setActiveTab('listings'); }}>เลือกซื้อสินค้าต่อ</button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'orders' && (
        <section className="content">
          <h2 className="section-title">คำสั่งซื้อของฉัน</h2>
          {orders.length === 0 ? (
            <p className="empty">ยังไม่มีคำสั่งซื้อ</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">#{order._id.slice(-8)}</span>
                    <span
                      className="order-status"
                      style={{ background: orderStatusColors[order.status] }}
                    >
                      {orderStatusLabels[order.status]}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <span>{item.title} x{item.quantity}</span>
                        <span>฿{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <span className="order-date">{new Date(order.created_at).toLocaleDateString('th-TH')}</span>
                    <span className="order-total">รวม: ฿{order.total_amount.toLocaleString()}</span>
                  </div>
                  {order.shipping_address && (
                    <div className="order-shipping">
                      <small>จัดส่งไป: {order.shipping_address}</small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'stats' && stats && (
        <section className="content stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.totalUsers}</div>
              <div className="stat-label">ผู้ใช้งาน</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.activeListings}</div>
              <div className="stat-label">สินค้าพร้อมขาย</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalListings}</div>
              <div className="stat-label">ประกาศทั้งหมด</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalRatings}</div>
              <div className="stat-label">รีวิวทั้งหมด</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalReports}</div>
              <div className="stat-label">รายงานปัญหา</div>
            </div>
          </div>

          {stats.listingsByCategory?.length > 0 && (
            <div className="stats-detail">
              <h3>สินค้าตามหมวดหมู่</h3>
              <div className="bar-chart">
                {stats.listingsByCategory.map((item) => (
                  <div key={item.name} className="bar-row">
                    <span className="bar-label">{item.name}</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${(item.count / Math.max(...stats.listingsByCategory.map((i) => i.count))) * 100}%` }}
                      />
                    </div>
                    <span className="bar-value">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.listingsByStatus?.length > 0 && (
            <div className="stats-detail">
              <h3>สถานะสินค้า</h3>
              <div className="status-chart">
                {stats.listingsByStatus.map((item) => (
                  <div key={item._id} className="status-item">
                    <span className="status-dot" style={{ background: statusColors[item._id] }} />
                    <span>{statusLabels[item._id]}: {item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.avgPriceByCategory?.length > 0 && (
            <div className="stats-detail">
              <h3>ราคาเฉลี่ยตามหมวดหมู่</h3>
              <div className="bar-chart">
                {stats.avgPriceByCategory.map((item) => (
                  <div key={item.name} className="bar-row">
                    <span className="bar-label">{item.name}</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill price-bar"
                        style={{ width: `${(item.avgPrice / Math.max(...stats.avgPriceByCategory.map((i) => i.avgPrice))) * 100}%` }}
                      />
                    </div>
                    <span className="bar-value">฿{item.avgPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topKeywords.length > 0 && (
            <div className="stats-detail">
              <h3>คำค้นหายอดนิยม</h3>
              <div className="keywords">
                {topKeywords.map((kw) => (
                  <span key={kw._id} className="keyword-tag">
                    {kw._id} ({kw.count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === 'stats' && !stats && (
        <p className="empty">ไม่พบข้อมูลสถิติ</p>
      )}

      {activeTab === 'ratings' && (
        <section className="content">
          <div className="ratings-list">
            {ratings.map((rating) => (
              <div key={rating._id} className="rating-card">
                <div className="rating-header">
                  <span className="rater">{rating.rater_id?.name || 'ผู้ใช้'}</span>
                  <span className="stars">{'⭐'.repeat(rating.score)}</span>
                </div>
                <div className="rating-listing">
                  สินค้า: {rating.listing_id?.title || 'ไม่ทราบ'}
                </div>
                <p className="rating-comment">{rating.comment}</p>
                <div className="rating-footer">
                  <span>ถึง: {rating.rated_user_id?.name || 'ผู้ใช้'}</span>
                  <span>{new Date(rating.created_at).toLocaleDateString('th-TH')}</span>
                </div>
              </div>
            ))}
          </div>
          {ratings.length === 0 && (
            <p className="empty">ไม่พบข้อมูลรีวิว</p>
          )}
        </section>
      )}
    </div>
  )
}

export default App
