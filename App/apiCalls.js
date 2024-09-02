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
            console.log(data);
            return data;
            
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}
