# News Aggregator

This project is a full-stack application consisting of a Laravel backend and a React frontend. The backend is an API built with Laravel, and the frontend is built using React and Vite.

The project is containerized using Docker, allowing you to run both the Laravel backend and React frontend in a single container.

## Prerequisites

Make sure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

The repository is structured as follows:

/backend # Laravel backend (API)
/frontend # React frontend (Vite)
/docker # Docker configuration files 
  ├─ .env-backend # Environment file for the backend (Laravel)
  ├─ .env-frontend # Environment file for the frontend (React)
  ├─ apache # Apache config for Laravel
  ├─ docker-entrypoint.sh # Entry point script
Dockerfile # Dockerfile to build both backend and frontend in one container docker-compose.yml

# Docker Compose configuration

## Environment Variables

The project requires environment variables for both the backend (Laravel) and frontend (React). These variables are stored in the `.env-backend` and `.env-frontend` files located in the `docker` folder.

During the Docker build process, these files are automatically copied and renamed to `.env` in their respective directories.

## Getting Started

To get the project up and running with Docker, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/wahabdevpro/news-aggregator.git
cd news-aggregator
```

### 2.  Build and run the Docker container
```bash
docker-compose up --build
```

## Access Application

Once the Docker container is running, you can access the application in your browser:

```bash
Laravel API: http://localhost:8000/api
React Frontend: http://localhost:8000
```
