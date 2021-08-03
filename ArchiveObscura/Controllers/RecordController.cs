using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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

        [HttpPost]
        public IActionResult CreateRecord(Record record)
        {
            var currentUserProfile = GetCurrentUserProfile();
            record.UserProfileId = currentUserProfile.Id;
            record.DatePosted = DateTime.Now;
            _recordRepo.AddRecord(record);
            return CreatedAtAction(nameof(Get), new { id = record.Id }, record);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Record record)
        {
            if (id != record.Id)
            {
                return BadRequest();
            }

            _recordRepo.UpdateRecord(record);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var record = _recordRepo.GetRecordById(id);
            if (record == null)
            {
                return NotFound();
            }
            return Ok(record);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recordRepo.Delete(id);
            return NoContent();
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
