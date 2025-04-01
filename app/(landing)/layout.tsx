import { ReactNode } from 'react';
import Navbar from './Home/landing/Navbar';
import Footer from './Home/landing/Footer';

interface LandingLayoutProps {
    children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div>
        <Navbar />
        {children}  
        <Footer />
        </div>
    );
}