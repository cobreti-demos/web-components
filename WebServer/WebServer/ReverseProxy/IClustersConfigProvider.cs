using WebServer.ReverseProxy.Config.Cluster;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IClustersConfigProvider
{
    IObservable<IClustersConfigProvider> UpdateObservable { get; }
    void Update();
    IReadOnlyList<ClusterConfig> ToClusterConfigList();
    MutableClusterConfig CreateCluster(string id);
    IReadOnlyList<string> ListClusterIds();
    MutableClusterConfig? GetClusterById(string id);
    IReadOnlyList<MutableClusterConfig> ListClusters();
    void AddCluster(MutableClusterConfig clusterConfig);
    void UpdateCluster(MutableClusterConfig clusterConfig);
}