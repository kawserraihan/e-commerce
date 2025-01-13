import Cookies from 'js-cookie';

export const getUserFromCookie = () => {
  try {
    const encodedUser = Cookies.get('user'); // Get the cookie value
    if (!encodedUser) {
      console.error("No user cookie found");
      return null;
    }
    const decodedUser = decodeURIComponent(encodedUser); // Decode the URL-encoded string
    const userObject = JSON.parse(decodedUser); // Parse the JSON string
    return userObject;
  } catch (error) {
    console.error("Error decoding or parsing user cookie:", error);
    return null;
  }
};
  
