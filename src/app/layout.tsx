import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LDM — Lead Dashboard',
  description: 'Lead Management System built with Clean Architecture',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen antialiased">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">LDM</span>
            <span className="text-gray-400 text-sm ml-1">Lead Dashboard</span>
          </div>
          <a href="/leads/new" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            + Add Lead
          </a>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
