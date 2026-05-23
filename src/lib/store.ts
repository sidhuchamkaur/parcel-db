// src/lib/store.ts

const INITIAL_PARCELS = [
  { id: "P101", from: "Mumbai", to: "Pune", weight: "2kg", status: "In Transit", travelerId: "T201", price: 250, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "P102", from: "Delhi", to: "Jaipur", weight: "5kg", status: "Pending", travelerId: null, price: 400, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "P103", from: "Bangalore", to: "Chennai", weight: "1kg", status: "Delivered", travelerId: "T202", price: 150, createdAt: new Date(Date.now() - 172800000).toISOString() }
];

const INITIAL_TRAVELERS = [
  { id: "T201", name: "Rahul Sharma", route: "Mumbai -> Pune", vehicle: "Car", rating: 4.8, completedTrips: 42, active: true, kycStatus: "Approved", docType: "Aadhaar + Selfie" },
  { id: "T202", name: "Anjali Gupta", route: "Bangalore -> Chennai", vehicle: "Train", rating: 4.9, completedTrips: 15, active: false, kycStatus: "Pending", docType: "Passport" }
];

const INITIAL_ROUTES = [
  { id: "R101", from: "Mumbai", to: "Pune", createdBy: "Admin", createdAt: new Date().toISOString() }
];

const INITIAL_CHARGES = [
  { id: "C101", travelerId: "T201", from: "Mumbai", to: "Pune", charge: 250, status: "Approved" },
  { id: "C102", travelerId: "T202", from: "Bangalore", to: "Chennai", charge: 400, status: "Pending" }
];

function getData(key: string, initialData: any) {
  if (typeof window === 'undefined') return initialData;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initialData;
}

function saveData(key: string, data: any) {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(data));
}

export const api = {
  getParcels: () => Promise.resolve(getData('parcels', INITIAL_PARCELS)),
  createParcel: (parcel: any) => {
    const parcels = getData('parcels', INITIAL_PARCELS);
    const newParcel = { id: "P" + Math.floor(Math.random() * 1000 + 100), ...parcel, status: "Pending", travelerId: null, createdAt: new Date().toISOString() };
    parcels.push(newParcel);
    saveData('parcels', parcels);
    return Promise.resolve(newParcel);
  },
  acceptParcel: (id: string, travelerId: string) => {
    let parcels = getData('parcels', INITIAL_PARCELS);
    parcels = parcels.map((p: any) => p.id === id ? { ...p, status: "In Transit", travelerId } : p);
    saveData('parcels', parcels);
    return Promise.resolve();
  },

  getTravelers: () => Promise.resolve(getData('travelers', INITIAL_TRAVELERS)),
  createTravelPlan: (plan: any) => {
    const travelers = getData('travelers', INITIAL_TRAVELERS);
    const newTraveler = { id: "T" + Math.floor(Math.random() * 1000 + 100), name: "Current Traveler", route: `${plan.from} -> ${plan.to}`, vehicle: plan.vehicle, rating: 5.0, completedTrips: 0, active: true, ...plan };
    travelers.unshift(newTraveler);
    saveData('travelers', travelers);
    return Promise.resolve(newTraveler);
  },

  updateLocation: (id: string, lat: number, lng: number) => {
    let travelers = getData('travelers', INITIAL_TRAVELERS);
    travelers = travelers.map((t: any) => t.id === id ? { ...t, currentLocation: { lat, lng } } : t);
    saveData('travelers', travelers);
    return Promise.resolve();
  },
  submitKyc: (id: string, docType: string) => {
    let travelers = getData('travelers', INITIAL_TRAVELERS);
    travelers = travelers.map((t: any) => t.id === id ? { ...t, kycStatus: "Pending", docType } : t);
    saveData('travelers', travelers);
    return Promise.resolve();
  },
  approveKyc: (id: string) => {
    let travelers = getData('travelers', INITIAL_TRAVELERS);
    travelers = travelers.map((t: any) => t.id === id ? { ...t, kycStatus: "Approved" } : t);
    saveData('travelers', travelers);
    return Promise.resolve();
  },
  rejectKyc: (id: string) => {
    let travelers = getData('travelers', INITIAL_TRAVELERS);
    travelers = travelers.map((t: any) => t.id === id ? { ...t, kycStatus: "Rejected" } : t);
    saveData('travelers', travelers);
    return Promise.resolve();
  },

  getRoutes: () => Promise.resolve(getData('routes', INITIAL_ROUTES)),
  createRoute: (route: any) => {
    const routes = getData('routes', INITIAL_ROUTES);
    const newRoute = { id: "R" + Date.now(), ...route, createdAt: new Date().toISOString() };
    routes.unshift(newRoute);
    saveData('routes', routes);
    return Promise.resolve(newRoute);
  },

  getCharges: () => Promise.resolve(getData('charges', INITIAL_CHARGES)),
  createCharge: (charge: any) => {
    const charges = getData('charges', INITIAL_CHARGES);
    const newCharge = { id: "C" + Date.now(), status: "Pending", ...charge };
    charges.unshift(newCharge);
    saveData('charges', charges);
    return Promise.resolve(newCharge);
  },
  approveCharge: (id: string) => {
    let charges = getData('charges', INITIAL_CHARGES);
    charges = charges.map((c: any) => c.id === id ? { ...c, status: "Approved" } : c);
    saveData('charges', charges);
    return Promise.resolve();
  },

  getStats: () => {
    const parcels = getData('parcels', INITIAL_PARCELS);
    const travelers = getData('travelers', INITIAL_TRAVELERS);
    return Promise.resolve({
      activeTravelers: travelers.filter((t:any) => t.active).length,
      deliveriesToday: parcels.filter((p:any) => p.status === "Delivered").length || 45,
      citiesCovered: 15,
      revenueSaved: 25000
    });
  }
};
