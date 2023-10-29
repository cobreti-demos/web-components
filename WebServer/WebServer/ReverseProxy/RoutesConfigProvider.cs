using WebServer.ReverseProxy.Config.Route;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public class RoutesConfigProvider : IRoutesConfigProvider
{
    private readonly Dictionary<string, MutableRouteConfig> _routes = new Dictionary<string, MutableRouteConfig>();

    public RoutesConfigProvider()
    {
        
    }

    public IReadOnlyList<RouteConfig> ToRouteConfigList()
    {
        return _routes.Values
                .Select(x => x.ToRouteConfig())
                .ToList();
    }

    public MutableRouteConfig CreateRoute(string id)
    {
        if (_routes.ContainsKey(id))
        {
            throw new ArgumentException($"RouteConfig with id {id} already exists");
        }
        
        var route = new MutableRouteConfig(id);
        _routes.Add(id, route);
        
        return route;
    }

    public void AddRoute(MutableRouteConfig routeConfig)
    {
        if (_routes.ContainsKey(routeConfig.RouteId))
        {
            throw new ArgumentException($"RouteConfig with id {routeConfig.RouteId} already exists");
        }

        _routes.Add(routeConfig.RouteId, routeConfig);
    }

    public IReadOnlyList<string> ListRouteIds()
    {
        return _routes.Keys.ToList();
    }

    public MutableRouteConfig? GetRouteById(string id)
    {
        if (!_routes.ContainsKey(id))
        {
            return null;
        }

        return _routes[id];
    }

    public IReadOnlyList<MutableRouteConfig> ListRoutes()
    {
        return _routes.Values.ToList();
    }
}
