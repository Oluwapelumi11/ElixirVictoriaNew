# 📸 Product Image Setup Guide

## 🎯 **Current Status:**
- ✅ **Placeholders created** in Collection and ProductShowcase components
- ✅ **Image imports added** for Next.js Image component
- ✅ **Commented code ready** for easy image integration

## 📁 **Image Structure:**

### **Recommended Folder Structure:**
```
public/
├── images/
│   ├── logo.png (your logo)
│   └── products/
│       ├── victoria-nocturne.jpg
│       ├── luxury-body-scrub.jpg
│       ├── elixir-royal.jpg
│       ├── silk-body-oil.jpg
│       ├── champagne-dreams.jpg
│       └── wellness-bath-salts.jpg
```

## 🔧 **How to Add Images:**

### **1. Upload Your Images:**
- Place your product images in `public/images/products/`
- Use descriptive filenames (e.g., `victoria-nocturne.jpg`)
- Recommended format: JPG, PNG, or WebP
- Recommended size: 800x800px or larger (square aspect ratio)

### **2. Update Collection Page:**
In `src/components/pages/CollectionPage.tsx`:

```typescript
// Find this section in each product card:
{/* Uncomment and replace with actual image when ready */}
{/* 
<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
*/}

// Replace with:
<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### **3. Update Product Showcase:**
In `src/components/sections/ProductShowcase.tsx`:

```typescript
// Find this section in each product card:
{/* Uncomment and replace with actual image when ready */}
{/* 
<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
/>
*/}

// Replace with:
<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
/>
```

### **4. Remove Placeholder Elements:**
After adding images, remove these placeholder elements:

```typescript
// Remove this entire div block:
<div className="absolute inset-0 flex items-center justify-center">
  <div className="text-center space-y-4">
    <div className="text-yellow-500 text-4xl font-serif">{product.name.charAt(0)}</div>
    <div className="text-white text-lg font-medium">{product.category}</div>
    <div className="text-gray-400 text-sm">Image Placeholder</div>
  </div>
</div>
```

## 🎨 **Image Optimization:**

### **Next.js Image Benefits:**
- ✅ **Automatic optimization** - WebP conversion
- ✅ **Responsive sizing** - Different sizes for different screens
- ✅ **Lazy loading** - Images load as needed
- ✅ **Performance** - Faster page loads

### **Recommended Image Specs:**
- **Format**: JPG, PNG, or WebP
- **Size**: 800x800px minimum (square)
- **Quality**: High quality (80%+ for JPG)
- **File size**: Under 500KB per image

## 🚀 **Quick Setup Steps:**

1. **Upload images** to `public/images/products/`
2. **Uncomment Image components** in both files
3. **Remove placeholder divs** 
4. **Test on different screen sizes**

## 📱 **Responsive Behavior:**

### **Mobile (768px and below):**
- Images take full width of container
- Optimized for mobile viewing

### **Tablet (768px - 1200px):**
- Images take 50% width (2 columns)
- Balanced performance and quality

### **Desktop (1200px+):**
- Images take 33% width (3 columns) in collection
- Images take 25% width (4 columns) in showcase
- Highest quality display

## 🔍 **Testing:**

### **After adding images:**
1. Check mobile layout
2. Check tablet layout  
3. Check desktop layout
4. Verify hover effects work
5. Test image loading performance

---

## ✅ **Ready to Add Images!**

Your placeholder structure is now ready for easy image integration. Just upload your product images and uncomment the Image components! 🚀 