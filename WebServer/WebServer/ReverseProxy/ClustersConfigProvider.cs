using WebServer.ReverseProxy.Config.Cluster;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public class ClustersConfigProvider : IClustersConfigProvider
{
    private Dictionary<string, MutableClusterConfig> _clusters = new Dictionary<string, MutableClusterConfig>();

    public ClustersConfigProvider()
    {
    }

    public IReadOnlyList<ClusterConfig> ToClusterConfigList()
    {
        return _clusters.Values.Select(x => x.ToClusterConfig()).ToList();
    }

    public MutableClusterConfig CreateCluster(string id)
    {
         if (_clusters.ContainsKey(id))
         {
             throw new ArgumentException($"Invalid cluser configuration : cluster with {id} already exists");
         }

         var clusterConfig = new MutableClusterConfig(id);
         _clusters.Add(id, clusterConfig);
         return clusterConfig;
    }

    public IReadOnlyList<string> ListClusterIds()
    {
        return _clusters.Keys.ToList();
    }

    public MutableClusterConfig? GetClusterById(string id)
    {
        if (!_clusters.ContainsKey(id))
        {
            return null;
        }

        return _clusters[id];
    }

    public IReadOnlyList<MutableClusterConfig> ListClusters()
    {
        return _clusters.Values.ToList();
    }
}

