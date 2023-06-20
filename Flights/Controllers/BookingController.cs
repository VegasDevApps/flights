using Microsoft.AspNetCore.Mvc;
using Flights.Data;
using Flights.ReadModels;
using Flights.Dtos;
using Flights.Domain.Entities.Errors;

namespace Flights.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly Entities _entities;
        public BookingController(Entities entities)
        {
            _entities = entities;
        }

        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<BookingRm>), 200)]
        public ActionResult<IEnumerable<BookingRm>> List(string email)
        {
            var bookings = _entities.Flights.ToArray()
                .SelectMany(f => f.Bookings.Where(
                    b => b.PassengerEmail == email.ToLower())
                    .Select(b => new BookingRm(
                        f.Id,
                        f.Airline,
                        f.Price,
                        new TimePlaceRm(f.Arrival.Place, f.Arrival.Time),
                        new TimePlaceRm(f.Departure.Place, f.Departure.Time),
                        b.NumberOfSeats,
                        b.PassengerEmail
                    )));

            return Ok(bookings);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult Cancel(BookDto dto){
            var flight = _entities.Flights.Find(dto.FlightId);
            if(flight == null) return NotFound(new {message = "There is no such flight was found"});

            var error = flight.CancelBooking(dto.PassengerEmail, dto.NumberOfSeats);
            if(error is NotFoundError) return NotFound(new {message = "There is now such booking was found"});
            _entities.SaveChanges();
            return NoContent();
        }
    }
}