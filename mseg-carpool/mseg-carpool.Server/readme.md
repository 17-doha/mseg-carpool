# Development Environment Setup Guide

This guide will help you set up your local development environment. Follow the steps below to get started.

## Prerequisites

### 1. Install Visual Studio Code or Visual Studio Community Edition

You can choose either Visual Studio Code or Visual Studio Community Edition for your development environment.

- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Community Edition](https://visualstudio.microsoft.com/vs/community/)

### 2. Install Docker

Docker is required to run the SQL Server container. Please follow the instructions to install Docker on your operating system.

- **Docker for Windows:** [Download Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- **Docker for Linux:** Follow the instructions for your specific Linux distribution on the [Docker Engine installation page](https://docs.docker.com/engine/install/).

### 3. Install Git

Git is required to clone the repository. Please follow the instructions to install Git on your operating system.

- **Git for Windows:** [Download Git for Windows](https://gitforwindows.org/)
- **Git for Linux:** Follow the instructions for your specific Linux distribution on the [Git installation page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### 4. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://samir7osny@dev.azure.com/samir7osny/mseg-carpool/_git/mseg-carpool
```

### 5. Run the Setup Script

After installing Docker, run the appropriate setup script for your operating system to download the SQL Server image and run a SQL Server container.

#### Windows Users

Open PowerShell and navigate to the 'msegcarpool/tools' directory where the script is saved. Run the script using the following command:

```powershell
.\setup-sqlserver-container.ps1
```

#### Linux Users

Open a terminal and navigate to the directory where the script is saved. Make the script executable and run it using the following commands:

```bash
chmod +x setup-sqlserver-container.sh
./setup-sqlserver-container.sh
```

### 6. Download SQL Client

To connect to your SQL Server instance, you will need a SQL client. We recommend using DBeaver, which is a free and open-source SQL client. Alternatively, you can use Visual Studio SQL Explorer if you have Visual Studio installed.

- **DBeaver:** [Download DBeaver](https://dbeaver.io/download/)
- **Visual Studio SQL Explorer:** Use the SQL Explorer tool available in Visual Studio.

## Connecting to SQL Server

After running the setup script, SQL Server will be running in a Docker container. Use the following details to connect to your SQL Server instance:

- **Host:** `localhost`
- **Port:** `1433`
- **Username:** `sa`
- **Password:** `P@ssw0rd`

### Using DBeaver

1. Open DBeaver.
2. Click on "New Database Connection".
3. Select "SQL Server" and click "Next".
4. Enter the connection details:
   - **Server Host:** `localhost`
   - **Port:** `1433`
   - **Database:** `master` (or any other database name you want to connect to)
   - **Username:** `sa`
   - **Password:** `P@ssw0rd`
5. Click "Finish" to connect.

### Using Visual Studio SQL Explorer

1. Open Visual Studio.
2. Go to "View" > "SQL Server Object Explorer".
3. Click on the "Add SQL Server" button.
4. Enter the connection details:
   - **Server Name:** `localhost,1433`
   - **Authentication:** SQL Server Authentication
   - **Username:** `sa`
   - **Password:** `P@ssw0rd`
5. Click "Connect".

## Troubleshooting

If you encounter any issues, please check the following:
- Ensure Docker is installed and running.
- Ensure the setup script has been executed successfully.
- Verify the connection details (host, port, username, password) are correct.

For further assistance, please refer to your mentor.

Happy coding!

