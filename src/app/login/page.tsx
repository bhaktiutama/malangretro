import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
    return (
        <main>
            <Navbar />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-background)',
                padding: '120px 20px 60px'
            }}>
                <AuthForm />
            </div>
            <Footer />
        </main>
    );
}
