import React from 'react';
import {API} from '../config';


const ShowImage = ({item, url}) => (
    <div className="product-img">
        <img 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name} 
            className="mb-1 imgcardhome" 
            style={{ maxWidth: '100%', marginTop: '19px'}} 
        />
    </div>

);



export default ShowImage;