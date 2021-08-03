using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Models;
using ArchiveObscura.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace ArchiveObscura.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepo;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepo = tagRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepo.GetAllTags());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepo.GetById(id);
                if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
    }
}
