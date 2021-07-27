using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchiveObscura.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int RecordId { get; set; }
        public int UserProfileId { get; set; }
    }
}
