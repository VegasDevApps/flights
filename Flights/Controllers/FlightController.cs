using Microsoft.AspNetCore.Mvc;
using Flights.ReadModels;
using Flights.Domain.Entities;
using Flights.Dtos;
using Flights.Domain.Entities.Errors;
using Flights.Data;
using Microsoft.EntityFrameworkCore;

namespace Flights.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{
 
    private readonly Entities _entities;

    private readonly ILogger<FlightController> _logger;

    public FlightController(
        ILogger<FlightController> logger,
        Entities entities)
    {
        _logger = logger;
        _entities = entities;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(FlightRm), 200)]
    public ActionResult<FlightRm> Find(Guid id)
    {
        var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);
        if(flight == null) return NotFound();

        var result = FlightToRecord(flight);
        return Ok(result);
    }

    [HttpGet]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
    public IEnumerable<FlightRm> Search()
    {
        return _entities.Flights.Select(f => FlightToRecord(f));
    }

    [HttpPost]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(200)]
    public IActionResult Book(BookDto dto)
    {
        System.Diagnostics.Debug.WriteLine($"Booking new flight {dto}");

        var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId); 
        if(flight == null) return NotFound("Flight that you trying to book not found!");
        var error = flight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);
        
        if(error is OverbookError) 
            return Conflict(new { message = "The number of requested seats exceeds the number of remaining seats."});

        try 
        {
            _entities.SaveChanges();
        } catch (DbUpdateConcurrencyException ex) 
        {
            return Conflict(new { message = "An error occured while booking. Please try again."});
        }
        return CreatedAtAction(nameof(Find), new { id = dto.FlightId });
    }

    private FlightRm FlightToRecord(Flight flight)
    {
        return new FlightRm(
            flight.Id,
            flight.Airline,
            flight.Price,
            new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
            new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
            flight.RemainingNumberOfSeats
        );
    }
     

}

