import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

// 全ての場所を表示
function Allplaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces(curPlaces => [...curPlaces, route.params.place])
    }
  }, [isFocused, route]);
  return <PlacesList places={loadedPlaces}/>;
}

export default Allplaces;
