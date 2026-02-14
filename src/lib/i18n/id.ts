import type { TranslationKeys } from './en';

const id: TranslationKeys = {
    // Common
    appName: 'FinalsialKU',
    welcomeBack: 'Selamat datang kembali',
    currency: 'Rp',

    // Navigation
    nav: {
        dashboard: 'Beranda',
        transactions: 'Transaksi',
        budgetGoals: 'Anggaran & Target',
        analytics: 'Analitik',
        cards: 'Kartu',
        settings: 'Pengaturan',
    },

    // Sidebar
    sidebar: {
        dailyLimitStatus: 'Status Batas Harian',
        safeZone: 'Zona Aman',
        warning: 'Peringatan',
        overLimit: 'Melebihi Batas!',
    },

    // Dashboard
    dashboard: {
        title: 'Beranda',
        greeting: 'Halo, {name}. Berikut ringkasan keuangan Anda.',
        totalBalance: 'Total Saldo',
        availableFunds: 'Dana tersedia',
        income: 'Pemasukan',
        expenses: 'Pengeluaran',
        savingsGoal: 'Target Tabungan',
        monthlyTarget: 'Target bulanan',
        fromLastMonth: 'dari bulan lalu',
    },

    // Smart Insights
    insights: {
        smartInsight: 'Wawasan Cerdas',
        limitStatus: 'Status Batas',
        savingsProjection: 'Proyeksi Tabungan',
        topCategoryMsg: 'Pengeluaran terbesar bulan ini: {category} ({amount}). Coba kurangi dan alokasikan ke tabungan!',
        noExpenseMsg: 'Belum ada pengeluaran bulan ini. Mulai catat transaksi Anda!',
        overLimitMsg: '⚠️ Hari ini Anda sudah melebihi batas harian! Sudah terpakai {percent}%.',
        nearLimitMsg: 'Hati-hati, sisa batas harian Anda tinggal {percent}% untuk hari ini.',
        safeLimitMsg: '✅ Pengeluaran hari ini masih aman. Sisa {amount} dari batas harian.',
        positiveProjection: 'Anda diproyeksikan bisa menabung {amount} bulan ini jika konsisten.',
        negativeProjection: '⚠️ Proyeksi menunjukkan Anda mungkin tidak mencapai target tabungan bulan ini.',
    },

    // Daily Limit Card
    dailyLimit: {
        title: 'Batas Pengeluaran Harian',
        subtitle: 'Pengaman keuangan harian Anda',
        safeZone: 'Anda di zona aman',
        exceeded: 'Anda telah melampaui batas harian',
        nearLimit: 'Hati-hati, hampir mencapai batas',
        spentToday: 'Pengeluaran Hari Ini',
        remaining: 'Sisa',
        dailyLimitLabel: 'Batas Harian',
        usage: 'Penggunaan',
    },

    // Overview Chart
    chart: {
        title: 'Ringkasan Keuangan',
        subtitle: 'Pemasukan vs pengeluaran dalam 30 hari terakhir',
        amount: 'Jumlah',
    },

    // Recent Transactions
    recent: {
        title: 'Aktivitas Terbaru',
        subtitle: 'Anda membuat {count} transaksi bulan ini.',
    },

    // Transaction Form
    form: {
        addTransaction: 'Tambah Transaksi',
        recordTransaction: 'Catat pemasukan atau pengeluaran Anda.',
        type: 'Tipe',
        expense: 'Pengeluaran',
        incomeType: 'Pemasukan',
        date: 'Tanggal',
        amount: 'Jumlah (Rp)',
        category: 'Kategori',
        selectCategory: 'Pilih kategori',
        note: 'Catatan (Opsional)',
        notePlaceholder: 'contoh: Makan siang di McD',
        save: 'Simpan Transaksi',
    },

    // Categories
    categories: {
        foodDining: 'Makanan & Minuman',
        transportation: 'Transportasi',
        shopping: 'Belanja',
        utilities: 'Utilitas (Tagihan)',
        entertainment: 'Hiburan',
        health: 'Kesehatan',
        others: 'Lainnya',
        monthlySalary: 'Gaji Bulanan',
        freelance: 'Freelance / Proyek',
        bonus: 'Bonus / THR',
        investmentReturn: 'Imbal Hasil Investasi',
    },

    // Transactions Page
    transactionsPage: {
        title: 'Transaksi',
        subtitle: 'Kelola dan lihat riwayat transaksi lengkap Anda.',
        searchPlaceholder: 'Cari berdasarkan catatan atau kategori...',
        all: 'Semua',
        history: 'Riwayat',
        transactionsFound: '{count} transaksi ditemukan',
        noTransactions: 'Tidak ada transaksi ditemukan.',
        tryAdjusting: 'Coba sesuaikan pencarian atau filter Anda.',
        deleteTransaction: 'Hapus transaksi',
    },

    // Budget Page
    budget: {
        title: 'Anggaran & Target',
        subtitle: 'Lacak anggaran bulanan dan target tabungan Anda.',
        monthlyBudget: 'Anggaran Bulanan',
        incomeSavings: 'Pendapatan − Target Tabungan',
        spentThisMonth: 'Terpakai Bulan Ini',
        budgetUsed: '{percent}% anggaran terpakai',
        remainingBudget: 'Sisa Anggaran',
        daysRemaining: '{days} hari tersisa',
        savingsProgress: 'Progres Tabungan',
        ofTarget: 'dari target {target}',
        monthlyBudgetUsage: 'Penggunaan Anggaran Bulanan',
        spentOfBudget: '{spent} dari {budget} terpakai ({percent}%)',
        savingsGoalTitle: 'Target Tabungan',
        savingsGoalTarget: 'Target: {target} / bulan',
        savingsGoalReached: '🎉 Selamat! Anda telah mencapai target tabungan!',
        savingsGoalRemaining: 'Anda butuh {amount} lagi untuk mencapai target.',
        spendingByCategory: 'Pengeluaran per Kategori',
        whereMoneyGoes: 'Ke mana uang Anda bulan ini',
        noExpenses: 'Belum ada pengeluaran bulan ini.',
    },

    // Analytics Page
    analyticsPage: {
        title: 'Analitik',
        subtitle: 'Wawasan mendalam tentang pola keuangan Anda.',
        monthlyIncome: 'Pemasukan Bulanan',
        monthlyExpenses: 'Pengeluaran Bulanan',
        netCashFlow: 'Arus Kas Bersih',
        avgDailySpending: 'Rata-rata Harian',
        dailyTrend: 'Tren Harian (14 Hari Terakhir)',
        incomeVsExpenses: 'Perbandingan pemasukan vs pengeluaran',
        expenseCategories: 'Kategori Pengeluaran',
        distribution: 'Distribusi pengeluaran',
        noExpenseData: 'Belum ada data pengeluaran bulan ini.',
        topSpendingDays: 'Hari Pengeluaran Terbesar',
        highestSpending: 'Hari dengan pengeluaran tertinggi bulan ini',
        noData: 'Belum ada data.',
    },

    // Cards Page
    cardsPage: {
        title: 'Kartu',
        subtitle: 'Kelola kartu virtual dan pengeluaran Anda.',
        currentBalance: 'Saldo Saat Ini',
        cardHolder: 'Pemegang Kartu',
        expires: 'Berlaku Hingga',
        totalBalance: 'Total Saldo',
        acrossAccounts: 'Seluruh akun',
        monthlySpending: 'Pengeluaran Bulanan',
        thisMonth: 'Bulan ini',
        monthlyLimit: 'Batas Bulanan',
        safeSpending: 'Anggaran pengeluaran aman',
        recentActivity: 'Aktivitas Kartu Terbaru',
        latestTransactions: 'Transaksi terbaru dari kartu Anda',
        noTransactions: 'Belum ada transaksi.',
    },

    // Settings Page
    settingsPage: {
        title: 'Pengaturan',
        subtitle: 'Konfigurasi profil dan pengaturan keuangan Anda.',
        profile: 'Profil',
        personalInfo: 'Informasi pribadi Anda',
        displayName: 'Nama Tampilan',
        namePlaceholder: 'Nama Anda',
        financialSettings: 'Pengaturan Keuangan',
        configureIncome: 'Konfigurasi pendapatan dan parameter anggaran',
        monthlyIncome: 'Pendapatan Bulanan (Rp)',
        currentValue: 'Saat ini: {value}',
        savingsTarget: 'Target Tabungan Bulanan (Rp)',
        calculatedDaily: 'Batas Harian Terhitung',
        dailyFormula: '= (Pendapatan − Target Tabungan) ÷ 30 hari',
        saveChanges: 'Simpan Perubahan',
        saved: 'Tersimpan ✓',
        dangerZone: 'Zona Bahaya',
        dataManagement: 'Aksi pengelolaan data',
        clearAllData: 'Hapus Semua Data',
        clearDescription: 'Hapus semua {count} transaksi dan reset pengaturan.',
        clearButton: 'Hapus Data',
        clearConfirm: 'Apakah Anda yakin ingin menghapus semua data transaksi? Tindakan ini tidak dapat dibatalkan.',
    },

    // Language
    language: {
        label: 'Bahasa',
        id: 'Indonesia',
        en: 'English',
        ar: 'العربية',
    },
};

export default id;
