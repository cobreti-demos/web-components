using WebServer.ReverseProxy.Config;
using WebServer.ReverseProxy.Config.Route;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public interface IRoutesConfigProvider
{
    IReadOnlyList<RouteConfig> ToRouteConfigList();
    MutableRouteConfig Create(string id);
    void Add(MutableRouteConfig routeConfig);
    void Update(MutableRouteConfig routeConfig);
    void Remove(string id);
    IReadOnlyList<string> ListRouteIds();

    MutableRouteConfig? GetRouteById(string id);
    IReadOnlyList<MutableRouteConfig> ListRoutes();
}
