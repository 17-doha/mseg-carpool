import internal from "stream";

export interface Driver {
    driverID: string;
    driverName: string;
    driverEmail: string;
    driverMobileNo: string;
    carType: string;
    carPlate: string;
    carColor: string;
    points: number;
  }
  
  export interface Ride {
    rideID: number;
    origin: string;
    destination: string;
    coordinates: string // 'originlat,originlng,destlat,destlng'
    departureDate: string;
    departureTime: string;
    availableSeats: number;
    driver: Driver;
  }

  export interface User {
    Id: string;
    Name: string;
    Email: string;
    MobileNumber: string;
    Location: string;
    Points: number;
    CarType: string | null;
    CarColor: string | null;
    CarPlate: string | null;
    CarMake: string | null;
  }