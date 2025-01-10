import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export const getMultipartHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "multipart/form-data"
	}
}

//This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

    console.log(getHeader())

	const response = await api.post("/rooms/add/new-room", formData,{
		headers: getMultipartHeader()
	})
	if (response.status === 201) {
		return true
	} else {
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
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        })
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
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: getMultipartHeader()
    })
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
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
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

//This function registers a new user
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

//This function logs in a registered user
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

//This functions gets a user profile
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}


//This function deletes a user
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}


//This function gets a user
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

//This function gets all users
export async function getAllUsers() {
    try {
        const response = await api.get(`/users/all`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
		console.log(error.message)
		console.log(error)
        throw new Error(`Error fetching users: ${error.message}`);
    }
}


//This function gets bookings by user sub
export async function getBookingsByUserSub(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}


//This functions gets fullname by user sub
export async function getFullNameBySub(userId){
    try {
		const response = await api.get(`/users/${userId}/fullname`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching fullname:", error.message)
		throw new Error("Failed to fetch fullname")
	}
}

