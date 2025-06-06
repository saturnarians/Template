'use client';

export default function About() {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-center mb-12">About Our Church</h1>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <img
                        src="/images/church-building.jpg"
                        alt="Church Building"
                        className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-600 mb-6">
                        To spread the love of Christ, build a strong community of believers, and serve our neighbors with compassion and grace.
                    </p>
                    
                    <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                    <p className="text-gray-600 mb-6">
                        To be a beacon of hope and transformation in our community, where people from all walks of life can experience God's love and find their purpose.
                    </p>
                    
                    <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Faith in Action</li>
                        <li>Inclusive Community</li>
                        <li>Biblical Teaching</li>
                        <li>Service to Others</li>
                        <li>Family Focus</li>
                    </ul>
                </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Community</h3>
                    <p className="text-gray-600">
                        A diverse and welcoming family of believers united in faith and purpose.
                    </p>
                </div>
                
                <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Biblical Teaching</h3>
                    <p className="text-gray-600">
                        Grounded in Scripture, relevant for today's challenges.
                    </p>
                </div>
                
                <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Outreach</h3>
                    <p className="text-gray-600">
                        Serving our community through various programs and initiatives.
                    </p>
                </div>
            </div>
        </div>
    );
}
