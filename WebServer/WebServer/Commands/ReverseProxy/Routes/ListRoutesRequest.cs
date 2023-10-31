using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.RouteConfig;

namespace WebServer.Commands.ReverseProxy.Routes;

public class ListRoutesRequestResponse : RequestResponse<IEnumerable<RouteConfigDto>>
{
    public ListRoutesRequestResponse(IEnumerable<RouteConfigDto> value) : base(value)
    {
    }
}

public class ListRoutesRequest : IRequest<ListRoutesRequestResponse>
{
}