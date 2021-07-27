﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchiveObscura.Models
{
    public class Record
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ArtistName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DatePosted { get; set; }
        public int TagId { get; set; }
        public int UserProfileId { get; set; }
    }
}
