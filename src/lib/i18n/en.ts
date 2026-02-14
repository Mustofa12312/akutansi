const en = {
    // Common
    appName: 'Finansialku',
    welcomeBack: 'Welcome back',
    currency: 'Rp',

    // Navigation
    nav: {
        dashboard: 'Dashboard',
        transactions: 'Transactions',
        budgetGoals: 'Budget & Goals',
        analytics: 'Analytics',
        cards: 'Cards',
        settings: 'Settings',
    },

    // Sidebar
    sidebar: {
        dailyLimitStatus: 'Daily Limit Status',
        safeZone: 'Safe Zone',
        warning: 'Warning',
        overLimit: 'Over Limit!',
    },

    // Dashboard
    dashboard: {
        title: 'Dashboard',
        greeting: 'Hi, {name}. Here is your financial overview.',
        totalBalance: 'Total Balance',
        availableFunds: 'Available funds',
        income: 'Income',
        expenses: 'Expenses',
        savingsGoal: 'Savings Goal',
        monthlyTarget: 'Monthly target',
        fromLastMonth: 'from last month',
    },

    // Smart Insights
    insights: {
        smartInsight: 'Smart Insight',
        limitStatus: 'Limit Status',
        savingsProjection: 'Savings Projection',
        topCategoryMsg: 'Top expense this month: {category} ({amount}). Try to reduce and save more!',
        noExpenseMsg: 'No expenses recorded this month. Start tracking your transactions!',
        overLimitMsg: '⚠️ You have exceeded your daily limit today! Already used {percent}%.',
        nearLimitMsg: 'Be careful, your daily limit is only {percent}% remaining today.',
        safeLimitMsg: '✅ Today\'s spending is safe. Remaining {amount} of daily limit.',
        positiveProjection: 'You are projected to save {amount} this month if you stay consistent.',
        negativeProjection: '⚠️ Projections show you may not reach your savings target this month.',
    },

    // Daily Limit Card
    dailyLimit: {
        title: 'Daily Spending Limit',
        subtitle: 'Your daily financial guard rails',
        safeZone: 'You are in the safe zone',
        exceeded: "You've exceeded today's limit",
        nearLimit: "Careful, you're near the limit",
        spentToday: 'Spent Today',
        remaining: 'Remaining',
        dailyLimitLabel: 'Daily Limit',
        usage: 'Usage',
    },

    // Overview Chart
    chart: {
        title: 'Financial Overview',
        subtitle: 'Your income vs expenses over the last 30 days',
        amount: 'Amount',
    },

    // Recent Transactions
    recent: {
        title: 'Recent Activity',
        subtitle: 'You made {count} transactions this month.',
    },

    // Transaction Form
    form: {
        addTransaction: 'Add Transaction',
        recordTransaction: 'Record your income or expense to track your budget.',
        type: 'Type',
        expense: 'Expense',
        incomeType: 'Income',
        date: 'Date',
        amount: 'Amount (Rp)',
        category: 'Category',
        selectCategory: 'Select category',
        note: 'Note (Optional)',
        notePlaceholder: 'e.g. Lunch at McD',
        save: 'Save Transaction',
    },

    // Categories
    categories: {
        foodDining: 'Food & Dining',
        transportation: 'Transportation',
        shopping: 'Shopping',
        utilities: 'Utilities (Bills)',
        entertainment: 'Entertainment',
        health: 'Health',
        others: 'Others',
        monthlySalary: 'Monthly Salary',
        freelance: 'Freelance / Projects',
        bonus: 'Bonus / THR',
        investmentReturn: 'Investment Return',
    },

    // Transactions Page
    transactionsPage: {
        title: 'Transactions',
        subtitle: 'Manage and view your complete transaction history.',
        searchPlaceholder: 'Search by note or category...',
        all: 'All',
        history: 'History',
        transactionsFound: '{count} transactions found',
        noTransactions: 'No transactions found.',
        tryAdjusting: 'Try adjusting your search or filters.',
        deleteTransaction: 'Delete transaction',
    },

    // Budget Page
    budget: {
        title: 'Budget & Goals',
        subtitle: 'Track your monthly budget and savings goals.',
        monthlyBudget: 'Monthly Budget',
        incomeSavings: 'Income − Savings Target',
        spentThisMonth: 'Spent This Month',
        budgetUsed: '{percent}% of budget used',
        remainingBudget: 'Remaining Budget',
        daysRemaining: '{days} days remaining',
        savingsProgress: 'Savings Progress',
        ofTarget: 'of {target} target',
        monthlyBudgetUsage: 'Monthly Budget Usage',
        spentOfBudget: '{spent} of {budget} spent ({percent}%)',
        savingsGoalTitle: 'Savings Goal',
        savingsGoalTarget: 'Target: {target} / month',
        savingsGoalReached: '🎉 Congratulations! You have reached your savings goal!',
        savingsGoalRemaining: 'You need {amount} more to reach your goal.',
        spendingByCategory: 'Spending by Category',
        whereMoneyGoes: 'Where your money goes this month',
        noExpenses: 'No expenses recorded this month.',
    },

    // Analytics Page
    analyticsPage: {
        title: 'Analytics',
        subtitle: 'Deep insights into your financial patterns.',
        monthlyIncome: 'Monthly Income',
        monthlyExpenses: 'Monthly Expenses',
        netCashFlow: 'Net Cash Flow',
        avgDailySpending: 'Avg. Daily Spending',
        dailyTrend: 'Daily Trend (Last 14 Days)',
        incomeVsExpenses: 'Income vs Expenses comparison',
        expenseCategories: 'Expense Categories',
        distribution: 'Distribution of spending',
        noExpenseData: 'No expense data this month.',
        topSpendingDays: 'Top Spending Days',
        highestSpending: 'Your highest spending days this month',
        noData: 'No data yet.',
    },

    // Cards Page
    cardsPage: {
        title: 'Cards',
        subtitle: 'Manage your virtual cards and spending.',
        currentBalance: 'Current Balance',
        cardHolder: 'Card Holder',
        expires: 'Expires',
        totalBalance: 'Total Balance',
        acrossAccounts: 'Across all accounts',
        monthlySpending: 'Monthly Spending',
        thisMonth: 'This month',
        monthlyLimit: 'Monthly Limit',
        safeSpending: 'Safe spending budget',
        recentActivity: 'Recent Card Activity',
        latestTransactions: 'Latest transactions from your card',
        noTransactions: 'No transactions yet.',
    },

    // Settings Page
    settingsPage: {
        title: 'Settings',
        subtitle: 'Configure your profile and financial settings.',
        profile: 'Profile',
        personalInfo: 'Your personal information',
        displayName: 'Display Name',
        namePlaceholder: 'Your name',
        financialSettings: 'Financial Settings',
        configureIncome: 'Configure your income and budget parameters',
        monthlyIncome: 'Monthly Income (Rp)',
        currentValue: 'Current: {value}',
        savingsTarget: 'Monthly Savings Target (Rp)',
        calculatedDaily: 'Calculated Daily Limit',
        dailyFormula: '= (Monthly Income − Savings Target) ÷ 30 days',
        saveChanges: 'Save Changes',
        saved: 'Saved ✓',
        dangerZone: 'Danger Zone',
        dataManagement: 'Data management actions',
        clearAllData: 'Clear All Data',
        clearDescription: 'Remove all {count} transactions and reset settings.',
        clearButton: 'Clear Data',
        clearConfirm: 'Are you sure you want to clear all transaction data? This cannot be undone.',
    },

    // Language
    language: {
        label: 'Language',
        id: 'Indonesia',
        en: 'English',
        ar: 'العربية',
    },
};

// Helper type: convert all leaf string values to `string` while preserving structure
type DeepStringify<T> = {
    [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type TranslationKeys = DeepStringify<typeof en>;
export default en as TranslationKeys;
