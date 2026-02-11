export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-5xl mx-auto text-center text-sm text-muted">
        <p>
          &copy; {new Date().getFullYear()} Jos&eacute; Carlos Pomo
          Gonz&aacute;lez. Built with Next.js
        </p>
      </div>
    </footer>
  );
}
