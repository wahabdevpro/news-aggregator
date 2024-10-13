
# News Aggregator

This project is a full-stack application consisting of a Laravel backend and a React frontend. The backend is an API built with Laravel, and the frontend is built using React and Vite.

The project is containerized using Docker, allowing you to run both the Laravel backend and React frontend in a single container.

## Prerequisites

Make sure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

The repository is structured as follows:

/backend            # Laravel backend (API)
/frontend           # React frontend (Vite)
/docker             # Docker configuration files 
  ├─ .env-backend   # Environment file for the backend (Laravel)
  ├─ .env-frontend  # Environment file for the frontend (React)
  ├─ apache         # Apache config for Laravel
  ├─ docker-entrypoint.sh # Entry point script
Dockerfile          # Dockerfile to build both backend and frontend in one container
docker-compose.yml  # Docker Compose configuration

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

### 2. Build and run the Docker container

```bash
docker-compose up --build
```

### 3. Access the Application

Once the Docker container is running, you can access the application in your browser:

- **Laravel API**: http://localhost:8000
- **React Frontend**: The React app is served within the same container and accessible at the same URL.

## Stopping the Application

To stop the running Docker container, press `CTRL + C` in the terminal where it's running, or use the following command in another terminal:

```bash
docker-compose down
```

## Customization

If you need to change environment variables, modify the `.env-backend` and `.env-frontend` files located in the `docker` directory. Then, rebuild the Docker container:

```bash
docker-compose up --build
```

## Troubleshooting

- **Port Conflicts**: If `port 8000` is in use on your local machine, update the `ports` section in the `docker-compose.yml` file to use a different port.

Example:

```yaml
ports:
  - "8080:80"
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
