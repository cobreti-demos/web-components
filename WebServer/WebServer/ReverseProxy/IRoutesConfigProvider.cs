using WebServer.ReverseProxy.Config;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IRoutesConfigProvider
{
    IReadOnlyList<RouteConfig> ToRouteConfigList();
    MutableRouteConfig CreateRoute(string id);
}
