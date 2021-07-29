using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Models;

namespace ArchiveObscura.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetByUserId(int id);
        List<UserProfile> GetAllUserProfiles();
    }
}
