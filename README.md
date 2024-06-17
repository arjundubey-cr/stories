This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Starting the server and testing

First, run the development server:

```bash
npm install
npm run dev
```

### Testing
- Make sure that your local environment is running. 
- Inside story.spec.ts
  - `await page.goto('localhost:3000'); // Change this to your local dev server`
```bash
npm run test
```

## Design Choices and Optimizations

### Design Choices

1. **Tailwind CSS**: Tailwind CSS is used for styling due to its utility-first approach, which promotes the creation of maintainable and scalable styles.
2. **Story Transitions**: Animations for story transitions are handled using CSS keyframes defined in `StoryView.css`. This allows for smooth transitions without significant performance overhead.

### Optimizations

1. **Lazy Loading Thumbnails**: Thumbnails are lazily loaded using the Intersection Observer API to improve initial load times and reduce unnecessary network requests.
2. **Image Prefetching**: Next stories are prefetched to the browser cache to ensure smooth transitions between stories.
3. **Conditional Animations**: CSS animations are conditionally applied only when necessary to avoid unnecessary re-renders and improve performance.

### Scalability

1. **Component Reusability**: The application is designed with reusable components, making it easier to scale and maintain.
2. **Tailwind CSS**: Using Tailwind CSS allows for scalable and consistent styling across the application.
3. **Performance Optimization**: Techniques such as lazy loading and prefetching are used to ensure the application can handle a large number of stories without performance degradation.
