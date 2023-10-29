using System.Text.RegularExpressions;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy;

public class RoutesConfigProvider : IRoutesConfigProvider
{
    private Dictionary<string, RouteConfig> _routes = new Dictionary<string, RouteConfig>();

    public RoutesConfigProvider()
    {
        
    }

    public IReadOnlyList<RouteConfig> Routes => _routes.Values.ToList();

    public IRoutesConfigProvider Add(RouteConfig config)
    {
        if (_routes.ContainsKey(config.RouteId))
        {
            throw new ArgumentException($"Route with id {config.RouteId} already exists");
        }

        _routes.Add(config.RouteId, config);

        return this;
    }

    public IRoutesConfigProvider AddCatchAll(string id, string clusterId, string match, string prefixToRemove)
    {
        if (_routes.ContainsKey(id))
        {
            throw new ArgumentException($"Route with id {id} already exists");
        }

        var matchallRegex = new Regex("^\\{(.*)\\}$");
        var parts = match.Split('/').ToList();
        var lastPart = parts.Last();

        var regexMatch = matchallRegex.Match(lastPart);
        if (!regexMatch.Success)
        {
            parts.Add("{**catch-all}");
        }
        
        var routeConfig = new RouteConfig
        {
            RouteId = id,
            ClusterId = clusterId,
            Match = new RouteMatch
            {
                Path = string.Join('/', parts)
            },
            Transforms = new List<IReadOnlyDictionary<string, string>>()
            {
                new Dictionary<string, string>(){ {"PathRemovePrefix", prefixToRemove} }
            }
        };

        _routes.Add(id, routeConfig);

        return this;
    }
}
