// src/pages/CompaniesPage.js
import React from 'react';
import { Typography, Spin, Alert, Row, Button } from 'antd';
import { useCompanies } from '../hooks/useCompanies';
import CompanyFilterBar from '../components/CompanyFilterBar'; // This import is correct
import CompanyCard from '../components/CompanyCard';
import axiosInstance from '../api/axiosInstance';



const { Title, Text } = Typography;

const CompaniesPage = () => {
    const {
        companies,
        loading,
        error,
        uniqueIndustries,
        filterState,
        filterSetters,
        handleResetFilters,
        updateCompanyInList
    } = useCompanies();

    const handleReviewSubmitted = async (companyId) => {
        try {
            const res = await axiosInstance.get(`/companies/${companyId}`);
            const updatedCompany = {
                ...res.data,
                averageRating: parseFloat(res.data.averageRating || 0),
                reviewCount: res.data.reviews?.length || 0,
                ratingDistribution: res.data.ratingDistribution || [0, 0, 0, 0, 0]
            };
            updateCompanyInList(updatedCompany);
        } catch (err) {
            console.error("Failed to refetch company after review submission", err);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
            <Spin size="large" tip="Loading Companies..." />
        </div>
    );

    if (error) return (
        <div className="container mx-auto p-8 bg-white dark:bg-gray-900">
            <Alert message="Error" description={error} type="error" showIcon />
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen py-[5rem] ">
            <div className="max-w-[1250px] mx-auto px-4">
                <div className="text-center mb-12">
                    <Title level={2} className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                        Vlerësoni dhe Shkruani Komente për Kompanitë
                    </Title>
                    <Text className="text-xl text-gray-600 dark:text-gray-300">
                        Ndani përvojat tuaja për të ndihmuar të tjerët të marrin vendime më të mira
                    </Text>
                </div>

                <CompanyFilterBar
                    filterState={filterState}
                    filterSetters={filterSetters}
                    uniqueIndustries={uniqueIndustries}
                    onReset={handleResetFilters}
                />

                <Row gutter={[24, 24]}>
                    {companies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            onReviewSubmitted={handleReviewSubmitted}
                        />
                    ))}
                </Row>

                {companies.length === 0 && !loading && (
                    <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm mt-8">
                        <Title level={4} className="text-gray-800 dark:text-white">Asnjë Kompani Nuk Përputhet me Filtrat Tuaj</Title>
                        <Text className="text-gray-600 dark:text-gray-400">Provoni të ndryshoni kërkimin ose të rivendosni filtrat.</Text>
                        <Button type="primary" onClick={handleResetFilters} className="mt-4 bg-green-600 hover:bg-green-700">
                            Rivendos Filtrat
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompaniesPage;