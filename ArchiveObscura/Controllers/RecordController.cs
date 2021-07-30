using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Repositories;
using System.Security.Claims;
using ArchiveObscura.Models;

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

        [HttpGet("GetByUser")]
        public IActionResult GetByUser()
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var records = _recordRepo.GetUserRecords(user.FirebaseUserId);
                return Ok(records);
            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (firebaseUserId != null)
            {
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            else
            {
                return null;
            }
        }

    }
}
