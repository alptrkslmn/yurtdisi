export function formatCurrency(amount, currency = 'TRY') {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}