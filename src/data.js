export const buses = [
  {
    id: "6aa5ad3b32b2353527fd946b",
    number: "101",
    route: "Galgotias University → Knowledge Park 2",
    status: "Live",
    next: "Knowledge Park 2",
    eta: 20,
    lat: 28.365845,
    lng: 77.540382
  },
  {
    id: "BUS204",
    number: "204",
    route: "Sector 18 → Greater Noida",
    status: "Live",
    next: "Alpha 1",
    eta: 11,
    lat: 28.474,
    lng: 77.514
  },
  {
    id: "BUS305",
    number: "305",
    route: "Botanical Garden → Pari Chowk",
    status: "Delayed",
    next: "Noida Sector 62",
    eta: 18,
    lat: 28.629,
    lng: 77.374
  },
  {
    id: "BUS410",
    number: "410",
    route: "Knowledge Park → City Center",
    status: "Live",
    next: "Depot",
    eta: 4,
    lat: 28.458,
    lng: 77.491
  }
];

export const routes = [
  {
    id: "R101",
    name: "Route 101",
    from: "Galgotias University",
    to: "Knowledge Park 2",
    stops: 6,
    active: 1,
    path: [
      [28.36715, 77.54208],
      [28.38000, 77.53500],
      [28.39500, 77.52700],
      [28.41000, 77.52000],
      [28.42500, 77.51300],
      [28.44000, 77.50700],
      [28.45000, 77.50300],
      [28.45700, 77.50030]
    ]
  },
  {
    id: "R204",
    name: "Route 204",
    from: "Sector 18",
    to: "Greater Noida",
    stops: 11,
    active: 3
  },
  {
    id: "R305",
    name: "Route 305",
    from: "Botanical Garden",
    to: "Pari Chowk",
    stops: 9,
    active: 1
  }
];

export const stops = [
  {
    id: "S1",
    name: "Galgotias University",
    routes: ["101"],
    eta: "Start",
    position: [28.36715, 77.54208]
  },
  {
    id: "S2",
    name: "Yamuna Expressway",
    routes: ["101"],
    eta: "Coming soon",
    position: [28.39000, 77.53000]
  },
  {
    id: "S3",
    name: "Knowledge Park 1",
    routes: ["101"],
    eta: "Coming soon",
    position: [28.44000, 77.50700]
  },
  {
    id: "S4",
    name: "Knowledge Park 2 Metro",
    routes: ["101"],
    eta: "Coming soon",
    position: [28.45000, 77.50300]
  },
  {
    id: "S5",
    name: "Knowledge Park 2",
    routes: ["101"],
    eta: "20 min",
    position: [28.45700, 77.50030]
  }
];