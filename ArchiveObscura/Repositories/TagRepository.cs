using ArchiveObscura.Models;
using ArchiveObscura.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchiveObscura.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Tag";

                    var reader = cmd.ExecuteReader();
                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }
                    reader.Close();
                    return tags;
                }
            }
        }

        public Tag GetById(int id)
        {
           using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Tag WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Tag tag = null;
                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();

                    return tag;

                }
            }
        }
    }
}
