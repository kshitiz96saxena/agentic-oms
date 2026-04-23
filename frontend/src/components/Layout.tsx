import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, User, LogOut, ChevronDown } from 'lucide-react';

const Layout = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/inventory', name: 'Inventory', icon: Package },
        { path: '/setup', name: 'Setup', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
            {/* Sidebar - Fixed Position */}
            <aside className="w-72 bg-white border-r border-slate-200 p-4 flex flex-col fixed h-full z-20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">A</div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">Agentic OMS</h1>
                </div>
                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <item.icon size={20} /> {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Content Wrapper - Pushed right by sidebar width */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen">
                {/* Header - Fixed Top */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-12 flex items-center justify-end sticky top-0 z-10">
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-50 rounded-full border border-transparent hover:border-slate-200 transition-all"
                        >
                            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                                AG
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-bold text-slate-800">Akanksha G.</p>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">System Admin</p>
                            </div>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-30 animate-in fade-in zoom-in duration-150">
                                <div className="px-4 py-2 border-b border-slate-50 mb-2">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workspace</p>
                                </div>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                    <User size={16} /> My Profile
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="p-4 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
