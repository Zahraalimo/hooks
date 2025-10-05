'use client'

import { useMemo, useState, memo } from 'react'

// Expensive calculation function
const expensiveCalculation = (num: number): number => {
  console.log('Performing expensive calculation...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += num * i
  }
  return result
}

// Child component for demonstration
const ExpensiveChild = memo(({ data, multiplier }: { data: number[], multiplier: number }) => {
  console.log('ExpensiveChild rendered!')
  
  const processedData = useMemo(() => {
    console.log('Processing data in child...')
    return data.map(item => item * multiplier).filter(item => item > 10)
  }, [data, multiplier])
  
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 space-x-reverse mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🧠</span>
        </div>
        <h3 className="font-semibold text-yellow-800 text-lg">Child Component</h3>
      </div>
      <p className="text-yellow-700 mb-2 text-sm">Processed items: <span className="font-bold bg-yellow-100 px-2 py-1 rounded-lg">{processedData.length}</span></p>
      <div className="text-sm text-yellow-600 bg-yellow-100 rounded-lg p-2">
        {processedData.slice(0, 5).join(', ')}
        {processedData.length > 5 && '...'}
      </div>
    </div>
  )
})

export default function UseMemoPage() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(2)
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([
    { id: 1, name: 'علی', age: 25, city: 'تهران' },
    { id: 2, name: 'فاطمه', age: 30, city: 'اصفهان' },
    { id: 3, name: 'محمد', age: 22, city: 'شیراز' },
    { id: 4, name: 'زهرا', age: 28, city: 'تهران' },
    { id: 5, name: 'حسن', age: 35, city: 'مشهد' },
  ])

  // Without useMemo - calculation runs on every render
  const expensiveValueWithoutMemo = expensiveCalculation(count)

  // With useMemo - calculation only runs when count changes
  const expensiveValueWithMemo = useMemo(() => {
    return expensiveCalculation(count)
  }, [count])

  // Complex data processing
  const processedItems = useMemo(() => {
    console.log('Processing items...')
    return items
      .map(item => item * multiplier)
      .filter(item => item > 10)
      .sort((a, b) => b - a)
  }, [items, multiplier])

  // Filtered users
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...')
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  // Statistics
  const userStats = useMemo(() => {
    console.log('Calculating user stats...')
    const totalUsers = users.length
    const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers
    const cities = Array.from(new Set(users.map(user => user.city)))
    
    return {
      totalUsers,
      averageAge: Math.round(averageAge),
      cities: cities.length,
      oldestUser: users.reduce((oldest, user) => user.age > oldest.age ? user : oldest),
      youngestUser: users.reduce((youngest, user) => user.age < youngest.age ? user : youngest)
    }
  }, [users])

  // Add new item
  const addItem = () => {
    const newItem = Math.floor(Math.random() * 100) + 1
    setItems(prev => [...prev, newItem])
  }

  // Add new user
  const addUser = () => {
    const names = ['احمد', 'مریم', 'علی', 'نرگس', 'حسین']
    const cities = ['تهران', 'اصفهان', 'شیراز', 'مشهد', 'تبریز']
    const newUser = {
      id: users.length + 1,
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 30) + 20,
      city: cities[Math.floor(Math.random() * cities.length)]
    }
    setUsers(prev => [...prev, newUser])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-purple-600 mb-6">
            useMemo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            یک React Hook که به شما امکان می‌دهد نتیجه محاسبات expensive را cache کنید و performance را بهبود بخشید.
          </p>
        </div>


        {/* Examples Cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💡 مثال‌های عملی</h2>
            <p className="text-lg text-gray-600">مثال‌های تعاملی برای یادگیری useMemo</p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Basic Comparison */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">مقایسه Performance</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  مقایسه محاسبات با و بدون useMemo برای درک بهتر عملکرد
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <button 
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Count: {count}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-center">
                    <div className="text-red-600 font-bold text-sm mb-1">بدون useMemo</div>
                    <div className="text-red-800 font-bold text-xs">{expensiveValueWithoutMemo}</div>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-center">
                    <div className="text-green-600 font-bold text-sm mb-1">با useMemo</div>
                    <div className="text-green-800 font-bold text-xs">{expensiveValueWithMemo}</div>
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
{`// بدون useMemo - در هر render اجرا می‌شود
const expensiveValue = expensiveCalculation(count)

// با useMemo - فقط زمانی که count تغییر کند
const expensiveValue = useMemo(() => {
  return expensiveCalculation(count)
}, [count])`}
                </pre>
              </div>
            </div>

            {/* Card 2: Data Processing */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">پردازش داده‌ها</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  استفاده از useMemo برای پردازش آرایه‌ها و فیلتر کردن
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <button 
                    onClick={addItem} 
                    className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    افزودن
                  </button>
                  <button 
                    onClick={() => setMultiplier(multiplier + 1)}
                    className="px-3 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 font-bold rounded-lg text-sm"
                  >
                    ×{multiplier}
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-gray-600 text-sm mb-1">آیتم‌های پردازش شده</div>
                  <div className="text-gray-800 font-bold text-sm">{processedItems.length} آیتم</div>
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
{`const processedItems = useMemo(() => {
  console.log('Processing items...')
  return items
    .map(item => item * multiplier)
    .filter(item => item > 10)
    .sort((a, b) => b - a)
}, [items, multiplier])`}
                </pre>
              </div>
            </div>

            {/* Card 3: Search & Filter */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">جستجو و فیلتر</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  جستجو در آرایه‌های پیچیده با استفاده از useMemo
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-gray-600 text-sm mb-1">نتایج جستجو</div>
                  <div className="text-gray-800 font-bold text-sm">{filteredUsers.length} کاربر</div>
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
{`const filteredUsers = useMemo(() => {
  console.log('Filtering users...')
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.city.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [users, searchTerm])`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Examples */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🚀 مثال‌های پیشرفته</h2>
            <p className="text-lg text-gray-600">مثال‌های پیچیده‌تر برای درک بهتر useMemo</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* User Statistics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">📈</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">آمار کاربران</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  محاسبه آمار پیچیده با استفاده از useMemo
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <button 
                  onClick={addUser}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  افزودن کاربر جدید
                </button>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">تعداد کل کاربران:</span>
                    <span className="font-bold text-indigo-600">{userStats.totalUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">میانگین سن:</span>
                    <span className="font-bold text-purple-600">{userStats.averageAge} سال</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">تعداد شهرها:</span>
                    <span className="font-bold text-blue-600">{userStats.cities}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">مسن‌ترین:</span>
                    <span className="font-bold text-green-600">{userStats.oldestUser.name} ({userStats.oldestUser.age})</span>
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
{`const userStats = useMemo(() => {
  console.log('Calculating user stats...')
  const totalUsers = users.length
  const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers
  const cities = Array.from(new Set(users.map(user => user.city)))
  
  return {
    totalUsers,
    averageAge: Math.round(averageAge),
    cities: cities.length,
    oldestUser: users.reduce((oldest, user) => user.age > oldest.age ? user : oldest),
    youngestUser: users.reduce((youngest, user) => user.age < youngest.age ? user : youngest)
  }
}, [users])`}
                </pre>
              </div>
            </div>

            {/* Child Component with Memo */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">🎭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Child Component</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  استفاده از useMemo در child component با React.memo
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <button 
                    onClick={addItem} 
                    className="px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    افزودن آیتم
                  </button>
                  <button 
                    onClick={() => setMultiplier(multiplier + 1)}
                    className="px-3 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 font-bold rounded-lg text-sm"
                  >
                    ×{multiplier}
                  </button>
                </div>
                
                <ExpensiveChild data={items} multiplier={multiplier} />
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
{`const ExpensiveChild = memo(({ data, multiplier }) => {
  const processedData = useMemo(() => {
    console.log('Processing data in child...')
    return data.map(item => item * multiplier).filter(item => item > 10)
  }, [data, multiplier])
  
  return <div>...</div>
})`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* When to use useMemo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">❓ چه زمانی از useMemo استفاده کنیم؟</h2>
            <p className="text-lg text-gray-600">راهنمای کامل استفاده صحیح از useMemo</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">✅</div>
                <h3 className="text-2xl font-bold text-green-800">موارد استفاده صحیح</h3>
              </div>
              <ul className="space-y-4 text-green-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">محاسبات expensive و پیچیده</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">فیلتر کردن و جستجو در آرایه‌های بزرگ</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">ایجاد objects یا arrays جدید برای props</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">محاسبه statistics و aggregations</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">جلوگیری از re-render child components</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">❌</div>
                <h3 className="text-2xl font-bold text-red-800">موارد استفاده نادرست</h3>
              </div>
              <ul className="space-y-4 text-red-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">محاسبات ساده و سریع</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">مقادیر primitive (string, number, boolean)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">وقتی dependencies در هر render تغییر می‌کنند</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span className="font-medium">over-optimization بدون نیاز واقعی</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 بهترین روش‌ها و نحوه استفاده</h2>
            <p className="text-lg text-gray-600">راهنمای کامل استفاده صحیح از useMemo در پروژه‌های React</p>
          </div>
          
          <div className="space-y-8">
            {/* Performance Optimization */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">بهینه‌سازی عملکرد (Performance Optimization)</h3>
              <p className="text-purple-700 mb-6 leading-relaxed">
                از useMemo برای محاسبات expensive و پیچیده استفاده کنید. این hook نتیجه محاسبات را cache می‌کند و فقط زمانی که dependencies تغییر کنند، محاسبه را دوباره انجام می‌دهد.
              </p>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-mono">مثال کاربردی</span>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto text-left">
{`// محاسبه expensive
const expensiveCalculation = (data) => {
  console.log('محاسبه در حال انجام...')
  return data.reduce((sum, item) => {
    // محاسبات پیچیده
    for (let i = 0; i < 1000000; i++) {
      sum += item.value * Math.sqrt(i)
    }
    return sum
  }, 0)
}

// استفاده از useMemo
const processedData = useMemo(() => {
  return expensiveCalculation(rawData)
}, [rawData]) // فقط زمانی که rawData تغییر کند`}
                </pre>
              </div>
              
              <div className="bg-purple-100 rounded-xl p-4">
                <p className="text-purple-800 font-medium">
                  💡 <strong>نکته مهم:</strong> اگر محاسبه کمتر از 1ms طول بکشد، استفاده از useMemo ممکن است overhead بیشتری داشته باشد.
                </p>
              </div>
            </div>

            {/* Targeted Usage */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-green-800 mb-4">استفاده هدفمند (Targeted Usage)</h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                useMemo را فقط زمانی استفاده کنید که واقعاً نیاز دارید. برای مقادیر primitive (string, number, boolean) یا محاسبات ساده، استفاده از useMemo ضروری نیست و ممکن است performance را بدتر کند.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <h4 className="font-bold text-red-800 mb-2">❌ استفاده نادرست</h4>
                  <pre className="text-red-700 font-mono text-xs overflow-x-auto">
{`// غیرضروری - محاسبه ساده
const simpleValue = useMemo(() => {
  return count + 1
}, [count])

// غیرضروری - primitive value
const userName = useMemo(() => {
  return user.name
}, [user])`}
                  </pre>
                </div>
                
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <h4 className="font-bold text-green-800 mb-2">✅ استفاده صحیح</h4>
                  <pre className="text-green-700 font-mono text-xs overflow-x-auto">
{`// ساده و مستقیم
const simpleValue = count + 1
const userName = user.name

// فقط برای محاسبات پیچیده
const complexResult = useMemo(() => {
  return heavyCalculation(data)
}, [data])`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Data Processing */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">پردازش داده‌ها (Data Processing)</h3>
              <p className="text-orange-700 mb-6 leading-relaxed">
                برای فیلتر کردن، جستجو، مرتب‌سازی و پردازش آرایه‌های بزرگ از useMemo استفاده کنید. این کار از re-render های غیرضروری جلوگیری می‌کند.
              </p>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-mono">پردازش آرایه‌ها</span>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto text-left">
{`// فیلتر و جستجو
const filteredUsers = useMemo(() => {
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    user.age >= minAge &&
    user.city === selectedCity
  )
}, [users, searchTerm, minAge, selectedCity])

// مرتب‌سازی و grouping
const sortedProducts = useMemo(() => {
  return products
    .filter(p => p.price > 0)
    .sort((a, b) => a.price - b.price)
    .reduce((groups, product) => {
      const category = product.category
      groups[category] = groups[category] || []
      groups[category].push(product)
      return groups
    }, {})
}, [products])

// محاسبه آمار
const statistics = useMemo(() => {
  return {
    total: data.length,
    average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
    max: Math.max(...data.map(item => item.value)),
    min: Math.min(...data.map(item => item.value))
  }
}, [data])`}
                </pre>
              </div>
              
              <div className="bg-orange-100 rounded-xl p-4">
                <p className="text-orange-800 font-medium">
                  🎯 <strong>کاربرد عملی:</strong> در component هایی که آرایه‌های بزرگ دارند، useMemo می‌تواند تفاوت قابل توجهی در performance ایجاد کند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}