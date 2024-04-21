import { Grid, IconButton } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../input";
import { Search } from "@mui/icons-material";
import { Button } from "../button";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

type Props = {
  handleAddToLocationList: (location: string) => void;
};

const GoogleMapsSearch: React.FC<Props> = ({ handleAddToLocationList }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAqVDRh43Ky7gyX48LVnJQDTMr_wbz6mNA",
    libraries: ["places"],
  });

  const searchBox = useRef<HTMLInputElement>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [lastSearchResult, setLastSearchResult] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [markers, setMarkers] = useState([]);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const addMarker = useCallback(
    (location) => {
      if (!map) return;
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: location.address,
      });

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    },
    [map]
  );

  const onPlacesChanged = useCallback(() => {
    const places = searchBox.current?.value;
    if (!places || !map) return;

    const service = new google.maps.places.PlacesService(map);
    service.textSearch({ query: places }, (results, status) => {
      console.log("Search status:", status);
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results.length > 0
      ) {
        const firstResult = results[0];
        console.log("Search result:", firstResult);
        map.fitBounds(firstResult.geometry.viewport);
        map.setCenter(firstResult.geometry.location);
        addMarker(firstResult.geometry.location);
        setLastSearchResult(firstResult);
      } else {
        console.log("No results found or error occurred.");
      }
    });
  }, [map, addMarker]);

  const handleAddToList = useCallback(() => {
    onPlacesChanged();
    console.log(lastSearchResult);
    if (lastSearchResult) {
      console.log("Add to list:", lastSearchResult.formatted_address);
      handleAddToLocationList(lastSearchResult.formatted_address ?? "");
    } else {
      console.log("No location selected");
    }
  }, [lastSearchResult]);

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  useEffect(() => {
    return () => {
      clearMarkers();
    };
  }, [onPlacesChanged]);

  return isLoaded ? (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        style={{ marginBottom: "2rem" }}
      >
        <Grid item xs={10}>
          <Input
            placeholder="Search Google Maps"
            fullWidth
            inputRef={searchBox}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={onPlacesChanged}
                  style={{ cursor: "pointer" }}
                >
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleAddToList}>Add to list</Button>
        </Grid>
      </Grid>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default memo(GoogleMapsSearch);
