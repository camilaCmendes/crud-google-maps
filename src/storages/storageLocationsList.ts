import { LocationDTO } from "@/dto/locationDTO";
import { LOCATIONS_LIST } from "./storage.config";

export const getLocationsList = (): LocationDTO[] => {
  const data = localStorage.getItem(LOCATIONS_LIST);

  const response = data ? JSON.parse(data) : ([] as LocationDTO[]);

  return response;
};

export const AddLocationToLocationsList = (item: LocationDTO) => {
  if (verifyPinInUse(item)) {
    return false;
  }
  const list = getLocationsList();

  localStorage.setItem(LOCATIONS_LIST, JSON.stringify([...list, item]));
  return true;
};

export const RemoveLocationFromLocationsList = (item: LocationDTO) => {
  if (!verifyPinInUse(item)) {
    return false;
  }
  const list = getLocationsList();

  const newList = list.filter(
    (el) => el.pin.toLowerCase() !== item.pin.toLowerCase()
  );

  localStorage.setItem(LOCATIONS_LIST, JSON.stringify([...newList]));
  return true;
};

export const UpdateLocationsList = (
  previousLocation: LocationDTO,
  newLocation: LocationDTO
) => {
  if (verifyPinInUse(newLocation)) {
    return false;
  }
  const list = getLocationsList();

  const newList = list.filter(
    (el) => el.pin.toLowerCase() !== previousLocation.pin.toLowerCase()
  );
  localStorage.setItem(
    LOCATIONS_LIST,
    JSON.stringify([...newList, newLocation])
  );
  return true;
};

const verifyPinInUse = (item: LocationDTO) => {
  const list = getLocationsList();
  return list.some((el) => el.pin.toLowerCase() === item.pin.toLowerCase());
};
