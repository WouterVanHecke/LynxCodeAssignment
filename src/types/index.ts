export type ParkingStructure = {
  name: string;
  description: string;
  isOpen: boolean;
  availableSpaces: number;
  address: string;
  openingHours: string;
  websiteUrl: string;
  operator: string;
  category: string;
  type: string;
};

export enum Sorting {
  Name = "NAME",
  AvailableSpaces = "AVAILABLE SPACES",
}

export enum SortingDirection {
  Descending = "DESC",
  Ascending = "ASC",
}
