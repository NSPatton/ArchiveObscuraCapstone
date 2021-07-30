using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Repositories;

namespace ArchiveObscura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly IRecordRepository _recordRepo;
        private readonly IUserProfileRepository _userProfileRepository;
        public RecordController (IRecordRepository recordRepository, IUserProfileRepository userProfileRepository)
        {
            _recordRepo = recordRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recordRepo.GetAllRecords());
        }

    }
}
