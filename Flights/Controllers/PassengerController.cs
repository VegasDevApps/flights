using Flights.Dtos;
using Microsoft.AspNetCore.Mvc;
using Flights.ReadModels;

namespace Flights.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        static private IList<NewPassengerDto> Passengers = new List<NewPassengerDto>();

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassengerDto dto){
            Passengers.Add(dto);
            System.Diagnostics.Debug.WriteLine("Passengers.Count: {0}", Passengers.Count);
            return CreatedAtAction(nameof(Find), new { email = dto.Email });
            //throw new NotImplementedException();
        }

        [HttpGet("{email}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<PassengerRm> Find(string email)
        {
            System.Diagnostics.Debug.WriteLine("Find Passenger: {0}", email);
            var passenger = Passengers.FirstOrDefault(p => p.Email.ToLower() == email.ToLower());
            if(passenger == null) return NotFound();

            var result = new PassengerRm(
                passenger.Email,
                passenger.FirstName,
                passenger.LastName,
                passenger.Gender
            );

            return Ok(result);
        }
    }
}