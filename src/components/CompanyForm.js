import React, { useState } from 'react';

const CompanyForm = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return alert('Company name is required');

        onCreate({ name, description });
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a New Company</h3>
            <input
                type="text"
                placeholder="Company Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Create Company</button>
        </form>
    );
};

export default CompanyForm;
