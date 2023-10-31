using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.RouteConfig;

namespace WebServer.Commands.ReverseProxy.Routes;

public class UpdateRouteRequest : IRequest<RequestResponse>
{
    public RouteConfigDto RouteConfig { get; }
    
    public UpdateRouteRequest(RouteConfigDto routeConfigDto)
    {
        RouteConfig = routeConfigDto;
    }
}
