using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IClustersConfigProvider
{
    IReadOnlyList<ClusterConfig> Clusters { get; }
    void AddCluster(string id, string address);
}