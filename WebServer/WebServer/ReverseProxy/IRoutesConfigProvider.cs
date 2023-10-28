using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IRoutesConfigProvider
{
    IReadOnlyList<RouteConfig> Routes { get; }
    void Add(RouteConfig config);
    void AddCatchAll(string id, string match, string prefixToRemove);
}