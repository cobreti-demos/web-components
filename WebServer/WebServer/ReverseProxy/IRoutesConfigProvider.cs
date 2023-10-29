using WebServer.ReverseProxy.Config;
using WebServer.ReverseProxy.Config.Route;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IRoutesConfigProvider
{
    IReadOnlyList<RouteConfig> ToRouteConfigList();
    MutableRouteConfig CreateRoute(string id);
}
