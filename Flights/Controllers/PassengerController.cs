using Flights.Dtos;
using Microsoft.AspNetCore.Mvc;
using Flights.ReadModels;
using Flights.Domain.Entities;

namespace Flights.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        static private IList<Passenger> Passengers = new List<Passenger>();

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassengerDto dto){
            bool exists = Passengers.Any(p => p.Email == dto.Email.ToLower());
            if(exists) return BadRequest("This email already in use");
            Passengers.Add(new Passenger(
                dto.Email.ToLower(),
                dto.FirstName,
                dto.LastName,
                dto.Gender
            ));
            System.Diagnostics.Debug.WriteLine("Passengers.Count: {0}", Passengers.Count);
            return CreatedAtAction(nameof(Find), new { email = dto.Email.ToLower() });
            //throw new NotImplementedException();
        }

        [HttpGet("{email}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<Passenger> Find(string email)
        {
            System.Diagnostics.Debug.WriteLine("Find Passenger: {0}", email);
            var passenger = Passengers.FirstOrDefault(p => p.Email.ToLower() == email.ToLower());
            if(passenger == null) return NotFound();

            var result = new Passenger(
                passenger.Email,
                passenger.FirstName,
                passenger.LastName,
                passenger.Gender
            );

            return Ok(result);
        }
    }
}