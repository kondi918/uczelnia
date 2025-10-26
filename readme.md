## 1. Opis projektu
Projekt składa się z trzech głównych komponentów:
- **Backend** (.NET 8) – API obsługujące dane,
- **Frontend** (Angular) – interfejs użytkownika,
- **MongoDB** – baza danych.

Dodatkowo w projekcie znajdują się testy integracyjne (`BackendTests`), które sprawdzają poprawność działania API.

---

## 2. Wymagania
- Docker >= 24
- Docker Compose >= 2
- (opcjonalnie) Visual Studio / VS Code z obsługą .NET 8 i Node.js

---

## 3. Uruchamianie środowiska developerskiego

1. Skopiuj plik `.env.example` do `.env` i ustaw zmienne środowiskowe:

```bash
cp .env.example .env


2. Uruchom kontenery w trybie developerskim

docker-compose -f docker-compose.dev.yml up --build

kontenery w projekcie:

-backend – backend API (.NET 8),
-frontend – frontend (NGINX/React),
-mongo – baza danych,
-tests – testy integracyjne (uruchamiane ręcznie lub przy starcie kontenera)

## 4. Uruchamianie środowiska produkcyjnego

1. Zbuduj i uruchom kontenery w trybie produkcyjnym:

docker-compose -f docker-compose.prod.yml up --build -d

## 5. Zarządzanie Docker / Docker Compose

Budowanie wszystkich kontenerów:
docker-compose build

Uruchamianie wszystkich usług:
docker-compose up

Uruchamianie w tle (detached):
docker-compose up -d

Wyświetlanie logów konkretnego kontenera:
docker logs -f <nazwa_kontenera>

Zatrzymanie wszystkich kontenerów:
docker-compose down

Wyświetlenie listy wszystkich kontenerów:
docker ps -a


## 6. Uruchamianie testów integracyjnych

1. Lokalnie w Visual Studio - wystarczy odpalic projekt i nacisnac run test. Automatycznie zostanie zaciagniety localhost. Warunek, to miec odpalone kontenery w trybie dev

2. W kontenerze Docker -docker-compose run --rm tests  lub ręcznie w Docker Desktop odpalic. W logach beda widoczne wyniki.



----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Krotki wniosek - Meczylem sie niemilosiernie z tymi testami, bo cos nie chcialo czytac mojego projektu testowego w .necie. Ale jestem dumny, ze nie uzylem do tego polecanego przez wszystkich Pythona, bo g*wna sie nie tyka. Pozdrawiam


