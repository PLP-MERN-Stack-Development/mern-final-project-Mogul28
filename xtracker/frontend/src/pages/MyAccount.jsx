import { User, Shield, Bell, CreditCard } from 'lucide-react';

export default function MyAccount({ user }) {
  const accountSections = [
    {
      title: 'Profile Information',
      icon: User,
      items: [
        { label: 'Name', value: user?.name || 'User' },
        { label: 'Email', value: user?.email || 'user@example.com' },
        { label: 'Member Since', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) },
      ]
    },
    {
      title: 'Preferences',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: 'Enabled' },
        { label: 'Currency', value: 'USD ($)' },
        { label: 'Date Format', value: 'MM/DD/YYYY' },
      ]
    }
  ];

  const subscriptionSection = {
    title: 'Subscription',
    icon: CreditCard,
    items: [
      { label: 'Plan', value: 'Free' },
      { label: 'Status', value: 'Active' },
      { label: 'Renewal Date', value: 'N/A' },
    ]
  };

  const securitySection = {
    title: 'Security',
    icon: Shield,
    iconColor: 'red',
    items: [
      { 
        label: 'Password', 
        value: 'Change',
        description: 'Last changed 30 days ago',
        isButton: true
      },
      { 
        label: 'Two-Factor Authentication', 
        value: 'Enable',
        description: 'Add an extra layer of security',
        isButton: true
      },
    ]
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">My Account</h2>
      </div>

      {/* First Row: Profile and Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {accountSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Edit {section.title}
              </button>
            </div>
          );
        })}
      </div>

      {/* Second Row: Subscription and Security - Same Height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{subscriptionSection.title}</h3>
          </div>

          <div className="space-y-4 flex-1">
            {subscriptionSection.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Edit {subscriptionSection.title}
          </button>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{securitySection.title}</h3>
          </div>

          <div className="space-y-4 flex-1">
            {securitySection.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div>
                  <span className="text-sm font-medium text-gray-900 block">{item.label}</span>
                  {item.description && (
                    <span className="text-xs text-gray-500">{item.description}</span>
                  )}
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                  {item.value}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

