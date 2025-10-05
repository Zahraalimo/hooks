'use client'

import { useCallback, useState, memo, useMemo } from 'react'

// Child component for demonstration
const ExpensiveChild = memo(({ onClick, data }: { onClick: () => void, data: string }) => {
  console.log('ExpensiveChild rendered!')
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 space-x-reverse mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">✅</span>
        </div>
        <h3 className="font-bold text-green-800 text-lg">Child Component (با Memo)</h3>
      </div>
      <p className="text-green-700 mb-4 text-sm">Data: <span className="font-bold bg-green-100 px-2 py-1 rounded-lg">{data}</span></p>
      <button 
        onClick={onClick} 
        className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        🎯 Click Me
      </button>
    </div>
  )
})

const ExpensiveChildWithoutMemo = ({ onClick, data }: { onClick: () => void, data: string }) => {
  console.log('ExpensiveChildWithoutMemo rendered!')
  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 space-x-reverse mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">❌</span>
        </div>
        <h3 className="font-bold text-red-800 text-lg">Child Component (بدون Memo)</h3>
      </div>
      <p className="text-red-700 mb-4 text-sm">Data: <span className="font-bold bg-red-100 px-2 py-1 rounded-lg">{data}</span></p>
      <button 
        onClick={onClick} 
        className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        🎯 Click Me
      </button>
    </div>
  )
}

export default function UseCallbackPage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3'])
  const [searchTerm, setSearchTerm] = useState('')

  // Without useCallback - function recreated on every render
  const handleClickWithoutCallback = () => {
    console.log('Button clicked!')
    setCount(prev => prev + 1)
  }

  // With useCallback - function memoized
  const handleClickWithCallback = useCallback(() => {
    console.log('Button clicked!')
    setCount(prev => prev + 1)
  }, []) // Empty dependency array

  // useCallback with dependencies
  const handleClickWithDependency = useCallback(() => {
    console.log(`Button clicked! Count is ${count}`)
  }, [count])

  // Complex function that should be memoized
  const addItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }, [])

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  // Filtered items with useMemo (for comparison)
  const filteredItems = useMemo(() => {
    console.log('Filtering items...')
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [items, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-2xl mb-8">
            <span className="text-white text-3xl font-bold">⚡</span>
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-green-600 mb-6">
            useCallback
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            یک React Hook که به شما امکان می‌دهد function را در component خود cache کنید و performance را بهبود بخشید.
          </p>
        </div>


        {/* Examples Cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💡 مثال‌های عملی</h2>
            <p className="text-lg text-gray-600">مثال‌های تعاملی برای یادگیری useCallback</p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Basic Comparison */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">مقایسه Performance</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  مقایسه functions با و بدون useCallback
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={handleClickWithoutCallback}
                    className="px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    بدون useCallback ({count})
                  </button>
                  <button 
                    onClick={handleClickWithCallback}
                    className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    با useCallback ({count})
                  </button>
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
                <pre className="text-green-400 font-mono text-xs overflow-x-auto">
{`// بدون useCallback - در هر render دوباره ایجاد می‌شود
const handleClick = () => {
  setCount(prev => prev + 1)
}

// با useCallback - فقط یک بار ایجاد می‌شود
const handleClick = useCallback(() => {
  setCount(prev => prev + 1)
}, [])`}
                </pre>
              </div>
            </div>

            {/* Card 2: Dependencies */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🔗</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">useCallback با Dependencies</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  وقتی function به متغیرهای component وابسته است
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-3">Count: {count}</div>
                  <button 
                    onClick={() => setCount(prev => prev + 1)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
                  >
                    افزایش Count
                  </button>
                  <button 
                    onClick={handleClickWithDependency}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Log Count (console را باز کنید)
                  </button>
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
                <pre className="text-green-400 font-mono text-xs overflow-x-auto">
{`const [count, setCount] = useState(0)

// Function فقط زمانی دوباره ایجاد می‌شود که count تغییر کند
const handleClickWithDependency = useCallback(() => {
  console.log(\`Button clicked! Count is \${count}\`)
}, [count])`}
                </pre>
              </div>
            </div>

            {/* Card 3: React.memo */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🎭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">useCallback با React.memo</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  جلوگیری از re-render غیرضروری child components
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="نام خود را وارد کنید..."
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <span className="text-blue-600 text-lg">ℹ️</span>
                    <div>
                      <p className="text-blue-800 text-xs">
                        component سمت چپ (با memo) فقط زمانی render می‌شود که props تغییر کنند. 
                        component سمت راست (بدون memo) در هر تغییر name دوباره render می‌شود.
                        console را باز کنید!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                مشاهده کد
              </button>
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
              <ExpensiveChild 
                onClick={handleClickWithCallback} 
                data={name || 'No name'} 
              />
              <ExpensiveChildWithoutMemo 
                onClick={handleClickWithCallback} 
                data={name || 'No name'} 
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
              <pre className="text-green-400 font-mono text-sm overflow-x-auto leading-relaxed">
{`// Child component با React.memo
const ExpensiveChild = memo(({ onClick, data }) => {
  console.log('ExpensiveChild rendered!')
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
    <ExpensiveChild onClick={handleClick} data={name} />
  )
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* When to use useCallback */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">❓ چه زمانی از useCallback استفاده کنیم؟</h2>
            <p className="text-lg text-gray-600">راهنمای کامل استفاده صحیح از useCallback</p>
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
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">❌</div>
                <h3 className="text-2xl font-bold text-red-800">موارد استفاده نادرست</h3>
              </div>
              <ul className="space-y-4 text-red-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">برای همه functions (over-optimization)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی function ساده است و dependencies ندارد</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی child component از React.memo استفاده نمی‌کند</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی function در هر render تغییر می‌کند</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 best practices</h2>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">React.memo Integration</h3>
                <p className="text-gray-600 text-sm">با React.memo استفاده کنید تا از re-render جلوگیری کنید</p>
              </div>
              
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">⚡</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Optimization</h3>
                <p className="text-gray-600 text-sm">برای functions پیچیده و expensive استفاده کنید</p>
              </div>
              
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">🔗</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Dependency Management</h3>
                <p className="text-gray-600 text-sm">dependencies را به درستی تعریف کنید</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}