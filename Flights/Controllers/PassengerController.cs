using Flights.Dtos;
using Microsoft.AspNetCore.Mvc;
using Flights.Data;
using Flights.Domain.Entities;

namespace Flights.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {

        private readonly Entities _entities;

        public PassengerController(Entities entities)
        {
            _entities = entities;
            
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassengerDto dto){
            bool exists = _entities.Passengers.Any(p => p.Email == dto.Email.ToLower());
            if(exists) return BadRequest("This email already in use");
            _entities.Passengers.Add(new Passenger(
                dto.Email.ToLower(),
                dto.FirstName,
                dto.LastName,
                dto.Gender
            ));
            _entities.SaveChanges();
            return CreatedAtAction(nameof(Find), new { email = dto.Email.ToLower() });
            //throw new NotImplementedException();
        }

        [HttpGet("{email}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<Passenger> Find(string email)
        {
            System.Diagnostics.Debug.WriteLine("Find Passenger: {0}", email);
            var passenger = _entities.Passengers.FirstOrDefault(p => p.Email.ToLower() == email.ToLower());
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