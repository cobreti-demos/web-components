using WebServer.ReverseProxy.Config.Cluster;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IClustersConfigProvider
{
    IReadOnlyList<ClusterConfig> ToClusterConfigList();
    MutableClusterConfig CreateCluster(string id);
    IReadOnlyList<string> ListClusterIds();
    MutableClusterConfig? GetClusterById(string id);
    IReadOnlyList<MutableClusterConfig> ListClusters();
}