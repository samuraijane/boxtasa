import { createSlice } from '@reduxjs/toolkit';
import { ReduxStore } from '../types/interface';

export const setBaseUrl = () => {
  return {
    type: 'baseUrl/set',
    payload: window.location.origin
  }
};

export const baseUrlSlice = createSlice({
  name: 'baseUrl',
  initialState: window.location.origin.includes('localhost') ? 'http://localhost:8080' : window.location.origin, // L1
  reducers: {
    setBaseUrl: (state, action) => action.payload || state
  }
});

export const selectBaseUrl = (state: ReduxStore) => state.baseUrl;

export default baseUrlSlice.reducer;

/*

NOTES

[L1]
This allows clients on the same local network to access the application.
The client running the server uses `localhost` while others use the IP
address of said client (e.g. 192.168.4.33). To find the IP address,
execute `ipconfig getifaddr en0` in the terminal.

*/
