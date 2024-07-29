using mseg_carpool.Server.Models;
using System.Collections.Generic;

namespace mseg_carpool.Server
{
    public interface IUsersRepository
    {
        Users GetUserByAzureId(string azureId);
        Users CreateUser(Users user);
        void UpdateUser(Users user);
        void DeleteUser(string azureId);
    }

    // Implement IUsersRepository using a local Dictionary
    public class LocalInMemUserRepository : IUsersRepository
    {
        private readonly Dictionary<string, Users> _users = new();

        public Users GetUserByAzureId(string azureId)
        {
            if (_users.ContainsKey(azureId))
            {
                return _users[azureId];
            }

            return null;
        }

        public Users CreateUser(Users user)
        {
            _users[user.Id] = user;
            return user;
        }

        public void UpdateUser(Users user)
        {
            if (_users.ContainsKey(user.Id))
            {
                _users[user.Id] = user;
            }
        }

        public void DeleteUser(string azureId)
        {
            _users.Remove(azureId);
        }
    }
}
