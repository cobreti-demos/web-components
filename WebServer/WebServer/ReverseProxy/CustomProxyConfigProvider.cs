using Yarp.ReverseProxy.Configuration;
using Yarp.ReverseProxy.LoadBalancing;

namespace WebServer.ReverseProxy;

public class CustomProxyConfigProvider : IProxyConfigProvider
{
    private CustomMemoryConfig _config;
    private IClustersConfigProvider _clustersConfigProvider;
    private IRoutesConfigProvider _routesConfigProvider;

    public CustomProxyConfigProvider(IClustersConfigProvider clustersConfigProvider, IRoutesConfigProvider routesConfigProvider)
    {
        _clustersConfigProvider = clustersConfigProvider;
        _routesConfigProvider = routesConfigProvider;
        
        _clustersConfigProvider.AddCluster("AngularWC", "http://localhost:8003/");

        var route = _routesConfigProvider.CreateRoute("AngularWC");
        route.SetClusterId("AngularWC");
        route.Match.SetCatchAllPath("test/url/angular");
        route.Transforms.AddPathRemovePrefix("/test/url/angular");

        _config = new CustomMemoryConfig(_routesConfigProvider.ToRouteConfigList(), _clustersConfigProvider.Clusters);
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