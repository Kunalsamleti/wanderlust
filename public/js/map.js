
  
  mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://style/mapbox/streets-v12",
        center: list.geometry.coordinates, // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
    // console.log(coordinates);
    console.log(list.geometry.coordinates);
    const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(list.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${list.location}</h4><p>exact location provided after booking welcome to <b>${list.title}</b></p>`))
    .addTo(map);
