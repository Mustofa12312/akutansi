import type { TranslationKeys } from './en';

const ar: TranslationKeys = {
    // Common
    appName: 'MustofaFinal',
    welcomeBack: 'مرحباً بعودتك',
    currency: 'Rp',

    // Navigation
    nav: {
        dashboard: 'لوحة التحكم',
        transactions: 'المعاملات',
        budgetGoals: 'الميزانية والأهداف',
        analytics: 'التحليلات',
        cards: 'البطاقات',
        settings: 'الإعدادات',
    },

    // Sidebar
    sidebar: {
        dailyLimitStatus: 'حالة الحد اليومي',
        safeZone: 'منطقة آمنة',
        warning: 'تحذير',
        overLimit: 'تجاوز الحد!',
    },

    // Dashboard
    dashboard: {
        title: 'لوحة التحكم',
        greeting: 'مرحباً، {name}. إليك ملخصك المالي.',
        totalBalance: 'إجمالي الرصيد',
        availableFunds: 'الأموال المتاحة',
        income: 'الدخل',
        expenses: 'المصروفات',
        savingsGoal: 'هدف الادخار',
        monthlyTarget: 'الهدف الشهري',
        fromLastMonth: 'من الشهر الماضي',
    },

    // Smart Insights
    insights: {
        smartInsight: 'رؤية ذكية',
        limitStatus: 'حالة الحد',
        savingsProjection: 'توقعات الادخار',
        topCategoryMsg: 'أكبر مصروف هذا الشهر: {category} ({amount}). حاول التقليل والادخار!',
        noExpenseMsg: 'لا مصروفات مسجلة هذا الشهر. ابدأ بتتبع معاملاتك!',
        overLimitMsg: '⚠️ لقد تجاوزت حدك اليومي! مستخدم {percent}%.',
        nearLimitMsg: 'انتبه، الحد اليومي المتبقي {percent}% فقط.',
        safeLimitMsg: '✅ إنفاق اليوم آمن. المتبقي {amount} من الحد اليومي.',
        positiveProjection: 'من المتوقع أن تدخر {amount} هذا الشهر إذا واصلت.',
        negativeProjection: '⚠️ التوقعات تشير إلى أنك قد لا تصل لهدف الادخار هذا الشهر.',
    },

    // Daily Limit Card
    dailyLimit: {
        title: 'حد الإنفاق اليومي',
        subtitle: 'حواجز الأمان المالية اليومية',
        safeZone: 'أنت في المنطقة الآمنة',
        exceeded: 'لقد تجاوزت حد اليوم',
        nearLimit: 'احترس، أنت قريب من الحد',
        spentToday: 'أُنفق اليوم',
        remaining: 'المتبقي',
        dailyLimitLabel: 'الحد اليومي',
        usage: 'الاستخدام',
    },

    // Overview Chart
    chart: {
        title: 'الملخص المالي',
        subtitle: 'الدخل مقابل المصروفات خلال 30 يوماً',
        amount: 'المبلغ',
    },

    // Recent Transactions
    recent: {
        title: 'النشاط الأخير',
        subtitle: 'لديك {count} معاملة هذا الشهر.',
    },

    // Transaction Form
    form: {
        addTransaction: 'إضافة معاملة',
        recordTransaction: 'سجل دخلك أو مصروفاتك لتتبع ميزانيتك.',
        type: 'النوع',
        expense: 'مصروف',
        incomeType: 'دخل',
        date: 'التاريخ',
        amount: 'المبلغ (Rp)',
        category: 'الفئة',
        selectCategory: 'اختر الفئة',
        note: 'ملاحظة (اختياري)',
        notePlaceholder: 'مثال: غداء في ماكدونالدز',
        save: 'حفظ المعاملة',
    },

    // Categories
    categories: {
        foodDining: 'طعام ومشروبات',
        transportation: 'مواصلات',
        shopping: 'تسوق',
        utilities: 'فواتير',
        entertainment: 'ترفيه',
        health: 'صحة',
        others: 'أخرى',
        monthlySalary: 'الراتب الشهري',
        freelance: 'عمل حر / مشاريع',
        bonus: 'مكافأة',
        investmentReturn: 'عائد استثمار',
    },

    // Transactions Page
    transactionsPage: {
        title: 'المعاملات',
        subtitle: 'إدارة وعرض سجل معاملاتك الكامل.',
        searchPlaceholder: 'البحث بالملاحظة أو الفئة...',
        all: 'الكل',
        history: 'السجل',
        transactionsFound: '{count} معاملة',
        noTransactions: 'لا توجد معاملات.',
        tryAdjusting: 'حاول تعديل البحث أو المرشحات.',
        deleteTransaction: 'حذف المعاملة',
    },

    // Budget Page
    budget: {
        title: 'الميزانية والأهداف',
        subtitle: 'تتبع ميزانيتك الشهرية وأهداف الادخار.',
        monthlyBudget: 'الميزانية الشهرية',
        incomeSavings: 'الدخل − هدف الادخار',
        spentThisMonth: 'أُنفق هذا الشهر',
        budgetUsed: '{percent}% من الميزانية مستخدم',
        remainingBudget: 'الميزانية المتبقية',
        daysRemaining: '{days} يوم متبقي',
        savingsProgress: 'تقدم الادخار',
        ofTarget: 'من هدف {target}',
        monthlyBudgetUsage: 'استخدام الميزانية الشهرية',
        spentOfBudget: '{spent} من {budget} مستخدم ({percent}%)',
        savingsGoalTitle: 'هدف الادخار',
        savingsGoalTarget: 'الهدف: {target} / شهر',
        savingsGoalReached: '🎉 تهانينا! لقد وصلت لهدف الادخار!',
        savingsGoalRemaining: 'تحتاج {amount} إضافية للوصول لهدفك.',
        spendingByCategory: 'الإنفاق حسب الفئة',
        whereMoneyGoes: 'أين تذهب أموالك هذا الشهر',
        noExpenses: 'لا مصروفات مسجلة هذا الشهر.',
    },

    // Analytics Page
    analyticsPage: {
        title: 'التحليلات',
        subtitle: 'رؤى عميقة حول أنماطك المالية.',
        monthlyIncome: 'الدخل الشهري',
        monthlyExpenses: 'المصروفات الشهرية',
        netCashFlow: 'صافي التدفق النقدي',
        avgDailySpending: 'متوسط الإنفاق اليومي',
        dailyTrend: 'الاتجاه اليومي (آخر 14 يوم)',
        incomeVsExpenses: 'مقارنة الدخل مقابل المصروفات',
        expenseCategories: 'فئات المصروفات',
        distribution: 'توزيع الإنفاق',
        noExpenseData: 'لا بيانات مصروفات هذا الشهر.',
        topSpendingDays: 'أيام الإنفاق الأعلى',
        highestSpending: 'أعلى أيام الإنفاق هذا الشهر',
        noData: 'لا بيانات بعد.',
    },

    // Cards Page
    cardsPage: {
        title: 'البطاقات',
        subtitle: 'إدارة بطاقاتك الافتراضية وإنفاقك.',
        currentBalance: 'الرصيد الحالي',
        cardHolder: 'حامل البطاقة',
        expires: 'تنتهي في',
        totalBalance: 'إجمالي الرصيد',
        acrossAccounts: 'جميع الحسابات',
        monthlySpending: 'الإنفاق الشهري',
        thisMonth: 'هذا الشهر',
        monthlyLimit: 'الحد الشهري',
        safeSpending: 'ميزانية الإنفاق الآمن',
        recentActivity: 'نشاط البطاقة الأخير',
        latestTransactions: 'آخر المعاملات من بطاقتك',
        noTransactions: 'لا معاملات بعد.',
    },

    // Settings Page
    settingsPage: {
        title: 'الإعدادات',
        subtitle: 'تكوين ملفك الشخصي والإعدادات المالية.',
        profile: 'الملف الشخصي',
        personalInfo: 'معلوماتك الشخصية',
        displayName: 'اسم العرض',
        namePlaceholder: 'اسمك',
        financialSettings: 'الإعدادات المالية',
        configureIncome: 'تكوين الدخل ومعايير الميزانية',
        monthlyIncome: 'الدخل الشهري (Rp)',
        currentValue: 'الحالي: {value}',
        savingsTarget: 'هدف الادخار الشهري (Rp)',
        calculatedDaily: 'الحد اليومي المحسوب',
        dailyFormula: '= (الدخل − هدف الادخار) ÷ 30 يوم',
        saveChanges: 'حفظ التغييرات',
        saved: 'تم الحفظ ✓',
        dangerZone: 'منطقة الخطر',
        dataManagement: 'إجراءات إدارة البيانات',
        clearAllData: 'مسح جميع البيانات',
        clearDescription: 'حذف جميع {count} معاملة وإعادة تعيين الإعدادات.',
        clearButton: 'مسح البيانات',
        clearConfirm: 'هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا.',

        // Category Management
        manageCategories: 'إدارة الفئات',
        addCategory: 'إضافة فئة',
        categoryName: 'اسم الفئة',
        categoryType: 'نوع الفئة',
        deleteCategoryConfirm: 'حذف هذه الفئة؟ المعاملات التي تستخدمها ستبقى.',

        // Data Backup
        backupRestore: 'النسخ الاحتياطي والاستعادة',
        exportData: 'تصدير البيانات (نسخ احتياطي)',
        importData: 'استيراد البيانات (استعادة)',
        exportDescription: 'تنزيل بياناتك كملف JSON للحفظ.',
        importDescription: 'استعادة البيانات من ملف JSON. تحذير: سيتم استبدال البيانات الحالية.',
        importSuccess: 'تم استعادة البيانات بنجاح!',
        importError: 'فشل استعادة البيانات. تأكد من صلاحية الملف.',
    },

    // Language
    language: {
        label: 'اللغة',
        id: 'Indonesia',
        en: 'English',
        ar: 'العربية',
    },
};

export default ar;
