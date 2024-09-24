# MyNews

This is a solution for the technical assingment built with React and Typescript.

How to run:

1.  Install all the packages: npm i
2.  add .env file in the root of a project and define VITE_API_URL and VITE_API_KEY
3.  run development server: npm run dev
4.  Build the solution: npm run build
5.  Run the solution: npm run start

Design decisions:

- Focus/hover states added on the interactive components for better UX
- "Favorites" option added on homepage that toggles between featured,latest and favorite articles on mobile and featured/latest and favorites on desktop
- Favorites button added on every article that handles adding and removing article from favorites
- Pagination added on every article list (excluding latest news) for better UX
- Loading state added on article lists for better UX
- Category title removed from article card because API doesn't return category data
- No results state added for better UX
- 404 view added for better UX
