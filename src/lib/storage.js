const KEY = 'bookshelf:v1'

export function loadBooks(fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved)) return saved
  } catch (e) {
    // corrupted or blocked storage: fall through to the fallback
  }
  return fallback
}

export function saveBooks(books) {
  try {
    localStorage.setItem(KEY, JSON.stringify(books))
  } catch (e) {
    // storage full or blocked: skip silently
  }
}