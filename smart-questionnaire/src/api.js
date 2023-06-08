import axios from 'axios';

const API_URL = 'https://zohoapis.eu/crm/v4/';
const TOKEN_URL = 'https://accounts.zoho.eu/oauth/v2/token';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;

const getAccessTokenFromRefreshToken = async () => {
  try {
    const response = await axios.post(TOKEN_URL, null, {
      params: {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }});

    return response.data.access_token;
  } catch (error) {
    if (REFRESH_TOKEN === '' || CLIENT_ID === '' || CLIENT_SECRET === '') {
        console.log('Please provide a refresh token, client ID and client secret');
    }   
    console.log('Error refreshing access token', error);
    return null;
  }
};


export const sendDataToZoho = async (data) => {
  let accessToken = localStorage.getItem('access_token');

  function mapQuestionnaireDataToZohoData(data) {
    return {
        "Skin_concerns": data[0].join(", "), // Joining array elements with comma
        "Skin_Type": data[1],
        "Okay_With_Needles": data[2],
        "Lead_Source": data[3],
        "Consultation_Type": data[4],
        "First_Name": data[5].first_name,
        "Last_Name": data[5].surname,
        "Email": data[5].email,
        "Asst_Phone": data[5].phone,
    };
    }

    const zohoData = mapQuestionnaireDataToZohoData(data);

  // If there's no access token in local storage, try to get a new one using the refresh token
  if (!accessToken) {
    accessToken = await getAccessTokenFromRefreshToken();

    if (!accessToken) {
      console.log('Failed to get access token');
      return;
    }

    localStorage.setItem('access_token', accessToken);
  }

  try {
    await axios.post(`${API_URL}Contacts`, {
        data: [
          {
            zohoData
          },
        ],
        trigger: ['approval', 'workflow', 'blueprint'],
      },
      {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log('Error updating Zoho contact', error);
  }
};
