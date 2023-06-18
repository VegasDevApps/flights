using System.ComponentModel.DataAnnotations;

namespace Flights.Dtos
{
    public record BookDto(
        [Required]
        Guid FlightId,
        [Required]
        [EmailAddress]
        [StringLength(100, MinimumLength = 10)]
        string PassengerEmail,
        [Required]
        [Range(1, 254)]
        byte NumberOfSeats
    );
}