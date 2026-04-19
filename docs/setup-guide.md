# Setup Guide

## Pre-requisites
- Docker
- kubectl
- Helm
- AWS CLI configured
- Git

## CI/CD Pipeline Configuration
To enable the GitHub Actions pipeline, setup the following Secrets in your `.github/workflows/cicd.yaml`:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (e.g., `ap-south-1`)
- `EKS_CLUSTER_NAME` (e.g., `scrumptious-electro-outfit`)
- `ECR_REGISTRY` (e.g., `142166253229.dkr.ecr.ap-south-1.amazonaws.com`)

## Deployment Steps

1. **Build Docker images and Push to ECR**:
   Executed automatically via GitHub actions on merge to `main`.

2. **Deploy via Helm**:
   The CI/CD pipeline runs:
   ```bash
   helm upgrade --install frontend-app helm/frontend-chart -n production
   helm upgrade --install backend-app helm/backend-chart -n production
   ```
