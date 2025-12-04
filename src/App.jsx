import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Map, 
  Users, 
  CreditCard, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  Calendar,
  DollarSign,
  TrendingUp,
  Briefcase,
  X,
  Mail,
  Phone,
  Edit,
  Trash2,
  Upload,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  Clock,
  Building2,
  Globe,
  Lock,
  User,
  Check,
  Ban,
  Key,
  AtSign,
  UserPlus
} from 'lucide-react';

// --- CHART IMPORTS ---
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar,
  LineChart, 
  CartesianGrid, 
  Line 
} from 'recharts';
// --- Mock Data ---

const INITIAL_PACKAGES = [
  { id: 1, title: 'Bali Paradise Escape', category: 'Honeymoon', price: 1200, days: 5, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Swiss Alps Adventure', category: 'Adventure', price: 2400, days: 7, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Kyoto Cultural Tour', category: 'Cultural', price: 1800, days: 6, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Dubai Luxury Week', category: 'Luxury', price: 3000, days: 5, image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&w=600&q=80' },
];

const INITIAL_BOOKINGS = [
  // Added dates from previous months to make the Line Chart dynamic
  { id: 'BK-7829', customer: 'Sarah Jenkins', package: 'Bali Paradise Escape', date: '2023-10-20', pax: 2, amount: 2400, status: 'Confirmed', packageId: 1 },
  { id: 'BK-7830', customer: 'Michael Chen', package: 'Swiss Alps Adventure', date: '2023-11-05', pax: 1, amount: 2400, status: 'Pending', packageId: 2 },
  { id: 'BK-7831', customer: 'Emma Watson', package: 'Kyoto Cultural Tour', date: '2023-11-25', pax: 4, amount: 7200, status: 'Confirmed', packageId: 3 },
  { id: 'BK-7832', customer: 'Robert Doe', package: 'Dubai Luxury Week', date: '2023-12-10', pax: 2, amount: 6000, status: 'Cancelled', packageId: 4 },
  { id: 'BK-7833', customer: 'Alice Brown', package: 'Bali Paradise Escape', date: '2023-10-01', pax: 3, amount: 3600, status: 'Confirmed', packageId: 1 },
];

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+1 555-0123', history: 3 },
  { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', phone: '+1 555-0124', history: 1 },
  { id: 3, name: 'Emma Watson', email: 'emma.w@example.com', phone: '+44 7700 900077', history: 5 },
  { id: 4, name: 'Robert Doe', email: 'rob.doe@example.com', phone: '+1 555-0199', history: 2 },
];

// --- NEW EXPENSES MOCK DATA ---
const INITIAL_EXPENSES = [
    { id: 101, description: 'Marketing Campaign Q4', type: 'Marketing', amount: 2000, date: '2023-11-01' },
    { id: 102, description: 'Website Hosting Renewal', type: 'IT', amount: 350, date: '2023-11-20' },
    { id: 103, description: 'Office Supplies', type: 'General', amount: 150, date: '2023-10-15' },
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { id: 'packages', name: 'Tour Packages', icon: <Map size={20} /> },
    { id: 'bookings', name: 'Bookings', icon: <FileText size={20} /> },
    { id: 'customers', name: 'Customers', icon: <Users size={20} /> },
    { id: 'finance', name: 'Finance', icon: <CreditCard size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full fixed left-0 top-0 overflow-y-auto z-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-emerald-400 tracking-wider">AM TOURS</h1>
        <p className="text-xs text-slate-500 mt-1">Management Portal</p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 
            ${activeTab === item.id 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
              : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold">A</div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-slate-500">View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ title }) => (
  <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
        />
      </div>
      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </div>
  </header>
);

const StatCard = ({ title, value, subtext, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
        <p className={`text-xs mt-2 ${color}`}>{subtext}</p>
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
        {React.cloneElement(icon, { className: color })}
      </div>
    </div>
  </div>
);

// --- DASHBOARD COMPONENT ---
const Dashboard = ({ bookings, setActiveTab, packages }) => { 
  const totalRevenue = bookings.filter(b => b.status === 'Confirmed').reduce((acc, curr) => acc + curr.amount, 0);
  const activeBookings = bookings.filter(b => b.status === 'Confirmed').length;

  // CHART LOGIC: Calculate data for the Booking Status Pie Chart
  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {});

  const dataForStatusChart = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));
  
  const COLORS = {
    'Confirmed': '#059669', // Emerald 600
    'Pending': '#f59e0b',    // Amber 500
    'Cancelled': '#ef4444',  // Red 500
  };

  // CHART LOGIC: Calculate data for Revenue by Package Bar Chart
  const packageRevenue = bookings.reduce((acc, booking) => {
    if (booking.status !== 'Cancelled') {
      // Find the package using packageId to get the title
      const pkg = packages.find(p => p.id === booking.packageId);
      const pkgTitle = pkg ? pkg.title : 'Unknown Package';
      acc[pkgTitle] = (acc[pkgTitle] || 0) + booking.amount;
    }
    return acc;
  }, {});

  const dataForRevenueChart = Object.keys(packageRevenue).map(title => ({
    package: title.split(' ').slice(0, 2).join(' '), // Shorten title for chart
    revenue: packageRevenue[title]
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 5); // Display top 5

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          subtext="+12% from last month" 
          icon={<DollarSign size={24} />} 
          color="text-emerald-600" 
        />
        <StatCard 
          title="Active Bookings" 
          value={activeBookings} 
          subtext="Current active trips" 
          icon={<Briefcase size={24} />} 
          color="text-blue-600" 
        />
        <StatCard 
          title="Total Customers" 
          value="1,280" 
          subtext="+24 this week" 
          icon={<Users size={24} />} 
          color="text-purple-600" 
        />
        <StatCard 
          title="Growth Rate" 
          value="18.2%" 
          subtext="Trending up" 
          icon={<TrendingUp size={24} />} 
          color="text-orange-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Recent Bookings</h3>
            <button 
                onClick={() => setActiveTab('bookings')}
                className="text-emerald-600 text-sm font-medium hover:underline"
            >
                View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">ID</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Customer</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Package</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{booking.id}</td>
                    <td className="px-6 py-4 font-medium">{booking.customer}</td>
                    <td className="px-6 py-4">{booking.package}</td>
                    <td className="px-6 py-4">${booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- CHARTS DASHBOARD (Replaces Popular Destinations) --- */}
        <div className="grid grid-cols-1 gap-8">
        
            {/* 1. Booking Status Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                 <Calendar size={20} className="text-emerald-600"/> Booking Status Distribution
              </h3>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataForStatusChart}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {dataForStatusChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
              </div>
            </div>
            
            {/* 2. Revenue by Package Bar Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-blue-600"/> Top Revenue Packages
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dataForRevenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <XAxis dataKey="package" angle={-15} textAnchor="end" height={50} stroke="#4B5563" tick={{fontSize: 12}}/>
                            <YAxis stroke="#4B5563" tickFormatter={(value) => `$${value.toLocaleString()}`}/>
                            <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, 'Revenue']}/>
                            <Legend />
                            <Bar dataKey="revenue" fill="#3B82F6" name="Total Revenue"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <button 
                onClick={() => setActiveTab('finance')}
                className="w-full mt-2 py-2 border border-emerald-100 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-50"
            >
                View Full Analytics
            </button>
            
        </div>
      </div>
    </div>
  );
};
// --- END OF DASHBOARD COMPONENT ---


const Packages = ({ packages, onAddPackage, onUpdatePackage, onDeletePackage }) => {
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [categories, setCategories] = useState([
    "All",
    "Honeymoon",
    "Adventure",
    "Cultural",
    "Luxury",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State for delete confirmation modal
  const [packageForm, setPackageForm] = useState({
    title: '',
    category: 'Adventure',
    price: '',
    days: '',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80'
  });
  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (newCategory.trim() === "") return;

    setCategories([...categories, newCategory]); // add new category
    setNewCategory(""); // clear input
    setShowForm(false); // close form
  };



  const filteredPackages = filter === 'All' 
    ? packages 
    : packages.filter(pkg => pkg.category === filter);

  useEffect(() => {
    if (editingPackage) {
      setPackageForm(editingPackage);
    } else {
      setPackageForm({
        title: '',
        category: 'Adventure',
        price: '',
        days: '',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80'
      });
    }
  }, [editingPackage, isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPackageForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedPackage = {
      ...packageForm,
      price: parseInt(packageForm.price),
      days: parseInt(packageForm.days)
    };

    if (editingPackage) {
      onUpdatePackage(processedPackage);
    } else {
      onAddPackage(processedPackage);
    }
    setIsModalOpen(false);
  };
  
  const confirmDelete = () => {
    onDeletePackage(deleteId);
    setDeleteId(null);
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full transform scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Package Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this tour package? This action cannot be undone.</p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteId(null)} 
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">{editingPackage ? 'Edit Package' : 'Add New Package'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={packageForm.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Amazing Thailand"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={packageForm.category}
                  onChange={handleInputChange}
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    name="price"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={packageForm.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input 
                    type="number" 
                    name="days"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={packageForm.days}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Image</label>
                <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <div className="flex flex-col items-center justify-center text-gray-500">
                             <Upload size={16} className="mb-1" />
                             <span className="text-xs">Click to upload from computer</span>
                        </div>
                    </label>
                    {packageForm.image && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                            <img src={packageForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
              </div>

              <div className="pt-4">
                 <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 border rounded-full text-sm transition-colors
                ${filter === cat 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div>
    

      {/* Add Category Button */}
      <button onClick={() => setShowForm(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-emerald-700"
        > <Plus size={16} />Add Category</button>

      {/* Form opens only when button clicked */}
      {showForm && (
        <form onSubmit={handleSubmit2} className="space-y-4 p-4 bg-white shadow-md rounded-xl w-80">
          <label className="block text-sm font-medium text-gray-700 mb-1" >Category:</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <button type="submit" className="w-full bg-emerald-600 text-white py-2.5 rounded-lg 
                     font-medium hover:bg-emerald-700 transition-colors"
        >Submit</button>
        </form>
      )}
    </div>
        <button 
          onClick={openAddModal}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-emerald-700"
        >
          <Plus size={16} /> Add Package
        </button>
        
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-48 overflow-hidden relative">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800">
                {pkg.days} Days
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">{pkg.category}</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">{pkg.title}</h3>
                </div>
                <p className="text-lg font-bold text-gray-900">${pkg.price}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                Experience the best of {pkg.title} with our exclusive package including flights, 5-star hotels, and guided tours.
              </p>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => openEditModal(pkg)}
                  className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-1"
                >
                    <Edit size={14} /> Edit
                </button>
                <button 
                    onClick={() => setDeleteId(pkg.id)}
                    className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1"
                >
                    <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Bookings = ({ bookings, packages, onAddBooking, onUpdateBooking, onDeleteBooking, onStatusToggle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    customer: '',
    packageId: '',
    date: '',
    pax: 1,
    status: 'Pending'
  });

  useEffect(() => {
    if (editingBooking) {
        setBookingForm({
            customer: editingBooking.customer,
            packageId: editingBooking.packageId || '',
            date: editingBooking.date,
            pax: editingBooking.pax,
            status: editingBooking.status
        });
    } else {
        setBookingForm({ customer: '', packageId: '', date: '', pax: 1, status: 'Pending' });
    }
  }, [editingBooking, isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setEditingBooking(null);
    setIsModalOpen(true);
  }

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  }

  const confirmDelete = () => {
    onDeleteBooking(deleteId);
    setDeleteId(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPkg = packages.find(p => p.id === parseInt(bookingForm.packageId));
    
    const bookingData = {
      customer: bookingForm.customer,
      packageId: parseInt(bookingForm.packageId),
      package: selectedPkg ? selectedPkg.title : 'Custom Package',
      date: bookingForm.date,
      pax: parseInt(bookingForm.pax),
      amount: selectedPkg ? selectedPkg.price * parseInt(bookingForm.pax) : 0,
      status: bookingForm.status
    };

    if (editingBooking) {
        onUpdateBooking({ ...editingBooking, ...bookingData });
    } else {
        onAddBooking(bookingData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full transform scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteId(null)} 
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">{editingBooking ? 'Edit Booking' : 'Create New Booking'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  name="customer"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={bookingForm.customer}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Package</label>
                <select 
                  name="packageId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={bookingForm.packageId}
                  onChange={handleInputChange}
                >
                  <option value="">Select a tour...</option>
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>{pkg.title} (${pkg.price})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travelers (Pax)</label>
                  <input 
                    type="number" 
                    name="pax"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={bookingForm.pax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  name="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={bookingForm.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="pt-4">
                 <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  {editingBooking ? 'Update Booking' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-4">
            <div className="relative">
               <input type="text" placeholder="Search bookings..." className="pl-3 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64" />
            </div>
            <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white">
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="flex gap-2">
              <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">Export PDF</button>
              <button 
                onClick={openAddModal}
                className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <Plus size={16} /> New Booking
              </button>
          </div>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Booking ID</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Package</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Travel Date</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Pax</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Amount</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-emerald-600 font-medium">{booking.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{booking.customer}</div>
                  <div className="text-xs text-gray-400">visa_doc.pdf</div>
                </td>
                <td className="px-6 py-4">{booking.package}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  {booking.date}
                </td>
                <td className="px-6 py-4">{booking.pax}</td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">${booking.amount}</td>
                <td className="px-6 py-4 text-center">
                   <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1
                    ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
                      booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                      'bg-red-50 text-red-700 border-red-200'}`}>
                    {booking.status === 'Confirmed' && <CheckCircle size={12} />}
                    {booking.status === 'Pending' && <Clock size={12} />}
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => onStatusToggle(booking.id)}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Toggle Status"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button 
                            onClick={() => openEditModal(booking)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Edit size={16} />
                        </button>
                        <button 
                            onClick={() => setDeleteId(booking.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Customers = ({ customers, onAddCustomer, onUpdateCustomer, onDeleteCustomer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // State for delete modal
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (editingCustomer) {
        setCustomerForm({
            name: editingCustomer.name,
            email: editingCustomer.email,
            phone: editingCustomer.phone
        });
    } else {
        setCustomerForm({ name: '', email: '', phone: '' });
    }
  }, [editingCustomer, isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  }

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  }

  const confirmDelete = () => {
    onDeleteCustomer(deleteId);
    setDeleteId(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerData = {
      name: customerForm.name,
      email: customerForm.email,
      phone: customerForm.phone,
      history: editingCustomer ? editingCustomer.history : 0
    };

    if (editingCustomer) {
        onUpdateCustomer({ ...editingCustomer, ...customerData });
    } else {
        onAddCustomer(customerData);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full transform scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this customer? This action cannot be undone.</p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteId(null)} 
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={customerForm.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={customerForm.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={customerForm.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="pt-4">
                 <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  {editingCustomer ? 'Update Customer' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search customers..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64 focus:outline-none focus:border-emerald-500" />
            </div>
          </div>
          <button 
            onClick={openAddModal}
            className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Contact Info</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Travel History</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  <div className="text-xs text-gray-400">ID: #{customer.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={14} className="text-gray-400" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                    <Briefcase size={12} />
                    {customer.history} Trips
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                         <button 
                            onClick={() => openEditModal(customer)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <Edit size={16} />
                        </button>
                        <button 
                            onClick={() => setDeleteId(customer.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- NEW FINANCE COMPONENT (with real data and expense function) ---
const FinanceComponent = ({ bookings, expenses, onAddExpense }) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    type: 'General',
    amount: '',
    date: new Date().toISOString().substring(0, 10), // Default to today
  });

  // 1. FINANCIAL CALCULATIONS (Real Data)
  const totalRevenue = bookings.filter(b => b.status === 'Confirmed').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(2) : 0;
  
  // 2. LINE CHART DATA GENERATION (Real Data)
  const generateMonthlyRevenueData = (bookings) => {
    const revenueMap = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Aggregate revenue by month
    bookings.forEach(booking => {
      if (booking.status === 'Confirmed') {
        const date = new Date(booking.date);
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();
        const key = `${monthName}-${year}`;

        revenueMap[key] = (revenueMap[key] || 0) + booking.amount;
      }
    });

    // Generate data array for the last 6 months for trend visualization
    const data = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) { 
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();
        const key = `${monthName}-${year}`;

        data.push({
            name: monthName,
            Revenue: revenueMap[key] || 0
        });
    }

    return data;
  };
  
  const monthlyRevenueData = generateMonthlyRevenueData(bookings);

  // 3. LATEST TRANSACTIONS DATA (Combined Real Data)
  const latestTransactions = [
    // Income (from confirmed bookings)
    ...bookings
      .filter(b => b.status === 'Confirmed')
      .map(b => ({
        type: 'Income',
        desc: `Booking ID: ${b.id}`,
        amount: b.amount,
        date: b.date, 
        status: 'Completed',
        icon: <DollarSign size={16} className="text-emerald-500" />,
      })),
    // Expenses
    ...expenses.map(e => ({
      type: 'Expense',
      desc: e.description,
      amount: e.amount,
      date: e.date, 
      status: 'Paid',
      icon: <CreditCard size={16} className="text-red-500" />,
    }))
  ]
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
  .slice(0, 5); // Show top 5 recent transactions
  
  // Reusable StatCard
  const FinanceStatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          {React.cloneElement(icon, { className: color })}
        </div>
      </div>
    </div>
  );

  // Expense Modal Handlers
  const handleExpenseFormChange = (e) => {
    const { name, value } = e.target;
    setExpenseForm(prev => ({ ...prev, [name]: value }));
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expenseForm);
    setIsExpenseModalOpen(false);
    // Reset form
    setExpenseForm({
        description: '',
        type: 'General',
        amount: '',
        date: new Date().toISOString().substring(0, 10),
    });
  };


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
       {/* Add Expense Modal */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 transform scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><CreditCard size={20}/> Record New Expense</h3>
              <button onClick={() => setIsExpenseModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input 
                  type="text" 
                  name="description"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  value={expenseForm.description}
                  onChange={handleExpenseFormChange}
                  placeholder="e.g. November Office Rent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    name="amount"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={expenseForm.amount}
                    onChange={handleExpenseFormChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={expenseForm.date}
                    onChange={handleExpenseFormChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                <select 
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  value={expenseForm.type}
                  onChange={handleExpenseFormChange}
                >
                  <option value="General">General</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT/Software</option>
                  <option value="Salary">Salaries</option>
                  <option value="Travel">Business Travel</option>
                </select>
              </div>

              <div className="pt-4">
                 <button 
                  type="submit" 
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} /> Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Finance & Analytics Dashboard</h1>

      {/* Financial Overview Cards - NOW SHOWING REAL DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <FinanceStatCard 
          title="Total Revenue (Confirmed)" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={<DollarSign size={24} />} 
          color="text-emerald-600" 
        />
        <FinanceStatCard 
          title="Total Expenses" 
          value={`$${totalExpenses.toLocaleString()}`} 
          icon={<CreditCard size={24} />} 
          color="text-red-600" 
        />
        <FinanceStatCard 
          title="Net Profit" 
          value={`$${netProfit.toLocaleString()}`} 
          icon={<TrendingUp size={24} />} 
          color={netProfit >= 0 ? "text-blue-600" : "text-red-600"} 
        />
        <FinanceStatCard 
          title="Profit Margin" 
          value={`${profitMargin}%`} 
          icon={<Briefcase size={24} />} 
          color={netProfit >= 0 ? "text-purple-600" : "text-red-600"} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Monthly Revenue Trend Chart - NOW SHOWING REAL DATA */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600"/> Last 6 Months Revenue Trend
          </h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value/1000)}k`} />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  labelFormatter={(name) => `Month: ${name}`}
                />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="Revenue" 
                    stroke="#10b981" // Emerald color
                    strokeWidth={3} 
                    dot={{ fill: '#059669', r: 5 }}
                    activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Latest Transactions - NOW SHOWING REAL DATA (Income + Expenses) */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                 <Clock size={20} className="text-gray-500"/> Latest Transactions
              </h3>
              <button 
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-1 font-medium"
                >
                  <Plus size={14} /> Add Expense
              </button>
            </div>
            <div className="p-4 space-y-3">
              {latestTransactions.map((t, index) => (
                <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      {t.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{t.desc}</p>
                      <p className="text-xs text-gray-500">{t.date} · {t.status}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${t.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {t.type === 'Expense' ? '-' : '+'}${Math.abs(t.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
                <button className="text-sm text-blue-600 font-medium hover:underline">View All Reports</button>
            </div>
        </div>
        
      </div>
      
    </div>
  );
};
// --- END OF NEW FINANCE COMPONENT ---

// --- Settings Component Helpers & Data ---

const initialAgencyProfile = {
  name: 'AM Tours & Travel Agency',
  logo: 'https://placehold.co/64x64/047857/ffffff?text=AM',
  address: '123 Global Street, Suite 500, City, Country',
  phone: '+1 (555) 987-6543',
  gst: 'GSTIN123456789',
  email: 'contact@amtours.com',
  website: 'https://www.amtours.com',
};

const initialStaff = [
    { id: 1, name: 'Alice Johnson (You)', email: 'alice@amtours.com', role: 'Admin', permissions: { canAddStaff: true, viewFinance: true, deleteCustomers: false, editPackages: true }, isOwner: true },
    { id: 2, name: 'Bob Smith', email: 'bob@amtours.com', role: 'Accountant', permissions: { canAddStaff: false, viewFinance: true, deleteCustomers: false, editPackages: false }, isOwner: false },
    { id: 3, name: 'Charlie Brown', email: 'charlie@amtours.com', role: 'Employee', permissions: { canAddStaff: false, viewFinance: false, deleteCustomers: false, editPackages: true }, isOwner: false },
];

const PermissionRow = ({ staffMember, onTogglePermission, onEdit, onDelete }) => {
  const permissionsMap = [
      { key: 'canAddStaff', label: 'Create User', icon: UserPlus },
      { key: 'viewFinance', label: 'View Finance', icon: DollarSign },
      { key: 'deleteCustomers', label: 'Delete Customers', icon: Trash2 },
      { key: 'editPackages', label: 'Edit Packages', icon: Map },
  ];

  return (
      <tr className="border-b hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
              <User size={16} className="text-emerald-500" />
              {staffMember.name}
              {staffMember.isOwner && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Owner</span>}
          </td>
          <td className="px-6 py-4 text-sm text-gray-500">{staffMember.role}</td>
          
          {permissionsMap.map(p => (
              <td key={p.key} className="px-6 py-4 text-center">
                  <button
                      onClick={() => !staffMember.isOwner && onTogglePermission(staffMember.id, p.key)}
                      className={`p-2 rounded-full transition-colors relative group
                          ${staffMember.permissions[p.key] 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 hover:bg-red-200'}
                          ${staffMember.isOwner ? 'cursor-not-allowed opacity-70' : ''}
                      `}
                      title={staffMember.isOwner ? "Owner permissions cannot be changed" : `Toggle ${p.label}`}
                      disabled={staffMember.isOwner}
                  >
                      {staffMember.permissions[p.key] ? <Check size={16} /> : <Ban size={16} />}
                  </button>
              </td>
          ))}
          <td className="px-6 py-4 text-right">
              {!staffMember.isOwner && (
                  <div className="flex items-center justify-end gap-2">
                    <button 
                        onClick={() => onEdit(staffMember)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit Staff"
                    >
                        <Edit size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(staffMember.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Remove Staff"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
              )}
          </td>
      </tr>
  );
};

const AddStaffModal = ({ isOpen, onClose, formData, onChange, onSubmit, roles, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 m-4 transform scale-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <UserPlus size={24}/> {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><AtSign size={14}/> Email ID</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="staff@amtours.com"
                        />
                    </div>
                    
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Key size={14}/> Password</label>
                        <input 
                            type="password" 
                            name="password"
                            required={!isEditing}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={formData.password}
                            onChange={onChange}
                            placeholder={isEditing ? "(Unchanged)" : "temporary password"}
                        />
                    </div>

                    {/* Name (Optional) */}
                     <div className='md:col-span-2'>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><User size={14}/> Full Name (Optional)</label>
                        <input 
                            type="text" 
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Jane Doe"
                        />
                    </div>
                    
                    {/* Role */}
                    <div className='md:col-span-2'>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Briefcase size={14}/> Select Role</label>
                        <select 
                            name="role"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            value={formData.role}
                            onChange={onChange}
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Permissions Checkboxes */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-3 border-b pb-2">Assign Permissions</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {['canAddStaff', 'viewFinance', 'deleteCustomers', 'editPackages'].map(key => (
                            <div key={key} className="flex items-center">
                                <input
                                    id={key}
                                    name={key}
                                    type="checkbox"
                                    checked={formData.permissions[key]}
                                    onChange={onChange}
                                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <label htmlFor={key} className="ml-3 text-sm font-medium text-gray-700">
                                    {key === 'canAddStaff' && 'Create User'}
                                    {key === 'viewFinance' && 'View Finance'}
                                    {key === 'deleteCustomers' && 'Delete Customers'}
                                    {key === 'editPackages' && 'Edit Packages'}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                        <UserPlus size={16} className="inline mr-2"/> {isEditing ? 'Update Staff Member' : 'Invite & Create Staff'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};


const SettingsComponent = () => {
  const [profile, setProfile] = useState(initialAgencyProfile);
  const [staff, setStaff] = useState(initialStaff);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); 
  const [isSaved, setIsSaved] = useState(false); // New state for save confirmation
  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
    permissions: {
      canAddStaff: false,
      viewFinance: false,
      deleteCustomers: false,
      editPackages: false,
    }
  });

  const staffRoles = ['Admin', 'Accountant', 'Employee', 'Manager'];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          // Generate a local object URL for preview
          const imageUrl = URL.createObjectURL(file);
          setProfile(prev => ({ ...prev, logo: imageUrl }));
          // Note: In a real application, you would upload this file to a service like Firebase Storage.
      }
  };

  const handleSaveProfile = (e) => {
      e.preventDefault();
      // In a real app, this is where you'd send 'profile' data to your Firestore or API
      console.log('Profile saved:', profile); 
      
      // For mock data, we just confirm the save
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
  };
  
  const handleNewStaffFormChange = (e) => {
    const { name, value } = e.target;
    if (name in newStaffForm.permissions) {
      setNewStaffForm(prev => ({
        ...prev,
        permissions: { ...prev.permissions, [name]: e.target.checked }
      }));
    } else {
      setNewStaffForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    
    if (editingId) {
        // Update existing staff
        setStaff(prev => prev.map(s => s.id === editingId ? {
            ...s,
            name: newStaffForm.name,
            email: newStaffForm.email,
            role: newStaffForm.role,
            permissions: newStaffForm.permissions
            // Note: In a real app, we'd handle password update here if provided
        } : s));
    } else {
        // Add new staff
        const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
        const newStaff = {
          id: newId,
          name: newStaffForm.name || newStaffForm.email.split('@')[0],
          email: newStaffForm.email,
          role: newStaffForm.role,
          permissions: newStaffForm.permissions,
          isOwner: false,
        };
        setStaff(prev => [...prev, newStaff]);
    }

    setIsAddStaffModalOpen(false);
    setEditingId(null);
    setNewStaffForm({
        name: '', email: '', password: '', role: 'Employee',
        permissions: { canAddStaff: false, viewFinance: false, deleteCustomers: false, editPackages: false }
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewStaffForm({
        name: '', email: '', password: '', role: 'Employee',
        permissions: { canAddStaff: false, viewFinance: false, deleteCustomers: false, editPackages: false }
    });
    setIsAddStaffModalOpen(true);
  };

  const handleEditStaff = (staffMember) => {
    setEditingId(staffMember.id);
    setNewStaffForm({
        name: staffMember.name,
        email: staffMember.email || '',
        password: '', // Don't pre-fill password
        role: staffMember.role,
        permissions: { ...staffMember.permissions }
    });
    setIsAddStaffModalOpen(true);
  };

  const handleDeleteStaff = (id) => {
    setDeleteId(id); // Set the ID to trigger the modal instead of window.confirm
  };

  const confirmDeleteStaff = () => {
    setStaff(prev => prev.filter(s => s.id !== deleteId));
    setDeleteId(null);
  };

  const handleTogglePermission = (staffId, permission) => {
    setStaff(prev => prev.map(s => {
      if (s.id === staffId) {
        return { 
          ...s, 
          permissions: { 
            ...s.permissions, 
            [permission]: !s.permissions[permission] 
          } 
        };
      }
      return s;
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
        
      {/* Save Confirmation Toast */}
      {isSaved && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-top fade-in duration-300">
              <div className="bg-emerald-600 text-white p-4 rounded-lg shadow-xl flex items-center gap-3">
                  <CheckCircle size={20} />
                  <span className="font-medium">Profile Saved Successfully!</span>
              </div>
          </div>
      )}
        
      {/* Delete Confirmation Modal for Staff */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full transform scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Remove Staff Member?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to remove this user? They will lose all access immediately.</p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteId(null)} 
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteStaff} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddStaffModal 
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        formData={newStaffForm}
        onChange={handleNewStaffFormChange}
        onSubmit={handleSaveStaff}
        roles={staffRoles}
        isEditing={!!editingId}
      />

      {/* 1. Agency Profile Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <Building2 size={24} className="text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">Agency Profile</h2>
        </div>
        
        <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Logo and Name/Upload */}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-3xl font-bold text-white overflow-hidden shadow-lg shrink-0">
                        {profile.logo && <img 
                            src={profile.logo} 
                            alt="Agency Logo" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} // Fallback on error
                        />}
                        {/* Fallback Text */}
                        <span className="font-mono" style={{ display: profile.logo && !profile.logo.includes('placehold.co') ? 'none' : 'block' }}>
                            {profile.name.substring(0, 2).toUpperCase()}
                        </span>
                    </div>
                    
                    <div className="flex-1 w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                    </div>

                    <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Change Logo</label>
                        <label className="cursor-pointer bg-white border border-gray-300 rounded-lg p-2 text-center hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                            <Upload size={16} /> Upload File
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Left Column */}
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><Phone size={14} /> Contact Number</span>
                        <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><CreditCard size={14} /> GST Number</span>
                        <input type="text" name="gst" value={profile.gst} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><Globe size={14} /> Website</span>
                        <input type="url" name="website" value={profile.website} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </label>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail size={14} /> Email</span>
                        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><Home size={14} /> Address</span>
                        <textarea name="address" value={profile.address} onChange={handleProfileChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                    </label>
                </div>
            </div>
          <div className="pt-4 border-t mt-6 text-right">
             <button type="submit" className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-md">
                Save Profile Changes
             </button>
          </div>
        </form>
      </div>

      {/* 2. User Roles & Permissions Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between gap-4 p-6 border-b pb-4">
          <div className="flex items-center gap-4">
            <Lock size={24} className="text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">User Roles & Permissions</h2>
          </div>
          <button 
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 flex items-center gap-2"
            onClick={openAddModal}
          >
            <Plus size={16} /> Add Staff
          </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 font-semibold text-gray-700">Staff Member</th>
                        <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
                        <th className="px-6 py-3 font-semibold text-gray-700 text-center">Create User</th>
                        <th className="px-6 py-3 font-semibold text-gray-700 text-center">View Finance</th>
                        <th className="px-6 py-3 font-semibold text-gray-700 text-center">Delete Customers</th>
                        <th className="px-6 py-3 font-semibold text-gray-700 text-center">Edit Packages</th>
                        <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map(s => (
                        <PermissionRow 
                            key={s.id} 
                            staffMember={s} 
                            onTogglePermission={handleTogglePermission} 
                            onEdit={handleEditStaff}
                            onDelete={handleDeleteStaff}
                        />
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  // --- NEW STATE FOR EXPENSES ---
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  // --- Booking Handlers ---
  const handleAddBooking = (newBookingData) => {
    const newBooking = {
      id: `BK-${Date.now()}`,
      ...newBookingData
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBooking = (updatedBooking) => {
    setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
  };

  const handleDeleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleStatusToggle = (bookingId) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        // Toggle logic: Confirmed -> Pending, anything else (Pending/Cancelled) -> Confirmed
        const nextStatus = b.status === 'Confirmed' ? 'Pending' : 'Confirmed';
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  // --- Customer Handlers ---
  const handleAddCustomer = (newCustomerData) => {
    // Generate a unique ID to avoid collisions that break edit/delete
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCustomer = {
      id: newId,
      ...newCustomerData
    };
    setCustomers(prev => [newCustomer, ...prev]);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  // --- Package Handlers ---
  const handleAddPackage = (newPackageData) => {
    const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
    const newPkg = {
      id: newId,
      ...newPackageData
    };
    setPackages(prev => [...prev, newPkg]);
  };

  const handleUpdatePackage = (updatedPackage) => {
    setPackages(prev => prev.map(p => p.id === updatedPackage.id ? updatedPackage : p));
  };

  const handleDeletePackage = (id) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  // --- EXPENSE HANDLER ---
  const handleAddExpense = (newExpenseData) => {
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 101;
    const newExpense = {
        id: newId,
        ...newExpenseData,
        amount: parseInt(newExpenseData.amount) // Ensure amount is an integer
    };
    setExpenses(prev => [...prev, newExpense]);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        // UPDATED: Pass packages prop to Dashboard
        return <Dashboard bookings={bookings} setActiveTab={setActiveTab} packages={packages} />;
      case 'packages':
        return <Packages 
            packages={packages} 
            onAddPackage={handleAddPackage} 
            onUpdatePackage={handleUpdatePackage}
            onDeletePackage={handleDeletePackage}
        />;
      case 'bookings':
        return <Bookings 
          bookings={bookings} 
          packages={packages} 
          onAddBooking={handleAddBooking} 
          onUpdateBooking={handleUpdateBooking}
          onDeleteBooking={handleDeleteBooking}
          onStatusToggle={handleStatusToggle} 
        />;
      case 'customers':
        return <Customers 
            customers={customers} 
            onAddCustomer={handleAddCustomer} 
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
        />;
      case 'finance':
        // UPDATED: Pass bookings, expenses, and the new handler to FinanceComponent
        return <FinanceComponent 
            bookings={bookings} 
            expenses={expenses} 
            onAddExpense={handleAddExpense} 
        />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <div className="p-8">Feature coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <Header title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;