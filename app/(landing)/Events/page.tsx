import Header from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function Events() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p>More than just graduates, we are a family. The Ahmadu Bello University Alumni Association is the heart of our community, connecting alumni across generations and geographic boundaries.</p>
      </main>
      <Footer />
    </div>
  );
}