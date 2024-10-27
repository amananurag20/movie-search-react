# Movie Search App

A React-based application that allows users to search for movies using the OMDb API, view details, and manage a favorites list. Built with Redux for state management, this app provides a seamless user experience with a responsive design.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Project Setup](#project-setup)
- [Bonus Features](#bonus-features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Functionality**: Users can input a movie title into a search bar, and the app fetches results from the OMDb API.
- **Movie List Display**: Results are displayed in a list format, showcasing the movie's title, year, poster, and a brief description.
- **Movie Details View**: Users can click on a movie to view detailed information, including:
  - Director
  - Plot
  - IMDB Rating
  - Cast and Crew
- **Error Handling**: The app displays appropriate error messages if no movie is found or if there's an issue with the API.
- **Loading State**: A spinner or message is shown while data is being fetched.
- **Favorites List**: Users can add movies to a favorites list, which is saved in Redux, allowing for easy management and viewing.

## Requirements

1. **Frontend Framework**:
   - Built with React for building the user interface.
2. **State Management**:
   - Utilizes Redux for managing the application’s state effectively.
3. **API Integration**:
   - Integrates with the OMDb API (Open Movie Database) to fetch movie data based on user input.
   - [API Documentation](http://www.omdbapi.com/)
4. **User Experience Enhancements**:
   - Responsive design using Bootstrap.
   - Toast notifications for feedback on favorite additions/removals.

## Project Setup

1. **OMDb API Key**:
   - Obtain an API key by registering at [OMDb API](http://www.omdbapi.com/apikey.aspx).
2. **Redux Setup**:
   - Configured Redux store with reducers and actions to handle:
     - Movie search queries.
     - Managing the list of fetched movies.
     - Handling loading and error states.
3. **React Components**:
   - **Search Bar Component**: A form for user input of movie titles.
   - **Movie List Component**: Displays the list of movies returned from the search.
   - **Movie Details Component**: Shows detailed information of a selected movie.
   - **Loading and Error Components**: Optional components to display loading spinners and error messages.

## Bonus Features

1. **Pagination**: Added pagination for search results if the list is too long.
2. **Dark Mode**: Implemented a toggle for dark mode UI for better user experience.
3. **Styling**: Utilized Bootstrap for responsive design and improved UI/UX.
4. **Back Navigation**: Added back buttons to return to previous pages for improved navigation.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-search-app.git
   cd movie-search-app
   ```
