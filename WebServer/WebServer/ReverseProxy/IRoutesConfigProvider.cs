using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IRoutesConfigProvider
{
    IReadOnlyList<RouteConfig> Routes { get; }
    IRoutesConfigProvider Add(RouteConfig config);
    IRoutesConfigProvider AddCatchAll(string id, string clusterId, string match, string prefixToRemove);
}
