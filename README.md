# Mobile Tracking Performance Dashboard

A professional, responsive dashboard for tracking mobile performance metrics with KPIs, revenue analytics, and broadband pack analysis. Built with React, TypeScript, and Tailwind CSS for seamless Laravel integration.

## Project Overview

This dashboard provides real-time insights into:
- **KPI Cards**: Revenue Total, New Sales, Existing Revenue, Broadband Revenue, Paying Users
- **Revenue Total**: Service category breakdown with sparklines and MoM/YTD trends  
- **Broadband Pack**: Comparative bar charts across different packages (CVM, CORE, PV, ACQ, OTHERS)
- **Revenue Driver**: Regional analysis of paying users by Length of Service (LoS)

## Features

✅ **Responsive Design** - Optimized for desktop (1440px), tablet, and mobile  
✅ **Interactive Filters** - Regional, Branch, and Cluster filtering with real-time updates  
✅ **Performance Indicators** - Color-coded metrics with positive/negative indicators  
✅ **Real-time Charts** - Custom canvas charts and sparklines for data visualization  
✅ **Professional UI** - Corporate design system with consistent styling  
✅ **Accessibility Ready** - Semantic HTML, proper contrast, keyboard navigation  
✅ **Animation Support** - Smooth transitions and loading states  

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Custom HTML5 Canvas implementations  
- **State Management**: React hooks with async data loading
- **Build Tool**: Vite (production builds ready for Laravel integration)
- **UI Components**: Custom design system with shadcn/ui base

## Laravel Integration Guide

### Step 1: Copy Built Assets

After running `npm run build`, copy the built files to your Laravel project:

```bash
# Copy the built HTML as a Blade template
cp dist/index.html resources/views/dashboard.blade.php

# Copy assets to Laravel public directory
cp -r dist/assets/* public/assets/
```

### Step 2: Create Laravel Route

Add the dashboard route to your `routes/web.php`:

```php
<?php

use Illuminate\Support\Facades\Route;

// Dashboard route
Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

// Optional: Add middleware for authentication
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
```

### Step 3: API Integration (Optional)

To connect to Laravel API endpoints instead of mock data, create the following API routes in `routes/api.php`:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->group(function () {
    Route::get('/kpis', [DashboardController::class, 'getKpis']);
    Route::get('/revenue-total', [DashboardController::class, 'getRevenueTotal']);  
    Route::get('/broadband-pack', [DashboardController::class, 'getBroadbandPack']);
    Route::get('/revenue-driver', [DashboardController::class, 'getRevenueDriver']);
});
```

### Step 4: Configure API Base URL

In your Blade template, add this configuration before loading the dashboard script:

```html
<script>
    // Configure API base URL for Laravel backend
    window.DASHBOARD_API_BASE = "{{ config('app.url') }}";
</script>
```

### Step 5: Create Dashboard Controller

Generate and implement the dashboard controller:

```bash
php artisan make:controller DashboardController
```

Example controller structure:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getKpis(Request $request)
    {
        // Implement KPI data retrieval
        return response()->json([
            [
                'key' => 'revenue_total',
                'label' => 'Revenue Total', 
                'value' => 2.45,
                'unit' => 'Bn',
                'ach' => 87.5,
                'mom' => 5.2,
                'ytdOrYoy' => 12.8
            ],
            // ... more KPI data
        ]);
    }
    
    public function getRevenueTotal(Request $request)
    {
        // Implement revenue total data retrieval
        return response()->json([
            ['name' => 'Broadband', 'mtd' => 678.5, 'mom' => 3.8, 'ytd' => 18.6],
            // ... more revenue data  
        ]);
    }
    
    // Implement other methods...
}
```

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Laravel 9+ (for backend integration)

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd mobile-tracking-dashboard  
npm install
```

2. **Development server**:
```bash
npm run dev
# Opens at http://localhost:8080
```

3. **Build for production**:
```bash
npm run build
# Generates optimized files in dist/
```

## Data Structure Reference

### KPI Data Format
```json
{
  "key": "revenue_total",
  "label": "Revenue Total",
  "value": 2.45,
  "unit": "Bn", 
  "ach": 87.5,
  "mom": 5.2,
  "ytdOrYoy": 12.8
}
```

### Revenue Total Format
```json
{
  "name": "Broadband",
  "mtd": 678.5,
  "mom": 3.8,
  "ytd": 18.6
}
```

### Broadband Pack Format  
```json
{
  "label": "CVM",
  "previous": 125.5,
  "current": 142.3,
  "changePct": 13.4
}
```

### Revenue Driver Format
```json
{
  "name": "Area 3",
  "buckets": [
    {"name": "0-1mo", "mtd": 45.2, "mom": 3.5, "yoy": 12.8},
    {"name": "1-6mo", "mtd": 89.6, "mom": -2.1, "yoy": 8.4},
    {"name": ">6mo", "mtd": 125.8, "mom": 5.7, "yoy": 18.2}
  ],
  "total": 260.6
}
```

## Customization

### Design System
All colors, spacing, and components are defined in the design system:
- **Colors**: Professional blue-gray corporate palette
- **Components**: Modular card system with consistent styling  
- **Animations**: Smooth transitions and loading states
- **Typography**: Clear hierarchy with proper contrast

### Adding New Metrics
1. Update the data interfaces in the respective component files
2. Add new visualization components following the established patterns
3. Update the API endpoints to provide the new data format
4. Extend the dashboard layout grid as needed

### Filter Customization  
Modify filter options in `FilterBar.tsx`:
```typescript
const regionalOptions = ['All', 'Your', 'Custom', 'Options'];
```

## Browser Support

- Chrome 88+
- Firefox 85+  
- Safari 14+
- Edge 88+

## Performance Features

- **Lazy Loading**: Charts render only when visible
- **Responsive Images**: Optimized for different screen sizes
- **Efficient Updates**: Only re-renders components when data changes
- **Canvas Optimization**: High-DPI display support with proper scaling

## Security Considerations

- **CSRF Protection**: Compatible with Laravel's CSRF middleware  
- **XSS Prevention**: All data is properly sanitized before rendering
- **API Authentication**: Ready for Laravel Sanctum or Passport integration

## Support

For questions or issues:
1. Check the component documentation in each file
2. Review the data format examples above  
3. Test with the provided mock data first
4. Verify Laravel API responses match expected formats

---

**Dashboard URL**: [Your Laravel App]/dashboard  
**API Base**: [Your Laravel App]/api/dashboard/  
**Last Updated**: {{ date('Y-m-d') }}