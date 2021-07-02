# k8s-task-docker-setup
create 2 Docker images (front-end, backend) , that can be used later in kubernetes deployment

## Docker images

### Backend

Use following command to build docker image for backend  - `DOCKER_BUILDKIT=1 docker build -t igeolise/k8s-task-backend:1.0.0 -f ./docker/prod/back/Dockerfile .`

### Frontend

Use following command to build docker image for frontend  - `DOCKER_BUILDKIT=1 docker build -t igeolise/k8s-task-frontend:1.0.0 -f ./docker/prod/front/Dockerfile .`