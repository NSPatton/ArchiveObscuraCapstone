using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Models;

namespace ArchiveObscura.Repositories
{
    public interface IRecordRepository
    {
        List<Record> GetAllRecords();
        Record GetRecordById(int id);
        void AddRecord(Record record);
        void UpdateRecord(Record record);
        List<Record> Search(string criterion, bool sortDescending);
        List<Record> GetUserRecords(string FirebaseUserId);
           
    }
}
