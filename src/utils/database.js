const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(path.dirname(require.main.filename), 'database.sqlite');
let db;

function getDatabasePath() {
    // Geliştirme ortamında proje klasöründe database.sqlite oluştur
    return dbPath;
}

async function initDatabase() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(getDatabasePath(), (err) => {
            if (err) {
                console.error('Veritabanı bağlantı hatası:', err);
                reject(err);
                return;
            }

            console.log('Veritabanı bağlantısı başarılı');
            
            // Tabloları oluştur
            createTables()
                .then(() => {
                    resolve(db);
                })
                .catch(reject);
        });
    });
}

async function createTables() {
    const tables = [
        `CREATE TABLE IF NOT EXISTS countries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            code TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS organizations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            country_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (country_id) REFERENCES countries(id)
        )`,
        `CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            permissions TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            type TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            category TEXT,
            currency TEXT NOT NULL,
            organization_id INTEGER,
            user_id INTEGER,
            month TEXT NOT NULL,
            year INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id)
        )`,
        `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS monthly_summaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            organization_id INTEGER,
            month TEXT NOT NULL,
            year INTEGER NOT NULL,
            total_income REAL DEFAULT 0,
            total_expense REAL DEFAULT 0,
            balance REAL DEFAULT 0,
            currency TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            UNIQUE(organization_id, month, year, currency)
        )`,
        `CREATE TABLE IF NOT EXISTS currencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            symbol TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    for (const sql of tables) {
        await new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) {
                    console.error('Tablo oluşturma hatası:', err);
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    // Varsayılan rolleri ekle
    const defaultRoles = [
        ['admin', JSON.stringify({
            transactions: ['create', 'read', 'update', 'delete'],
            categories: ['create', 'read', 'update', 'delete'],
            organizations: ['create', 'read', 'update', 'delete'],
            countries: ['create', 'read', 'update', 'delete'],
            reports: ['read'],
            users: ['create', 'read', 'update', 'delete']
        })],
        ['manager', JSON.stringify({
            transactions: ['create', 'read', 'update'],
            categories: ['read'],
            organizations: ['read'],
            countries: ['read'],
            reports: ['read'],
            users: ['read']
        })],
        ['user', JSON.stringify({
            transactions: ['create', 'read'],
            categories: ['read'],
            organizations: ['read'],
            countries: ['read'],
            reports: ['read'],
            users: ['read']
        })]
    ];

    const roleStmt = db.prepare('INSERT OR IGNORE INTO roles (name, permissions) VALUES (?, ?)');
    defaultRoles.forEach(([name, permissions]) => {
        roleStmt.run(name, permissions);
    });
    roleStmt.finalize();

    // Varsayılan kategorileri ekle
    const defaultCategories = [
        ['Maaş', 'income'],
        ['Kira', 'expense'],
        ['Market', 'expense'],
        ['Fatura', 'expense'],
        ['Yatırım', 'income'],
        ['Diğer Gelir', 'income'],
        ['Diğer Gider', 'expense']
    ];

    const categoryStmt = db.prepare('INSERT OR IGNORE INTO categories (name, type) VALUES (?, ?)');
    defaultCategories.forEach(([name, type]) => {
        categoryStmt.run(name, type);
    });
    categoryStmt.finalize();

    // Varsayılan para birimlerini ekle
    const defaultCurrencies = [
        ['TRY', 'Türk Lirası', '₺'],
        ['USD', 'Amerikan Doları', '$'],
        ['EUR', 'Euro', '€'],
        ['GBP', 'İngiliz Sterlini', '£']
    ];

    const currencyStmt = db.prepare('INSERT OR IGNORE INTO currencies (code, name, symbol) VALUES (?, ?, ?)');
    defaultCurrencies.forEach(([code, name, symbol]) => {
        currencyStmt.run(code, name, symbol);
    });
    currencyStmt.finalize();
}

// İşlem ekleme
async function addTransaction(transaction) {
    const { date, type, amount, description, category, currency, organization_id, user_id } = transaction;
    const month = new Date(date).toISOString().slice(0, 7); // YYYY-MM formatı
    const year = new Date(date).getFullYear();

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            try {
                // İşlemi ekle
                db.run(
                    `INSERT INTO transactions (
                        date, type, amount, description, category, currency, 
                        organization_id, user_id, month, year
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [date, type, amount, description, category, currency, 
                     organization_id, user_id, month, year],
                    function(err) {
                        if (err) throw err;
                        const transactionId = this.lastID;

                        // Aylık özeti güncelle veya oluştur
                        db.run(`
                            INSERT INTO monthly_summaries (
                                organization_id, month, year, currency,
                                total_income, total_expense, balance
                            )
                            VALUES (?, ?, ?, ?, 
                                CASE WHEN ? = 'income' THEN ? ELSE 0 END,
                                CASE WHEN ? = 'expense' THEN ? ELSE 0 END,
                                CASE WHEN ? = 'income' THEN ? ELSE -? END
                            )
                            ON CONFLICT(organization_id, month, year, currency) DO UPDATE SET
                                total_income = total_income + CASE WHEN ? = 'income' THEN ? ELSE 0 END,
                                total_expense = total_expense + CASE WHEN ? = 'expense' THEN ? ELSE 0 END,
                                balance = balance + CASE WHEN ? = 'income' THEN ? ELSE -? END
                        `,
                        [organization_id, month, year, currency,
                         type, amount, type, amount, type, amount, amount,
                         type, amount, type, amount, type, amount, amount],
                        function(err) {
                            if (err) throw err;
                            db.run('COMMIT');
                            resolve({ id: transactionId, ...transaction });
                        });
                    }
                );
            } catch (error) {
                db.run('ROLLBACK');
                reject(error);
            }
        });
    });
}

// İşlem güncelleme
function updateTransaction(id, transaction) {
    return new Promise((resolve, reject) => {
        const { date, type, amount, description, category, currency } = transaction;
        db.run(
            `UPDATE transactions 
             SET date = ?, type = ?, amount = ?, description = ?, category = ?, 
                 currency = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [date, type, amount, description, category, currency, id],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, ...transaction });
                }
            }
        );
    });
}

// İşlem silme
function deleteTransaction(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM transactions WHERE id = ?', [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id });
            }
        });
    });
}

// İşlemleri getir
function getTransactions(userId, filters = {}) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM transactions WHERE user_id = ?';
        const params = [userId];

        if (filters.type) {
            query += ' AND type = ?';
            params.push(filters.type);
        }

        if (filters.startDate) {
            query += ' AND date >= ?';
            params.push(filters.startDate);
        }

        if (filters.endDate) {
            query += ' AND date <= ?';
            params.push(filters.endDate);
        }

        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        query += ' ORDER BY date DESC';

        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Kategorileri getir
function getCategories() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM categories ORDER BY name', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Kategori ekleme
function addCategory(category) {
    return new Promise((resolve, reject) => {
        const { name, type } = category;
        db.run(
            'INSERT INTO categories (name, type) VALUES (?, ?)',
            [name, type],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...category });
                }
            }
        );
    });
}

// Kategori güncelleme
function updateCategory(id, category) {
    return new Promise((resolve, reject) => {
        const { name, type } = category;
        db.run(
            'UPDATE categories SET name = ?, type = ? WHERE id = ?',
            [name, type, id],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, ...category });
                }
            }
        );
    });
}

// Kategori silme
function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM categories WHERE id = ?', [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id });
            }
        });
    });
}

// Para birimlerini getir
function getCurrencies() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM currencies ORDER BY code', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// İstatistikleri getir
function getStats(userId, period = 'month') {
    return new Promise((resolve, reject) => {
        let dateFilter = '';
        if (period === 'month') {
            dateFilter = "AND date >= date('now', 'start of month')";
        } else if (period === 'year') {
            dateFilter = "AND date >= date('now', 'start of year')";
        }

        const query = `
            SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
                SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
            FROM transactions 
            WHERE user_id = ? ${dateFilter}
        `;

        db.get(query, [userId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    totalIncome: row?.total_income || 0,
                    totalExpense: row?.total_expense || 0,
                    balance: row?.balance || 0
                });
            }
        });
    });
}

module.exports = {
    initDatabase,
    getDatabasePath,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactions,
    getCategories,
    getStats,
    addCategory,
    updateCategory,
    deleteCategory,
    getCurrencies
};
