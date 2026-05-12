import { create } from 'zustand';

/* ═══════════════════════════════════════════════
   Alliance OS — Global State Management
   ═══════════════════════════════════════════════ */

// ─── Tab System ───
export type Tab = {
  id: string;
  title: string;
  href: string;
  icon?: string;
};

interface TabState {
  tabs: Tab[];
  activeTab: string;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
}

const initialTabs: Tab[] = [
  { id: 'dashboard', title: 'Mission Control', href: '/' },
];

export const useTabStore = create<TabState>((set) => ({
  tabs: initialTabs,
  activeTab: 'dashboard',
  
  addTab: (newTab) => set((state) => {
    if (state.tabs.some(tab => tab.id === newTab.id)) {
      return { activeTab: newTab.id };
    }
    return {
      tabs: [...state.tabs, newTab],
      activeTab: newTab.id,
    };
  }),

  removeTab: (tabId) => set((state) => {
    if (state.tabs.length <= 1) return {};
    const newTabs = state.tabs.filter((tab) => tab.id !== tabId);
    let newActiveTab = state.activeTab;
    if (state.activeTab === tabId) {
      const closingTabIndex = state.tabs.findIndex(tab => tab.id === tabId);
      newActiveTab = (state.tabs[closingTabIndex - 1] || state.tabs[0]).id;
    }
    return { tabs: newTabs, activeTab: newActiveTab };
  }),
  
  setActiveTab: (tabId) => set({ activeTab: tabId }),
}));

// ─── Sidebar State ───
interface SidebarState {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));

// ─── User Context (simulated) ───
export interface UserProfile {
  id: string;
  name: string;
  role: 'admin' | 'underwriter' | 'claims_handler' | 'finance' | 'reinsurance';
  branch: string;
  branchCode: string;
  avatar?: string;
}

interface UserState {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: 'KALEMERA',
    name: 'Kalemera Jason',
    role: 'admin',
    branch: 'Dar Es Salaam',
    branchCode: '100',
  },
  setUser: (user) => set({ user }),
}));

// ─── Notification Store ───
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: '1', title: 'Claim Approved', message: 'C11/100/1002/2026/011654 approved by supervisor', type: 'success', time: '2 min ago', read: false },
    { id: '2', title: 'Treaty Renewal Due', message: 'FIR-2026 Fire Treaty expires in 30 days', type: 'warning', time: '15 min ago', read: false },
    { id: '3', title: 'Premium Collection', message: 'TZS 45.2M collected today across all branches', type: 'info', time: '1 hr ago', read: false },
    { id: '4', title: 'Policy Endorsement', message: 'P11/2025/100/5042 endorsement pending approval', type: 'warning', time: '2 hrs ago', read: true },
    { id: '5', title: 'System Backup', message: 'Nightly backup completed successfully', type: 'success', time: '6 hrs ago', read: true },
  ],
  unreadCount: 3,
  markRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: state.notifications.filter(n => !n.read && n.id !== id).length,
  })),
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
}));
