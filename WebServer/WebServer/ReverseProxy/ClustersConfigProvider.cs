using Yarp.ReverseProxy.Configuration;
using Yarp.ReverseProxy.LoadBalancing;

namespace WebServer.ReverseProxy;

public class ClustersConfigProvider : IClustersConfigProvider
{
    private Dictionary<string, ClusterConfig> _clusters = new Dictionary<string, ClusterConfig>();

    public ClustersConfigProvider()
    {
    }

    public IReadOnlyList<ClusterConfig> Clusters => _clusters.Values.ToList();

    public void AddCluster(string id, string address)
    {
        if (_clusters.ContainsKey(id))
        {
            throw new ArgumentException($"Invalid cluser configuration : cluster with {id} already exists");
        }
        
        var config = new ClusterConfig
        {
            ClusterId = id,
            LoadBalancingPolicy = LoadBalancingPolicies.RoundRobin,
            Destinations = new Dictionary<string, DestinationConfig>
            {
                { "default", new DestinationConfig { Address = address } },
            }
        };

        _clusters.Add(id, config);
    }
}
