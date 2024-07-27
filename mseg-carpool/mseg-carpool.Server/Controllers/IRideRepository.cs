using mseg_carpool.Server.Models;

namespace mseg_carpool.Server;

public interface IRideRepository
{
    Ride GetRideByrideId(int Id);
    Ride CreateRide(Ride ride);
    void UpdateRide(Ride ride);
    void DeleteRide(int Id);
}

// implement IUserRepository using local Dictionary
class LocalInMemRideRepository : IRideRepository
{
    private readonly Dictionary<string, Ride> _rides = new();

    public Ride GetRideByrideId(int Id)
    {
        if (_rides.ContainsKey(Id.ToString()))
        {
            return _rides[Id.ToString()];
        }

        return null;
    }

    public Ride CreateRide(Ride ride)
    {
        _rides[ride.Id.ToString()] = ride;

        return ride;
    }

    public void UpdateRide(Ride ride)
    {
        _rides[ride.Id.ToString()] = ride;
    }

    public void DeleteRide(int Id)
    {
        _rides.Remove(Id.ToString());
    }
}