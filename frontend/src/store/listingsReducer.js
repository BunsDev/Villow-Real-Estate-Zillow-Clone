// TODO: write a reducer for listings
const RECEIVE_LISTINGS = "listings/RECEIVE_LISTINGS";
const RECEIVE_LISTING = "listings/RECEIVE_LISTING";
// TODO: add remove and update listing

export const receiveListings = (listings) => ({
	type: RECEIVE_LISTINGS,
	listings,
});

export const receiveListing = (listing) => ({
	type: RECEIVE_LISTING,
	listing,
});

export const getListings = (state) => {
	if (state && state.listings) {
		return Object.values(state.listings);
	}

	return [];
};

export const getListing = (id) => (state) => {
	if (state && state.listings) {
		return state.listings[id];
	}

	return null;
};

export const fetchListings = () => async (dispatch) => {
	const res = await fetch("/api/listings");

	if (res.ok) {
		const listings = await res.json();
	    dispatch(receiveListings(listings));
	}
};


// TODO: Fetch a single listing
const listingsReducer = (state = {}, action) => {
	const newState = { ...state };

	switch (action.type) {
		case RECEIVE_LISTINGS:
			return {...newState, ...action.listings};
		case RECEIVE_LISTING:
			newState[action.listing.id] = action.listing;
			return newState;
		default:
			return state;
	}
};

export default listingsReducer;
