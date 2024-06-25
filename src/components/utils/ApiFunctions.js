import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

//This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if(response.status === 201){
        return true
    }
    else{
        return false
    }
}

//This function gets all room types from the database
export async function getRoomTypes(){
    try{
        const response = await api.get("/rooms/room/types")
        return response.data
    }
    catch(error){
        throw new Error("Error fetching room types")
    }
}

//This function gets all the rooms from the database
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data;
    }
    catch(error){
        throw new Error("Error fetching rooms")
    }
}

//This function deletes a room by its id
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`)
		return result
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}

//This function updates a room by its id
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

//This functions gets a room by its id
export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }
    catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
}

//This function saves a new booking to a room by its id
export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
        
    }
    catch(error){
        // console.log("about to throw error")
        // console.log('error:')
        // console.log(error)
        // console.log("error.message:")
        // console.log(error.message)
        // console.log("error.response:")
        // console.log(error.response)
        // console.log("error.response.data:")
        // console.log(error.response.data)

        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

//This function gets all bookings
export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings")
        return result.data
    }
    catch(error){
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

//This functions get a booking by its confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    }   
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error fetching booking: ${error.message}`)
        }
        
    }
}

//This function deletes a booking
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    }
    catch(error){
        throw new Error(`Error cancelling booking: ${error.message}`)
    }
}

//This function gets all available rooms in the selected date range and with the selected room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    const result = await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result;
}