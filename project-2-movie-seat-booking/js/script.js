const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat');

movieSelect.addEventListener('change', updateSelectedMovie);

seats.forEach(seat => seat.addEventListener('click', toggleSelection));

let ticketPrice = +movieSelect.value;

function toggleSelection(e) {
    const seat = e.target; // Targetted element assigned as 'seat'
    console.log(e.target);

    if (!seat.classList.contains('occupied')) {
        console.log("Seat is not occupied. Toggling selected class.");
        seat.classList.toggle('selected');
        console.log(seat.classList)
    } else {
        console.log("Seat is occupied. Cannot select.");
    }

    updateTotalCost();
}

function updateSelectedMovie(e) {
    ticketPrice = +e.target.value;

    // Reset seats when new movie is selected
    resetSelectedSeats();
    updateTotalCost();
}

function updateTotalCost() {
    const selectedSeats = document.querySelectorAll('.seat.selected'); // Selects elements with class 'seat selected'

    const numberOfSeats = selectedSeats.length; // Selects number of elements with class 'seat selected'

    const totalCost = numberOfSeats * ticketPrice;

    // Display info to the user
    document.getElementById('totalPrice').textContent = `${totalCost}`;
}

function resetSelectedSeats() {
    // Reset selection when new movie is selected
    const selectedSeats = document.querySelectorAll('.seat.selected');

    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
    });
}