﻿using System.ComponentModel.DataAnnotations;

namespace mseg_carpool.Server.Models
{
    public class Request
    {
        [Key]
        public int Id { get; set; }
        public string status { get; set; }
        public string PickupPoints { get; set; }
        public string? UsersId { get; set; }
        public Users User { get; set; }

        public int? RideId { get; set; }
        public Ride ride { get; set; }

    }
}