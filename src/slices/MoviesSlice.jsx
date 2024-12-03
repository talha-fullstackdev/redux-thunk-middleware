
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchMovies = createAsyncThunk("fetchMovies", async () => { // Fetch movies data asynchronously with async/await and a delay
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=97b85a3e493dbe5c6ec0337641ae6907"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    throw error; 
  }
});

const MoviesSlice = createSlice({
  name: "MoviesSlice",
  initialState: {
    moviesData: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {     // biuilders to listen to async function
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesData = action.payload; 
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; 
      });
  },
});

export default MoviesSlice.reducer;
