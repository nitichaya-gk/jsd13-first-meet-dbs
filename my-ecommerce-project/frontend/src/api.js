const API = '/api';

export async function fetchListings(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/listings?${query}`);
  return res.json();
}

export async function fetchListing(id) {
  const res = await fetch(`${API}/listings/${id}`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API}/categories`);
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API}/stats`);
  return res.json();
}

export async function fetchRatings(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/ratings?${query}`);
  return res.json();
}

export async function fetchTopKeywords() {
  const res = await fetch(`${API}/search-logs/top-keywords`);
  return res.json();
}

export async function createSearchLog(data) {
  const res = await fetch(`${API}/search-logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchOrders(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/orders?${query}`);
  return res.json();
}

export async function createOrder(data) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateOrder(id, data) {
  const res = await fetch(`${API}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
