// src/hooks/useCompanies.js
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

export const useCompanies = () => {
    const [allCompanies, setAllCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uniqueIndustries, setUniqueIndustries] = useState([]);

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('highest-rated');

    // Initial data fetch
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axiosInstance.get('/companies');
                const formatted = res.data.map(c => ({
                    ...c,
                    averageRating: parseFloat(c.averageRating || 0),
                    reviewCount: c.reviewCount ?? (c.reviews?.length || 0),
                    ratingDistribution: c.ratingDistribution || [0, 0, 0, 0, 0]
                }));
                setAllCompanies(formatted);
                const industries = [...new Set(formatted.map(c => c.industry).filter(Boolean))];
                setUniqueIndustries(industries);
            } catch (err) {
                setError('Failed to load companies.');
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    // Effect for filtering and sorting
    useEffect(() => {
        let companies = [...allCompanies];

        if (searchTerm) {
            companies = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (selectedIndustry) {
            companies = companies.filter(c => c.industry === selectedIndustry);
        }
        if (minRating > 0) {
            companies = companies.filter(c => c.averageRating >= minRating);
        }

        companies.sort((a, b) => {
            switch (sortBy) {
                case 'most-reviews': return b.reviewCount - a.reviewCount;
                case 'a-z': return a.name.localeCompare(b.name);
                case 'highest-rated':
                default: return b.averageRating - a.averageRating;
            }
        });

        setFilteredCompanies(companies);
    }, [searchTerm, selectedIndustry, minRating, sortBy, allCompanies]);

    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedIndustry(null);
        setMinRating(0);
        setSortBy('highest-rated');
    };

    // Callback to update a single company in the list after a review
    const updateCompanyInList = useCallback((updatedCompany) => {
        setAllCompanies(prev =>
            prev.map(c => (c.id === updatedCompany.id ? updatedCompany : c))
        );
    }, []);

    return {
        companies: filteredCompanies,
        loading,
        error,
        uniqueIndustries,
        filterState: { searchTerm, selectedIndustry, minRating, sortBy },
        filterSetters: { setSearchTerm, setSelectedIndustry, setMinRating, setSortBy },
        handleResetFilters,
        updateCompanyInList,
    };
};