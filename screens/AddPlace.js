import PlaceForm from "../components/Places/PlaceForm"

// 新しい場所を追加
function AddPlace({navigation}) {
  function createPlaceHandler(place){
    navigation.navigate('AllPlaces', {
      place: place
    })
  }
  return(
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  )
}

export default AddPlace