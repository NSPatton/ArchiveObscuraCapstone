using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Models;
using ArchiveObscura.Utils;

namespace ArchiveObscura.Repositories
{
    public class RecordRepository : BaseRepository, IRecordRepository
    {
        public RecordRepository(IConfiguration configuration) : base(configuration) { }

        public void AddRecord(Record record)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Record (Title, ArtistName, Description, DatePosted, ImageUrl, TagId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @ArtistName, @Description, @DatePosted, @ImageUrl, @TagId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", record.Title);
                    DbUtils.AddParameter(cmd, "@ArtistName", record.ArtistName);
                    DbUtils.AddParameter(cmd, "@Description", record.Description);
                    DbUtils.AddParameter(cmd, "@DatePosted", record.DatePosted);
                    DbUtils.AddParameter(cmd, "@ImageUrl", record.ImageUrl);
                    DbUtils.AddParameter(cmd, "@TagId", record.TagId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", record.UserProfileId);

                    record.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int recordId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Record WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", recordId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Record> GetAllRecords()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT r.Id, r.Title, r.ArtistName, r.Description, r.ImageUrl, r.DatePosted,
                                    r.TagId, r.UserProfileId,

                                    t.Name,

                                    up.Name, up.Email, up.ImageUrl AS UserProfileImageUrl, up.FirebaseUserId
                                FROM Record r
                                LEFT JOIN UserProfile up ON r.UserProfileId = up.Id
                                LEFT JOIN Tag t ON r.TagId = t.Id
                                ORDER BY DatePosted";

                    var reader = cmd.ExecuteReader();

                    var records = new List<Record>();
                    while (reader.Read())
                    {
                        records.Add(new Record()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            ArtistName = DbUtils.GetString(reader, "ArtistName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            DatePosted = DbUtils.GetDateTime(reader, "DatePosted"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl")
                            },
                        });
                    }
                    reader.Close();

                    return records;
                }
            }
        }

        public Record GetRecordById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT r.Id, r.Title, r.ArtistName, r.Description, r.ImageUrl,
                                            r.DatePosted, r.TagId, r.UserProfileId,
                                            t.Id AS TagId, t.Name,
                                            up.Id AS UserProfileId, up.Name AS UserProfileName
                                    FROM Record r
                                    LEFT JOIN UserProfile up ON r.UserProfileId = up.Id
                                    LEFT JOIN Tag t ON r.TagId = t.Id
                                    WHERE r.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Record record = null;
                    if (reader.Read())
                    {
                        record = new Record()
                        {
                            Id = id,
                            Title = DbUtils.GetString(reader, "Title"),
                            ArtistName = DbUtils.GetString(reader, "ArtistName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            DatePosted = DbUtils.GetDateTime(reader, "DatePosted"),
                            TagId = DbUtils.GetInt(reader, "TagId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        };
                        reader.Close();

                        return record;
                    }
                    reader.Close();

                    return null;

                }
            }
        }

        public List<Record> GetUserRecords(string FirebaseUserId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT r.Id, r.Title, r.ArtistName, r.Description, r.ImageUrl,
                                    r.DatePosted, r.TagId, r.UserProfileId, up.Name AS UserProfileName, up.Email, up.ImageUrl AS UserProfileImageUrl
                                    FROM Record r
                                    LEFT JOIN UserProfile up ON r.UserProfileId = up.Id
                                    LEFT JOIN Tag t ON r.TagId = t.Id
                                    WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", FirebaseUserId);

                    var reader = cmd.ExecuteReader();

                    var records = new List<Record>();

                    while (reader.Read())
                    {
                        records.Add(new Record()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            ArtistName = DbUtils.GetString(reader, "ArtistName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            DatePosted = DbUtils.GetDateTime(reader, "DatePosted"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Name = DbUtils.GetString(reader, "UserProfileName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl")
                            },
                        });
                    }
                    reader.Close();

                    return records;
                }
            }
        }

        public List<Record> Search(string criterion, bool sortDescending)
        {
            throw new NotImplementedException();
        }

        public void UpdateRecord(Record record)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Record
                            SET Title = @Title,
                                ArtistName = @ArtistName,
                                Description = @Description,
                                DatePosted = @DatePosted,
                                ImageUrl = @ImageUrl,
                                TagId = @TagId,
                                UserProfileId = @UserProfileId
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", record.Title);
                    DbUtils.AddParameter(cmd, "@ArtistName", record.ArtistName);
                    DbUtils.AddParameter(cmd, "@Description", record.Description);
                    DbUtils.AddParameter(cmd, "@DatePosted", record.DatePosted);
                    DbUtils.AddParameter(cmd, "@ImageUrl", record.ImageUrl);
                    DbUtils.AddParameter(cmd, "@TagId", record.TagId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", record.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", record.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
