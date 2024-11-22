import React from 'react';

function Card({ title, value, icon, change, type = 'default' }) {
    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'text-green-600 dark:text-green-400';
            case 'danger':
                return 'text-red-600 dark:text-red-400';
            case 'info':
                return 'text-blue-600 dark:text-blue-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    const getChangeStyles = () => {
        const isPositive = change?.startsWith('+');
        return isPositive
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {icon && (
                        <div className="mr-4">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {title}
                        </h3>
                        <p className={`text-2xl font-bold mt-1 ${getTypeStyles()}`}>
                            {value || '₺0'}
                        </p>
                    </div>
                </div>
                {change && (
                    <div className={`text-sm font-medium ${getChangeStyles()}`}>
                        {change}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
