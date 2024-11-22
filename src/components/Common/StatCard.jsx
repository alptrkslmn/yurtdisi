import React from 'react';

function StatCard({ title, value, type }) {
    const getBackgroundColor = () => {
        switch (type) {
            case 'income':
                return 'bg-green-100';
            case 'expense':
                return 'bg-red-100';
            case 'balance':
                return 'bg-blue-100';
            default:
                return 'bg-gray-100';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'income':
                return 'text-green-800';
            case 'expense':
                return 'text-red-800';
            case 'balance':
                return 'text-blue-800';
            default:
                return 'text-gray-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'income':
                return (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                );
            case 'expense':
                return (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                );
            case 'balance':
                return (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`p-6 rounded-lg ${getBackgroundColor()}`}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    {getIcon()}
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            {title}
                        </dt>
                        <dd className={`text-lg font-semibold ${getTextColor()}`}>
                            {typeof value === 'number' ? value.toFixed(2) : value}
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default StatCard;
