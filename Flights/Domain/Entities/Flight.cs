using Flights.Domain.Entities.Errors;

namespace Flights.Domain.Entities
{
    public class Flight
    {
        public Flight(Guid id, string airline, string price, TimePlace departure, TimePlace arrival, int remainingNumberOfSeats) 
        {
            Id = id;
            Airline = airline;
            Price = price;
            Departure = departure;
            Arrival = arrival;
            RemainingNumberOfSeats = remainingNumberOfSeats;
   
        }

        public Flight()
        {

        }

        public Guid Id { get; set; }
        public string Airline { get; set; }
        public string Price { get; set; }
        public TimePlace Departure { get; set; }
        public TimePlace Arrival { get; set; }
        public int RemainingNumberOfSeats { get; set; }

        public IList<Booking> Bookings = new List<Booking>();

        internal object? MakeBooking(string passengerEmail, byte numberOfSeats)
        {
            var flight = this;
            if(flight.RemainingNumberOfSeats < numberOfSeats)
            {
                return new OverbookError();
            }
            var booking = new Booking(passengerEmail, numberOfSeats);
            flight.Bookings.Add(booking);
            flight.RemainingNumberOfSeats -= booking.NumberOfSeats;
            return null;
        }

        public object? CancelBooking(string passengerEmail, byte numberOfSeats){
            var booking = Bookings
                .FirstOrDefault(b => b.PassengerEmail == passengerEmail.ToLower() 
                    && b.NumberOfSeats == numberOfSeats);
            if(booking == null) return new NotFoundError();

            Bookings.Remove(booking);
            RemainingNumberOfSeats += numberOfSeats;
            return null;
        }
    }
}