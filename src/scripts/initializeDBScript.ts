import * as GenerateUser from './generateUsersScript';
import * as GenerateMovies from './generateMoviesScript';
import * as GenerateTVShows from './generateTvShowsScript';


(async () => {
    await GenerateMovies.generateMovies().catch(err => console.error('Error generating movies:', err));;
    await GenerateUser.generateUsers().catch(err => console.error('Error generating movies:', err));;
    await GenerateTVShows.generateTVShows().catch(err => console.error('Error generating movies:', err));;
})().catch(err => console.error('Error initializing database:', err));  
