'use client'

import { useRef, useState, useEffect } from 'react'

export default function UseRefPage() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [timer, setTimer] = useState(0)
  
  // useRef examples
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousValueRef = useRef<string>('')

  // Example 1: Focus on input
  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Example 2: Store previous value
  useEffect(() => {
    previousValueRef.current = inputValue
  }, [inputValue])

  // Example 3: Timer with useRef
  const startTimer = () => {
    if (intervalRef.current) return
    
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const resetTimer = () => {
    stopTimer()
    setTimer(0)
  }

  // Example 4: Mutable value without re-render
  const updateCountRef = () => {
    countRef.current += 1
    console.log('countRef.current:', countRef.current)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
        
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-600 mb-6">
            useRef
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            یک React Hook که به شما امکان دسترسی مستقیم به DOM elements و ذخیره مقادیر mutable بدون ایجاد re-render را می‌دهد.
          </p>
        </div>


        {/* Examples Cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💡 مثال‌های عملی</h2>
            <p className="text-lg text-gray-600">مثال‌های تعاملی برای یادگیری useRef</p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: DOM Manipulation */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">دسترسی به DOM Element</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  استفاده از useRef برای focus کردن روی input field
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="متن خود را وارد کنید..."
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button 
                  onClick={focusInput}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🎯 Focus روی Input
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs font-mono">code</span>
                </div>
                <pre className="text-green-400 font-mono text-xs overflow-x-auto text-left">
{`const inputRef = useRef<HTMLInputElement>(null)

const focusInput = () => {
  inputRef.current?.focus()
}`}
                </pre>
              </div>
            </div>

            {/* Card 2: Store Previous Value */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">📝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">ذخیره مقدار قبلی</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  استفاده از useRef برای ذخیره مقدار قبلی بدون ایجاد re-render
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="مقدار جدید را وارد کنید..."
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-green-500 text-sm"
                />
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">مقدار فعلی:</span>
                    <span className="font-bold text-green-600">{inputValue || 'خالی'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">مقدار قبلی:</span>
                    <span className="font-bold text-blue-600">{previousValueRef.current || 'خالی'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs font-mono">code</span>
                </div>
                <pre className="text-green-400 font-mono text-xs overflow-x-auto text-left">
{`const [inputValue, setInputValue] = useState('')
const previousValueRef = useRef<string>('')

useEffect(() => {
  previousValueRef.current = inputValue
}, [inputValue])`}
                </pre>
              </div>
            </div>

            {/* Card 3: Timer */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">⏱️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Timer با useRef</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  استفاده از useRef برای ذخیره interval ID و کنترل timer
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-3">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="flex space-x-2 space-x-reverse justify-center">
                    <button 
                      onClick={startTimer} 
                      className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      شروع
                    </button>
                    <button 
                      onClick={stopTimer} 
                      className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      توقف
                    </button>
                    <button 
                      onClick={resetTimer} 
                      className="px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      ریست
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs font-mono">code</span>
                </div>
                <pre className="text-green-400 font-mono text-xs overflow-x-auto text-left">
{`const [timer, setTimer] = useState(0)
const intervalRef = useRef<NodeJS.Timeout | null>(null)

const startTimer = () => {
  if (intervalRef.current) return
  
  intervalRef.current = setInterval(() => {
    setTimer(prev => prev + 1)
  }, 1000)
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Example */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🚀 مثال پیشرفته</h2>
            <p className="text-lg text-gray-600">مقدار Mutable بدون Re-render</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">مثال ۴: مقدار Mutable بدون Re-render</h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                استفاده از useRef برای ذخیره مقادیری که نیاز به re-render ندارند
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
                <button 
                  onClick={() => setCount(count + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  افزایش State ({count})
                </button>
                <button 
                  onClick={updateCountRef}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  افزایش Ref
                </button>
              </div>
                <p className="text-sm text-gray-600 text-center">
                  <strong>نکته:</strong> تغییر countRef باعث re-render نمی‌شود. 
                  مقدار آن را در console ببینید.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">MutableValue.js</span>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto leading-relaxed text-left">
{`const [count, setCount] = useState(0)
const countRef = useRef<number>(0)

const updateCountRef = () => {
  countRef.current += 1
  console.log('countRef.current:', countRef.current)
  // این تغییر باعث re-render نمی‌شود!
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🎯 نکات مهم useRef</h2>
            <p className="text-lg text-gray-600">راهنمای کامل استفاده صحیح از useRef</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">✅</div>
                <h3 className="text-2xl font-bold text-green-800">موارد استفاده صحیح</h3>
              </div>
              <ul className="space-y-4 text-green-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">دسترسی به DOM elements (focus، scroll، اندازه‌گیری)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ذخیره مقادیر mutable بدون re-render</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ذخیره previous values برای مقایسه</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ذخیره timers و intervals</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">❌</div>
                <h3 className="text-2xl font-bold text-red-800">اشتباهات رایج</h3>
              </div>
              <ul className="space-y-4 text-red-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">استفاده از useRef برای state که نیاز به re-render دارد</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">دسترسی به ref.current قبل از mount شدن component</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">استفاده از useRef به جای useState برای نمایش در UI</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">فراموش کردن پاک کردن timers در cleanup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 best practices</h2>
            <p className="text-lg text-gray-600">راهنمای استفاده بهینه از useRef</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">DOM Manipulation</h3>
                <p className="text-gray-600 text-sm">برای focus، scroll، و دسترسی مستقیم به elements استفاده کنید</p>
              </div>
              
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">💾</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Mutable Values</h3>
                <p className="text-gray-600 text-sm">برای ذخیره مقادیری که نیاز به re-render ندارند</p>
              </div>
              
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">⏱️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Timer Management</h3>
                <p className="text-gray-600 text-sm">برای ذخیره و مدیریت timers و intervals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  )
}