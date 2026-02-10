# Base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution projects
COPY Eventi.Api/Eventi.Api.csproj Eventi.Api/
COPY Eventi.Application/Eventi.Application.csproj Eventi.Application/
COPY Eventi.Infrastructure/Eventi.Infrastructure.csproj Eventi.Infrastructure/
COPY Eventi.Domain/Eventi.Domain.csproj Eventi.Domain/

RUN dotnet restore Eventi.Api/Eventi.Api.csproj

# Copy everything else
COPY . .

RUN dotnet publish Eventi.Api/Eventi.Api.csproj -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Eventi.Api.dll"]
