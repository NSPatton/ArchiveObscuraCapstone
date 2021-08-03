using ArchiveObscura.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchiveObscura.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        Tag GetById(int id);
           
    }
}
