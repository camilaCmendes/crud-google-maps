"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../button";
import { Input } from "../input";
import * as S from "./styles";
import { useEffect } from "react";
import { LocationDTO } from "@/dto/locationDTO";

const pinSchema = yup.object({
  pin: yup.string().required("Enter a pin to save the location"),
  location: yup.string().required("Enter a locationEnter a location"),
});

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSave: (newPin: LocationDTO) => void;
  handleRemovePin: (removePin: LocationDTO) => void;
  newPin?: boolean;
  location?: string;
  pin?: string;
};

export const Modal: React.FC<Props> = ({
  open,
  handleClose,
  handleSave,
  handleRemovePin,
  newPin,
  location,
  pin,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(pinSchema),
    defaultValues: {
      pin: "",
      location: "",
    },
  });

  useEffect(() => {
    if (location) {
      reset({
        pin,
        location,
      });
    }
  }, [location, reset]);

  const handleRemove = () => {
    console.log({ newPin });
    if (!newPin) {
      handleRemovePin({ location: location ?? "", pin: pin ?? "" });
    }
    handleClose();
  };

  return (
    <S.Modal open={open} onClose={handleClose}>
      <Grid container direction={"column"} alignItems={"stretch"} rowGap={2}>
        <Typography variant="h5" fontWeight={700}>
          {newPin ? "Adding new item" : "Edit item"}
        </Typography>
        <Controller
          control={control}
          name="pin"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Pin as home, work, academy..."
              label="Pin"
              onChange={onChange}
              value={value}
              error={!!errors.pin?.message}
              errorMessage={errors.pin?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="John Doe, 450 Maple Drive, Oakwood, Springfield, Illinois, 62704, United States."
              label="Location"
              onChange={onChange}
              value={value}
              error={!!errors.location?.message}
              errorMessage={errors.location?.message}
            />
          )}
        />
        <Grid item container columnGap={2} justifyContent={"flex-end"}>
          <Button color="error" onClick={handleRemove}>
            {newPin ? "Cancelar" : "Remover"}
          </Button>
          <Button onClick={handleSubmit(handleSave)}>Salvar</Button>
        </Grid>
      </Grid>
    </S.Modal>
  );
};
