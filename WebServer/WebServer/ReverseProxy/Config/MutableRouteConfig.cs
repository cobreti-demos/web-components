using Yarp.ReverseProxy.Configuration;

namespace WebServer.ReverseProxy.Config;

public class MutableRouteConfig
{
    private string _id;
    private MutableRouteMatch _match = new MutableRouteMatch();
    private MutableRouteTransforms _transforms = new MutableRouteTransforms();
    private FluentMutableRouteConfig _set;

    public MutableRouteConfig(string id)
    {
        _id = id;
        _set = new FluentMutableRouteConfig(this);
    }

    public FluentMutableRouteConfig Set => _set;
    
    public string RouteId => _id;

    public string? ClusterId { get; set; }

    public MutableRouteMatch Match => _match;

    public MutableRouteTransforms Transforms => _transforms;
    
    public RouteConfig ToRouteConfig()
    {
        return new RouteConfig
        {
            RouteId = RouteId,
            ClusterId = ClusterId,
            Match = Match.ToRouteMatch(),
            Transforms = Transforms.ToRouteTransforms()
        };
    }


    public class FluentMutableRouteConfig
    {
        private MutableRouteConfig _config;

        public FluentMutableRouteConfig(MutableRouteConfig config)
        {
            _config = config;
        }

        public FluentMutableRouteConfig ClusterId(string clusterId)
        {
            _config.ClusterId = clusterId;
            return this;
        }

        public FluentMutableRouteConfig Match_CatchAllPath(string match)
        {
            _config.Match.SetCatchAllPath(match);
            return this;
        }

        public FluentMutableRouteConfig Transforms_PathRemovePrefix(string path)
        {
            _config.Transforms.AddPathRemovePrefix(path);
            return this;
        }
    }
}