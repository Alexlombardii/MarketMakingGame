export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-50">
          {/* Navigation/Header */}
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <h1 className="text-xl font-semibold text-gray-800">Dice Game Calculator</h1>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}