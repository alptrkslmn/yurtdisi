import {
  CurrencyDollarIcon,
  ArrowTrendingDownIcon,
  DocumentChartBarIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

export const mockData = {
  stats: [
    {
      id: 1,
      name: 'dashboard.stats.totalIncome',
      value: '€2,435,890',
      change: '+12.5%',
      trend: 'up',
      icon: CurrencyDollarIcon
    },
    {
      id: 2,
      name: 'dashboard.stats.totalExpense',
      value: '€1,874,320',
      change: '+8.2%',
      trend: 'up',
      icon: ArrowTrendingDownIcon
    },
    {
      id: 3,
      name: 'dashboard.stats.activeInstitutions',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: BuildingOfficeIcon
    },
    {
      id: 4,
      name: 'dashboard.stats.monthlyReports',
      value: '149',
      change: '+28.5%',
      trend: 'up',
      icon: DocumentChartBarIcon
    },
  ],
  transactions: [
    {
      id: 1,
      description: 'dashboard.transactions.germanyIncome',
      type: 'income',
      amount: 12450,
      date: '2024-03-21'
    },
    {
      id: 2,
      description: 'dashboard.transactions.franceExpense',
      type: 'expense',
      amount: 8720,
      date: '2024-03-20'
    },
    {
      id: 3,
      description: 'dashboard.transactions.ukDonation',
      type: 'income',
      amount: 15890,
      date: '2024-03-19'
    },
    {
      id: 4,
      description: 'dashboard.transactions.netherlandsExpense',
      type: 'expense',
      amount: 22340,
      date: '2024-03-18'
    },
    {
      id: 5,
      description: 'dashboard.transactions.belgiumIncome',
      type: 'income',
      amount: 9870,
      date: '2024-03-17'
    }
  ]
};
