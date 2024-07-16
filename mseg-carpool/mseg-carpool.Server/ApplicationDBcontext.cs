using Microsoft.EntityFrameworkCore;
using mseg_carpool.Server.Models;
using System.Data.Common;

namespace mseg_carpool.Server
{
    public class ApplicationDBcontext : DbContext
    {
        public ApplicationDBcontext(DbContextOptions<ApplicationDBcontext> options): base(options) 
        {

        }
        public DbSet<User> User { get; set; }

        public DbSet<Ride> Ride { get; set; }

        public DbSet<Request> Request { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder);
       
        }



    }
}

