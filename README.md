# BlogStory - FastAPI Backend with JWT Authentication

**BlogStory** is a high-performance backend API built using **FastAPI** that supports user authentication, blog management, and secure token-based access using **JWT**. It’s structured for clean code, modular design, and easy extensibility.

---

## Live Demo

> **API is deployed using [Render](https://render.com/)**  
> Visit the live API: [https://blog-story.onrender.com/docs](https://blog-story.onrender.com/docs)

---

## Features

- User Registration & Login
- JWT Authentication for secure API access
- Create, Read, Update, Delete (CRUD) for blogs
- Link blogs to their respective creators (users)
- Fetch blogs by ID or all
- Modular route handling using FastAPI routers
- Pydantic-based request/response models
- SQLAlchemy ORM for DB interaction

---

## Tech Stack

- **Framework:** FastAPI
- **Database:** SQLite
- **ORM:** SQLAlchemy
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Pydantic
- **Server:** Uvicorn
- **Deployment:** Render