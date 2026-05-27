
<div align="center">

# ⚡ QuickLink

### A Cloud-Native, Enterprise-Grade URL Shortener

*Built with the MERN Stack · Deployed on AWS EKS · Automated with Jenkins CI/CD*

<br/>

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![AWS EKS](https://img.shields.io/badge/AWS_EKS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/eks/)
[![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/)

<br/>

[![GitHub last commit](https://img.shields.io/github/last-commit/Swarajbabu/URL-SHORTENER?style=flat-square&color=blue)](https://github.com/Swarajbabu/URL-SHORTENER/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/Swarajbabu/URL-SHORTENER?style=flat-square&color=green)](https://github.com/Swarajbabu/URL-SHORTENER)
[![License](https://img.shields.io/badge/license-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**QuickLink** is a production-ready, cloud-native URL shortening platform that transforms unwieldy, multi-parameter web addresses into clean, shareable short links — complete with a real-time analytics dashboard for tracking engagement.

Beyond its functional core, QuickLink serves as a **reference architecture** for the full modern software delivery lifecycle: from a developer's first commit, through an automated CI/CD pipeline, to a horizontally-scalable, self-healing deployment on AWS — with live metrics visible in Grafana dashboards.

> *This project demonstrates end-to-end ownership of a production system: application development, containerisation, infrastructure-as-code, CI/CD automation, and operational observability.*

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔗 **Instant URL Shortening** | Submit any long URL and receive a compact, randomised alphanumeric short code with collision-safe uniqueness validation |
| 📊 **Real-Time Click Analytics** | Every redirect atomically increments a click counter; a personalised dashboard surfaces engagement data per link |
| 🌗 **Dark / Light Mode UI** | Fully responsive Single-Page Application with Tailwind CSS dark mode support across all viewport sizes |
| 🐳 **Containerised Architecture** | Every service (frontend, backend, reverse proxy) packaged as an immutable Docker image for environment-agnostic deployment |
| ☸️ **Kubernetes Orchestration** | Automated scaling via Horizontal Pod Autoscaler (HPA), self-healing liveness/readiness probes, and zero-downtime rolling updates |
| 🏗️ **Infrastructure as Code** | Complete AWS infrastructure (VPC, EKS, ECR, IAM) reproducibly provisioned and destroyed with a single Terraform command |
| 🔄 **Automated CI/CD Pipeline** | Six-stage declarative Jenkins pipeline: code checkout → build → test → Docker build → ECR push → EKS deploy |
| 📈 **Full-Stack Observability** | Prometheus scrapes `/metrics` from every pod; Grafana renders live dashboards for CPU, memory, request rate, and event loop lag |

---

## 🏛️ System Architecture

### Architecture Overview

QuickLink follows a **three-tier client-server architecture** fronted by an Nginx reverse proxy, deployed as containerised workloads on AWS EKS:

```
User Browser
    │
    ▼  HTTP/HTTPS
AWS Application Load Balancer (ELB)
    │
    ▼  Port 80
┌─────────────────────────────────────────┐
│         Nginx Reverse Proxy Pod         │
│  ├── Serves static React assets         │
│  └── Proxies /api/* → Backend Pod       │
└────────────┬────────────────────────────┘
             │
   ┌─────────┴──────────┐
   ▼                    ▼
Frontend Assets    Node.js/Express Backend Pod (Port 5000)
(React SPA)             │
                        │  Mongoose ODM
                        ▼
                   MongoDB Pod
                (Persistent Volume / Atlas)

                        ◄── Prometheus scrapes /metrics
                        ◄── Grafana visualises dashboards
```

### Data Flow

`User` → `AWS ALB` → `Nginx (Port 80)` → `[Static Assets | /api/* → Express (Port 5000)]` → `MongoDB`

### Architecture Diagram

![QuickLink System Architecture](./docs/architecture-diagram.png)


---

## 🗂️ Project Structure

```
URL-SHORTENER/
├── frontend/                   # React 18 SPA (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # URL submission & analytics dashboard views
│   │   └── main.jsx
│   ├── nginx.conf              # Nginx config: static serving + /api proxy
│   ├── Dockerfile              # Multi-stage: Node build → Nginx serve
│   └── package.json
│
├── backend/                    # Node.js / Express REST API
│   ├── models/
│   │   └── Url.js              # Mongoose schema: originalUrl, shortCode, clicks, createdAt
│   ├── routes/
│   │   └── urlRoutes.js        # POST /api/shorten, GET /api/urls, GET /:shortCode
│   ├── server.js               # Express app entrypoint + prom-client /metrics
│   ├── Dockerfile              # Node.js container image
│   └── package.json
│
├── k8s/                        # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mongo-statefulset.yaml
│   ├── services.yaml            # LoadBalancer (frontend) + ClusterIP (backend)
│   ├── hpa.yaml                 # Horizontal Pod Autoscaler for backend
│   ├── configmap.yaml
│   └── secrets.yaml             # MongoDB URI (base64 encoded)
│
├── terraform/                   # Infrastructure as Code (AWS)
│   ├── main.tf                  # EKS cluster, VPC, subnets, IGW, route tables
│   ├── ecr.tf                   # ECR repositories (frontend + backend)
│   ├── iam.tf                   # IAM roles & policies for EKS node groups
│   ├── variables.tf
│   └── outputs.tf
│
├── Jenkinsfile                  # Declarative 6-stage CI/CD pipeline definition
├── docker-compose.yml           # Local multi-container development environment
└── README.md
```

---

## 🛠️ Technology Stack

### Application Layer

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | Frontend SPA framework |
| **Vite** | Latest | Lightning-fast dev server & optimised production bundler |
| **Tailwind CSS** | v3 | Utility-first CSS; dark/light mode, responsive layouts |
| **Node.js** | LTS | Server-side JavaScript runtime |
| **Express.js** | 4.x | RESTful API routing, middleware, request handling |
| **MongoDB** | 6.x | Document-oriented NoSQL persistence |
| **Mongoose** | 7.x | ODM: schema validation, model definition, query abstraction |
| **prom-client** | Latest | Exposes `/metrics` endpoint in Prometheus exposition format |
| **Nginx** | Alpine | Reverse proxy + static asset server (single unified origin) |

### DevOps & Cloud Infrastructure

| Technology | Purpose |
|---|---|
| **Docker** | Immutable container image packaging for every service tier |
| **Docker Compose** | Local multi-service orchestration for development & integration testing |
| **Kubernetes (K8s)** | Container orchestration: scheduling, scaling, self-healing, service discovery |
| **AWS EKS** | Managed Kubernetes control plane — eliminates master node overhead |
| **AWS ECR** | Private Docker image registry with image immutability enforcement |
| **AWS EC2** | Kubernetes worker node data-plane (t3.medium+ recommended) |
| **AWS IAM** | Fine-grained access control for EKS, ECR, and VPC resources |
| **Terraform** | Declarative IaC: VPC, subnets, EKS cluster, node groups, ECR, IAM |
| **Jenkins** | CI/CD automation server executing the `Jenkinsfile` pipeline |
| **Prometheus** | Time-series metrics collection via pod `/metrics` endpoint scraping |
| **Grafana** | Real-time dashboard visualisation (CPU, memory, req/s, error rate) |

---

## 🚀 Local Development Setup

### Prerequisites

Ensure the following tools are installed on your local machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- [Node.js LTS](https://nodejs.org/) *(optional — only needed for running services outside Docker)*
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Swarajbabu/URL-SHORTENER.git
cd URL-SHORTENER
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:

```env
MONGO_URI=mongodb://mongo:27017/quicklink   # Uses the Docker Compose MongoDB service
PORT=5000
BASE_URL=http://localhost                    # Base URL for generating short links
```

### 3. Launch with Docker Compose

```bash
# Build all images and start all services (frontend, backend, MongoDB) in detached mode
docker-compose up -d --build
```

This single command will:
- Build the Nginx/React frontend image
- Build the Node.js/Express backend image
- Pull and start a MongoDB container
- Wire all services together on a shared Docker bridge network

### 4. Access the Application

| Service | URL |
|---|---|
| **QuickLink App** | [http://localhost](http://localhost) |
| **Backend API** | [http://localhost/api/urls](http://localhost/api/urls) |
| **Prometheus Metrics** | [http://localhost/api/metrics](http://localhost/api/metrics) |

### 5. Tear Down

```bash
docker-compose down         # Stop and remove containers
docker-compose down -v      # Also remove persistent MongoDB volume
```

---

## ☁️ Cloud Deployment — AWS EKS

### Phase 1: Provision Infrastructure with Terraform

```bash
cd terraform/

# Initialise providers and backend state
terraform init

# Review the execution plan — inspect all resources to be created
terraform plan

# Apply — provisions VPC, subnets, EKS cluster, node group, ECR, IAM roles
terraform apply

# Retrieve kubeconfig for kubectl access
aws eks update-kubeconfig --region <your-region> --name quicklink-cluster
```

> ⚠️ **Cost Notice:** Running an EKS cluster incurs AWS charges. Run `terraform destroy` when the environment is no longer needed.

### Phase 2: Automated CI/CD via Jenkins

The complete build-to-deploy lifecycle is codified in the [`Jenkinsfile`](./Jenkinsfile) at the repository root. Each `git push` to the `main` branch triggers the following pipeline automatically:

```
┌──────────────┐    ┌──────────────────┐    ┌───────────────────┐
│  1. Checkout │───▶│ 2. Build Frontend│───▶│ 3. Build Backend  │
│  (git clone) │    │  (Vite npm build) │    │  (lint + tests)   │
└──────────────┘    └──────────────────┘    └────────┬──────────┘
                                                      │
┌──────────────────────┐    ┌──────────────────┐     │
│ 6. Deploy to EKS     │◀───│ 5. Push to ECR   │◀────┤
│ (kubectl apply +     │    │ (docker push via │     │
│  rolling update)     │    │  IAM credentials)│  ┌──▼──────────────────┐
└──────────────────────┘    └──────────────────┘  │ 4. Build Docker     │
                                                   │ Images (tagged with │
                                                   │ BUILD_NUMBER:latest) │
                                                   └─────────────────────┘
```

**Pipeline Stages at a Glance:**

| # | Stage | Action | Output |
|---|---|---|---|
| 1 | **Checkout** | Clone latest `main` branch from GitHub | Clean workspace |
| 2 | **Build Frontend** | `npm install` + Vite production build | `dist/` static bundle |
| 3 | **Build Backend** | `npm install` + lint + unit tests | Validated source |
| 4 | **Docker Build** | Build frontend (Nginx) & backend images, tagged `BUILD_NUMBER` + `latest` | Immutable images |
| 5 | **Push to ECR** | Authenticate via AWS IAM, push both images to ECR repos | Published to registry |
| 6 | **Deploy to EKS** | `kubectl apply` → EKS rolling update + HPA config | Zero-downtime update |

> 🔐 **Security:** All secrets (AWS keys, MongoDB URI, kubeconfig) are stored as **encrypted Jenkins Credentials** and injected at runtime via `withCredentials{}`. No secrets are ever committed to source.

### Phase 3: Manual Kubernetes Deployment (Optional)

If deploying without Jenkins:

```bash
# Apply all Kubernetes manifests
kubectl apply -f k8s/

# Verify pods are running
kubectl get pods -n default

# Check the LoadBalancer external IP (use this to access the app)
kubectl get svc
```

---

## 📊 Monitoring & Observability

QuickLink ships with a full observability stack: **Prometheus** for metrics collection and **Grafana** for visualisation.

### Metrics Collected

The Node.js backend is instrumented with `prom-client` and exposes the following at `/metrics`:

| Metric | Description |
|---|---|
| `process_cpu_seconds_total` | Cumulative CPU time consumed by the Node process |
| `nodejs_heap_size_used_bytes` | Current V8 heap memory consumption |
| `nodejs_eventloop_lag_seconds` | Event loop delay — proxy for I/O blocking & responsiveness |
| `http_request_duration_seconds` | Per-route, per-status-code latency histogram |
| `http_requests_total` | Aggregated request counter by route and HTTP status |

### Accessing Grafana Dashboards

**Option A — Kubernetes Port-Forward (Secure, Recommended for Local Review)**

```bash
# Forward Grafana service port to your local machine — no public exposure
kubectl port-forward svc/grafana 3000:3000 -n monitoring

# Open in your browser
open http://localhost:3000
# Default credentials: admin / admin (change on first login)
```

**Option B — AWS Load Balancer (Configured for Demo/Review)**

In the production deployment, Grafana is exposed via an AWS Application Load Balancer. Retrieve the endpoint with:

```bash
kubectl get svc grafana -n monitoring
# Use the EXTERNAL-IP value from the output
```

### Pre-Configured Dashboard Panels

- 📈 **CPU Utilisation (%)** — Real-time + historical per-pod CPU, correlated with traffic events
- 💾 **Memory Consumption (MB)** — Heap allocated, heap used, total RSS — enables leak detection
- 🌐 **HTTP Request Rate (req/s)** — Aggregated and per-route throughput for load characterisation
- 🚨 **HTTP Error Rate (%)** — Proportion of `4xx`/`5xx` responses — immediate degradation signal
- ⏱️ **Event Loop Lag (ms)** — Sensitive indicator of CPU starvation or blocking I/O

> 🔔 **Alerting:** Grafana alerts fire via webhook or email when error rate exceeds **5% over a 5-minute window** or memory approaches the configured container limit.

---

## 🗺️ Roadmap & Future Enhancements

| Enhancement | Description |
|---|---|
| 🔐 **User Authentication** | JWT/OAuth 2.0 multi-user support with personalised dashboards (Passport.js / Auth0) |
| 🏷️ **Custom Vanity Links** | User-defined short codes (e.g., `/my-project`) with availability validation |
| ⚡ **Redis Caching Layer** | In-memory cache for high-frequency redirect lookups — target sub-millisecond latency |
| 🌍 **Advanced Analytics** | Geographic origin, referrer URL, device/browser classification per click event |
| ⏳ **Link Expiration & QR Codes** | TTL-based expiry via Kubernetes CronJob + dynamic QR code generation |
| 📦 **Helm Chart Packaging** | Parameterised Helm chart for multi-environment deployment + ArgoCD GitOps integration |
| 🕸️ **Service Mesh (Istio)** | mTLS inter-service encryption, canary deployments, distributed tracing (Jaeger/Zipkin) |

---

## 🤝 Contributing

Contributions are welcome. Please follow the standard GitHub workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request against `main`

Please ensure all tests pass and linting is clean before opening a PR.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Vecha Laxmi Swaraj Babu**
B.E./B.Tech — Computer Science & Engineering / DevOps

[![GitHub](https://img.shields.io/badge/GitHub-Swarajbabu-181717?style=flat-square&logo=github)](https://github.com/Swarajbabu)

---

<div align="center">

*Built with ❤️ using the MERN stack · Deployed on AWS EKS · Automated end-to-end with Jenkins*

⭐ If you found this project useful, please consider giving it a star!

</div>
