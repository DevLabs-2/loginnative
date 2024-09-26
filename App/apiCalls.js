const server = "localhost:3000";

export default class ApiCalls {
    login = async (username, password) => {
        try {
            const response = await fetch(`http://${server}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    register = async (firstName, lastName, username, password) => {
        try {
            const response = await fetch(`http://${server}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    getEventsByPage = async (page) => {
        try {
            const response = await fetch(`http://${server}/api/event/${page-1}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}
