import Header from '@/components/header';
import Hero from '@/components/hero';
import FeaturedProducts from '@/components/featured-products';
import Features from '@/components/features';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
