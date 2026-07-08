import { create } from "zustand";
import type {
  UserProfile,
  DashboardNotification,
  RewardTransaction,
  UserCoupon,
  UserReview,
  SavedAddress,
  LoginSession,
} from "@/types";
import {
  mockUserProfile,
  mockNotifications,
  mockRewardTransactions,
  mockUserCoupons,
  mockUserReviews,
  mockLoginSessions,
} from "@/mocks/mock-data";
import { SAVED_ADDRESSES } from "@/constants";

interface DashboardState {
  userProfile: UserProfile;
  notifications: DashboardNotification[];
  rewardTransactions: RewardTransaction[];
  rewardPoints: number;
  userCoupons: UserCoupon[];
  userReviews: UserReview[];
  savedAddresses: SavedAddress[];
  loginSessions: LoginSession[];
  notificationPrefs: { email: boolean; sms: boolean; promotions: boolean; digest: boolean };

  updateProfile: (data: Partial<UserProfile>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
  addAddress: (address: SavedAddress) => void;
  updateAddress: (id: string, data: Partial<SavedAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addReview: (review: UserReview) => void;
  editReview: (id: string, data: { rating: number; content: string }) => void;
  deleteReview: (id: string) => void;
  updateNotificationPrefs: (prefs: Partial<DashboardState["notificationPrefs"]>) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  userProfile: mockUserProfile,
  notifications: mockNotifications,
  rewardTransactions: mockRewardTransactions,
  rewardPoints: mockRewardTransactions[mockRewardTransactions.length - 1]?.balance || 1280,
  userCoupons: mockUserCoupons,
  userReviews: mockUserReviews,
  savedAddresses: SAVED_ADDRESSES,
  loginSessions: mockLoginSessions,
  notificationPrefs: { email: true, sms: true, promotions: false, digest: true },

  updateProfile: (data) => {
    set((state) => ({ userProfile: { ...state.userProfile, ...data } }));
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  addAddress: (address) => {
    set((state) => ({ savedAddresses: [...state.savedAddresses, address] }));
  },

  updateAddress: (id, data) => {
    set((state) => ({
      savedAddresses: state.savedAddresses.map((a) =>
        a.id === id ? { ...a, ...data } : a
      ),
    }));
  },

  removeAddress: (id) => {
    set((state) => ({
      savedAddresses: state.savedAddresses.filter((a) => a.id !== id),
    }));
  },

  setDefaultAddress: () => {},

  addReview: (review) => {
    set((state) => ({ userReviews: [review, ...state.userReviews] }));
  },

  editReview: (id, data) => {
    set((state) => ({
      userReviews: state.userReviews.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    }));
  },

  deleteReview: (id) => {
    set((state) => ({
      userReviews: state.userReviews.filter((r) => r.id !== id),
    }));
  },

  updateNotificationPrefs: (prefs) => {
    set((state) => ({
      notificationPrefs: { ...state.notificationPrefs, ...prefs },
    }));
  },
}));
