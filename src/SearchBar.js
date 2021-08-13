const SearchBar = ({formQuery}) => {

    return (
        <form onSubmit={(e) => {formQuery(e)}}>
            <p>Search by:</p>
            <div className="flexForm">
                <label htmlFor="city" className="sr-only">City</label>
                <input type="text" id="city" placeholder="City" />
                <p>or</p>
                <div className="zipContainer">
                    <label htmlFor="zip" className="sr-only">Zip/Postal Code</label>
                    <input type="text" id="zip" placeholder="Zip/Postal Code" />
                    <label htmlFor="country" className="sr-only">Country Code</label>
                    <input type="text" id="country" maxLength="2" placeholder="Country Code" />
                </div>
            </div>

            <input type="submit" value="Search" />
        </form>
    )
}

export default SearchBar