import HeroSlider from '@/client/ui/HeroSlider';

export default function Home() {
    return (
        <main>
            <HeroSlider />
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Welcome to Our Church</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Sunday Service</h3>
                            <p className="text-gray-600">Join us every Sunday at 10:00 AM for worship and fellowship.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Bible Study</h3>
                            <p className="text-gray-600">Wednesdays at 7:00 PM - Dive deeper into God's word.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Youth Ministry</h3>
                            <p className="text-gray-600">Fridays at 6:00 PM - Building the next generation of leaders.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
