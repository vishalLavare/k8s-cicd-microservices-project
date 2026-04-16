# Architecture Overview

## Components
1. **Frontend**: React application for the User Interface, served by a lightweight Nginx web server.
2. **Backend**: Python Flask REST API running in a container, handling business logic.
3. **Database**: PostgreSQL (AWS RDS for production, local containerized DB for dev).

## Cloud & DevOps Tools
- **Containerization**: Docker
- **Container Registry**: AWS ECR
- **Orchestration**: Kubernetes (AWS EKS)
- **Deployment**: Helm
- **CI/CD Pipeline**: GitHub Actions

## Data Flow
User -> Nginx Ingress Controller -> Frontend Service -> React App
React App -> Ingress Controller -> Backend Service -> Flask API -> PostgreSQL Database
