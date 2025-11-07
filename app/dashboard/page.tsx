"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [userJourney, setUserJourney] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set tab from URL
      const tab = searchParams.get('tab');
      if (tab && ['overview','buying','selling','activity'].includes(tab)) {
        setActiveTab(tab);
      }
      // Check if user just completed a journey
      const journey = localStorage.getItem('userJourney');
      if (journey) {
        setUserJourney(journey);
        setShowWelcomePopup(true);
        // Clear the journey flag after showing popup
        localStorage.removeItem('userJourney');
      }
    }
  }, [searchParams]);

  const stats = [
    { label: 'Total Views', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Inquiries', value: '23', change: '+8%', trend: 'up' },
    { label: 'Saved Searches', value: '5', change: '0%', trend: 'neutral' },
    { label: 'Active Listings', value: '2', change: '+1', trend: 'up' },
  ];

  const recentActivity = [
    { type: 'view', message: 'Your listing received a new view', time: '2 hours ago' },
    { type: 'inquiry', message: 'New inquiry from John D.', time: '4 hours ago' },
    { type: 'saved', message: 'Your listing was saved by a buyer', time: '1 day ago' },
    { type: 'update', message: 'Listing updated successfully', time: '2 days ago' },
  ];

  const buyingTools = [
    { label: 'Browse Startups', icon: '🔍', description: 'Search and filter available startups', action: () => router.push('/buyers') },
    { label: 'Saved Searches', icon: '💾', description: 'Manage your search criteria', action: () => alert('Saved searches') },
    { label: 'Watchlist', icon: '👁️', description: 'Track startups you\'re interested in', action: () => alert('Watchlist') },
    { label: 'Deal Alerts', icon: '🔔', description: 'Get notified of new matches', action: () => alert('Deal alerts') },
    { label: 'Due Diligence', icon: '📋', description: 'Tools for evaluating startups', action: () => alert('Due diligence') },
    { label: 'Valuation Calculator', icon: '💰', description: 'Calculate startup valuations', action: () => router.push('/valuation') },
  ];

  const sellingTools = [
    { label: 'Create Listing', icon: '📝', description: 'List your startup for sale', action: () => router.push('/sellers') },
    { label: 'Listing Manager', icon: '📊', description: 'Manage your active listings', action: () => alert('Listing manager') },
    { label: 'Inquiry Center', icon: '💬', description: 'Respond to buyer inquiries', action: () => alert('Inquiry center') },
    { label: 'Data Room', icon: '📁', description: 'Share documents with buyers', action: () => alert('Data room') },
    { label: 'Analytics', icon: '📈', description: 'Track listing performance', action: () => alert('Analytics') },
    { label: 'Pricing Guide', icon: '💡', description: 'Get pricing recommendations', action: () => router.push('/pricingsellers') },
  ];

  const buyerStats = [
    { label: 'Startups Viewed', value: '47', change: '+5', trend: 'up' },
    { label: 'Saved Searches', value: '5', change: '0', trend: 'neutral' },
    { label: 'Watchlist Items', value: '12', change: '+2', trend: 'up' },
    { label: 'Deal Alerts', value: '3', change: '+1', trend: 'up' },
  ];

  const sellerStats = [
    { label: 'Listing Views', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Inquiries', value: '23', change: '+8%', trend: 'up' },
    { label: 'Active Listings', value: '2', change: '+1', trend: 'up' },
    { label: 'Avg. Response Time', value: '2.3h', change: '-0.5h', trend: 'down' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar />
      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-xl">
            {userJourney === 'buyer' ? (
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-[#23235B] mb-4">Welcome to Your Dashboard!</h2>
                <p className="text-[#7B849B] mb-6">
                  Great! We've saved your ideal business criteria. We'll notify you when startups matching your preferences become available.
                </p>
                <div className="space-y-3 mb-6 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[#23235B]">Browse available startups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[#23235B]">Get notified of new matches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-[#23235B]">Track your inquiries</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowWelcomePopup(false)}
                  className="bg-[#4F5DFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#3B4BCC] transition-colors"
                >
                  Get Started
                </button>
              </div>
            ) : userJourney === 'seller' ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <h2 className="text-2xl font-bold text-[#23235B] mb-4">Welcome to Your Dashboard!</h2>
                <p className="text-[#7B849B] mb-6">
                  Ready to sell your startup? Let's get your listing live and start attracting qualified buyers.
                </p>
                <div className="space-y-3 mb-6 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[#23235B]">Create your listing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[#23235B]">Track buyer interest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-[#23235B]">Manage inquiries</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowWelcomePopup(false)}
                  className="bg-[#4F5DFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#3B4BCC] transition-colors"
                >
                  Get Started
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {showWelcomePopup && userJourney === 'buyer-success' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-xl text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#23235B] mb-4">Success! We're searching for businesses that match your goals.</h2>
            <p className="text-[#7B849B] mb-6">
              You'll be the first to know when a startup that fits your ideal business goes live.<br/>
              Keep an eye on your inbox — our deals go fast.
            </p>
            <button
              onClick={() => setShowWelcomePopup(false)}
              className="bg-[#4F5DFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#3B4BCC] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#E6ECFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#23235B]">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-[#7B849B] hover:text-[#23235B]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-[#4F5DFF] rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[#E6ECFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'buying', 'selling', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-[#4F5DFF] text-[#4F5DFF]'
                    : 'border-transparent text-[#7B849B] hover:text-[#23235B] hover:border-[#B3B8E0]'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#7B849B] text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#23235B] mt-1">{stat.value}</p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-[#7B849B]'
                    }`}>
                      {stat.trend === 'up' && <span>↗</span>}
                      {stat.trend === 'down' && <span>↘</span>}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <h2 className="text-lg font-semibold text-[#23235B] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...buyingTools.slice(0, 3), ...sellingTools.slice(0, 3)].map((tool, index) => (
                  <button
                    key={index}
                    onClick={tool.action}
                    className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-[#B3B8E0] hover:border-[#4F5DFF] hover:bg-[#F7F8FC] transition-all"
                  >
                    <span className="text-2xl mb-2">{tool.icon}</span>
                    <span className="text-sm font-medium text-[#23235B] text-center">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <h2 className="text-lg font-semibold text-[#23235B] mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#F7F8FC]">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'view' ? 'bg-blue-500' :
                        activity.type === 'inquiry' ? 'bg-green-500' :
                        activity.type === 'saved' ? 'bg-yellow-500' : 'bg-purple-500'
                      }`} />
                      <span className="text-[#23235B]">{activity.message}</span>
                    </div>
                    <span className="text-sm text-[#7B849B]">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buying' && (
          <div className="space-y-8">
            {/* Buyer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buyerStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#7B849B] text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#23235B] mt-1">{stat.value}</p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-[#7B849B]'
                    }`}>
                      {stat.trend === 'up' && <span>↗</span>}
                      {stat.trend === 'down' && <span>↘</span>}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buying Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <h2 className="text-lg font-semibold text-[#23235B] mb-6">Buying Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buyingTools.map((tool, index) => (
                  <button
                    key={index}
                    onClick={tool.action}
                    className="flex items-start p-6 rounded-xl border-2 border-[#E6ECFA] hover:border-[#4F5DFF] hover:bg-[#F7F8FC] transition-all text-left"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-3xl mb-3 block">{tool.icon}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-[#23235B] mb-2">{tool.label}</h3>
                      <p className="text-sm text-[#7B849B]">{tool.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Startups */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-[#23235B]">Recommended for You</h2>
                <button className="text-[#4F5DFF] hover:underline">View All</button>
              </div>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-[#23235B] mb-2">No recommendations yet</h3>
                <p className="text-[#7B849B] mb-4">Complete your ideal business criteria to get personalized recommendations</p>
                <button 
                  onClick={() => router.push('/idealBusiness')}
                  className="bg-[#4F5DFF] text-white px-6 py-3 rounded-lg hover:bg-[#3B4BCC] transition-colors"
                >
                  Set Your Criteria
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'selling' && (
          <div className="space-y-8">
            {/* Seller Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellerStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#7B849B] text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#23235B] mt-1">{stat.value}</p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-[#7B849B]'
                    }`}>
                      {stat.trend === 'up' && <span>↗</span>}
                      {stat.trend === 'down' && <span>↘</span>}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selling Tools */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <h2 className="text-lg font-semibold text-[#23235B] mb-6">Selling Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellingTools.map((tool, index) => (
                  <button
                    key={index}
                    onClick={tool.action}
                    className="flex items-start p-6 rounded-xl border-2 border-[#E6ECFA] hover:border-[#4F5DFF] hover:bg-[#F7F8FC] transition-all text-left"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-3xl mb-3 block">{tool.icon}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-[#23235B] mb-2">{tool.label}</h3>
                      <p className="text-sm text-[#7B849B]">{tool.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Listings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-[#23235B]">Your Listings</h2>
                <button 
                  onClick={() => router.push('/sellers')}
                  className="bg-[#4F5DFF] text-white px-4 py-2 rounded-lg hover:bg-[#3B4BCC] transition-colors"
                >
                  Create New Listing
                </button>
              </div>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-[#23235B] mb-2">No listings yet</h3>
                <p className="text-[#7B849B] mb-4">Create your first listing to start attracting buyers</p>
                <button 
                  onClick={() => router.push('/sellers')}
                  className="bg-[#4F5DFF] text-white px-6 py-3 rounded-lg hover:bg-[#3B4BCC] transition-colors"
                >
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-8">
            {/* Activity Feed */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <h2 className="text-lg font-semibold text-[#23235B] mb-6">Activity Feed</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[#F7F8FC]">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'view' ? 'bg-blue-500' :
                        activity.type === 'inquiry' ? 'bg-green-500' :
                        activity.type === 'saved' ? 'bg-yellow-500' : 'bg-purple-500'
                      }`} />
                      <div>
                        <p className="text-[#23235B] font-medium">{activity.message}</p>
                        <p className="text-sm text-[#7B849B]">{activity.time}</p>
                      </div>
                    </div>
                    <button className="text-[#4F5DFF] hover:underline text-sm">View</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6ECFA]">
              <h2 className="text-lg font-semibold text-[#23235B] mb-6">Performance Overview</h2>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-[#23235B] mb-2">Analytics coming soon</h3>
                <p className="text-[#7B849B]">Detailed insights and performance metrics will be available here</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center">
        <div className="text-[#23235B] text-lg">Loading dashboard...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
} 