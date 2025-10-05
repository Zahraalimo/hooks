'use client'

import React, { useMemo, useCallback, useRef, useState, memo, useEffect } from 'react'

// Product data
const initialProducts = [
  { id: 1, name: "Laptop", price: 2000 },
  { id: 2, name: "Phone", price: 1000 },
  { id: 3, name: "Tablet", price: 1500 },
  { id: 4, name: "Headphones", price: 300 },
  { id: 5, name: "Mouse", price: 50 },
  { id: 6, name: "Keyboard", price: 100 },
]

// Product Item Component
const ProductItem = memo(({ product, onBuy }: { product: any; onBuy: (id: number) => void }) => {
  console.log("رندر محصول:", product.name)
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-gray-800">{product.name}</h4>
          <p className="text-green-600 font-bold">${product.price}</p>
        </div>
        <button 
          onClick={() => onBuy(product.id)} 
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          خرید
        </button>
      </div>
    </div>
  )
})

// Product Page Demo Component
const ProductPageDemo = () => {
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<number[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus on input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // useMemo → Filter products (expensive calculation)
  const filteredProducts = useMemo(() => {
    console.log("محاسبه دوباره لیست محصولات...")
    return initialProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  // useCallback → Buy function (memoized function)
  const handleBuy = useCallback((id: number) => {
    setCart((prev) => [...prev, id])
  }, [])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🛍️ فروشگاه آنلاین</h3>
      
      {/* useRef → Control input */}
      <input
        ref={inputRef}
        type="text"
        placeholder="جستجو در محصولات..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 mb-6"
      />

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3">محصولات ({filteredProducts.length}):</h4>
        <div className="max-h-64 overflow-y-auto">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} onBuy={handleBuy} />
          ))}
        </div>
      </div>

      <div className="bg-green-100 rounded-xl p-4">
        <h4 className="font-bold text-green-800">🛒 سبد خرید: {cart.length} کالا</h4>
        <p className="text-green-700 text-sm">محصولات انتخاب شده: {cart.join(', ')}</p>
      </div>
    </div>
  )
}

// Child component for demonstration
const MemoizedChild = memo(({ data, onAction }: { data: string, onAction: () => void }) => {
  console.log('MemoizedChild rendered!')
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 space-x-reverse mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🧠</span>
        </div>
        <h3 className="font-bold text-blue-800 text-lg">Memoized Child</h3>
      </div>
      <p className="text-blue-700 mb-4 text-sm">Data: <span className="font-bold bg-blue-100 px-2 py-1 rounded-lg">{data}</span></p>
      <button 
        onClick={onAction} 
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        🎯 Action
      </button>
    </div>
  )
})

export default function ComparisonPage() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5])
  const [searchTerm, setSearchTerm] = useState('')
  const [name, setName] = useState('')

  // useRef examples
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<number>(0)
  const previousValueRef = useRef<string>('')

  // useMemo examples
  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation...')
    let result = 0
    for (let i = 0; i < 100000; i++) {
      result += count * i
    }
    return result
  }, [count])

  const filteredItems = useMemo(() => {
    console.log('Filtering items...')
    return items.filter(item => item.toString().includes(searchTerm))
  }, [items, searchTerm])

  // useCallback examples
  const handleClick = useCallback(() => {
    console.log('Button clicked!')
    setCount(prev => prev + 1)
  }, [])

  const addItem = useCallback(() => {
    setItems(prev => [...prev, Math.floor(Math.random() * 100) + 1])
  }, [])

  // useRef functions
  const focusInput = () => {
    inputRef.current?.focus()
  }

  const updateCountRef = () => {
    countRef.current += 1
    console.log('countRef.current:', countRef.current)
  }

  // Update previous value
  React.useEffect(() => {
    previousValueRef.current = name
  }, [name])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-indigo-600 mb-6">
            مقایسه React Hooks
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            مقایسه کامل useMemo، useCallback، useRef و مفهوم Memorization در React
          </p>
        </div>

        {/* Overview Table */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">📊 جدول مقایسه</h2>
            <p className="text-lg text-gray-600">مقایسه کلی سه hook مهم React</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-right p-4 font-bold text-gray-800">نام Hook</th>
                  <th className="text-right p-4 font-bold text-gray-800">تعریف</th>
                  <th className="text-right p-4 font-bold text-gray-800">کاربرد اصلی</th>
                  <th className="text-right p-4 font-bold text-gray-800">چه چیزی ذخیره می‌کند</th>
                  <th className="text-right p-4 font-bold text-gray-800">چه وقت دوباره‌سازی می‌شود</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-bold text-purple-600">useMemo</td>
                  <td className="p-4 text-gray-700">ذخیره نتیجه محاسبه</td>
                  <td className="p-4 text-gray-700">بهینه‌سازی محاسبات سنگین</td>
                  <td className="p-4 text-gray-700">مقدار (value)</td>
                  <td className="p-4 text-gray-700">وقتی وابستگی‌ها تغییر کنند</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-bold text-green-600">useCallback</td>
                  <td className="p-4 text-gray-700">ذخیره تعریف تابع</td>
                  <td className="p-4 text-gray-700">جلوگیری از ساخت تابع جدید</td>
                  <td className="p-4 text-gray-700">تابع</td>
                  <td className="p-4 text-gray-700">وقتی وابستگی‌ها تغییر کنند</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-bold text-blue-600">useRef</td>
                  <td className="p-4 text-gray-700">نگه‌داری شیء ثابت</td>
                  <td className="p-4 text-gray-700">دسترسی به DOM یا ذخیره مقادیر</td>
                  <td className="p-4 text-gray-700">شیء با .current</td>
                  <td className="p-4 text-gray-700">تغییرش باعث رندر نمی‌شود</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-indigo-600">Memorization</td>
                  <td className="p-4 text-gray-700">الگوی کلی ذخیره‌سازی</td>
                  <td className="p-4 text-gray-700">بهبود performance</td>
                  <td className="p-4 text-gray-700">هر نوع داده</td>
                  <td className="p-4 text-gray-700">بستگی به ابزار</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Examples */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💡 مثال‌های عملی</h2>
            <p className="text-lg text-gray-600">مثال‌های تعاملی برای درک بهتر هر hook</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* useMemo Example */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">useMemo</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ذخیره نتیجه محاسبات expensive
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-3">Count: {count}</div>
                  <button 
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    افزایش Count
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-gray-600 text-sm mb-1">محاسبه Expensive</div>
                  <div className="text-gray-800 font-bold text-sm">{expensiveCalculation.toLocaleString()}</div>
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
{`const expensiveCalculation = useMemo(() => {
  console.log('Performing expensive calculation...')
  let result = 0
  for (let i = 0; i < 100000; i++) {
    result += count * i
  }
  return result
}, [count])`}
                </pre>
              </div>
            </div>

            {/* useCallback Example */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">useCallback</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ذخیره function برای جلوگیری از re-creation
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <button 
                  onClick={handleClick}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Memoized Function ({count})
                </button>
                
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-gray-600 text-sm mb-1">Function Memoized</div>
                  <div className="text-gray-800 font-bold text-sm">✅ Cached</div>
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
{`const handleClick = useCallback(() => {
  console.log('Button clicked!')
  setCount(prev => prev + 1)
}, [])`}
                </pre>
              </div>
            </div>

            {/* useRef Example */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">useRef</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  دسترسی به DOM و ذخیره مقادیر mutable
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
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Focus Input
                </button>
                <button 
                  onClick={updateCountRef}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Update Ref (console)
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
const countRef = useRef<number>(0)

const focusInput = () => {
  inputRef.current?.focus()
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* React.memo Demo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🎭 نمایش React.memo</h2>
            <p className="text-lg text-gray-600">مقایسه component با و بدون React.memo</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <MemoizedChild 
                onAction={handleClick} 
                data={name || 'No name'} 
              />
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">❌</span>
                  </div>
                  <h3 className="font-bold text-red-800 text-lg">بدون Memo</h3>
                </div>
                <p className="text-red-700 mb-4 text-sm">Data: <span className="font-bold bg-red-100 px-2 py-1 rounded-lg">{name || 'No name'}</span></p>
                <button 
                  onClick={handleClick} 
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  🎯 Action
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام خود را وارد کنید..."
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">ParentComponent.js</span>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto leading-relaxed text-left">
{`// Child component با React.memo
const MemoizedChild = memo(({ data, onAction }) => {
  console.log('MemoizedChild rendered!')
  return <div>...</div>
})

// Parent component
const ParentComponent = () => {
  const [name, setName] = useState('')
  
  // Function memoized با useCallback
  const handleClick = useCallback(() => {
    console.log('Button clicked!')
  }, [])
  
  return (
    <MemoizedChild onAction={handleClick} data={name} />
  )
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* When to Use Each Hook */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">❓ چه زمانی از هر hook استفاده کنیم؟</h2>
            <p className="text-lg text-gray-600">راهنمای کامل استفاده صحیح از هر hook</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* useMemo */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">🧠</div>
                <h3 className="text-2xl font-bold text-purple-800">useMemo</h3>
              </div>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">محاسبات expensive و پیچیده</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">فیلتر کردن و جستجو در آرایه‌های بزرگ</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ایجاد objects یا arrays جدید برای props</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">محاسبه statistics و aggregations</span>
                </li>
              </ul>
            </div>

            {/* useCallback */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">⚡</div>
                <h3 className="text-2xl font-bold text-green-800">useCallback</h3>
              </div>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی function را به child component با React.memo پاس می‌دهید</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی function در dependency array سایر hooks استفاده می‌شود</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی function پیچیده و expensive است</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی می‌خواهید از re-render غیرضروری جلوگیری کنید</span>
                </li>
              </ul>
            </div>

            {/* useRef */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">🎯</div>
                <h3 className="text-2xl font-bold text-blue-800">useRef</h3>
              </div>
              <ul className="space-y-3 text-blue-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">دسترسی به DOM elements (focus، scroll، اندازه‌گیری)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ذخیره مقادیر mutable بدون re-render</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ذخیره previous values برای مقایسه</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ذخیره timers و intervals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real World Scenario */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🛒 سناریوی واقعی</h2>
            <p className="text-lg text-gray-600">لیست محصولات با جستجو و دکمه خرید - استفاده از همه چهار مفهوم</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Interactive Demo */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🎮 نمایش تعاملی</h3>
                <ProductPageDemo />
              </div>
              
              {/* Architecture Diagram */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🏗️ معماری و جریان داده</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <div className="space-y-4">
                    {/* Search Flow */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">search</div>
                      <div className="text-gray-600">→</div>
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">useMemo</div>
                      <div className="text-gray-600">→</div>
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">filtered</div>
                    </div>
                    
                    {/* Cart Flow */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">cart</div>
                      <div className="text-gray-600">→</div>
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">useCallback</div>
                      <div className="text-gray-600">→</div>
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">onBuy</div>
                    </div>
                    
                    {/* Ref Flow */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">useRef</div>
                      <div className="text-gray-600">→</div>
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">inputRef</div>
                      <div className="text-gray-600">→</div>
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">focus()</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/80 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3">📊 ارتباط با Memorization</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span><strong>useMemo</strong> → memorization value</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        <span><strong>useCallback</strong> → memorization function</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span><strong>useRef</strong> → memorization reference (بدون رندر)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 بهترین روش‌ها</h2>
            <p className="text-lg text-gray-600">راهنمای استفاده بهینه از React hooks</p>
          </div>
          
          <div className="space-y-8">
            {/* Performance Optimization */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">🔑 نکته مهم از داکیومنت</h3>
              <p className="text-indigo-700 mb-6 leading-relaxed">
                استفاده از useMemo و useCallback فقط وقتی مفید است که واقعاً باعث بهبود عملکرد شود.
                همیشه اول کد ساده بنویس، بعد اگر دیدی کند است از این ابزارها استفاده کن.
              </p>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-mono">نکته مهم</span>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto text-left">
{`// ❌ استفاده نادرست - محاسبه ساده
const simpleValue = useMemo(() => {
  return count + 1
}, [count])

// ✅ استفاده صحیح - محاسبه پیچیده
const complexResult = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// ❌ استفاده نادرست - function ساده
const simpleHandler = useCallback(() => {
  setCount(count + 1)
}, [count])

// ✅ استفاده صحیح - function پیچیده
const complexHandler = useCallback(() => {
  performComplexOperation(data)
}, [data])`}
                </pre>
              </div>
              
              <div className="bg-indigo-100 rounded-xl p-4">
                <p className="text-indigo-800 font-medium">
                  💡 <strong>نکته:</strong> اگر محاسبه کمتر از 1ms طول بکشد، استفاده از useMemo ممکن است overhead بیشتری داشته باشد.
                </p>
              </div>
            </div>

            {/* Memorization Concept */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">🧠 مفهوم Memorization</h3>
              <p className="text-purple-700 mb-6 leading-relaxed">
                memorization یک الگوی بهینه‌سازی است که باعث می‌شود یک تابع یا مقدار محاسباتی،
                نتیجه‌اش را به یاد بسپارد و فقط وقتی ورودی تغییر کند دوباره محاسبه شود.
                در ری‌اکت این مفهوم با useMemo و useCallback پیاده‌سازی می‌شود.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-purple-800 mb-3">useMemo - Memorization مقادیر</h4>
                  <pre className="text-purple-700 font-mono text-xs overflow-x-auto">
{`const memoizedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])`}
                  </pre>
                </div>
                
                <div className="bg-white/80 rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-purple-800 mb-3">useCallback - Memorization توابع</h4>
                  <pre className="text-purple-700 font-mono text-xs overflow-x-auto">
{`const memoizedFunction = useCallback(() => {
  return performAction(data)
}, [data])`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
