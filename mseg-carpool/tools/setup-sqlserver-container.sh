#!/bin/bash

# Function to download the latest SQL Server image
download_sqlserver_image() {
    echo "Downloading the latest SQL Server image..."
    docker pull mcr.microsoft.com/mssql/server:latest
    if [ $? -ne 0 ]; then
        echo "Failed to download SQL Server image."
        exit 1
    fi
    echo "SQL Server image downloaded successfully."
}

# Function to run the SQL Server container
run_sqlserver_container() {
    local container_name="$1"
    local port="$2"
    local sa_password="$3"

    echo "Running SQL Server container..."
    docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=$sa_password" -p "$port:1433" --name "$container_name" -d mcr.microsoft.com/mssql/server:latest
    if [ $? -ne 0 ]; then
        echo "Failed to run SQL Server container."
        exit 1
    fi
    echo "SQL Server container is running."
}

# Main script execution
echo "Starting SQL Server setup..."

# Define parameters for the SQL Server container
container_name="sqlserver"
port=1433
sa_password="P@ssw0rd"

echo "Downloading the SQL Server image..."
download_sqlserver_image

echo "Running the SQL Server container..."
run_sqlserver_container "$container_name" "$port" "$sa_password"

echo "Script execution completed."
