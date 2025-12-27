import { supabase } from "./supabase";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Settings, 
  Plus, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Search, 
  Filter, 
  Trash2,
  Wallet,
  Download
} from 'lucide-react';

// --- MOCK DATA & UTILS ---

const INITIAL_TRANSACTIONS = [
  { id: 1, type: 'income', amount: 5000, category: 'Salary', date: '2025-10-01', description: 'October Salary' },
  { id: 2, type: 'expense', amount: 1200, category: 'Rent', date: '2025-10-02', description: 'Office Rent' },
  { id: 3, type: 'expense', amount: 150, category: 'Utilities', date: '2025-10-05', description: 'Internet Bill' },
  { id: 4, type: 'income', amount: 1200, category: 'Freelance', date: '2025-10-10', description: 'Website Project' },
  { id: 5, type: 'expense', amount: 300, category: 'Groceries', date: '2025-10-12', description: 'Office Snacks' },
  { id: 6, type: 'expense', amount: 80, category: 'Transport', date: '2025-10-15', description: 'Uber rides' },
  { id: 7, type: 'income', amount: 5200, category: 'Salary', date: '2025-11-01', description: 'November Salary' },
  { id: 8, type: 'expense', amount: 1200, category: 'Rent', date: '2025-11-02', description: 'Office Rent' },
  { id: 9, type: 'expense', amount: 450, category: 'Equipment', date: '2025-11-05', description: 'New Monitor' },
  { id: 10, type: 'income', amount: 800, category: 'Investments', date: '2025-11-12', description: 'Dividend Payout' },
  { id: 11, type: 'expense', amount: 200, category: 'Software', date: '2025-11-15', description: 'SaaS Subscriptions' },
];

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'agency', 'Other'],
  expense: ['Subscriptions', 'Food', 'Transport', 'Entertainment', 'Items / Shopping', 'Other']
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// --- CUSTOM CHART COMPONENTS (SVG) ---

const BarChart = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.income, d.expense)), 100);
  const chartHeight = height - 40;
  
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 px-2 pb-6 relative">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-xs text-slate-400 pb-8">
        {[1, 0.5, 0].map((tick, i) => (
          <div key={i} className="w-full border-b border-dashed border-slate-200 h-0 flex items-center">
            <span className="absolute -left-8">{Math.round(maxValue * tick / 1000)}k</span>
          </div>
        ))}
      </div>

      {data.map((item, index) => {
        const incomeHeight = (item.income / maxValue) * chartHeight;
        const expenseHeight = (item.expense / maxValue) * chartHeight;
        
        return (
          <div key={index} className="flex flex-col items-center group flex-1">
            <div className="flex items-end gap-1 h-[160px] w-full justify-center">
              <div 
                className="w-3 md:w-6 bg-emerald-400 rounded-t-sm transition-all duration-500 hover:bg-emerald-500 relative group-hover:shadow-lg"
                style={{ height: `${incomeHeight}px` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  +{formatCurrency(item.income)}
                </div>
              </div>
              <div 
                className="w-3 md:w-6 bg-rose-400 rounded-t-sm transition-all duration-500 hover:bg-rose-500 relative group-hover:shadow-lg"
                style={{ height: `${expenseHeight}px` }}
              >
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  -{formatCurrency(item.expense)}
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-500 mt-2 font-medium">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
};

const DonutChart = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let cumulativeAngle = 0;
  
  // Colors for categories
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'
  ];

  if (total === 0) return <div className="flex items-center justify-center h-48 text-slate-400">No data available</div>;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
        {data.map((slice, i) => {
          const percentage = slice.value / total;
          const angle = percentage * 360;
          const x1 = 50 + 40 * Math.cos(Math.PI * cumulativeAngle / 180);
          const y1 = 50 + 40 * Math.sin(Math.PI * cumulativeAngle / 180);
          const x2 = 50 + 40 * Math.cos(Math.PI * (cumulativeAngle + angle) / 180);
          const y2 = 50 + 40 * Math.sin(Math.PI * (cumulativeAngle + angle) / 180);
          
          const largeArcFlag = percentage > 0.5 ? 1 : 0;
          
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');

          const currentAngle = cumulativeAngle;
          cumulativeAngle += angle;

          return (
            <path
              key={i}
              d={pathData}
              fill={colors[i % colors.length]}
              className="hover:opacity-80 transition-opacity cursor-pointer stroke-white stroke-2"
            >
              <title>{`${slice.name}: ${formatCurrency(slice.value)}`}</title>
            </path>
          );
        })}
        <circle cx="50" cy="50" r="25" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-xs text-slate-400 font-semibold">Total</p>
          <p className="text-sm font-bold text-slate-700">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const StatCard = ({ title, amount, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <h2 className="text-2xl font-bold text-slate-800">{amount}</h2>
  </div>
);

const TransactionForm = ({ type, onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: CATEGORIES[type][0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      amount: parseFloat(formData.amount),
      type,
      id: Date.now()
    });
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: CATEGORIES[type][0]
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        {type === 'income' ? <Plus className="text-emerald-500" /> : <Plus className="text-rose-500" />}
        Add New {type === 'income' ? 'Income' : 'Expense'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
          <input
            type="text"
            required
            placeholder="e.g. Client Payment"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            {CATEGORIES[type].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-500 mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400">$</span>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>
        <button 
          type="submit"
          className={`w-full md:w-auto md:col-span-5 mt-2 px-6 py-2.5 rounded-lg font-medium text-white transition-colors ${
            type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
          }`}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const [transactions, setTransactions] = useState([]);

  const [reportFilter, setReportFilter] = useState({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
});

  const fetchTransactions = async () => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*");

  const { data: incomeData } = await supabase
    .from("income")
    .select("*");

  if (!error) {
    const merged = [
      ...(data || []).map(e => ({ ...e, type: "expense" })),
      ...(incomeData || []).map(i => ({ ...i, type: "income" }))
    ];

    setTransactions(merged);
  }


};
  useEffect(() => {
  fetchTransactions();
}, []);



  
  // Data Persistence: Initialize from localStorage if available, else use mock data


  // --- DERIVED STATE ---

  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [transactions]);

  const stats = useMemo(() => {
    const income = currentMonthTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = currentMonthTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    return {
      income,
      expenses,
      net: income - expenses,
      growth: 12.5 // Mock growth for demo
    };
  }, [currentMonthTransactions]);

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const chartData = useMemo(() => {
    // Generate last 6 months data
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      const monthTxns = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === d.getMonth() && tDate.getFullYear() === d.getFullYear();
      });
      months.push({
        month: monthName,
        income: monthTxns.filter(t => t.type === 'income').reduce((acc, c) => acc + c.amount, 0),
        expense: monthTxns.filter(t => t.type === 'expense').reduce((acc, c) => acc + c.amount, 0),
      });
    }
    return months;
  }, [transactions]);

  const expenseCategories = useMemo(() => {
    const expenses = currentMonthTransactions.filter(t => t.type === 'expense');
    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.keys(categories).map(k => ({ name: k, value: categories[k] }));
  }, [currentMonthTransactions]);

  // --- ACTIONS ---

const addTransaction = async (txn) => {
  const table = txn.type === "income" ? "income" : "expenses";

  const payload = {
    date: txn.date,
    description: txn.description,
    category: txn.category,
    amount: txn.amount
  };

  const { error } = await supabase.from(table).insert([payload]);

  if (!error) {
    fetchTransactions(); // refresh UI
  } else {
    console.error(error);
  }
};


const deleteTransaction = async (id, type) => {
  const table = type === "income" ? "income" : "expenses";

  await supabase.from(table).delete().eq("id", id);
  fetchTransactions();
};


  // --- VIEWS ---

  const DashboardView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Income" 
          amount={formatCurrency(stats.income)} 
          icon={TrendingUp} 
          colorClass="bg-emerald-500 text-emerald-500" 
        />
        <StatCard 
          title="Total Expenses" 
          amount={formatCurrency(stats.expenses)} 
          icon={TrendingDown} 
          colorClass="bg-rose-500 text-rose-500" 
        />
        <StatCard 
          title="Net Profit" 
          amount={formatCurrency(stats.net)} 
          icon={Wallet} 
          colorClass="bg-indigo-500 text-indigo-500" 
        />
        <StatCard 
          title="Savings Rate" 
          amount={`${stats.income > 0 ? Math.round(((stats.income - stats.expenses) / stats.income) * 100) : 0}%`} 
          icon={PieChart} 
          colorClass="bg-amber-500 text-amber-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Income vs Expense Analytics</h3>
          <BarChart data={chartData} height={250} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Expense Distribution</h3>
          <DonutChart data={expenseCategories} />
          <div className="mt-6 space-y-2">
            {expenseCategories.map((c, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][i % 5]}}></div>
                  {c.name}
                </span>
                <span className="font-semibold text-slate-800">{formatCurrency(c.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
          <button onClick={() => setActiveTab('reports')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider">Description</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.slice(0, 5).map(txn => (
                <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-600 whitespace-nowrap">{formatDate(txn.date)}</td>
                  <td className="p-4 text-sm text-slate-800 font-medium">{txn.description}</td>
                  <td className="p-4 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {txn.category}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-bold text-right ${txn.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TransactionView = ({ type }) => {
    const filteredTxns = recentTransactions.filter(t => t.type === type);
    
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{type} Management</h2>
        </div>
        
        <TransactionForm type={type} onAdd={addTransaction} />

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">All {type}s</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase">Date</th>
                  <th className="p-4 text-xs font-semibold uppercase">Description</th>
                  <th className="p-4 text-xs font-semibold uppercase">Category</th>
                  <th className="p-4 text-xs font-semibold uppercase text-right">Amount</th>
                  <th className="p-4 text-xs font-semibold uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTxns.length > 0 ? filteredTxns.map(txn => (
                  <tr key={txn.id} className="hover:bg-slate-50">
                    <td className="p-4 text-sm text-slate-600">{formatDate(txn.date)}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">{txn.description}</td>
                    <td className="p-4 text-sm">
                       <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {txn.category}
                      </span>
                    </td>
                    <td className={`p-4 text-sm font-bold text-right ${type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {formatCurrency(txn.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <button 
onClick={() => deleteTransaction(txn.id, txn.type)}
                        className="p-2 hover:bg-rose-100 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-400">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const ReportsView = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const reportData = useMemo(() => {
      return transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === reportFilter.month && d.getFullYear() === reportFilter.year;
      });
    }, [transactions, reportFilter]);

    const reportStats = {
      income: reportData.filter(t => t.type === 'income').reduce((acc, c) => acc + c.amount, 0),
      expense: reportData.filter(t => t.type === 'expense').reduce((acc, c) => acc + c.amount, 0),
    };

    const downloadCSV = () => {
      // Create CSV headers and rows
      const headers = "Date,Type,Description,Category,Amount";
      const rows = reportData.map(t => 
        `${t.date},${t.type},"${t.description.replace(/"/g, '""')}",${t.category},${t.amount}`
      );
      
      const csvContent = [headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `financial_report_${months[reportFilter.month]}_${reportFilter.year}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Monthly Report</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
            >
              <Download size={16} />
              Download CSV
            </button>
            <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
              <select 
                value={reportFilter.month}
                onChange={(e) => setReportFilter({...reportFilter, month: parseInt(e.target.value)})}
                className="px-3 py-1.5 bg-transparent text-sm font-medium text-slate-600 focus:outline-none"
              >
                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <div className="w-px bg-slate-200 my-1"></div>
              <select 
                value={reportFilter.year}
                onChange={(e) => setReportFilter({...reportFilter, year: parseInt(e.target.value)})}
                className="px-3 py-1.5 bg-transparent text-sm font-medium text-slate-600 focus:outline-none"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-500 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
            <p className="text-emerald-100 text-sm font-medium mb-1">Total Income</p>
            <h3 className="text-3xl font-bold">{formatCurrency(reportStats.income)}</h3>
          </div>
          <div className="bg-rose-500 rounded-2xl p-6 text-white shadow-lg shadow-rose-200">
            <p className="text-rose-100 text-sm font-medium mb-1">Total Expenses</p>
            <h3 className="text-3xl font-bold">{formatCurrency(reportStats.expense)}</h3>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg shadow-slate-200">
            <p className="text-slate-300 text-sm font-medium mb-1">Net Result</p>
            <h3 className="text-3xl font-bold">{formatCurrency(reportStats.income - reportStats.expense)}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Detailed Statement</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase">Date</th>
                  <th className="p-4 text-xs font-semibold uppercase">Type</th>
                  <th className="p-4 text-xs font-semibold uppercase">Description</th>
                  <th className="p-4 text-xs font-semibold uppercase">Category</th>
                  <th className="p-4 text-xs font-semibold uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportData.length > 0 ? reportData.sort((a,b) => new Date(a.date) - new Date(b.date)).map(txn => (
                  <tr key={txn.id} className="hover:bg-slate-50">
                    <td className="p-4 text-sm text-slate-600">{formatDate(txn.date)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${txn.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-800">{txn.description}</td>
                    <td className="p-4 text-sm text-slate-600">{txn.category}</td>
                    <td className={`p-4 text-sm font-bold text-right ${txn.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </td>
                  </tr>
                )) : (
                  <tr>
                     <td colSpan="5" className="p-12 text-center text-slate-400">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        No transactions found for this period.
                     </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- LAYOUT ---

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <DollarSign className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
            updream
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="income" label="Income" icon={TrendingUp} />
          <NavItem id="expense" label="Expenses" icon={TrendingDown} />
          <NavItem id="reports" label="Reports" icon={PieChart} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-slate-900 transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          <div className="mt-4 flex items-center gap-3 px-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-20 px-4 py-3 flex justify-between items-center">
         <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <DollarSign className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-indigo-900">FinTrack</span>
        </div>
        <div className="flex gap-4">
             <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}><LayoutDashboard size={20}/></button>
             <button onClick={() => setActiveTab('income')} className={activeTab === 'income' ? 'text-emerald-600' : 'text-slate-400'}><TrendingUp size={20}/></button>
             <button onClick={() => setActiveTab('expense')} className={activeTab === 'expense' ? 'text-rose-600' : 'text-slate-400'}><TrendingDown size={20}/></button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto h-full">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'income' && <TransactionView type="income" />}
          {activeTab === 'expense' && <TransactionView type="expense" />}
          {activeTab === 'reports' && <ReportsView />}
        </div>
      </main>
    </div>
  );
}