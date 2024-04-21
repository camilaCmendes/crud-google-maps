"use client";
import { Button, List, Modal } from "@/components";
import GoogleMapsSearch from "@/components/map";
import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { LocationDTO } from "@/dto/locationDTO";
import {
  AddLocationToLocationsList,
  RemoveLocationFromLocationsList,
  UpdateLocationsList,
  getLocationsList,
} from "@/storages/storageLocationsList";
import { Grid } from "@mui/material";

export default function Home() {
  const [open, setOpen] = useState(false);
  const modalInfo = useRef({ pin: "", location: "", newPin: false });
  const [list, setList] = useState<LocationDTO[]>([] as LocationDTO[]);

  const handleSavePin = (newPinData: LocationDTO) => {
    if (modalInfo.current.newPin) {
      const response = AddLocationToLocationsList(newPinData);
      if (response) updateList();
    } else {
      const response = UpdateLocationsList(
        {
          location: modalInfo.current.location,
          pin: modalInfo.current.pin,
        },
        newPinData
      );
      if (response) updateList();
    }
    handleCloseModal();
  };

  const handleAddToLocationList = (location: string) => {
    handleOpenModal({ location, newPin: true, pin: "" });
  };

  const handleOpenModal = ({
    location,
    newPin,
    pin,
  }: {
    location: string;
    newPin: boolean;
    pin: string;
  }) => {
    modalInfo.current = { location, newPin, pin };
    setOpen(true);
  };

  const handleCloseModal = () => {
    modalInfo.current = { pin: "", location: "", newPin: false };
    setOpen(false);
  };

  const handleRemovePin = (removePin: LocationDTO) => {
    const response = RemoveLocationFromLocationsList(removePin);

    if (response) updateList();
    handleCloseModal();
  };

  const handleSelectedRow = (row: LocationDTO) => {
    handleOpenModal({ location: row.location, newPin: false, pin: row.pin });
  };

  const updateList = () => {
    const updatedList = getLocationsList();
    setList(updatedList);
  };

  useEffect(() => {
    updateList();
  }, []);

  return (
    <S.Container>
      <GoogleMapsSearch handleAddToLocationList={handleAddToLocationList} />
      <div style={{ marginBottom: "2rem" }} />
      <List rows={list} handleSelectedRow={handleSelectedRow} />
      <Modal
        open={open}
        {...modalInfo.current}
        handleSave={handleSavePin}
        handleClose={handleCloseModal}
        handleRemovePin={handleRemovePin}
      />
    </S.Container>
  );
}
