#!/bin/bash
# Helper script to deploy using Helm locally
echo "Deploying via Helm to current K8s context..."
helm upgrade --install backend ./helm/backend-chart
helm upgrade --install frontend ./helm/frontend-chart
