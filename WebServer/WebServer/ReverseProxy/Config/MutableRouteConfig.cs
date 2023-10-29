using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy.Config;

public class MutableRouteConfig
{
    private string _id;
    private string? _clusterId = null;
    private MutableRouteMatch _match = new MutableRouteMatch();
    private MutableRouteTransforms _transforms = new MutableRouteTransforms();

    public MutableRouteConfig(string id)
    {
        _id = id;
    }

    public string RouteId => _id;

    public string? ClusterId => _clusterId;

    public MutableRouteMatch Match => _match;

    public MutableRouteTransforms Transforms => _transforms;

    public MutableRouteConfig SetClusterId(string id)
    {
        this._clusterId = id;
        return this;
    }

    public RouteConfig ToRouteConfig()
    {
        return new RouteConfig
        {
            RouteId = _id,
            ClusterId = _clusterId,
            Match = Match.ToRouteMatch(),
            Transforms = Transforms.ToRouteTransforms()
        };
    }
}
