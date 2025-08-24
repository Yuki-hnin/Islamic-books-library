# Religious Books Library (React + Node/Express, No DB)

This project follows the given instructions: 
- Frontend: React. View all books, open a book to see details and all reviews, add/edit/delete reviews.
- Backend: Node + Express. Uses JSON file for data. REST endpoints provided.
- No login; asks for user's name when submitting a review.

## Run locally

### Backend
```
cd backend
npm install
npm run start
# API on http://localhost:4000
```

### Frontend
```
cd frontend
npm install
echo VITE_API_URL=http://localhost:4000 > .env
npm run dev
# App on http://localhost:5173
```

## Deploy
- Frontend: Vercel/Netlify (set env `VITE_API_URL` to your backend URL)
- Backend: Render/Railway (Node build/run).

## Endpoints
- GET /books
- GET /books/:id
- POST /books/:id/reviews
- PUT /books/:id/reviews/:reviewId
- DELETE /books/:id/reviews/:reviewId
