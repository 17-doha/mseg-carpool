# Function to download the latest SQL Server image
function Download-SqlServerImage {
    try {
        Write-Output "Downloading the latest SQL Server image..."
        docker pull mcr.microsoft.com/mssql/server:latest
        Write-Output "SQL Server image downloaded successfully."
    } catch {
        Write-Error "Failed to download SQL Server image."
        exit 1
    }
}

# Function to run the SQL Server container
function Run-SqlServerContainer {
    param (
        [string]$ContainerName = "sqlserver",
        [int]$Port = 1433,
        [string]$SA_Password = "YourStrong!Passw0rd"
    )
    
    try {
        Write-Output "Running SQL Server container..."
        docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=$SA_Password" -p "$Port`:1433" --name $ContainerName -d mcr.microsoft.com/mssql/server:latest
        Write-Output "SQL Server container is running."
    } catch {
        Write-Error "Failed to run SQL Server container."
        exit 1
    }
}

# Main script execution
Write-Output "Starting SQL Server setup..."

Write-Output "Downloading the SQL Server image..."
Download-SqlServerImage

# Define parameters for the SQL Server container
$containerName = "sqlserver"
$port = 1433
$saPassword = "P@ssw0rd"

Write-Output "Running the SQL Server container..."
Run-SqlServerContainer -ContainerName $containerName -Port $port -SA_Password $saPassword
Write-Output "Script execution completed."
