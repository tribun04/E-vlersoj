import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const industries = [
    "Teknologji", "Shëndetësi", "Financa", "Arsim", "Shitje me pakicë", "Mikpritje",
    "Pasuri të paluajtshme", "Prodhim", "Transport", "Ndërtim", "Energjia",
    "Telekomunikacion", "Argëtim", "Bujqësi", "Ligj", "Automjete",
    "Aero-hapësinor", "Sigurime", "Marketing", "Konsulencë", "Ushqim & Pije", "Farmaceutikë",
    "Media", "Botime", "Logjistikë", "OJQ", "Shërbime mjedisore",
    "Arkitekturë", "Inxhinieri", "Qeveri", "Siguri", "Bioteknologji", "Miniera",
    "Modë", "Kozmetikë", "Turizëm", "Sport", "Palestra", "Artizanat", "Elektronikë",
    "Shërbime shtëpiake", "Pastrime", "Organizim eventesh", "Shërbime për kafshët", "Kujdes për fëmijë",
    "Kontabilitet", "Përkthim", "Dizajn", "Zhvillim softueri", "Analizë të dhënash"
];

const CompanyRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Fjalëkalimet nuk përputhen!");
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/auth/register-company', formData);
            navigate('/login');
        } catch (err) {
            const errorMsg = err.response?.data?.msg || err.response?.data?.message || 'Regjistrimi dështoi.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Krijo një Llogari Kompanie
                </h2>

                {error && (
                    <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Info */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Emri i Kompanisë</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#00B67A]"
                        />

                        <label className="block mt-4 text-sm text-gray-700 dark:text-gray-300">Industria</label>
                        <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#00B67A]"
                        >
                            <option value="">Zgjidh industrinë</option>
                            {industries.map((ind) => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                        </select>

                        <label className="block mt-4 text-sm text-gray-700 dark:text-gray-300">Adresa</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#00B67A]"
                        />
                    </div>

                    {/* Account Info */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#00B67A]"
                        />

                        <label className="block mt-4 text-sm text-gray-700 dark:text-gray-300">Fjalëkalimi</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#00B67A]"
                        />

                        <label className="block mt-4 text-sm text-gray-700 dark:text-gray-300">Konfirmo Fjalëkalimin</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#00B67A]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00B67A] hover:bg-[#009A60] text-white font-medium py-2.5 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Duke u regjistruar...' : 'Regjistro Kompaninë'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyRegister;
