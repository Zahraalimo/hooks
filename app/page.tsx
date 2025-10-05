import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative text-center py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-b-2xl"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        <div className="relative z-10">
         
          
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6 leading-tight rounded-full">
            آموزش 
            <br />
            <span className="text-5xl">React Hooks</span>
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-blue-600">useRef</span>، 
            <span className="font-bold text-purple-600"> useCallback</span> و 
            <span className="font-bold text-indigo-600"> useMemo</span> 
           
          </p>
          
         
        </div>
      </div>

      {/* Hooks Overview */}
      <div id="hooks" className="grid md:grid-cols-3 gap-8">
        {/* useRef Card */}
        <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-8">
            <div className="text-center">
             
              <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">useRef</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                برای دسترسی مستقیم به DOM elements و ذخیره مقادیر بدون re-render
              </p>
              <div className="space-y-3 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>دسترسی به DOM elements</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>ذخیره مقادیر mutable</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>جلوگیری از re-render</span>
                </div>
              </div>
              <Link 
                href="/useRef" 
                className="group/btn relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">یادگیری useRef</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* useCallback Card */}
        <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-8">
            <div className="text-center">
              
              <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">useCallback</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                برای بهینه‌سازی performance با memoization functions
              </p>
              <div className="space-y-3 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>جلوگیری از re-creation functions</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>بهینه‌سازی performance</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>کار با React.memo</span>
                </div>
              </div>
              <Link 
                href="/useCallback" 
                className="group/btn relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">یادگیری useCallback</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* useMemo Card */}
        <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-8">
            <div className="text-center">
            
              <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">useMemo</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                برای بهینه‌سازی performance با memoization values
              </p>
              <div className="space-y-3 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>محاسبه مقادیر پیچیده</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>جلوگیری از re-computation</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>بهینه‌سازی rendering</span>
                </div>
              </div>
              <Link 
                href="/useMemo" 
                className="group/btn relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">یادگیری useMemo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">📊 مقایسه کامل</h2>
          <p className="text-lg text-gray-600">مقایسه useMemo، useCallback، useRef و مفهوم Memorization</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl font-bold">📊</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">مقایسه React Hooks</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              مقایسه کامل useMemo، useCallback، useRef و مفهوم Memorization با مثال‌های عملی و بهترین روش‌ها
            </p>
            <Link 
              href="/comparison" 
              className="group/btn relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">مشاهده مقایسه کامل</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    
    </div>
  )
}
