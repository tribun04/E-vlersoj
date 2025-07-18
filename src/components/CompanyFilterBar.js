// src/components/CompanyFilterBar.js
import React from 'react';
import { Input, Select, Button, ConfigProvider } from 'antd'; // Import ConfigProvider
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

// Define your theme object. Ant Design will use this for all child components.
const greenTheme = {
    token: {
        colorPrimary: '#00B67A', // Your primary green color
        borderRadius: 6,         // A slightly more modern border radius
    },
};

const CompanyFilterBar = ({ filterState, filterSetters, uniqueIndustries, onReset }) => {
    // Destructure the functions from the filterSetters object prop.
    const { setSearchTerm, setSelectedIndustry, setSortBy } = filterSetters;

    return (
        // Wrap the entire component in ConfigProvider to apply the theme
        <ConfigProvider theme={greenTheme}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Search Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kërko Kompaninë</label>
                    <Input
                        placeholder="e.g., Vlereso"
                        prefix={<SearchOutlined />}
                        value={filterState.searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                </div>

                {/* Industry Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industria</label>
                    <Select
                        placeholder="Zgjidhni një industri"
                        style={{ width: '100%' }}
                        value={filterState.selectedIndustry}
                        onChange={(value) => setSelectedIndustry(value)}
                        allowClear
                    >
                        {uniqueIndustries.map(industry => (
                            <Option key={industry} value={industry}>{industry}</Option>
                        ))}
                    </Select>
                </div>

                {/* Sort By Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rendit Sipas</label>
                    <Select
                        style={{ width: '100%' }}
                        value={filterState.sortBy}
                        onChange={(value) => setSortBy(value)}
                    >
                        <Option value="newest">Më të rejat</Option>
                        <Option value="rating_desc">Vlerësimi më i lartë</Option>
                        <Option value="rating_asc">Vlerësimi më i ulët</Option>
                        <Option value="name_asc">Emri (A-Z)</Option>
                        <Option value="name_desc">Emri (Z-A)</Option>
                    </Select>
                </div>

                {/* Reset Button - Styled as a secondary action */}
                <Button
                    icon={<CloseCircleOutlined />}
                    onClick={onReset}
                    className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border-none"
                >
                    Rivendos Filtrat
                </Button>
            </div>
        </ConfigProvider>
    );
};

export default CompanyFilterBar;