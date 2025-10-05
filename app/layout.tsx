import './globals.css'

export const metadata = {
  title: 'React Hooks Tutorial - useRef, useCallback, useMemo',
  description: 'آموزش کامل React Hooks: useRef، useCallback و useMemo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{fontFamily: "'Vazirmatn', sans-serif"}}>
        <div className="min-h-screen">
          <nav className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/30 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center space-x-4 space-x-reverse">
                 
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-600">
                    React Hooks Tutorial
                  </h1>
                </div>
                <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                  <a href="/" className="group relative px-6 py-3 text-gray-700 hover:text-blue-600 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:-translate-y-1">
                    <span className="relative z-10">🏠 خانه</span>
                  </a>
                  <a href="/useRef" className="group relative px-6 py-3 text-gray-700 hover:text-blue-600 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:-translate-y-1">
                    <span className="relative z-10">🎯 useRef</span>
                  </a>
                  <a href="/useCallback" className="group relative px-6 py-3 text-gray-700 hover:text-green-600 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-lg hover:-translate-y-1">
                    <span className="relative z-10">⚡ useCallback</span>
                  </a>
                  <a href="/useMemo" className="group relative px-6 py-3 text-gray-700 hover:text-purple-600 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:shadow-lg hover:-translate-y-1">
                    <span className="relative z-10">🧠 useMemo</span>
                  </a>
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
