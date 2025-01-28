import React from 'react';
import { FaBalanceScale, FaChartLine, FaUsers, FaGlobe, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa'; // Example icons  
import Card from './card';

const Lanskap: React.FC = () => {
    const data = [
        { title: 'HUKUM', type: 'Biro', description: 'Biro Hukum', icon: <FaBalanceScale /> },
        { title: 'KASTRAT', type: 'Kementerian', description: 'Kementerian Kajian & Analisis Isu', icon: <FaChartLine /> },
        { title: 'MENBUD', type: 'Kementerian', description: 'Kementerian Kebudayaan', icon: <FaUsers /> },
        { title: 'MENLU', type: 'Kementerian', description: 'Kementerian Luar Negeri', icon: <FaGlobe /> },
        { title: 'KESKAB', type: 'Biro', description: 'Biro Kesekretariatan Kabinet', icon: <FaClipboardList /> },
        { title: 'KEUANGAN', type: 'Biro', description: 'Biro Keuangan', icon: <FaMoneyBillWave /> },
        { title: 'MONEV', type: 'Biro', description: 'Biro Monitoring & Evaluasi', icon: <FaClipboardList /> },
    ];

    return (
        <section className="flex flex-col items-center mx-auto p-4">
            <h2 className="text-4xl font-bold mb-4">Lanskap Kementerian & Biro BEM Udayana</h2>
            <p className="mb-6">Terdapat beberapa kementerian dan biro di berbagai bidang yang hadir di BEM Udayana saat ini</p>

            {/* Marquee Container */}
            <div className='max-w-7xl mx-auto relative mt-12'>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#faf7f5] z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#faf7f5] z-10"></div>
                {/* <div className="absolute inset-0 right-0 bg-gradient-to-r from-[#faf7f5] to-transparent pointer-events-none z-10"></div> */}

                <div className="relative flex overflow-x-hidden">
                    <div className="py-5 animate-marquee whitespace-nowrap flex">
                        {data.map((item, index) => (
                            <div key={index} className="mx-4">
                                <Card {...item} />
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex py-5">
                        {data.map((item, index) => (
                            <div key={index} className="mx-4">
                                <Card {...item} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex overflow-x-hidden">
                    <div className="animate-marquee3 whitespace-nowrap flex reverse py-5">
                        {data.map((item, index) => (
                            <div key={index} className="mx-4">
                                <Card {...item} />
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 animate-marquee4 whitespace-nowrap flex py-5">
                        {data.map((item, index) => (
                            <div key={index} className="mx-4">
                                <Card {...item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Lanskap;
