using mseg_carpool.Server.Models;

namespace mseg_carpool.Server;

public interface IUserRepository
{
    Users GetUserByAzureId(string azureId);
    Users CreateUser(Users user);
    void UpdateUser(Users user);
    void DeleteUser(string azureId);
}

// implement IUserRepository using local Dictionary
class LocalInMemUserRepository : IUserRepository
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
        _users[user.Id] = user;
    }

    public void DeleteUser(string azureId)
    {
        _users.Remove(azureId);
    }
}