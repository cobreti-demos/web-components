using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy.Config.Cluster;

public class MutableDestinationConfig
{
    public MutableDestinationConfig(string address)
    {
        Address = address;
    }
    
    public string Address { get; set; }

    public DestinationConfig ToDestinationConfig()
    {
        return new DestinationConfig()
        {
            Address = Address
        };
    }
}
