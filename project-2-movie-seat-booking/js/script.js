const movieSelect = document.getElementById('movie');

const seats = document.querySelectorAll('.seat');

let ticketPrice = +movieSelect.value;

populateUI();

// Event listener for movie selection
movieSelect.addEventListener('change', (e) => {
    // Reset previous selection
    resetSelectedSeats();

    // Get selected movie data from array of objects
    ticketPrice = +e.target.value;

    // Set selection index and price
    const selectedMovieIndex = e.target.selectedIndex;
    
    const selectedMoviePrice = e.target.value;

    // Save selection to local storage
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
    localStorage.setItem('selectedMoviePrice', selectedMoviePrice);

    updateTotalCost();
})

// Event listener for seat selection
seats.forEach(seat => seat.addEventListener('click', toggleSeatSelection))

// Toggle seat selection
function toggleSeatSelection(e) {
    const seat = e.target;
    console.log(seat);

    // Check if selected seat is not occupied
    if (!seat.classList.contains('occupied')) {
        console.log('Seat is not occupied. Toggling "selected" class.')

        seat.classList.toggle('selected');

        // Check if 'selected' class is added to the element
        console.log(seat.classList);

        // Save selection to local storage
        saveSelectedSeats();
    } else {
        console.log('Seat is occupied, cannot select.');
    }

    updateTotalCost();
}

// Update total cost
function updateTotalCost() {
    // Select all elements with class "seat selected"
    const selectedSeats = document.querySelectorAll('.seat.selected');

    const numberOfSeats = selectedSeats.length;

    const totalCost = numberOfSeats * ticketPrice;

    // Display info to user
    document.getElementById('totalPrice').textContent = `${totalCost}`;

    document.getElementById('ticketCount').textContent = `${numberOfSeats}`;
}

// Save selected seats to local storage
function saveSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');

    // Get index position of each selected seats in an array
    const seatsIndex = [...selectedSeats].map((seat => [...seats].indexOf(seat)));

    // Save to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Reset selected seats when movie selection changes
function resetSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');

    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
    });
}

// Populate UI with saved data
function populateUI() {
    // Get stored movie index data from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // Get stored selected seats data from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // Check if there's a selected movie data stored
    if (selectedMovieIndex !== null) {
        // Show the selected movie in the UI
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    // Check if there are selected seats stored
    if (selectedSeats !== null && selectedSeats.length > 0) {
        // Display seats
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
}