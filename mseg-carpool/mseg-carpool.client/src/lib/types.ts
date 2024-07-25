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