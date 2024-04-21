"use client";
import { Button, List, Modal, SnackBar } from "@/components";
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
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    variant: "info",
  });

  const handleSavePin = (newPinData: LocationDTO) => {
    if (modalInfo.current.newPin) {
      const response = AddLocationToLocationsList(newPinData);
      if (response) {
        updateList();
      } else {
        setOpenSnackbar({
          open: true,
          message: "Something went wrong",
          variant: "error",
        });
      }
    } else {
      const response = UpdateLocationsList(
        {
          location: modalInfo.current.location,
          pin: modalInfo.current.pin,
        },
        newPinData
      );
      if (response) {
        updateList();
      } else {
        setOpenSnackbar({
          open: true,
          message: "Something went wrong",
          variant: "error",
        });
      }
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

    if (response) {
      updateList();
    } else {
      setOpenSnackbar({
        open: true,
        message: "Something went wrong",
        variant: "error",
      });
    }
    handleCloseModal();
  };

  const handleSelectedRow = (row: LocationDTO) => {
    handleOpenModal({ location: row.location, newPin: false, pin: row.pin });
  };

  const updateList = () => {
    setOpenSnackbar({
      open: true,
      message: "List Updated",
      variant: "success",
    });
    const updatedList = getLocationsList();
    setList(updatedList);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar({
      open: false,
      message: "",
      variant: openSnackbar.variant,
    });
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
      <SnackBar
        handleClose={handleCloseSnackbar}
        message={openSnackbar.message}
        open={openSnackbar.open}
        variant={openSnackbar.variant}
      />
    </S.Container>
  );
}
