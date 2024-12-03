
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch movies data asynchronously with async/await and a delay
export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
  try {
    // Simulate API delay with setTimeout
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
    throw error; // Propagate error to handle it in the reducer
  }
});

const MoviesSlice = createSlice({
  name: "MoviesSlice",
  initialState: {
    moviesData: {}, // Use an object to hold API response
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesData = action.payload; // Store the API response
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default MoviesSlice.reducer;
