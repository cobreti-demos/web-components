using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.RouteConfig;

namespace WebServer.Commands.ReverseProxy.Routes;

public class GetRouteByIdResponse : RequestResponse<RouteConfigDto>
{
    public GetRouteByIdResponse(RouteConfigDto value) : base(value)
    {
    }
}

public class GetRouteByIdRequest : IRequest<GetRouteByIdResponse>
{
    public string Id { get; }

    public GetRouteByIdRequest(string id)
    {
        Id = id;
    }
}
