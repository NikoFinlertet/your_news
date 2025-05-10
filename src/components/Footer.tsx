import '@/styles/components/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} YourNews. Все права защищены.
        </p>
      </div>
    </footer>
  );
} 