# React Hooks Tutorial - useRef, useCallback, useMemo

یک وب‌سایت آموزشی کامل برای یادگیری سه hook مهم React با مثال‌های عملی و تعاملی.

## 🚀 ویژگی‌ها

- **آموزش کامل useRef**: دسترسی به DOM elements و ذخیره مقادیر mutable
- **آموزش کامل useCallback**: بهینه‌سازی performance با memoization functions  
- **آموزش کامل useMemo**: بهینه‌سازی performance با memoization values
- **مثال‌های عملی و تعاملی**: کدهای قابل اجرا و تست
- **رابط کاربری مدرن**: طراحی زیبا و responsive
- **توضیحات فارسی**: آموزش کامل به زبان فارسی

## 📚 محتویات آموزش

### useRef
- دسترسی مستقیم به DOM elements
- ذخیره مقادیر mutable بدون re-render
- ذخیره مقادیر قبلی
- کنترل timers و intervals
- مثال‌های عملی: Focus input، Timer، Previous values

### useCallback
- جلوگیری از re-creation functions
- کار با React.memo
- بهینه‌سازی performance
- مدیریت state با functions
- مثال‌های عملی: Child components، List management

### useMemo
- محاسبه مقادیر expensive
- فیلتر کردن و جستجو
- محاسبه statistics
- جلوگیری از re-computation
- مثال‌های عملی: Data processing، User filtering، Complex calculations

## 🛠️ تکنولوژی‌ها

- **Next.js 14**: Framework اصلی
- **React 18**: با Hooks جدید
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **App Router**: Next.js 13+ routing

## 🚀 نصب و اجرا

1. **نصب dependencies:**
```bash
npm install
```

2. **اجرای پروژه:**
```bash
npm run dev
```

3. **باز کردن در مرورگر:**
```
http://localhost:3000
```

## 📁 ساختار پروژه

```
├── app/
│   ├── globals.css          # استایل‌های کلی
│   ├── layout.tsx           # Layout اصلی
│   ├── page.tsx             # صفحه اصلی
│   ├── useRef/
│   │   └── page.tsx         # آموزش useRef
│   ├── useCallback/
│   │   └── page.tsx         # آموزش useCallback
│   └── useMemo/
│       └── page.tsx         # آموزش useMemo
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎯 نحوه استفاده

1. **شروع از صفحه اصلی**: مرور کلی بر روی تمام hooks
2. **انتخاب hook مورد نظر**: کلیک روی کارت هر hook
3. **مطالعه توضیحات**: درک مفاهیم و کاربردها
4. **اجرای مثال‌ها**: تست کدهای تعاملی
5. **تمرین عملی**: تغییر کدها و مشاهده نتایج

## 📖 نکات مهم

### useRef
- برای دسترسی به DOM elements استفاده کنید
- مقادیر mutable بدون re-render ذخیره کنید
- از آن برای ذخیره previous values استفاده کنید

### useCallback
- فقط برای functions که به child components پاس می‌دهید
- با React.memo استفاده کنید
- از over-optimization پرهیز کنید

### useMemo
- برای محاسبات expensive استفاده کنید
- dependency array را دقیق تنظیم کنید
- قبل از optimization، performance را اندازه‌گیری کنید

## 🔧 اسکریپت‌ها

- `npm run dev`: اجرای development server
- `npm run build`: build کردن پروژه
- `npm run start`: اجرای production server
- `npm run lint`: بررسی کد با ESLint

## 📝 یادداشت‌ها

- تمام مثال‌ها تعاملی هستند و می‌توانید آن‌ها را تغییر دهید
- console را باز کنید تا log های performance را ببینید
- کدها کاملاً type-safe هستند
- طراحی responsive و روی تمام دستگاه‌ها کار می‌کند

## 🤝 مشارکت

اگر پیشنهادی دارید یا مشکلی پیدا کردید، لطفاً issue ایجاد کنید.

## 📄 لایسنس

این پروژه برای اهداف آموزشی ایجاد شده است.
