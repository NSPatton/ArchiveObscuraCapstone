using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArchiveObscura.Models;

namespace ArchiveObscura.Repositories
{
    interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetFirebaseUserId(string firebaseUserId);
    }
}
