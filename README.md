
- [Next.js App Router Course - Starter](#nextjs-app-router-course---starter)
  - [Folder Structure](#folder-structure)
  - [CSS Styling](#css-styling)
    - [Global Styles](#global-styles)
    - [TailWind](#tailwind)
    - [CSS Modules](#css-modules)
    - [Using the clsx library to toggle class names](#using-the-clsx-library-to-toggle-class-names)
    - [✅ **What is `clsx`?**](#-what-is-clsx)
    - [🚀 **Common Use Cases:**](#-common-use-cases)
  - [Optimizing Fonts and Images](#optimizing-fonts-and-images)
    - [Why optimize fonts?](#why-optimize-fonts)
      - [Adding a primary font](#adding-a-primary-font)
    - [Why optimize images?](#why-optimize-images)
    - [The  component](#the--component)
  - [Create Nested Routing](#create-nested-routing)
    - [Create Layout](#create-layout)
      - [Root Layout](#root-layout)
    - [🧱 What is a **Root Layout** in Next.js?](#-what-is-a-root-layout-in-nextjs)
  - [Community Standarts](#community-standarts)
  - [Need to look at](#need-to-look-at)

# Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.


## Folder Structure 
**/app:** Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
**/app/lib:** Contains functions used in your application, such as reusable utility functions and data fetching functions.
**/app/ui:** Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these components for you.
**/public:** Contains all the static assets for your application, such as images.
**Config Files:** You'll also notice config files such as next.config.ts at the root of your application. 




## CSS Styling

### Global Styles 
If you look inside the `/app/ui` folder, you'll see a file called `global.css`. You can use this file to add CSS rules to all the routes in your application - such as CSS reset rules, site-wide styles for HTML elements like links, and more.

You can import global.css in any component in your application, but it's usually good practice to add it to your top-level component. In Next.js, this is the `root layout` (more on this later).

### TailWind
Tailwind is a CSS framework that speeds up the development process by allowing you to quickly write utility classes directly in your React code.

In Tailwind, you style elements by adding class names. For example, adding "text-blue-500" will turn the <h1> text blue:


```jsx
<h1 className="text-blue-500">I'm blue!</h1>
```
Although the CSS styles are shared globally, each class is singularly applied to each element. This means if you add or delete an element, you don't have to worry about maintaining separate stylesheets, style collisions, or the size of your CSS bundle growing as your application scales.


### CSS Modules

CSS Modules allow you to **scope CSS to a component** by automatically creating unique class names, so you don't have to worry about style collisions as well.

> you should create a file with name `componentName.module.css`

### Using the clsx library to toggle class names
Sure! Here's a **short summary** of `clsx` and its use cases:

---

### ✅ **What is `clsx`?**

`clsx` is a tiny utility for **conditionally combining class names** — cleanly handles strings, arrays, objects, and falsy values.

---

### 🚀 **Common Use Cases:**

1. **Conditional Classes**

```tsx
clsx("btn", isActive && "active")
```

2. **Multiple Conditions with Object**

```tsx
clsx("card", {
  "bg-blue": theme === "blue",
  "bg-red": theme === "red",
})
```

3. **Combining Props with Local Styles**

```tsx
clsx("base-styles", className)
```
So its great for **reusable components** (avoids `undefined` in final class string)

```tsx
clsx("btn", undefined, false) // → "btn"
```

## Optimizing Fonts and Images

### Why optimize fonts?
Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.

Cumulative Layout Shift is a metric used by Google to evaluate the performance and user experience of a website. With fonts, layout shift happens when the browser initially renders text in a fallback or system font and then swaps it out for a custom font once it has loaded. This swap can cause the text size, spacing, or layout to change, shifting elements around it.

Next.js automatically optimizes fonts in the application when you use the `next/font` module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

#### Adding a primary font
In your `/app/ui` folder, create a new file called fonts.ts. You'll use this file to keep the fonts that will be used throughout your application.

[Adding multiple Fonts ](https://nextjs.org/docs/app/getting-started/fonts#using-multiple-fonts)

[Full list of options](https://nextjs.org/docs/app/api-reference/components/font#font-function-arguments)






### Why optimize images?
Next.js can serve static assets, like images, under the top-level `/public` folder. Files inside `/public` can be referenced in your application.

With regular HTML, you would add an image as follows:

```html
<img
  src="/hero.png"
  alt="Screenshots of the dashboard project showing desktop version"
/>

```


**However, this means you have to manually:**
   - Ensure your image is responsive on different screen sizes.
   - Specify image sizes for different devices.
   - Prevent layout shift as the images load.
   - Lazy load images that are outside the user's viewport.

Image Optimization is a large topic in web development that could be considered a specialization in itself. Instead of manually implementing these optimizations, you can use the `next/image` component to automatically optimize your images.

### The <Image> component
The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as:

- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like WebP and AVIF, when the browser supports it.


> It's good practice to set the width and height of your images to avoid layout shift, these should be an aspect ratio identical to the source image. 
> 
> Note: The width and height here don’t control the rendered size directly but tell the browser the intrinsic aspect ratio of the image to reserve the correct space before it loads.


>  Images without dimensions and web fonts are common causes of layout shift.













## Create Nested Routing
Next.js uses file-system routing where **folders are used to create nested routes**. Each folder represents a route segment that maps to a URL segment.
![nested routing](image.png)
You can create separate UIs for each route using `layout.tsx` and `page.tsx` files.


`page.tsx` **is a special Next.js file** that exports a React component, **and it's required for the route to be accessible**. In your application, you already have a page file: `/app/page.tsx `- this is the home page associated with the route `/`.


> To create a nested route, you can nest folders inside each other and add page.tsx files inside them. For example:

![alt text](image-1.png)


[ ]  [Colocation and private folders](https://nextjs.org/docs/app/getting-started/project-structure#colocation) 


### Create Layout 
`layout.tsx` in Next.js
- It's a special file that lets you create a shared UI wrapper around multiple pages. For example, a dashboard might have a sidebar that shows on every page inside `/dashboard`. So instead of adding the sidebar to every page manually, you create one `layout.tsx` inside `/dashboard `that wraps all its pages.

![alt text](image-2.png)


> One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering which preserves client-side React state in the layout when transitioning between pages.
![alt text](image-3.png)
[ ] [Partial Rendering 🔥](https://nextjs.org/docs/app/getting-started/linking-and-navigating#4-partial-rendering)


#### Root Layout 


### 🧱 What is a **Root Layout** in Next.js?

* It’s a special file: **`/app/layout.tsx`**
* Required in every Next.js app (using the App Router)
* It wraps **all pages** in your app so Any UI you add to the root layout will be shared across all pages in your application
  
* You use it to define:

  * your <html> and <body> tags, and add metadata
  * Global styles
  * Things like headers or footers shared across the whole site


| Layout Type       | File                        | Applies To                     |
| ----------------- | --------------------------- | ------------------------------ |
| **Root Layout**   | `/app/layout.tsx`           | The **whole app**              |
| **Nested Layout** | `/app/dashboard/layout.tsx` | Only `/dashboard` and subpages |

















## Community Standarts 

**Next.js Naming Conventions (with TypeScript)**

 **Use PascalCase (UpperCase)** for:

* ✅ React components → `UserCard.tsx`
* ✅ TypeScript types/interfaces → `User.ts`, `UserTypes.ts`
* ✅ Component folders (optional) → `/components/UserCard/`



 **Use lowercase** for:

* ✅ Pages and routes → `about.tsx`, `dashboard/page.tsx`
* ✅ API routes → `api/hello.ts`
* ✅ Public assets → `logo.png`

| Use Case           | Naming Convention                                   | Applies To           |
| ------------------ | --------------------------------------------------- | -------------------- |
| React Components   | `PascalCase`                                        | React + Next.js      |
| Hooks              | `camelCase`                                         | React + Next.js      |
| Utility functions  | `camelCase`                                         | React + Next.js      |
| Types/Interfaces   | `PascalCase`                                        | React + Next.js (TS) |
| Pages / Routes     | `lowercase`                                         | **Next.js only**     |
| Folders (optional) | `PascalCase` for components, `lowercase` for routes | Both                 |

*Why are pages and routes lowercase only in Next.js?*
  Because Next.js uses file-based routing — meaning: Your file/folder names define your URLs.
It creates the route:
 http://your-site.com/About ❌ (capital "A")

But in practice, URLs are expected to be:
 http://your-site.com/about ✅ (lowercase)

Why are pages and routes lowercase only in Next.js?
- Next.js uses file-based routing, so file names become URL paths.
- URLs are conventionally lowercase for consistency and SEO.
- On case-sensitive systems (like Linux), About.tsx ≠ about.tsx, which can cause bugs.
- Using lowercase avoids these issues and matches URL standards.

> In React (non-Next.js), routes are defined manually, so casing is flexible.

## Need to look at 

[ ] [How Core Web Vitals affect SEO](https://vercel.com/blog/how-core-web-vitals-affect-seo)