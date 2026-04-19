# k8s-cicd-microservices-project

End-to-End Microservices CI/CD Pipeline using Docker, Kubernetes (AWS EKS), GitHub Actions, and Helm.

## Project Structure
- `frontend/`: React + Vite UI
- `backend/`: Flask REST API
- `k8s/`: Raw Kubernetes Deployments & Services
- `helm/`: Helm Charts for Production Deployments
- `.github/workflows/`: CI/CD Pipeline
- `docs/`: Deployment & Setup Instructions
- `scripts/`: Helper bash scripts

## Getting Started
See [Setup Guide](./docs/setup-guide.md) for deployment steps.

## Run Locally with Docker Compose

To run the entire stack (Frontend, Backend, and Database) on your local machine:

1. **Start the services**:
   ```bash
   docker-compose up --build -d
   ```

2. **Access the application**:
   - **Frontend**: [http://localhost](http://localhost)
   - **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

3. **Stop the services**:
   ```bash
   docker-compose down
   ```
