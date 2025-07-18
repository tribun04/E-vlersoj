import React from 'react';

function CompanyList({ companies }) {
    if (!Array.isArray(companies) || companies.length === 0) {
        return <p>No companies to display.</p>;
    }

    return (
        <ul>
            {companies.map((company) => (
                <li key={company.id}>{company.name}</li>
            ))}
        </ul>
    );
}

export default CompanyList;
