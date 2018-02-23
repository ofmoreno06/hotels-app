# Almundo test API Documentation.

## Hotel objetct

HOTELS: a hotel object is represented
by 

		<hotel>	{
		  id: <int>,
		  name: <string>,
		  stars: <int>,
		  price: <float, 2>,
		  image: <string>,
		  amenities: <string>[]
		}

## Get hotels list
method: GET  
endpoint: /api/hotels  
params:   

 - name: <string>
 - stars: <int>
 - TO DO: price: <float>
 - TO DO: amenities: <string>

response:  

-201 ok

   	<hotel>[]

-400 bad request

	  {
	    msg: <string>,
	     errorCode: <string>
	  }

-500 Internal Server Error

	  {
	    msg: <string>,
	    errorCode: <string>
	  }


## Get hotel by id
method: GET  
endpoint: /api/hotels/id  
response:  

-201 ok

   	<hotel>

-400 bad request

	  {
	    msg: <string>,
	    errorCode: <string>
	  }

-500 Internal Server Error

    {
      msg: <string>,
      errorCode: <string>
    }


## TO DO: post hotels
method: POST  
endpoint: /api/hotels  
requestBody: <hotel> (without id)  
response: 

- 201 ok

		<hotel> (with id)
- 400 bad request

		{
		 msg: <string>,
		 errorCode: <string>
		}

- 500 Internal Server Error
		{
		 msg: <string>,
		 errorCode: <string>
		}



## TO DO: Put hotel
method: PUT  
endpoint: /api/hotels/id  
requestBody: <hotel>  
response:  

-200 ok

   	<hotel> (with id)

-400 bad request

    {
      msg: <string>,
      errorCode: <string>
    }

-500 Internal Server Error

    {
      msg: <string>,
      errorCode: <string>
    }

## TO DO: Delete hotel
method: DELETE  
endpoint: /api/hotels/id  
response:  

-200 ok

    {
      msg:<string>
    }

-400 bad request

    {
      msg: <string>,
      errorCode: <string>
    }

-500 Internal Server Error

    {
      msg: <string>,
      errorCode: <string>
    }
