using System.Text.RegularExpressions;
using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy.Config;

public class MutableRouteMatch
{
    private string _path = "";

    public MutableRouteMatch()
    {
    }
    
    public string Path => _path;

    public void SetCatchAllPath(string path)
    {
        var matchallRegex = new Regex("^\\{(.*)\\}$");
        var parts = path.Split('/').ToList();
        var lastPart = parts.Last();

        var regexMatch = matchallRegex.Match(lastPart);
        if (!regexMatch.Success)
        {
            parts.Add("{**catch-all}");
        }

        this._path = string.Join('/', parts);
    }

    public RouteMatch ToRouteMatch()
    {
        return new RouteMatch
        {
            Path = _path
        };
    }
}