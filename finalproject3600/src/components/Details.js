import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react'; //using google to generate maps
import Comments from './Comments'



function Details() {
  const { id } = useParams();  //uses the id that comes from the Shelter
  const [data, setData] = useState([]);
  const [comments, setComment] = useState([]);
  const [test, setest] = useState([]);
  

  

  //fetch the API again
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://opendata.vancouver.ca/api/records/1.0/search/?dataset=homeless-shelter-locations&q=&rows=61&facet=facility&facet=category&facet=meals&facet=pets&facet=carts&facet=geo_local_area');
      const json = await response.json();
      setData(json.records);
    }

    fetchData();
  }, []);
  

  const shelter = data.find((item) => item.recordid === id); //looks for the element in the JSON that is equal to the id that comes in the URL
  
  
  return (   //returns JSX with info from the Shelter that matches above
    <div className="container">
      {shelter && (
        <div className="shelter">
          <h2 className="main-title">{shelter.fields.facility}</h2>
          <div className="main-information">
          <div className="shelter-info">
              <div className="logo">
                <img src="/images/category.png" alt="Logo" width={25} height={25}/>
              </div>
              <div className="content-shelter">
                <p>Category: {shelter.fields.category}</p>
              </div>
            </div>
            <div className="shelter-info">
              <div className="logo">
                <img src="/images/phone.png" alt="Logo" width={25} height={25}/>
              </div>
              <div className="content-shelter">
                <p>Phone: {shelter.fields.phone}</p>
              </div>
            </div>
            <div className="shelter-info">
              <div className="logo">
                <img src="/images/coffee.png" alt="Logo" width={25} height={25}/>
              </div>
              <div className="content-shelter">
                <p>Meals: {shelter.fields.meals}</p>
              </div>
            </div>
            <div className="shelter-info">
              <div className="logo">
                <img src="/images/paw-filled.png" alt="Logo" width={25} height={25}/>
              </div>
              <div className="content-shelter">
                <p>Pets allowed? {shelter.fields.pets}</p>
              </div>
            </div>
            <div className="shelter-info">
              <div className="logo">
                <img src="/images/shopping-cart.png" alt="Logo" width={25} height={25}/>
              </div>
              <div className="content-shelter">
                <p>Carts allowed? {shelter.fields.carts}</p>
              </div>
            </div>
            <div className="shelter-info">
              <div className="logo">
                <img src="/images/current-location.png" alt="Logo" width={25} height={25}/>
              </div>
              <div className="content-shelter">
                <p>Location Area: {shelter.fields.geo_local_area}</p>
              </div> 
            </div>
          </div>
         
        </div>  
          
        
      )}
       
     
      <Comments
      
      id ={id}  /> 
      
    </div>
    
  );
  
}

export default Details; 