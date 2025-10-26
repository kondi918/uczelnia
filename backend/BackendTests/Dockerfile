FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-tests
WORKDIR /app

# Kopiujemy pliki projektów
COPY Backend/Backend.csproj ./Backend/
COPY BackendTests/BackendTests.csproj ./BackendTests/

# Przywracamy zale¿noœci
RUN dotnet restore ./Backend/Backend.csproj
RUN dotnet restore ./BackendTests/BackendTests.csproj

# Kopiujemy ca³y kod Ÿród³owy
COPY Backend/ ./Backend/
COPY BackendTests/ ./BackendTests/

# Budujemy testy
RUN dotnet build ./BackendTests/BackendTests.csproj

# Domyœlny CMD
CMD ["dotnet", "test", "/app/BackendTests/BackendTests.csproj", "--logger:trx"]
