using Yarp.ReverseProxy.Configuration;
using Yarp.ReverseProxy.LoadBalancing;

namespace WebServer.ReverseProxy;

public class CustomProxyConfigProvider : IProxyConfigProvider
{
    private CustomMemoryConfig _config;

    public CustomProxyConfigProvider(IClustersConfigProvider clustersConfigProvider, IRoutesConfigProvider routesConfigProvider)
    {
        // Load a basic configuration
        // Should be based on your application needs.
        var routeConfig = new RouteConfig
        {
            RouteId = "AngularWC",
            ClusterId = "AngularWC",
            Match = new RouteMatch
            {
                Path = "test/url/angular/{**catch-all}"
            },
            Transforms = new List<IReadOnlyDictionary<string, string>>()
                {
                    new Dictionary<string, string>(){ {"PathRemovePrefix", "/test/url/angular"} }
                }
        };

        var routeConfigs = new[] { routeConfig };

        var clusterConfigs = new[]
        {
            new ClusterConfig
            {
                ClusterId = "AngularWC",
                LoadBalancingPolicy = LoadBalancingPolicies.RoundRobin,
                Destinations = new Dictionary<string, DestinationConfig>
                {
                    { "destination1", new DestinationConfig { Address = "http://localhost:8003/" } },
                }
            }
        };

        _config = new CustomMemoryConfig(routeConfigs, clusterConfigs);
    }

    public IProxyConfig GetConfig() => _config;

    /// <summary>
    /// By calling this method from the source we can dynamically adjust the proxy configuration.
    /// Since our provider is registered in DI mechanism it can be injected via constructors anywhere.
    /// </summary>
    public void Update(IReadOnlyList<RouteConfig> routes, IReadOnlyList<ClusterConfig> clusters)
    {
        var oldConfig = _config;
        _config = new CustomMemoryConfig(routes, clusters);
        oldConfig.SignalChange();
    }    
}