
# Flight App Backend

This is the backend API for the Flight Reservation App (flight-app https://github.com/BCemreD/FlightApp/tree/main).  
It handles flights, reservations, and passenger creation via RESTful endpoints.

---

## ⚙️ Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS

---

## 📦 Install & Run

```bash
git clone https://github.com/your-username/flight-app-backend.git
cd flight-app-backend
npm install
npm run dev
```
Make sure your .env file includes:
```
PORT=5000
MONGO_URI=your_mongo_connection_string_here
NODE_ENV=development
```
## 🧩 Features
RESTful API for:

Flight search & retrieval

Passenger creation

Reservation creation (with auto-generated PNR)

Reservation lookup by PNR + last name

PNRs are shared per flight (it will be checked to be sure every flight has unique PNR, but not every reservation)

Auto-reset DB possible for development

## API Endpoints
Flights
GET /flights/locations
→ List of available city options

GET /flights/search
→ All flights (for local filtering)

GET /flights/all
→ All flights (admin or debug)

Reservations
POST /reservations/book
→ Body: { flightId, passengerList: [ { firstName, lastName, email } ] }

GET /reservations/find?pnr=PNR1234&lastName=Smith
→ Fetch reservation details

## 🔨 Models
Flight: from, to, departureTime, price

Passenger: firstName, lastName, email

Reservation: pnr, flight, passengers (list of Passenger references)

## 🚧 Next Steps
 Add user login system (auth + JWT)

 Create admin panel (add/edit/delete flights)

 Handle DB auto-reset for dev/testing mode only

