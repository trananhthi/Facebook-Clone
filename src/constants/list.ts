export const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`)

export const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`)

export const years = Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => `${i + 1980}`).reverse()
