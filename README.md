Setup Steps :- 

•	Infrastructure As a Code (Terraform)
  1.	Provision EC2 instance for :-
    1.	Jenkins (CI/CD)
    2.	Application (Node.js GCS service)
    3.	Monitoring stack (Prometheus, Grafana)
    	
  2.	Used Terraform to :-
    1.	Define and launch EC2 instances
    2.  Set security groups
    3.	Output public Ips

•	Jenkins (CI/CD) pipeline stages on EC2 
  1.	Checkout
  2.	Install Dependencies
  3.	Lint
  4.	Test
  5.	Build Docker Image
  6.	Push to Docker Hub
  7.	Deploy using docker-compose

•	Application Setup (Dockerized the Telemetry Service)
  1.	Node.js app listens on /health and handles /telemetry
  2.	Created Dockerfile used for containerization.
  3.	Written Docker-Compose.yml for deployment of above application.
  4.	.env used for configuration with Jenkins credentials (Screenshot added in GitHub repo in Screenshots folder named (.env secrets in Jenkins))
   
•	Monitoring Setup
  1.	Prometheus scrapes metrics from EC2IP:3000/metrics
  2.	Grafana dashboards visualize metrics (Screenshot added for Dashboard)
  3.	Metrics: telemetry_received_total (Screenshots added for Query and Above dashboard)


Infra architecture diagram :-

<img width="940" height="336" alt="image" src="https://github.com/user-attachments/assets/f45f0537-c9e3-4cb1-a42c-10ef42b51b75" />


Key Decisions :- 

1. Jenkins - Flexible in Jenkins hence used it.
2. Docker - Used Docker for Containerization of our application.
3. Terraform - Used Terraform for creation of AWS resources.
4. Monitoring - Monitored application using Prometheus and Grafana.
5. Source Control - Used Github for Version control for source code management.
6. Deployment - Used Docker Compose becuase was asked to use it.
7. Port Mapping - Node.js (Application): 3000, Grafana (Dashboards): 3001, Prometheus: 9090 for clean access and avoid conflicts.







