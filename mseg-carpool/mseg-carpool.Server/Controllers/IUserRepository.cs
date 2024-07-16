using mseg_carpool.Server.Models;

namespace mseg_carpool.Server;

public interface IUserRepository
{
    User GetUserByAzureId(string azureId);
    User CreateUser(User user);
    void UpdateUser(User user);
    void DeleteUser(string azureId);
}

// implement IUserRepository using local Dictionary
class LocalInMemUserRepository : IUserRepository
{
    private readonly Dictionary<string, User> _users = new();

    public User GetUserByAzureId(string azureId)
    {
        if (_users.ContainsKey(azureId))
        {
            return _users[azureId];
        }

        return null;
    }

    public User CreateUser(User user)
    {
        _users[user.AzureId] = user;

        return user;
    }

    public void UpdateUser(User user)
    {
        _users[user.AzureId] = user;
    }

    public void DeleteUser(string azureId)
    {
        _users.Remove(azureId);
    }
}