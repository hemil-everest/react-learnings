import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"
import { searchMovies, getPopularMovies } from "../services/api"
import "../css/Home.css"
// when we type something in the input, since state changed, entire code component will rerun apart from maintained state and state will stay the same and we will  return new version of ui
// when state change occurs, entire component is reran or re-rendered
function Home() {
    //[name of the state, function to update the state] = useState(default value of state)
    // When we will update the state, return inside component will re-render itself and update based on the state change
    // When we cahnge the state, we can re-render component and update the screen
    // When we define normal variable and don't put it in state, then whatever value was changed to will be lost as soon as component is re-rendered as it will be redefined again from scratch
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //useEffect allows you to add side effects to your functions or to your components and define when they should run
    //useEffect has function and dependancy array, if nothing mentioned inside dependancy array.. it will run once initially rendering component
    // else for mentioned values in dependancy array we will check values after every re-render of component, and if value in dependancy array change then we will run useEffect() again..
    // ()=> {} call when array changes
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            }
            catch (err) {
                console.log(err)
                setError("failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        // prevent default behavior of the form so it doesn't update page
        e.preventDefault();
    
        if (!searchQuery.trim()) {
            setError("Please enter a valid search query.");
            return;
        }
    
        if (loading) return;
    
        setLoading(true);
        setError(null);
    
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies");
            setMovies([]); // Clear previous results
        } finally {
            setLoading(false);
        }
         // alert(searchQuery)
        // setSearchQuery(" ") // this will update the state and re-render the component
        // setSearchQuery("")
    };

    // display movies in a grid. Now we have to give key property to the component we are returning
    // React needs to know which component to update based on interactions happens with web page
    // form elements are connected to the piece of state and we can utilize piece of state inside component the way we want
    return (<div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text"
                placeholder="Search for a movies.."
                className="search-input"
                value={searchQuery}
                // onChange is an event handler. It will be called when the value of the input changes.. to put the value of the input in the screen.. whenever there is change, we get target.value and put in setSearchQuery and we set our state equal to that
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" class="search-button">Search</button>
        </form>

        {error && <div className="error-message"> {error} </div>}
        {loading ?
            (<div className="loading"> Loading... </div>)
            : (<div className="movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && 
                    (
                        <MovieCard movie={movie} key={movie.id} />
                    )
                ))}
            </div>)}
    </div>)
}

export default Home