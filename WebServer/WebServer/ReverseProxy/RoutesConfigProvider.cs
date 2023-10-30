using System.Reactive.Linq;
using System.Reactive.Subjects;
using WebServer.ReverseProxy.Config.Route;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public class RoutesConfigProvider : IRoutesConfigProvider
{
    private readonly Dictionary<string, MutableRouteConfig> _routes = new Dictionary<string, MutableRouteConfig>();
    private readonly Subject<IRoutesConfigProvider> _updateSubject = new Subject<IRoutesConfigProvider>();

    public RoutesConfigProvider()
    {
        
    }

    public void Update()
    {
        _updateSubject.OnNext(this);
    }
    
    public IObservable<IRoutesConfigProvider> UpdateObservable => _updateSubject;

    public IReadOnlyList<RouteConfig> ToRouteConfigList()
    {
        return _routes.Values
                .Select(x => x.ToRouteConfig())
                .ToList();
    }

    public MutableRouteConfig Create(string id)
    {
        if (_routes.ContainsKey(id))
        {
            throw new ArgumentException($"RouteConfig with id {id} already exists");
        }
        
        var route = new MutableRouteConfig(id);
        _routes.Add(id, route);
        
        return route;
    }

    public void Add(MutableRouteConfig routeConfig)
    {
        if (_routes.ContainsKey(routeConfig.RouteId))
        {
            throw new ArgumentException($"RouteConfig with id {routeConfig.RouteId} already exists");
        }

        _routes.Add(routeConfig.RouteId, routeConfig);
    }

    public void Update(MutableRouteConfig routeConfig)
    {
        if (!_routes.ContainsKey(routeConfig.RouteId))
        {
            throw new ArgumentException($"RouteConfig with id {routeConfig.RouteId} not found");
        }

        _routes[routeConfig.RouteId] = routeConfig;
    }

    public void Remove(string id)
    {
        if (!_routes.ContainsKey(id))
        {
            throw new ArgumentException($"RouteConfig with id {id} not found");
        }

        _routes.Remove(id);
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
