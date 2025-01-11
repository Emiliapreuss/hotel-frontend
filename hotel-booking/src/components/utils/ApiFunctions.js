import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:9192"
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export async function loginUser(credentials) {
    try {
        const response = await api.post("/auth/login", credentials);
        if (response.status === 200) {
            const token = response.data; // Assuming the backend returns the token as plain text
            // Store the token for future authenticated requests
            localStorage.setItem("authToken", token);
            return true;
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error logging in: ${error.message}`);
        }
    }
}

export async function registerUser(userDetails) {
    try {
        const response = await api.post("/auth/register", userDetails);
        if (response.status === 200 || response.status === 201) {
            return true; // Registration successful
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data); // Backend error message
        } else {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }
}


export async function addRoom(photo, type, price) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("type", type)
    formData.append("price", price)

    const response = await api.post("/rooms/add", formData)
    if(response.status === 201) {
        return true
    }
    else {
        return false
    }
}

export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        return response.data
    }
    catch(error) {
        throw new Error(`Error fetching room types: ${error.message}`)
    }
}

export async function getAllRooms() {
    try {
        const result = await api.get("/rooms")
        return result.data
    } catch (error) {
        throw new Error(`Error fetching rooms: ${error.message}`)
    }
    
}

export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${roomId}: ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("type", roomData.type)
    formData.append("price", roomData.price)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${roomId}: ${error.message}`)
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

export async function getAllBookingsByRoomId(roomId) {
    try {
        const result = await api.get(`/bookings/${roomId}`)
        return result.data
    } catch (error) {
         throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

export async function getAllBookingsByUser() {
    try {
        const result = await api.get(`/bookings/user`)
        return result.data
    } catch (error) {
         throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
       try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
         if (error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error finding room: ${error.message}`)
        }
    } 
}

export async function cancelBooking(confirmationCode) {
    try {
        const result = await api.delete(`/bookings/booking/${confirmationCode}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`)
    }
}